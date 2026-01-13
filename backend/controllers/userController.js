import bcrypt from 'bcryptjs'
import User from "../models/User.js"
import { genarateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'


//SignUp a new user
export const signup = async (req, res) => {
  try {
    const {fullName, email, password, bio} = req.body

    if(!fullName || !email || !password || !bio){
      return res.json({success:false, message:"Missing details"})
    }

    const exists = await User.findOne({email})
    if(exists) return res.json({success:false, message:"Account already exists"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({fullName, email, password: hashedPassword, bio})

    const token = genarateToken(user._id)

    const {password: _, ...safeUser} = user._doc

    res.json({success:true, userData: safeUser, token, message:"Account created"})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body

    const userData = await User.findOne({email})
    if(!userData) return res.json({success:false, message:"Invalid credentials"})

    const ok = await bcrypt.compare(password, userData.password)
    if(!ok) return res.json({success:false, message:"Invalid credentials"})

    const token = genarateToken(userData._id)
    const {password: _, ...safeUser} = userData._doc

    res.json({success:true, userData: safeUser, token})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}



// controller to check authonication of user


export const checkAuth = (req, res)=>{
    res.json({success: true, user: req.user})
}


// Controller to update user profile

export const updateProfile = async( req, res)=>{
    try {
        const {profilePic, bio, fullName} = req.body

        const userId  = req.user._id;


        let updateUser;

        if(!profilePic){
            updateUser = await User.findByIdAndUpdate(userId, {bio, fullName},
                {new: true}
            )
        }else {
            const upload = await cloudinary.uploader.upload(profilePic)

            updateUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName},
                {new: true}
            )
        }

        res.json({success: true, user: updateUser, message: "User profile updated successfully"})
    } catch (error) {
        console.log(error.message);
        
        res.json({success: false, message: error.message})
    }
}