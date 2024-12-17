/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState, useEffect } from "react";
import TimelineSection from "./CFolder";
import AddTask from "./AddTask";
import AddFolder from "./AddFolder";
import Button from "./Button";
import { ClipboardPlus, FolderPlus } from 'lucide-react';
import CustomDateFilter from "./CustomDateFilter";

function Maincontent({ 
  folders, 
  setFolders, 
  handleAddTask, 
  handleCompleteTask,
  handleDeleteTask,
  handleAddFolder,
  handleEditFolder,
  handleDeleteFolder
  
  }) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);

  const workCategories = [
    "Meetings",
    "Emails",
    "Deadlines",
    "Project Management",
    "Research",
    "Client Relations",
    "Team Collaboration",
    "Administrative Tasks",
    "Training & Development",
    "Strategic Planning"
  ];

  const AddTaskClick = () => {
    setShowAddTask(true);
  };

  const AddFolderClick = () => {
    setShowAddFolder(true);
  };

  useEffect(() => {
    console.log("Folders updated:", folders);
  }, [folders]);

  const folderNames = folders.map(folder => folder.title);

  return (
    <div className="h-full min-h-screen flex flex-col w-2/3 bg-background p-4 rounded-xl transition-all duration-200">
      <div className="items-center flex">
        <h1 className="font-bold text-accent text-3xl my-4">Welcome Back, Poyo 👋</h1>
      </div>

      <div className="gap-6 my-7 flex items-center justify-center">
        <CustomDateFilter />
        <div className="w-[0.1rem] h-6 rounded-full bg-secondary"></div>
        <Button
          onClick={AddTaskClick}
          children={
            <div className="flex flex-row items-center gap-2">
              <ClipboardPlus size={15} />
              <h1 className="text-[0.8rem] leading-none">Ajouter une nouvelle tâche</h1>
            </div>
          }
        />
        <div className="w-[0.1rem] h-6 rounded-full bg-secondary"></div>
        <Button
          onClick={AddFolderClick}
          children={
            <div className="flex flex-row items-center gap-2">
              <FolderPlus size={15} />
              <h1 className="text-[0.8rem] leading-none">Ajouter une nouvelle dossier</h1>
            </div>
          }
        />
      </div>

      <div className="transition-all duration-200 ease-in-out">
        {showAddTask && (
          <AddTask
            onAddTask={handleAddTask}
            setState={setShowAddTask}
            existingCategories={workCategories}
            existingFolders={folderNames}
          />
        )}
      </div>

      <div className="transition-all duration-200 ease-in-out">
        {showAddFolder && (
          <AddFolder
            onAddFolder={handleAddFolder}
            onCancel={() => setShowAddFolder(false)}
          />
        )}
      </div>

      <div className="flex flex-col gap-5 my-10 m items-center justify-center">
        {folders.map((folder, index) => (
          <TimelineSection
            key={folder.id}
            folder={folder}
            index={index}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Maincontent;
