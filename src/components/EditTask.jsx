/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { createPortal } from 'react-dom';
import PrioritySelect from './PrioritySelector';
import TasksList from './TaskList';

    const Input = ({ ...props }) => (
      <input 
        className="w-full px-3 py-2 bg-gray-300/50 text-accent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    );

    const Textarea = ({ ...props }) => (
      <textarea 
        {...props}
      />
    );


    const Badge = ({ children }) => (
      <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-600">
        {children}
      </span>
    );

function EditTask ({setState,task,onEditTask}) {

  const [formData, setFormData] = useState({
    title: task.title || '',
    details: task.details || '',
    priority: task.priority || 'High',
    deadline: task.deadline || '',
    deadlineTime: task.deadlineTime || '',
    categories: task.categories || ['Work']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();  

    const updatedTask = {
      ...task,
      ...formData,
      lastEdited: new Date().toISOString()
    };
    console.log(updatedTask); 
  
    onEditTask(updatedTask);
    setState(false);
  };

  const availableCategories = [
    'Work',
    'Personal',
    'Shopping',
    'Health',
    'Education',
    'Home',
    'Finance',
    'Entertainment'
  ];
  
  const [selectedCategories, setSelectedCategories] = useState(['Work']);


  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  console.log()

  return createPortal(

    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">

      <div className="flex gap-6 w-full max-w-[50rem] h-fit p-6 bg-white rounded-2xl transition-all duration-500 ">

        <div className="w-2/3 space-y-6">

          <h2 className="text-5xl font-bold text-accent">Edit Task</h2>
          <div className="w-full h-1 bg-secondary mt-5 mb-5 rounded-full"></div>

          <div className="space-y-5">
            <div>
              <label className="block text-3xl font-bold mb-1 text-secondary">Title</label>
              <Input 
               name="title"
               value={formData.title}
               onChange={handleInputChange}
               placeholder="Task title" 
               className="h-full mt-4 w-full resize-none bg-gray-300/50 text-2xl text-gray-800 font-bold px-3 py-2 rounded " 
              />
            </div>

            <div>
              <label className="block text-3xl font-bold mb-1 text-secondary">Details</label>
              <Textarea 
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Task details" 
                className="h-full w-full resize-none bg-gray-200/50 text-gray-700 px-3 py-2 rounded mt-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categories</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                      
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <PrioritySelect></PrioritySelect>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1 text-gray-800">Deadline</label>
              <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" color='#1AA7FF' />
                  <Input 
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Clock className="h-4 w-4" color='#1AA7FF' />
                  <Input 
                    name="deadlineTime"
                    type="time"
                    value={formData.deadlineTime}
                    onChange={handleInputChange}
                   />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
          <button 
          onClick={()=>setState(false)}
    className="px-4 py-2 border border-secondary text-secondary rounded-md transition-all duration-200 hover:bg-accent hover:text-white"
  >
    Cancel
  </button>
  <button 
    className="px-4 py-2 bg-secondary text-white rounded-md transition-all duration-200 hover:bg-accent"
    onClick={handleSubmit}
  >
    Update Task
  </button>

          </div>
        </div>

        <div className="w-1/3 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Current Task Info</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-gray-500 font-light text-[0.7rem]" >{task.createdAt}</p>
            </div>
            
            <div className='space-y-2'>
              <p className="text-sm text-gray-500 font-s">Deadline</p>
              <p className='text-gray-500 font-light text-[0.7rem]'>{task.dateDeadLine}</p>
            </div>
            
            <div >
              <p className="text-sm text-gray-500 mb-3">Proprity</p>
              <Badge>{task.priority}</Badge>
            </div>


          </div>
        </div>
      </div>

    </div>,

    document.body

  );
};

export default EditTask;