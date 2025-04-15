const express= require("express");
const router = express.Router();

router.get("/",(req,res) =>{
    res.send("hi");
});


//show
router.get("/:id",(req,res) =>{
    res.send("hi");
});
//post
router.post("/",(req,res) =>{
    res.send("post");
});
//delete
router.delete("/:id",(req,res) =>{
    res.send("delete");
});

Module.exports =router;