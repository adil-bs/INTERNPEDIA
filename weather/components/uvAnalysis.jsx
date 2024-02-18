import { WeatherDataContext } from '@/app/page'
import { Chip, Slider } from '@mui/material'
import React, { useContext, useMemo } from 'react'
import { Content404 } from './content404'

export function UVAnalysis ({type,value,concernId}) {
    const {todayDataWithMinMax:weatherData,date} = useContext(WeatherDataContext)

    const {concern,concernColor}= useMemo( () => {
        if (concernId>=0 && concernId<=2) return {concern:'Low',concernColor:'green'}
        else if (concernId>=3 && concernId<=5) return {concern:'Moderate',concernColor:'yellow'}
        else if (concernId>=6 && concernId<=7) return {concern:'High',concernColor:'orange'}
        else if (concernId>=8 && concernId<=10) return {concern:'Very High',concernColor:'red'}
        else if (concernId>=11) return {concern:'Extreme',concernColor:'darkred'}
        else return {concern:undefined,concernColor:undefined}
    },[weatherData,date])

  return (
    concernColor &&
    <div>
        <div className='flex gap-3 mb-3 items-center'>
            <Chip label={type}/>
            <p>UV health concern  </p>    
            <Chip
                label={concern}
                sx={[
                    {'& .MuiChip-label':{
                        fontWeight:600,
                        color:concernColor,
                    }},
                ]}
            />
        </div>
            
        <Slider
            value={value}
            track={false}
            min={0}
            max={12}
            // marks={uvMarks}
            disabled
            // slots={{valueLabel:UVThumb}}
            valueLabelDisplay='on'
            sx={[
                {'& .MuiSlider-rail':{
                    background:'linear-gradient(to right,green 17%,yellow 42%,orange 59%,red 84%,black 100%)',
                    height:8,
                }},
                {'& .MuiSlider-thumb':{
                    height:20,
                    width:20,
                    borderRadius:0,
                    marginTop:3,
                    rotate:'45deg',
                    marginLeft:-1,
                    background:`linear-gradient(to bottom right,${concernColor} 50%, transparent 10%)`,
                }},
                {'& .MuiSlider-valueLabel':{
                    backgroundColor:'inherit',
                    rotate:'-45deg',
                    fontWeight:600,
                    color:concernColor,
                    margin:'0px 0px 0px 10px'
                }}
            ]}
        />
    </div>
  )
}
