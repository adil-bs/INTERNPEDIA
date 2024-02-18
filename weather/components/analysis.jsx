import { WeatherDataContext } from '@/app/page';
import { Card, Divider, IconButton, MenuItem, Select, Tab, Tabs, TextField } from '@mui/material'
import React, { useContext, useMemo, useState } from 'react'
import CustomLineChart from './customLineChart';
import { camelToCapital, capitalize, findDay, weatherUnits } from './utility';
import { exceptionKeys } from './highlight';
import Details from './details';
import { ArrowDropDown, Download } from '@mui/icons-material';

export function SelectParams(props) {
    const {value, onChange, paramsList} = props
    const [open, setopen] = useState(false)
    return(
        <Select 
            {...{value,onChange}} 
            open={open} 
            onClose={()=>setopen(false)} 
            IconComponent={()=>
                <IconButton onClick={()=>setopen(true)}><ArrowDropDown/></IconButton>
            }
            variant='standard'
            disableUnderline
        >
            {paramsList?.map(ele => 
                <MenuItem key={ele} value={ele}>{camelToCapital(ele)}</MenuItem>
            )}
        </Select>
    )
}

export default function  Analysis() {
    const {graphDataForToday} = useContext(WeatherDataContext)
    const [category, setCategory] = useState('params')
    const [param, setParam] = useState('temperature')

    // const {graphDataForToday} = useMemo(()=>{
    //     const filteredData =  data.timelines.hourly.filter(ele => (
    //         findDay(ele.time) === findDay(date)
    //     ))
    //     const graphDataForToday = filteredData.map(ele =>( {
    //         time:new Date(ele.time).toLocaleString(undefined,{hour12:true,hour:"numeric"}),
    //         ...ele.values
    //     }))
    //     return {graphDataForToday}
    // },[date])

  return (
    <Card className=' flex mt-5 flex-col p-5 md:w-5/6 md:self-center lg:max-w-4xl'>
        <Tabs
            value={category}
            onChange={(_,val) => setCategory(val)}    
            variant='scrollable'
        >
            <Tab value={'params'} label={
                <SelectParams 
                    value={param} 
                    onChange={(e)=>setParam(e.target.value)}
                    paramsList={Object.keys(weatherUnits )}
                />
            }/>
            <Tab value={'details'} label='Details'/>    
        </Tabs>    
        <Divider sx={{marginBottom:2,}}/>

        <div 
            role='tabpanel'
            hidden={category !== 'params'}
            className=' overflow-x-scroll customscroll'
        >
            {category === 'params' &&
                <CustomLineChart {...{param,graphDataForToday}}/>  
            }
        </div>
        <div 
            role='tabpanel'
            hidden={category !== 'details'}
        >
            {category === 'details' &&
                <Details {...{graphDataForToday}}/>  
            }
        </div>
    </Card>
  )
}

