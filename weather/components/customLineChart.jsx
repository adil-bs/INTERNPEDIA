import React from 'react'
import { capitalize, weatherUnits } from './utility';
import { Area, AreaChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { LineChart } from '@mui/x-charts';

export default function CustomLineChart (props) {
    const {param,graphDataForToday} = props
    console.log(graphDataForToday);
  return (
    graphDataForToday.length !==0 ? 
    // <LineChart
    //     sx={{
    //         '& .MuiAreaElement-series-Param': {
    //             backgroundColor:'linear-gradient(to bottom, #DAE7F3, #D4E9F2,#D5DDE2)'
    //         },
    //     }}
    //     className=''
    //     xAxis={[{
    //         dataKey:'time',
    //         scaleType: 'time',
    //         valueFormatter:(date) => date.getHours().toString() + 'hr',
    //         // min:0,
    //         // max:23,
    //     }]}
    //     series={[{
    //         id:'Param',
    //         dataKey:param,
    //         showMark: false,
    //         label:capitalize(param),
    //         valueFormatter:(val) => val + weatherUnits[param],
    //         area:true,
            
    //     }]}
    //     dataset={graphDataForToday}    
    //     height={300}
    //     width={1500}
    //     slotProps={{legend:{hidden:true},}}
    //     // slots={{legend:{hidden:true},}}
    // />
    <AreaChart height={400}  width={1300} data={graphDataForToday} margin={{top:25,bottom:25,right:15,left:-20}} >
        <XAxis 
            dataKey={'time'} 
            tickSize={0}
            tickMargin={15}
            fontSize={11}
        />
        <YAxis 
            fontSize={14}
            tickSize={0}
            padding={{bottom:40}}
            tickMargin={10}
        />
        <Area 
            type={'monotone'} 
            dataKey={param} 
            connectNulls
            strokeWidth={2}
            stroke="#8884d8" 
            fill="url(#grad)" 
        />

        <Tooltip 
            formatter={(val,name) => [val + weatherUnits[param], capitalize(name)]}
            contentStyle={{
                borderRadius:8,
                borderColor:'#8884d8',
                borderWidth:2,
                opacity:0.8,
                backgroundColor:'lightblue'
            }}
        />

        <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#8884d8" stopOpacity={0.5}/>
                <stop offset="85%" stopColor="#8884d8" stopOpacity={0.3}/>
            </linearGradient>
        </defs>
    </AreaChart>
    :
    <div className='flex h-80 text-gray-600 items-center justify-center text-3xl'>
        Data not Available !
    </div>
  )
}
