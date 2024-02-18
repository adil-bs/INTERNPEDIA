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
    async function getWeatherData() {
      // const res = await fetch('/api/weather?location=')
      // const resData = await res.json()
      
      // if (res.status !== 200) {
      //   throw {
      //     code:resData.code,
      //     message:resData.message,
      //     type:resData.type,
      //   }
      // }
      // setData(resData)
      setData(weatherData)
    }
    getWeatherData()
  },[])

  const {graphDataForToday,todayDataWithMinMax} = useMemo(()=>{
      const filteredData =  data?.timelines.hourly.filter(ele => (
          findDay(ele.time) === findDay(date)
      ))
      const graphDataForToday = filteredData?.map(ele =>( {
          time:new Date(ele.time).toLocaleString(undefined,{hour12:true,hour:"numeric"}),
          ...ele.values
      }))
      const todayDataWithMinMax = data?.timelines.daily
        .find(ele => findDay(ele.time) === findDay(date)) 

      return {graphDataForToday,todayDataWithMinMax}
  },[data,date])

  
  const addOnDataForHighlight = useMemo(()=>{
    const availableDates = data?.timelines.daily.map(ele => new Date(ele.time).toDateString())
    const location = data?.location
    return {availableDates,location}
  },[data])

  return (
    data &&
    <WeatherDataContext.Provider value={{graphDataForToday,todayDataWithMinMax,date,setDate}} >
    <main className="flex flex-col min-h-screen p-3 pb-5 bg-gradient-to-tr from-indigo-400 via-blue-300 to-blue-200">
      <Highlight addOnData={addOnDataForHighlight}/>
      <Analysis/>
    </main>
    </WeatherDataContext.Provider>
  );
}
