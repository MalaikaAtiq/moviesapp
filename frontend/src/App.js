//style imports
import './App.css'

//image imports 
import screens from './assets/images/login.png'
import logo from './assets/images/custom-1.png'
import google from './assets/images/google-icon.svg'
import github from './assets/images/GitHub-Mark.png'
import { loggedIn, setuser } from './redux/actions/userAction'

//module imports 
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'


function App (){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getGithubUser = async(code) =>{
    try{
      const response = await axios.post('http://localhost:5000/user/auth/github', { code: code })
          console.log(response)
          localStorage.setItem('accessToken', response.data.accessToken)
          dispatch(setuser(response.data.user))
          dispatch(loggedIn())
          navigate('/dashboard')
    }catch(err){
      console.log(err.message)
      setErrorMessage(err.response.data.msg)
    }
  }

  useEffect(()=>{
      const urlParams = new URLSearchParams(new URL(window.location.href).search)
      const code = urlParams.get("code")
      console.log(code) 

      if(code){
        getGithubUser(code)
      }
  },[])



  const login = async(e) =>{
    e.preventDefault();
    try{  
      const response = await axios.post('http://localhost:5000/user/login', {email: email, password: password})
      console.log(response.data.user)
      localStorage.setItem('accessToken', response.data.accessToken)
      dispatch(setuser(response.data.user))
      dispatch(loggedIn())
      navigate('/dashboard')
    }catch(err){
      console.log(err.message)
      setErrorMessage(err.response.data.msg)
    }
    
  }

  const getGoogleUser = async(codeResponse) =>{
  try{
    console.log(codeResponse)
    const response = await axios.post('http://localhost:5000/user/auth/google', {accessToken: codeResponse.access_token})
    console.log("New access token: ", response.data.accessToken)
    console.log(response.data.user)
    localStorage.setItem('accessToken', response.data.accessToken)
    dispatch(setuser(response.data.user))
    dispatch(loggedIn())
    navigate('/dashboard')
  }catch(err){
    console.log(err.response.data.msg)
    setErrorMessage(err.response.data.msg)
  }
}



  const signInWithGoogle = useGoogleLogin({
    onSuccess: codeResponse => getGoogleUser(codeResponse),
    onError: ()=> console.log("Login Failed")
  })

  const signInWithGithub = async() =>{
    try{
      window.location.href = `https://github.com/login/oauth/authorize?client_id=1fa1bb65f74d50f74670&redirect_uri=http://localhost:3000&scope=user,user:email`;
    }catch(err){
      console.log(err.message)
    }    
  }

  return (
    <div className="App">
      <div className="main">

      <div className="side-image">
          <div className="logo">
          <img src={logo} alt="" /> 
          </div>
          <div className="screens">
          <img src={screens} alt="" />
          </div>
          <h2> Fast, Efficient and Productive </h2>
          <p> In this kind of post, the blogger introduces a person they’ve interviewed and provides some background information about the interviewee and their work following this is a transcript of the interview. </p> 
        </div>



        <div className="signin">
          
          <h1> Sign In</h1>
          <p> Your Social Campaigns </p>
          <div className="social-login"> 
          <button className="google" onClick={() => signInWithGoogle()}> <img src={google} alt=""/> Sign in with Google </button>
          <button className="github" onClick={() => signInWithGithub()}> <img src={github} alt=""/> Sign in with Github </button>
          </div>

          <p> or with email </p>
          <form>
            <div>
            <p className='incorrect-password'> {errorMessage} </p>
            <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div>
            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <p className="forgotpassword"> <a href="/" > Forgot Password? </a></p>
            <button className="signin-btn" onClick={login}> Sign In</button>
          </form>
          <p className="signup"> Not a member yet? <a href="/"> Sign up</a></p>

        </div>
      </div>
    </div>
  );
}

export default App;




  
//  useEffect(()=>{
//   console.log("safuyeg")
// })

// const params = queryString.stringify({
//   client_id: '1fa1bb65f74d50f74670',
//   redirect_uri: 'http://localhost:5000/user/auth/github/',
//   scope: ['read:user', 'user:email'].join(' '), // space seperated string
//   allow_signup: true,
// });

  //const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;





       /* <GoogleLogin
            onSuccess={ async(credentialResponse) => {
              console.log(credentialResponse)
              await axios.get('http://localhost:5000/user/auth/google', {clientId: credentialResponse.clientId, credential: credentialResponse.credential})
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          /> */

          /* <a href={githubLoginUrl}> Login with github</a> */