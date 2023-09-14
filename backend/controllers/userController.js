import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import queryString from 'query-string'
import { verifyRefreshToken } from "../auth/auth.js"

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
        res.status(500).json({ msg: "The password you entered is incorrect. Try again" })
      }
    }
    else {
      res.status(500).json({ msg: "The email you entered is incorrect. Try again." })
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
   const access_token = req.body.accessToken
   const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    const userData = await response.json()
    let user = await userModel.findOne({email: userData.email})
    console.log(user)
    if(!user)
      user = await userModel.create({ email: userData.email, name: userData.name })
    if(user.password){
      res.status(500).json({msg: "There is already an account associated with this email."})
    }
    else{
      const accessToken = jwt.sign({ user_id: user._id}, process.env.ACCESS_SECRET, {expiresIn: "10m"})
      const refreshToken = jwt.sign({ user_id: user._id}, process.env.REFRESH_SECRET, { expiresIn: "15m" })
      res.status(200).json({ accessToken, refreshToken, user })
    }
  }catch(err){
    return res.status(500).json({ msg: err.message })
  }
}

export const githubSignin = async(req,res)=>{
  try{
    console.log("I AM REQ.BODY.CODE: " +req.body.code)
    await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.body.code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) =>  response.text() )
    .then(async(paramsString) => {
      console.log(paramsString)
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");
      console.log(access_token)
      
      await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${access_token}`
      }
    }).then(async(responseUser) => {
      // console.log(await response.json())
      const userData = await responseUser.json()
      console.log(userData)
      await fetch('https://api.github.com/user/emails', {
        method: 'GET',
        headers: {
          'Content-Type': 'applications/json',
          'Authorization': `token ${access_token}`
        }
      }).then(async(responseUserEmail)=>{
        const userEmail = await responseUserEmail.json()
        let user = await userModel.findOne({email: userEmail[0].email})
        if(!user)
          user = await userModel.create({ email: response[0].email, name: userData.name })
        if(user.password){
          res.status(500).json({msg: "There is already an account associated with this email."})
        }
        else{
          const accessToken = jwt.sign({ user_id: user._id}, process.env.ACCESS_SECRET, {expiresIn: "10m"})
          const refreshToken = jwt.sign({ user_id: user._id}, process.env.REFRESH_SECRET, { expiresIn: "15m" })
          res.status(200).json({ accessToken, refreshToken, user })
        }
      })
    })
    })
    
  }catch(err){
    console.log(err.message)
    return res.status(500).json({ msg: err.message})
  }
}
