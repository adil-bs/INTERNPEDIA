'use client'
import Analysis from "@/components/analysis";
import { weatherData } from "@/components/getWeatherData";
import { Highlight, exceptionKeys } from "@/components/highlight";
import { findDay } from "@/components/utility";
import { createContext, useEffect, useMemo, useState } from "react";

export const WeatherDataContext = createContext()

export default function Home() {
  const [data, setData] = useState()
  const [date, setDate] = useState(new Date().toDateString())
  
  useEffect(() => {
    async function getWeatherData(location ='kochi') {
    //   const res = await fetch('/api/weather?location='+location)
    //   const resData = await res.json()
      
    //   if (res.status !== 200) {
    //     throw {
    //       code:resData.code,
    //       message:resData.message,
    //       type:resData.type,
    //     }
    //   }
    //   setData(resData)
      setData(weatherData)
    }

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        ({coords:{latitude,longitude}}) => {          
          localStorage.setItem('WEATHERLOCATION',[latitude,longitude])
          return
        },
        (err) => {
          console.log('Error in getting coordinates !', err.message);
        },
      )
    }

    const location = localStorage.getItem('WEATHERLOCATION')
    getWeatherData(location)
  },[])

  const {graphDataForToday,todayDataWithMinMax, addOnDataForHighlight} = useMemo(()=>{
      const filteredData =  data?.timelines.hourly.filter(ele => (
          findDay(ele.time) === findDay(date)
      ))
      const graphDataForToday = filteredData?.map(ele =>( {
          time:new Date(ele.time).toLocaleString(undefined,{hour12:true,hour:"numeric"}),
          ...ele.values
      }))


      const todayDataWithMinMax = data?.timelines.daily
        .find(ele => findDay(ele.time) === findDay(date)) 
      


      const addOnDataForHighlight = {
        availableDates:data?.timelines.daily.map(ele => new Date(ele.time).toDateString()),
        location : data?.location,
      }

      return {graphDataForToday,todayDataWithMinMax,addOnDataForHighlight}
  },[data,date])

  return (
    <WeatherDataContext.Provider value={{graphDataForToday,todayDataWithMinMax,date,setDate}} >
    <main className="flex flex-col min-h-screen p-3 pb-5 bg-gradient-to-tr from-indigo-400 via-blue-300 to-blue-200">
      {data ?
        <>
          <Highlight addOnData={addOnDataForHighlight}/>
          <Analysis/>
        </>
      :
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-4xl">Loading...</p>
        </div>
      }
    </main>
    </WeatherDataContext.Provider>    
  );
}
