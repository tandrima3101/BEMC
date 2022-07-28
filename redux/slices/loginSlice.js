import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLogin : false,
    token : '',
    userId:null
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers : {
        setlogin : (state,action) =>{
            state.isLogin = action.payload
        },
        setUserId : (state,action) =>{
            state.userId = action.payload
        },

        setToken : (state,action) => {
            state.token = action.payload
        }
    }
})

export const {setlogin,setToken,setUserId} = loginSlice.actions;
export default loginSlice.reducer;