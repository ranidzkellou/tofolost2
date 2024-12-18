/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import SearchBar from "./SearchBar";
import useSearch from "../hooks/useSearch";
import TasksList from "./TaskList"
import UserDetails from "./UserDetail";


import React, { useState } from 'react';
import { ChevronRight, Home, LayoutDashboard, Settings } from 'lucide-react';

const Sidebar = ({ folders }) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [expandedTasks, setExpandedTasks] = useState({});

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="w-64 h-screen bg-gray-50 p-4 border-r border-gray-200">
      {/* Main navigation */}
      <nav className="space-y-2 mb-4">
        <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <Home size={20} />
          <span className="font-medium">Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </a>
      </nav>

      {/* Divider */}
      <div className="relative h-px bg-gray-200 my-4">
        <div className="absolute inset-0 bg-gray-400 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Folders section */}
      <div className="space-y-2">
        {folders.map(folder => (
          <div key={folder.id} className="relative">
            {expandedFolders[folder.id] && (
              <div className="absolute left-3 top-8 bottom-0 w-px bg-gray-200 transition-all duration-500 ease-in-out" />
            )}
            
            <button
              onClick={() => toggleFolder(folder.id)}
              className="w-full flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="transition-transform duration-200" style={{
                transform: expandedFolders[folder.id] ? 'rotate(90deg)' : 'rotate(0deg)'
              }}>
                <ChevronRight size={16} />
              </div>
              <span className="mr-2 transform transition-transform duration-200 hover:scale-110">{folder.emoji}</span>
              <span className="font-medium">{folder.name}</span>
            </button>

            {/* Tasks */}
            <div className={`ml-6 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              expandedFolders[folder.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {folder.tasks.map(task => (
                <div key={task.id}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="w-full flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
                  >
                    {task.subtasks.length > 0 && (
                      <div className="transition-transform duration-200" style={{
                        transform: expandedTasks[task.id] ? 'rotate(90deg)' : 'rotate(0deg)'
                      }}>
                        <ChevronRight size={14} />
                      </div>
                    )}
                    <span className="text-sm">{task.title}</span>
                  </button>

                  {/* Subtasks */}
                  <div className={`ml-6 space-y-1 transition-all duration-200 ease-in-out ${
                    expandedTasks[task.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {task.subtasks.map(subtask => (
                      <div
                        key={subtask.id}
                        className="flex items-center space-x-2 px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
                      >
                        <span>{subtask.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Sidebar;
