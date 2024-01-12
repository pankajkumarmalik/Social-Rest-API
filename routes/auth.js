const route= require("express").Router();
const User= require("../model/User");
const bcrypt= require("bcrypt");


//REGISTER
route.post("/register",async(req,res)=>{
    
try{
//create new bcrypt password
const salt= await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(req.body.password, salt);

//create new user
const newUser= await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword

});

//save new user in DB
const user= await newUser.save();
res.status(200).json(user);
}
catch(err){
    res.status(500).json(err)
}
       
});



//LOGIN
route.post("/login", async (req, res)=>{

    try{
    const user= await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json("user not found");
    }

    const validPassword= await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send("Wrong Password");
    } 

    res.status(200).json(user);
    }catch(err){
         res.status(500).json(err)
         console.log(err)
    }
    
})


module.exports= route;