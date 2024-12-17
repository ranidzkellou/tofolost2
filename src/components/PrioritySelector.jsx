/* eslint-disable react/prop-types */
import { useState } from 'react';

const PrioritySelect = ({showLabel}) => {
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {
        showLabel && <label className="block text-sm font-medium mb-1 text-gray-800">
        Priority
      </label>

      }
      <div className="relative">
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className={`w-full p-2 border focus:outline-none outline-none rounded-md appearance-none text-xs ${getPriorityStyles(selectedPriority)}`}
          style={{ colorScheme: 'light' }} 
        >
          <option 
            value="High" 
            className={`${getPriorityStyles('High')} text-xs hover:bg-red-200`}
          >
            High
          </option>
          <option 
            value="Medium"
            className={`${getPriorityStyles('Medium')} hover:bg-yellow-200 text-xs`}
          >
            Medium
          </option>
          <option 
            value="Low"
            className={`${getPriorityStyles('Low')} hover:bg-green-200 text-xs`}
          >
            Low
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="h-4 w-4 text-bluemain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PrioritySelect;