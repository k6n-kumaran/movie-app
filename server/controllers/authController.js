import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req,res) => {

    try {
        const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message : "All fields are required"})
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({email})

    if(existingUser) return res.status(400).json({message : "User already exists"})

    const hashedPassword = await bcrypt.hash(password,11)

    const newUser = new User({username,email,password : hashedPassword})
    await newUser.save()

    res.status(201).json({message : "User created successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
    
}

export const login = async (req,res) => {

    try {
        const email = req.body.email?.toLowerCase();

        const {password} = req.body
    
    if(!email || !password) {
       return res.status(400).json({success : false,message : "All fields are required"})
    }

    const user = await User.findOne({email})

    if(!user) return res.status(400).json({success : false,message : "User does not exist"})

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid) return res.status(400).json({success : false,message : "Invalid credentials"})

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : '1d'})

    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({success : true,token,user: userData})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
   
}

export const logout = async (req,res) => {
    
}

