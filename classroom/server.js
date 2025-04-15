const express =require("express");
const app =express();
const users =require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");
const flash =require("connect-flash");//001
const path =require("path");//001

app.set("view engine", "ejs");//001
app.set("views", path.join(__dirname, "views"));//001

const sessionOptions ={
    secret :"mysupersecretstring",
    resave : false,
    saveUninitialized : true,
}; //000

app.use(session(sessionOptions)); //000
app.use(flash()); //001


app.use((req,res,next)=>{
    res.locals.successMsg =req.flash("success");
    res.locals.errorMsg =req.flash("error");
    next();
});







app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query;
    req.session.name = name;
   // req.flash("success","user registered successfully :"); //001
    if(name=== "anonymous"){

        req.flash("error","user not registered :");
    }else{
        req.flash("success","user registered successfully :"); //001 
    }
    // console.log(req.session.name);
    res.redirect("/hello");
});//000


app.get("/hello" ,(req,res)=>{
    // res.locals.successMsg =req.flash("success");
    // res.locals.errorMsg =req.flash("error");
    //console.log(req.flash("success"));
    res.render("page.ejs",{name : express.session.name });   //, msg:req.flash("success")
    //res.send(`hello ,${req.session.name}`);
}); //000







// app.use(session({secret : "mysupersecretstring", resave : false, saveUninitialized :true ,})); part 3

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
    
//     res.send('you sent a request ${req.session.count} times'); 
// });  part3



// app.get("/test",(req,res)=>{
//     res.send("test successful");
// });  part sec comment secret only









// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));


// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed :true});
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);  //check
//     res.send("verified");
// });

// app.get("/getcookies",(req,res) =>{
//     res.cookie("greet","hello");
//     res.send("sent you some cookie");
// });

// app.get("/greet" ,(req,res)=>{
//     let { name = "anaonymous"}=req.cookies;
//     res.send(`Hi ,${name}`);
// });


// app.get("/",(req,res) => {
//     console.dir(req.cookies);
//     res.send("hi,i am root");
// });

// app.use("/users",users);
// app.use("/posts",posts);



app.listen(3000, () => {
    console.log("server is listening to 3000 ");
});