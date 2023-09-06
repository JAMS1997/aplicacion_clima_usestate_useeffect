import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm"
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css'
import Loading from "./loading";

export default function WheaterApp(){
    const [weather,setWeather] = useState(null);
    // resive un callback o funcion flecha 
    //Recibe dos parametros
    //1. la funcion callback 2 arreglo de dependencias
    useEffect(()=>{
        loadInfo()
        //si dejamos eel arreglo vacio nuestro
        //useEffect se va ejecutar una sola vez cuando se renderiza el componente
    },[]);

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ''}`;
    },[weather])

    async function loadInfo(city = "london"){
        try{
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            const json = await request.json()


            setTimeout(()=>{
                setWeather(json);
            },2000);
            setWeather(json);
            console.log(json)
        }catch (error){

        }
    }

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return(
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleChangeCity}/>
            {/* Si no tenemos datos del clima mostraremos loading*/}
            {weather?<WeatherMainInfo weather={weather}/>: <Loading/>}
                
           
        </div>
    )
}