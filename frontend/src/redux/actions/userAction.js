export const setuser = (user) =>{
  return{
    type: 'SET_USER', 
    payload: {user: user}
  }
}

export const loggedIn = () =>{
  return{
    type: 'LOGIN'
  }
}