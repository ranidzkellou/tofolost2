/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AlertCircle } from 'lucide-react';


const DataCard = ({ total = 25, completed = 11, title = "Les tâches en retard" }) => {
  const percentage = Math.round((completed / total) * 100);

  return (

    <div className="bg-bluemain text-white p-3 rounded-2xl w-72 ">
    <div className="">
      <div className="bg-red-500 inline-block p-2 rounded-xl">
        <AlertCircle size={30} />
      </div>
    </div>
    
    <h2 className="text-lg font-normal">
      {title}
    </h2>
    
    {/* Progress Numbers */}
    <div className="mb-2">
      <span className="text-7xl font-bold">{completed}</span>
      <span className="text-3xl font-light">/{total}</span>
    </div>
    
    {/* Percentage Text */}
    <p className="text-xs">
      you have completed <span className="text-green-400">{percentage}%</span>
    </p>
  </div>
);
};


export default DataCard;
