import DataCard from "../components/Datacard";
import WeekChat from "./WeekChart";
import Calendar from "./Calendar";
import TaskDashboard from "./TaskDashboard";

function MaincontentDash() {

  return(
    <>
      <div className="h-full w-full bg-background p-4 rounded-xl transition-all duration-200">

        <div className="flex felx-row w-full gap-11 justify-center ">
        <DataCard />
        <DataCard />
        <DataCard />
        <DataCard />
        </div> 

        <WeekChat />   

        <div className="bg-blue-500 w-full h-ful rounded-full"></div>


        <div className="w-full h-[35rem] text-white flex gap-9 items-center my-10 ">

            <div className="basis-2/5 w-full p-8 h-full bg-bluemain rounded-lg">
              <h1 className="font-bold text-5xl">This month's summary</h1>
              <div className="bg-accent w-full h-1 rounded-full mt-5"></div>
              <div className="flex justify-between items-center my-3">
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-4xl">56</h1>
                  <p className="text-lg font-thin">Total task</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-4xl">56</h1>
                  <p className="text-lg font-thin">Total task</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-4xl">56</h1>
                  <p className="text-lg font-thin">Total task</p>
                </div>
              </div>
              <div className="bg-accent w-full h-1 rounded-full"></div>

              <div className="flex flex-col items-center ">

                <div className="mt-4 py-1.5 px-2.5 bg-white w-fit text-accent font-bold rounded-lg text-2xl">Mounth</div>
                <Calendar />                
              </div>

            </div>
            
            <div className="bg-blue-500 w-2 h-full rounded-full"></div>
            <TaskDashboard></TaskDashboard>

            
          </div>  

      </div>
    </>
  );

}

export default MaincontentDash;