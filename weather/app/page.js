'use client'
import Analysis from "@/components/analysis";
import { weatherData } from "@/components/getWeatherData";
import { Highlight } from "@/components/highlight";
import { createContext, useEffect, useState } from "react";

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
  return (
    data &&
    <WeatherDataContext.Provider value={{data,date,setDate}} >
    <main className="flex flex-col min-h-screen p-3 bg-gradient-to-tr from-indigo-400 via-blue-300 to-blue-200">
      <Highlight />
      <Analysis/>
    </main>
    </WeatherDataContext.Provider>
  );
}
