export const getuser = (res) =>{
  return{
    type: 'GET_USER', 
    payload: {user: res.data.user}
  }
}

export const loggedIn = () =>{
  return{
    type: 'LOGIN'
  }
}