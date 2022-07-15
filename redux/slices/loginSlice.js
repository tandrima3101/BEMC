import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLogin : false,
    token : ''
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers : {
        setlogin : (state,action) =>{
            state.isLogin = action.payload
        },

        setToken : (state,action) => {
            state.token = action.payload
        }
    }
})

export const {setlogin,setToken} = loginSlice.actions;
export default loginSlice.reducer;