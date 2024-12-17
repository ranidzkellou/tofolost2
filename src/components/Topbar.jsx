import Button from "./Button";
import { useState } from "react";
import { Home, BarChart2, } from 'lucide-react';

function Topbar() {
    return (
      <div className="w-full py-2.5 px-3.5 flex gap-4 bg-background rounded-xl h-16 items-center">

        <Button>
          <div className="flex felx-row  items-center gap-2">
              <Home 
                size={25}
              />
            </div>
        </Button>

        <div className="w-[0.1rem] h-full rounded-full bg-accent"></div>
        <Button
        >
          <div className="flex felx-row items-center gap-2">
              <BarChart2 
                size={25}
              />
              <h1 className="text-lg leading-none">Dashboard</h1>
          </div>
        </Button>

      </div>
    );
  };
  
  export default Topbar;