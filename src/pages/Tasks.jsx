/* eslint-disable no-unused-vars */
import { useState ,useEffect} from "react";

import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";
import Maincontent from "../components/Maincontent";
import DashMin from "../components/DashMin";
import Messages from "../components/Message";
import { mockData, } from '../mockData';


const sampleTasks = [
    {
      title: "Work",
      emoji: "🚀",
      subtasks: [
        { title: "Initialize Git repository" },
        { title: "Setup development environment" },
        { title: "Install dependencies" },
        { title: "Configure ESLint and Prettier" }
      ]
    },
    {
      title: "Frontend Development",
      emoji: "💻",
      subtasks: [
        { title: "Create component structure" },
        { title: "Implement routing" },
        { title: "Style components" },
        { title: "Add responsive design" }
      ]
    },
    {
      title: "Testing",
      emoji: "🧪",
      subtasks: [
        { title: "Write unit tests" },
        { title: "Run integration tests" },
        { title: "Perform QA testing" }
      ]
    },
    {
      title: "Documentation",
      emoji: "📝",
      subtasks: [
        { title: "Write API documentation" },
        { title: "Update README file" },
        { title: "Add code comments" }
      ]
    }
  ];

  const folders = [
    {
      id: 1,
      name: "Work",
      emoji: "💼",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          subtasks: [
            { id: 1, title: "Subtask 1" }
          ]
        }
      ]
    }
    // ... more folders
  ];
  
  <Sidebar folders={folders} />
  
function Tasks () {

  const [folders, setFolders] = useState(() => mockData);
  console.log("called here rest",folders);

  const handleAddTask = (newTask) => {

    setFolders((prevFolders) => {
      const existingFolder = prevFolders.find((folder) => folder.title === newTask.folder);
      console.log(existingFolder);

      if (existingFolder) {
        return prevFolders.map((folder) =>
          folder.title === newTask.folder
            ? { ...folder, tasks: [...folder.tasks, newTask] }
            : folder
        );
      } else {

        const newFolder = {
          id: prevFolders.length + 1,
          title: newTask.folder,
          emoji: newTask.emoji,
          details: newTask.details,
          tasks: [newTask],
        };
        return [...prevFolders, newFolder];
      }

    });

  };

  const handleDeleteTask = (taskId) => {
    console.log("task id",taskId);
    setFolders((prevFolders) => {
      return prevFolders.map((folder) => ({
        ...folder,
        tasks: folder.tasks.filter((task) => task.id !== taskId), 
      }));
    });

    console.log("after deleting = ",folders);
  };
  
  const handleCompleteTask = (taskId) => {
    setFolders((prevFolders) => {
      return prevFolders.map((folder) => ({
        ...folder,
        tasks: folder.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        ),
      }));
    });
  };
  
  const handleAddFolder = (newFolder) => {
    setFolders((prevFolders) => {
      const newFolderWithId = {
        ...newFolder,
        id: prevFolders.length + 1,
      };
      return [...prevFolders, newFolderWithId];
    });
  };

  const handleEditFolder = (folderId, updatedFolder) => {
    setFolders((prevFolders) => {
      return prevFolders.map((folder) =>
        folder.id === folderId ? { ...folder, ...updatedFolder } : folder
      );
    });
  };

  const handleDeleteFolder = (folderId) => {
    setFolders((prevFolders) => {
      return prevFolders.filter((folder) => folder.id !== folderId);
    });
  };

  return (
    <>
        <div className="flex gap-3 h-full min-h-screen ">
            <Sidebar 
                tasks={folders}
            />

            <div className="flex w-full flex-col h-full">
                <Topbar />
                <div className="flex gap-3 flex-row h-full  w-full mt-3 overflow-hidden">
                    <Maincontent 
                      handleAddFolder = {handleAddFolder}
                      handleCompleteTask={handleCompleteTask}
                      handleDeleteTask={handleDeleteTask}
                      handleAddTask={handleAddTask}
                      setFolders={setFolders}
                      folders={folders}
                     />
                    <div className="h-full w-1/3 bg-blue-500 rounded-xl">
                        <DashMin />
                        <Messages />
                    </div>
                </div>

            </div>

        </div>
    
    </>

  );
};

export default Tasks;
