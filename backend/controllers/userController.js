import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyRefreshToken } from "../auth/auth.js"
import { OAuth2Client } from 'google-auth-library'

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.uid)
    return res.status(200).json(user)
  }
  catch (err) {
    return res.json({ msg: "Failed to fetch user." })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.uid)
    return res.status(200).json({ msg: "User deleted successfully." })
  }
  catch (err) {
    return res.status(500).json({ msg: "Failed to delete user." })
  }
}

export const updateUser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.uid, req.body)
    return res.status(200).json({ msg: "User updated successfully." })
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update user" })
  }
}

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body
    const encryptpassword = await bcrypt.hash(password, 10)
    const userExists = await userModel.findOne({ email: email })
    if (userExists) {
      return res.status(409).json({ msg: "There is a already an account associated with this email" })
    }
    const newUser = await userModel.create({ email, password: encryptpassword, name })
    res.status(200).json({ msg: "User created successfully! :)" })

  } catch (err) {
    return res.status(500).json({ msg: err.msg })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (isPasswordValid) {
        const accessToken = jwt.sign({ user_id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "10m" })
        const refreshToken = jwt.sign({ user_id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "15m" })
        res.status(200).json({ accessToken, refreshToken, user })
      }
      else {
        res.json({ msg: "Incorrect password." })
      }
    }
    else {
      res.json({ msg: "Incorrect email." })
    }

  } catch (err) {
    return res.status(500).json({ msg: "Failed to login." })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken
    const user_id = req.params.uid

    if (verifyRefreshToken(user_id, refreshToken)) {
      const user = await userModel.findById(user_id)
      const accessToken = jwt.sign({ user_id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "10m" })
      return res.json({ accessToken })
    }
    else {
      return res.json({ msg: "Invalid Token" })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

export const googleSignin = async (req, res) =>{
  try{  
    //console.log("clientid: " + req.body.clientId)
    //console.log("credential: " + req.body.credential)
    const {clientId, credential} = req.body
    const client = new OAuth2Client(clientId)
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
  })
  const payload = ticket.getPayload();
  console.log(payload)

  let user = await userModel.findOne({email: payload.email})
  console.log(user)
  if(!user)
    user = await userModel.create({ email: payload.email })
  const accessToken = jwt.sign({ user_id: user._id}, process.env.ACCESS_SECRET, {expiresIn: "10m"})
  const refreshToken = jwt.sign({ user_id: user._id}, process.env.REFRESH_SECRET, { expiresIn: "15m" })
  res.status(200).json({ accessToken, refreshToken })
  }catch(err){
    return res.status(500).json({ msg: err.message })
  }
}

export const githubSignin = (req,res)=>{
  try{

  }catch(err){
    return res.status(500).json({ msg: err.message})
  }
}
