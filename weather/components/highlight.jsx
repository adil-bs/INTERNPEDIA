import { WeatherDataContext } from '@/app/page'
import { ButtonBase, Card, Divider, Grid, MenuItem, Select, Tab, Tabs, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useContext, useMemo, useState } from 'react'
import { weatherCode, weatherUnits } from './utility'
import { Edit } from '@mui/icons-material'

export const exceptionKeys = ['weatherCodeMax','windDirectionAvg','moonriseTime','moonsetTime','sunriseTime','sunsetTime']

const mainWeatherHighlights = [
  {param:'temperature',displayParam:'Temperature',},
  {param:'humidity',displayParam:'Humidity',},
  {param:'precipitationProbability',displayParam:'Precipitation',},
  {param:'rainIntensity',displayParam:'Rain Intensity',},
  {param:'windSpeed',displayParam:'Wind Speed',},
  {param:'windGust',displayParam:'Wind Gust',},
]

  
export const Highlight = (props) => {
  const {addOnData:{availableDates,location}} = props
  const {todayDataWithMinMax,date,setDate} = useContext(WeatherDataContext)
  const [precisionType,setPrecisionType] = useState('Avg')

  const todayData = useMemo(()=>{
    
    let todayData = {time: todayDataWithMinMax.time,values:{}}
        
    Object.keys(todayDataWithMinMax.values).forEach(ele =>{ 
      if (ele.endsWith(precisionType) || exceptionKeys.includes(ele) ){
        const newKey = exceptionKeys.includes(ele) ? ele :ele.replace(precisionType,'')
        todayData.values[newKey] = todayDataWithMinMax.values[ele]
      }
    })

    return todayData
  },[precisionType,date])
  
  const dateFormatter = (date) => new Date(date).toLocaleDateString('en-IN',{weekday:"short",day:"numeric",month:"short"})
  

  return (
    <Card className='flex items-center flex-col p-5 md:w-5/6 md:self-center lg:max-w-4xl'>
      <ButtonBase>
        <p className='flex items-center gap-2 text-center text-lg rounded-lg backdrop-brightness-90 p-2'>
          {location.name}
        </p>  
        {/* <TextField 
          defaultValue={location.name} 
          variant='filled'
        /> */}
      </ButtonBase>

      <div className='my-2 '>
        <Select
          value={date} 
          onChange={(e)=>setDate(e.target.value)}
          variant='standard'
          disableUnderline
          MenuProps={{disableAutoFocusItem:true}}
          sx={[
            {'& .MuiSelect-select':{fontWeight:600,marginTop:1,fontSize:22,padding:1}},
          ]}
        >
          {availableDates.map(ele => <MenuItem key={ele} value={ele}>{dateFormatter(ele)}</MenuItem>)}
        </Select>
      </div>
      

      <div className='flex items-center self-stretch mb-6 max-sm:flex-col max-sm:gap-5'>
        <div className='relative h-40 sm:flex-1  max-sm:w-full max-sm:mr-36'>
          <Image 
            src={`/weatherIcons/${todayData.values.weatherCodeMax}@2x\.png`} 
            style={{ objectPosition: '70% 0%',objectFit:"contain" }}
            fill 
            sizes="50vw"
            alt={weatherCode[todayData.values.weatherCodeMax]}
            priority
          />
        </div>
        <div className='flex-1'>
          <p className='text-5xl md:text-6xl'>{todayData.values.temperature} °C</p>
          <p className='text-xl'>Feels like {todayData.values.temperatureApparent} °C</p>  
          <p className='text-3xl mt-1'>{weatherCode[todayData.values.weatherCodeMax]}</p>
        </div>  
      </div>


      <Tabs 
        className='self-start'
        value={precisionType} 
        onChange={(_,newVal) => setPrecisionType(newVal)}
      >
        <Tab value={'Avg'} label='Average'/>
        <Tab value={'Min'} label='Minimum'/>
        <Tab value={'Max'} label='Maximum'/>
      </Tabs>
      <Divider sx={{marginBottom:2,}}/>

      <Grid container spacing={2}>

        {mainWeatherHighlights.map(ele =>( 
          <SubHighlight 
            key={ele.param}
            value={todayData.values[ele.param]} 
            param={ele.param}
            displayParam={ele.displayParam}
          />
        ))}

      </Grid>

    </Card>
  )
}

export function SubHighlight(props) {
  const {value, param, displayParam, } = props
  return(
    <Grid item xs={4} >
    <div className={'border-[3px] border-sky-600 p-3 rounded-lg backdrop-brightness-95 '}>
      <p className=' font-semibold sm:text-2xl text-lg'>{value} {weatherUnits[param]}</p>
      <p className='text-nowrap max-sm:text-sm'>{displayParam}</p>
    </div>    
    </Grid>
  )
}