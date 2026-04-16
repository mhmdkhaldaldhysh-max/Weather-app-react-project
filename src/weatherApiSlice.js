import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchWeather= createAsyncThunk("WeatherApi/fetchWeather",async()=>{

const response=await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c10800b736ee3616a5e587af40d97895"
//     ,{

//     cancelToken : new axios.CancelToken((c)=>{

//       axiosCancel=c

//     })

//   }
)

    const number=Math.round(response.data.main.temp - 272.15)
    const min=Math.round(response.data.main.temp_min - 272.15)
    const max=Math.round(response.data.main.temp_max - 272.15)
    const description=response.data.weather[0].description
    const responseIcon=response.data.weather[0].icon

    return {number,min,max,description,icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`}

}) 

const weatherApiSlice=createSlice({

name:"weatherApi",

initialState:{

    isLoading:false,
    weather:{}
},

extraReducers(builder){

builder.addCase(fetchWeather.pending,(state,action)=>{

    state.isLoading=true

}).addCase(fetchWeather.fulfilled,(state,action)=>{

    state.isLoading=false
    state.weather=action.payload

}).addCase(fetchWeather.rejected,(state,action)=>{

    state.isLoading=false
})

}
})

export default weatherApiSlice.reducer