if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const axios = require("axios");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const http = require("http");
const { Server } = require("socket.io");
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing");
const User = require("./models/user");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const paymentRoutes = require("./routes/payment");
const chatRoutes = require("./routes/chat"); 


const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
}
main().catch((err) => console.log(err));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());


const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecertcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
        











app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions",
            {
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "You are a helpful travel assistant for a vacation rental platform." },
                    { role: "user", content: message }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
                }
            }
        );

        res.json({ reply: response.data.choices[0]?.message?.content || "I couldn't generate a response. Please try again." });
    } catch (error) {
        console.error("DeepSeek API Error:", error);
        res.status(500).json({ reply: "Sorry, I'm having trouble responding right now." });
    }
});















app.get("/search", async (req, res) => {
    const query = req.query.query || req.query.search || "";
    try {
        const results = await Listing.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } },
                { country: { $regex: query, $options: "i" } }
            ],
        });

        res.render("listing/search", { results, query });
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).send("Error processing search request.");
    }
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/payment", paymentRoutes);
app.use("/", chatRoutes); 

// app.get("/", (req, res) => {
//     res.send("<h1>HI I AM GROOT</h1>");
// });


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

app.get("/listings/:id/payment", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("listing/payment", { listing });
});


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {
    let { message = "Something went wrong!" } = err;
    res.status(500).render("error.ejs", { message });
});


const server = http.createServer(app);
const io = new Server(server);


io.on("connection", (socket) => {
    console.log("🟢 A user connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on("chatMessage", (data) => {
        io.to(data.room).emit("chatMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected:", socket.id);
    });
});

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
