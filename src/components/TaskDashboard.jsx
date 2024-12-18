/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const data = [
  {
    priority: 'High',
    notCompleted: 2,
    completed: 8,
    total: 10,
    colors: {
      completed: '#dc2626', // Strong red
      notCompleted: '#fca5a5' // Light red
    }
  },
  {
    priority: 'Medium',
    notCompleted: 3,
    completed: 12,
    total: 15,
    colors: {
      completed: '#f97316', // Strong orange
      notCompleted: '#fed7aa' // Light orange
    }
  },
  {
    priority: 'Low',
    notCompleted: 3,
    completed: 5,
    total: 8,
    colors: {
      completed: '#16a34a', // Strong green
      notCompleted: '#bbf7d0' // Light green
    }
  }
];

export default function TaskDashboard() {
  const formatDate = (date = new Date()) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const PriorityChart = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const { priority, completed, total, notCompleted } = payload[0].payload;
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg border">
            <p className="font-bold mb-2" style={{ color: payload[0].payload.colors.completed }}>
              {priority} Priority
            </p>
            <p className="text-gray-700">
              Completed: {completed} of {total} tasks
            </p>
            <p className="text-gray-700">
              Remaining: {notCompleted}
            </p>
            <p className="font-medium mt-1" style={{ color: payload[0].payload.colors.completed }}>
              {((completed / total) * 100).toFixed(1)}% Complete
            </p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="w-full h-[200px]">
        <ResponsiveContainer>
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 20, right: 20, bottom: 20, left: 70 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.2)"
              horizontal={false}
            />
            <XAxis 
              type="number"
              tick={{ fill: '#ffffff' }}
              axisLine={{ stroke: '#ffffff', strokeWidth: 1 }}
              tickLine={{ stroke: '#ffffff' }}
            />
            <YAxis 
              type="category"
              dataKey="priority"
              tick={{ fill: '#ffffff' }}
              axisLine={{ stroke: '#ffffff', strokeWidth: 1 }}
              tickLine={{ stroke: '#ffffff' }}
              width={60}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255,255,255,0.1)' }}
            />
            
            <Bar 
              dataKey="notCompleted" 
              stackId="a"
              fill={'blue'}
              isAnimationActive={false}
            />
            
            <Bar 
              dataKey="completed" 
              stackId="a"
              fill={'red'}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const TaskMetrics = ({ missed, due, completed }) => {
    return (
      <div className="flex gap-10 mt-3 ml-4 text-lg font-normal max-md:ml-2.5">
        <div>missed :{missed} </div>
        <div>due :{due} </div>
        <div className="basis-auto">completed :{completed} </div>
      </div>
    );
  };

  return (
    <div className="flex bg-bluemain flex-col p-7 mx-auto w-full h-full font-bold leading-none text-white rounded-xl max-md:px-5 max-md:mt-3.5 max-md:max-w-full">
      <div className="self-start text-8xl text-center">
        7 April 2025
      </div>
      <div className="flex shrink-0 w-full my-7 h-1 bg-accent rounded-full" />

      <div className="flex flex-wrap gap-8 h-full items-center">
        <div className="items-center  h-full w-max">
          <h1 className="font-light text-2xl">total tasks</h1>
          <p className="font-bold text-[13rem]">10</p>
        </div>
        <div className="flex bg-accent rounded-full h-full w-1" />
        <div className="flex flex-shrink flex-col items-start basis-2/3  h-full w-full my-auto text-base">
          <div>tasks priority</div>
          <PriorityChart data={data}></PriorityChart>
          <div className="mt-7 text-lg">tasks accomplishment</div>
          <TaskMetrics missed={10} due={10} completed={10} />
        </div>
      </div>
    </div>
  );
}
