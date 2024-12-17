/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TaskDashboard() {
  const priorityData = [
    { label: "high", color: "bg-rose-600" },
    { label: "medium", color: "bg-yellow-300" },
    { label: "low", color: "bg-green-500" }
  ];

  const PriorityChart = () => {
    // Sample data - replace with your actual data
    const data = [
      {
        priority: 'High',
        completed: 8,
        total: 10,
        color: '#dc2626' // rose-600
      },
      {
        priority: 'Medium',
        completed: 12,
        total: 15,
        color: '#fcd34d' // yellow-300
      },
      {
        priority: 'Low',
        completed: 5,
        total: 8,
        color: '#22c55e' // green-500
      }
    ];
  
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const { priority, completed, total } = payload[0].payload;
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg border">
            <p className="font-bold text-gray-800">{priority} Priority</p>
            <p className="text-gray-600">
              Completed: {completed} out of {total} tasks
            </p>
            <p className="text-gray-600">
              Completion Rate: {((completed / total) * 100).toFixed(1)}%
            </p>
          </div>
        );
      }
      return null;
    };
  
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart 
            data={data} 
            layout="vertical"
          >
            <XAxis 
              type="number"
              tick={{ fill: '#374151' }}
            />
            <YAxis 
              type="category"
              dataKey="priority"
              tick={{ fill: '#374151' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="total" 
              fill="#e5e7eb" 
              radius={[0, 4, 4, 0]}
            />
            <Bar 
              dataKey="completed" 
              fill={(data) => data.color}
              radius={[0, 4, 4, 0]}
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
        <div className="items-center h-max w-[21rem]">
          <h1 className="font-light text-2xl">total tasks</h1>
          <p className="font-bold text-[17rem]">10</p>
        </div>
        <div className="flex shrink-0 bg-accent rounded-full h-full w-1" />
        <div className="flex flex-col items-start my-auto text-base">
          <div>tasks priotity</div>
          <div className="flex flex-col self-stretch pl-4 mt-6 w-full font-light whitespace-nowrap">
            <PriorityChart />
          </div>
          <div className="mt-7 text-lg">tasks accomplishment</div>
          <TaskMetrics missed={10} due={10} completed={10} />
        </div>
      </div>
    </div>
  );
}