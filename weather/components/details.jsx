import { WeatherDataContext } from '@/app/page'
import { Box, Chip, Divider, Slider, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react'
import { UVAnalysis } from './uvAnalysis';
import { Content404 } from './content404';

const formatTime = (isoDate) => new Date(isoDate).toLocaleTimeString(undefined,{hour12:true,minute:'2-digit',hour:'2-digit'})

export function SunMoonTime(props){
    const {name,time} = props
    const imageMapper = {'Sunrise':1100,'Sunset':1101,'Moonrise':11001,'Moonset':11011}
    return(
        <div className=' font-semibold'>
            <Image src={`/weatherIcons/${imageMapper[name]}.png`} alt={name} height={40} width={40}/>
            <p>{name}</p>
            <p>{time}</p>
        </div>
    )
}

export function UVThumb ({children,ownerState,value,...other}){
    console.log(other);
    return(
        <div {...other}>
            {children}
            {value}
        </div>
    )
}


export default function Details () {
    const {todayDataWithMinMax:{values:data}} = useContext(WeatherDataContext)
    const notSmDevice = useMediaQuery((theme) => theme.breakpoints.up('sm'))
    const uvPrecisionType = [
        {precision:'Average',dataKey:'Avg'},
        {precision:'Minimum',dataKey:'Min'},
        {precision:'Maximum',dataKey:'Max'},
    ]
    const renderUvAnalysis = uvPrecisionType.map(ele => 
        <UVAnalysis 
            key={ele.precision}
            type={ele.precision} 
            value={data['uvIndex'+ele.dataKey]} 
            concernId={data['uvHealthConcern'+ele.dataKey]}
        />
    )
  return (
    <div className='md:flex'>

        <div className='flex-1 mt-2 mb-7'>
            <p className='text-2xl '>UV Index</p>
            {renderUvAnalysis.some(ele => ele.props.value) ?
                <div className='flex flex-col mt-5 gap-10'>
                    {renderUvAnalysis}
                </div>
            :
                <Content404/>
            }
        </div>

        <Divider orientation={notSmDevice? 'vertical':'horizontal'} className='p-3'/>

        <div className='flex-1 my-5'>
            <p className='text-2xl mb-4 sm:ml-5'>Sunrise and Moonrise</p>

            <div className='flex flex-col'>
                <div className='from-yellow-400 via-orange-400 to-orange-600 flex justify-center w-[40%] mr-6 aspect-[2] self-center rounded-t-full bg-gradient-to-br'>
                    <div className='mt-2 w-[95%] aspect-[2] self-center rounded-[inherit] bg-gradient-to-tr from-[#90CAF9] via-[ #81D4FA] to-[#81D4FA] bg-[linear-gradient(to top right, #90CAF9, #81D4FA, #B2EBF2)]'/>
                </div>
                <div className='flex justify-evenly'>
                    <SunMoonTime name='Sunrise' time={formatTime(data.sunriseTime)}/>
                    <SunMoonTime name='Sunset' time={formatTime(data.sunsetTime)}/>
                </div>
            </div>
            

            <div className='flex flex-col-reverse mt-8'>
                <div className=' from-neutral-600 via-gray-600 to-yellow-600 rotate-180 flex justify-center w-[40%] mr-6 aspect-[2] self-center rounded-t-full bg-gradient-to-br'>
                    <div className='mt-2 w-[95%] aspect-[2] self-center rounded-[inherit] bg-gradient-to-tr from-[#90CAF9] via-[ #81D4FA] to-[#81D4FA] bg-[linear-gradient(to top right, #90CAF9, #81D4FA, #B2EBF2)]'/>
                </div>
                <div className='flex justify-evenly'>
                    <SunMoonTime name='Moonrise' time={formatTime(data.moonriseTime)}/>
                    <SunMoonTime name='Moonset' time={formatTime(data.moonsetTime)}/>   
                </div>
            </div>

        </div>

    </div>
  )
}
