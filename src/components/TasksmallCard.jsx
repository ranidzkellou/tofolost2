/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react';
import { ChevronDown, Pencil, Trash, Flag, Clock } from 'lucide-react';
import SmallerTask from './SmallerTask';
import EditTask from './EditTask';
import Checkbox from './CheckBox';

function TaskSmallCard({task,index,onEditTask,onCompleteTask,onDeleteTask}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleDeleteTask(index){
    onDeleteTask(index)
  }

  return (
    <>
      <div className="flex w flex-row items-baseline justify-between gap-4 p-2 w-full rounded transition-all duration-200 overflow-hidden">
        <div className="w-full px-2 py-4 bg-white rounded-xl transition-all duration-200 overflow-hidden ">
          <div className="flex flex-row items-center justify-between">

            <div className="flex items-center gap-2">
              <input 
                id="filter-size-1" 
                value="id" 
                type="checkbox" 
                checked={isChecked}
                onChange={() => {setIsChecked(!isChecked) ; onCompleteTask()}}
                className="size-6 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label 
                htmlFor="filter-size-1" 
                className={`flex-grow text-accent text-sm ${isDetailsOpen? "font-bold" : "font-normal"} transition-all duration-200`}
              >
                {task.title} 
              </label>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-gray-600" />
                <span className="text-xs text-gray-600">{task.deadlineTime}</span>
              </div>
              <Flag size={16} 
                className={(() => {
                  switch (task.priority) {
                    case 'High':
                      return 'stroke-priority-high-bg fill-priority-high-text';
                    case 'Medium':
                      return 'stroke-priority-mid-bg fill-priority-mid-text';
                    case 'Low':
                      return 'stroke-priority-low-bg fill-priority-low-text';
                  }
                })()}
              />

            </div>
          </div>

          <div 
            className={`
              overflow-hidden
              transition-all 
              duration-500 
              ease-in-out 
              origin-top
              ${isDetailsOpen ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}
            `}
          >

            <div className="w-full h-[2px] bg-blue-300 my-3 rounded-full"></div>

            
            <div className="mt-2 pl-8 space-y-3">
            <div className="transition-all duration-500 delay-100">
              <h3 className="text-[10px] font-medium text-accent">Categories:</h3>
              <ul className="pl-3 mt-1">
                {task.categories.map((category, index) => (
                  <li key={index} className="text-[8px] font-light text-gray-700">
                    {category}
                  </li>
                ))}
              </ul>
            </div>

              <div className="transition-all duration-500 delay-200">
                <h3 className="text-[10px] font-medium text-accent">Details</h3>
                <p className="pl-3 mt-1 text-[8px] font-light text-gray-700">{task.details}</p>
              </div>
              
              <div className="transition-all duration-500 delay-300">
                <h3 className="text-[10px] font-medium text-accent">Sous-tâche</h3>
                <ul className="pl-3 mt-1 space-y-3 text-[8px] font-light text-accent">
                  {task.subtasks.map((subTask, index) => (
                    <li key={index}>
                      <SmallerTask task={subTask} />
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="rounded text-secondary hover:text-accent transition-all duration-200"
          >
            <ChevronDown 
              size={22} 
              className={`transition-transform duration-300 ease-in-out ${isDetailsOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>

          <button
            onClick={()=>setIsEditing(true)} 
            className="rounded text-secondary hover:text-accent transition-all duration-200"
          >
            <Pencil size={17} />
          </button>

          {isEditing && (
                <EditTask setState={setIsEditing} task={task} onEditTask={onEditTask} />
          )}

          <button 
          className="rounded text-secondary hover:text-accent transition-all duration-200"
          onClick={()=>onDeleteTask(task.id)}
          >
            
            <Trash size={17} />
          </button>
        </div>
        
      </div>

    </>
  );
}
export default TaskSmallCard;