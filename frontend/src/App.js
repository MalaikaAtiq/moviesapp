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
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'


function App (){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = async(e) =>{
    e.preventDefault();
    try{  
      const response = await axios.post('http://localhost:5000/user/login', {email: email, password: password})
      console.log(response.data.user)
      localStorage.setItem('accessToken', response.data.accessToken)
      dispatch(setuser(response.data.user))
      dispatch(loggedIn())
    }catch(err){
      console.log(err.message)
    }
    
  }

  const getAccessToken = async(codeResponse) =>{
    console.log(codeResponse)
    const response = await axios.post('http://localhost:5000/user/auth/google', {accessToken: codeResponse.access_token})
    console.log("New access token: ", response.data.accessToken)
    console.log(response.data.user)
    localStorage.setItem('accessToken', response.data.accessToken)
      dispatch(setuser(response.data.user))
      dispatch(loggedIn())
  }

  const signInWithGoogle = useGoogleLogin({
    onSuccess: codeResponse => getAccessToken(codeResponse)
  })

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
          <button className="github"> <img src={github} alt=""/> Sign in with Github </button>
          </div>

          <p> or with email </p>
          <form>
            <div>
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