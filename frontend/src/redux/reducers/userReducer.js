const initialState = {
  user: {},
  isLoggedIn: false
}

const userReducer = (state=initialState, action) =>{
  switch(action.type){
    case 'SET_USER':
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
