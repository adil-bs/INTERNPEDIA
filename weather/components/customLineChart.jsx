import React from 'react'
import { capitalize, weatherUnits } from './utility';
import { Area, AreaChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { LineChart } from '@mui/x-charts';
import { Content404 } from './content404';

export default function CustomLineChart (props) {
    const {param,graphDataForToday} = props
  return (
    graphDataForToday.length !==0 ? 
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

    <Content404/>
  )
}
