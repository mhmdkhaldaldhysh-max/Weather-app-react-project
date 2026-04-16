import './App.css';
import {createTheme,ThemeProvider} from "@mui/material/styles"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import moment from 'moment/moment';
import "moment/min/locales"
import { useTranslation } from 'react-i18next'; 
import { useSelector,useDispatch } from 'react-redux';
import { fetchWeather } from './weatherApiSlice';
import CircularProgress from '@mui/material/CircularProgress';
moment.locale("ar");

const theme=createTheme({

  typography:{

    fontFamily:["IBM"]
  }
})

function App() {

const dispatch=useDispatch()

const isLoad=useSelector((state)=>{

   return state.weather.isLoading

})

const temp=useSelector((state)=>{

return state.weather.weather

})

const { t, i18n } = useTranslation();
const [dateTime,setDateTime]=useState("")
const [locale,setLocale]=useState("ar") 

const direction=locale=="ar" ? "rtl" : "ltr"

  function handleLanguageClick(){
   
    if(locale=="ar"){

      setLocale("en")
      i18n.changeLanguage("en")
      moment.locale("en");

    }else{

      setLocale("ar")
      i18n.changeLanguage("ar")
      moment.locale("ar");
    }

    setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
  }

useEffect(()=>{

     dispatch(fetchWeather())

     i18n.changeLanguage(locale)
},[])

useEffect(()=>{

  setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
},[])

  return (
  <div className="App">
    
     <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <div class="container-content" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column"}}>

          <div class="card" style={{width:"100%",color:"white",background:"rgba(0, 0, 255, 0.5)",padding:"10px",borderRadius:"10px",boxShadow:"0 10px 10px rgba(0, 0, 0, .05)"}} dir={direction}>

            <div class="card-content">

              <div class="city&date" style={{display:"flex",alignItems:"end"}}>
                  <Typography variant="h2" style={{marginRight:"20px"}}>
                         {t("Riadh")}
                  </Typography>

                   <Typography variant="h5" style={{marginRight:"20px"}}>
                      {dateTime}
                  </Typography>

              </div>
              <hr/>

              <div class="icon&temp" style={{display:"flex",justifyContent:"space-around"}}>
                
                <div class="degree&disc">
                 
                  <div class="temp" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      
                    {isLoad ? <CircularProgress style={{color:"white"}}/> : ""}

                   <Typography variant="h1">
                         {temp.number}
                   </Typography>

                   <img src={temp.icon}/>
 
                  </div>
                    
                   <Typography variant="h6">
                       {t(temp.description)}
                   </Typography>
                     
                     <div class="degreeType" style={{display:"flex",alignItems:"center"}}>
                      
                      <h5>{t("min")} : {temp.min}</h5>
                      <h5 style={{margin:"0 5px"}}>|</h5>
                      <h5>{t("max")} : {temp.max}</h5>

                     </div>
                 
                </div>
               
                  <CloudIcon style={{fontSize:"200px"}}/>
                
              </div>
            </div>
          </div>

            <div dir={direction} style={{display:"flex",justifyContent:"end",width:"100%",marginTop:"20px"}}>
               <Button variant="text" style={{color:"white"}} onClick={handleLanguageClick}>{locale=="en" ? "Arabic" : "انجليزي"}</Button>
            </div>

         </div>

      </Container>
     </ThemeProvider>
  </div>
  );
}

export default App;