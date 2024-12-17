/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Flag, Clock } from 'lucide-react';
import {Pencil, Trash } from 'lucide-react';
import EditTask from './EditTask';
import Checkbox from './CheckBox';

function SmallerTask({ 
  task
}) {
  //const [isChecked, setIsChecked] = useState(false);
  const [isEditing,setIsEditing] = useState(false)

  return (
    <div className="flex felx-row my-2 gap-3 justify-between" >
    <div className='w-full p-2 bg-blue-100 rounded transition-all duration-200 overflow-hidden'>
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex items-center flex-grow gap-2">

          <Checkbox size={25} />
          {task.title}

        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <Clock size={8} className="text-gray-600" />
            <span className="text-[0.5rem] text-gray-600">{task.time}</span>
          </div>
          
          <Flag size={16} 
            className={(() => {
              switch (task.priority) {
                case 'high':
                  return 'stroke-priority-high-bg fill-priority-high-text';
                case 'medium':
                  return 'stroke-priority-mid-bg fill-priority-mid-text';
                default:
                  return 'stroke-priority-low-bg fill-priority-low-text';
              }
            })()}
          />

        </div>
      </div>
    </div>

    
    <div className="flex items-center gap-3">
      
        <button
          onClick={()=>setIsEditing(true)} 
          className="rounded text-secondary hover:text-accent transition-all duration-200"
        >
          <Pencil size={12} />
        </button>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <div className="relative w-fit max-w-3xl mx-auto">
              <EditTask setState={setIsEditing} />
            </div>
          </div>
        )}

        <button className="rounded text-secondary hover:text-accent transition-all duration-200">
          <Trash size={12} />
        </button>
      </div>

    </div>
  );
}

export default SmallerTask;