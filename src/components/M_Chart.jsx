/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const generateWeekDates = (startDate) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days.map((day, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    const totalTasks = Math.floor(Math.random() * 10) + 5;
    const completedTasks = Math.floor(Math.random() * (totalTasks - 1)) + 1;

    return {
      day,
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      totalTasks: totalTasks,
      completedTasks: completedTasks,
      remainingTasks: totalTasks - completedTasks
    };
  });
};

const TaskCompletionChart = ({ date }) => {
  const initialDate = date instanceof Date ? date : new Date();

  const [currentWeek, setCurrentWeek] = useState({
    start: new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate() - initialDate.getDay())
  });
  const [taskData, setTaskData] = useState(() => generateWeekDates(currentWeek.start));

  useEffect(() => {
    const validDate = date instanceof Date ? date : new Date();
    const weekStart = new Date(validDate.getFullYear(), validDate.getMonth(), validDate.getDate() - validDate.getDay());

    setCurrentWeek({ start: weekStart });
    fetchTaskData(weekStart);
  }, [date]);

  const fetchTaskData = async (weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const token = "YOUR_BEARER_TOKEN_HERE"; // Replace with your actual token

    try {
      const response = await fetch(`https://your-api-endpoint.com/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: weekStart.toISOString().split('T')[0],
          endDate: weekEnd.toISOString().split('T')[0]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch task data');
      }

      const data = await response.json();
      setTaskData(data);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  const goToNextWeek = () => {
    const newStart = new Date(currentWeek.start);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeek({ start: newStart });
    fetchTaskData(newStart);
  };

  const goToPreviousWeek = () => {
    const newStart = new Date(currentWeek.start);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeek({ start: newStart });
    fetchTaskData(newStart);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white text-black p-4 border rounded shadow-lg">
          <p className="font-bold">{data.day} ({data.date})</p>
          <div className="mt-2">
            <p>Total Tasks: {data.totalTasks}</p>
            <p>Completed Tasks: {data.completedTasks}</p>
            <p>Remaining Tasks: {data.remainingTasks}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const formatWeekRange = (start) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md relative">
      {/* Week Navigation - Top Right Corner */}
      <div className="absolute top-4 right-4 flex items-center z-10">
        <button 
          onClick={goToPreviousWeek} 
          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          <ChevronLeft 
            size={24} 
            className="text-black hover:text-blue-500"
          />
        </button>
        <span className="mx-2 text-sm font-semibold text-black">
          {formatWeekRange(currentWeek.start)}
        </span>
        <button 
          onClick={goToNextWeek} 
          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          <ChevronRight 
            size={24} 
            className="text-black hover:text-blue-500"
          />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={taskData}
          margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
          barSize={30}
        >
          <CartesianGrid 
            vertical={false} 
            horizontal={true} 
            stroke="#f0f0f0" 
          />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 'dataMax']} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={false}
          />

          {/* Completed Tasks Bar (Green) - Bottom of Stack */}
          <Bar 
            dataKey="completedTasks" 
            stackId="tasks"
            fill="green" 
            animationDuration={500}
          />

          {/* Remaining Tasks Bar (Blue) - Top of Stack */}
          <Bar 
            dataKey="remainingTasks" 
            stackId="tasks"
            fill="blue" 
            animationDuration={500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskCompletionChart;
