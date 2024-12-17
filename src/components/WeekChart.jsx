/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CustomTooltip from './CustomTooltip';

function WeekChat({ active, payload }) {

  const data = [
    { day: 'Sun', percentage: 100 },
    { day: 'Mon', percentage: 80 },
    { day: 'Tue', percentage: 45 },
    { day: 'Wed', percentage: 90 },
    { day: 'Thu', percentage: 70 },
    { day: 'Fri', percentage: 55 },
    { day: 'Sat', percentage: 30 }
  ];



  return (
    <div className="w-full h-96 bg-white rounded-lg my-20">
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          
          <XAxis 
            className='font-bold'
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#0190F8' }}
          />
          <YAxis 
            
            unit="%" 
            ticks={[0,50,100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#0190F8' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} animationDuration={100}  />
          <Bar
            dataKey="percentage"
            fill="#0190F8"
            radius={[4, 4, 0, 0]}
            background={{ fill: '#83CFFF' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  
}

export default WeekChat;