const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {generateToken} = require("../config/jwtToken")


const createUser = asyncHandler(async (req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        throw new Error ("User already exists")
    }
});

const loginUserCtrl = asyncHandler(async (req,res) =>{
    const {email,password} = req.body;
    //check if user exists or not
    const findUser = await User.findOne({email:email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    }else{
        throw new Error("Invalild Credentials")
    }
});

// UPDATE A USER
const updateUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const updatedUser = await User.findByIdAndUpdate(id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body.email,
                mobile: req?.body.mobile
            },

            {
                new: true
            }

        );
        res.json(updatedUser)
    }catch(error){
        throw new Error(error)
    }
});



// GET ALL USER
const getAllUsers = asyncHandler(async (req,res)=>{
    try{
        const getUsers = await User.find()
        res.json(getUsers)
    }catch(error){
        throw new Error(error)
    }
});

// GET A SINGLE USER
const getUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const getUser = await User.findById(id)
        res.json(getUser)
    }catch(error){
        throw new Error(error)
    }
});

// DELETE A USER
const deleteUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id)
        res.json(deletedUser==null?"User Does not Exists":deletedUser)
    }catch(error){
        throw new Error(error)
    }
});


module.exports = {createUser,loginUserCtrl,getAllUsers,getUser,deleteUser,updateUser};