import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";
import MaincontentDash from "../components/MaincontentDash";


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


function Dashboard () {

  return (

    <>
    <div className="flex gap-3 h-fullsd overflow-y-scroll ">

        <Sidebar 
            tasks={sampleTasks}
        />

        <div className="flex w-full flex-col h-full ">
            
            <Topbar />
            <div className="main-content h-full w-full mt-3">
                <MaincontentDash />
            </div>

        </div>

    </div>

    </>

  );
};

export default Dashboard;
