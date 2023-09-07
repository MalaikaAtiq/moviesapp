import jwt from 'jsonwebtoken'

export const isAuthenticated = (req,res,next) =>{
  try{
    let token = req.get('Authorization')
    if(!token)
      return res.status(401).json({ msg: "Token not found."})
    token = token.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_SECRET)
    next()
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

export const verifyRefreshToken = (user_id, refreshToken) =>{
  try{
    const decoded_token = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    return decoded_token.user._id === user_id 
  }catch(err){
    return false
  }
}