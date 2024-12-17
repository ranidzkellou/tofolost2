/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import SearchBar from "./SearchBar";
import useSearch from "../hooks/useSearch";
import TasksList from "./TaskList"
import UserDetails from "./UserDetail";


function Sidebar({tasks}) {

  //console.log("Props received in Sidebae:", { tasks });

  const { setQuery, results, } = useSearch(tasks);

  return (
    <div className="h-fill w-72 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-scroll p-7 pt-0 bg-primary flex flex-col justify-between">

      <div >
        <UserDetails></UserDetails>

        <div className="w-full h-1 bg-secondary my-5 rounded-full"></div>

        <SearchBar
          placeholder="Cherche ici"
          onSearch={setQuery}
        />


        

        <TasksList
       
          tasks = {results}
        />

        <div className="w-full h-1 bg-secondary mt-5 mb-5 rounded-full"></div>



      </div>

    </div>
  );
};

export default Sidebar;
