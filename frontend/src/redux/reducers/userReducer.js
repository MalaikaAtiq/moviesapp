const initialState = {
  user: {},
  isLoggedIn: false
}

const userReducer = (state=initialState, action) =>{
  switch(action){
    case 'GET_USER':
      return {
        ...state, user: action.payload.user
      }
    case 'LOGIN': 
    return {
      ...state, isLoggedIn: true
    }
    default: 
    return state
  }
}

export default userReducer
