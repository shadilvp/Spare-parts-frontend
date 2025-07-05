import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import React from "react";

const SelectCatagory = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Catagory" />
        </SelectTrigger>
        <SelectContent className="bg-[#070824] text-slate-300">
          <SelectItem value="Transmission & Drivetrain" >Transmission & Drivetrain</SelectItem>
          <SelectItem value="Suspension & Steering">Suspension & Steering</SelectItem>
          <SelectItem value="Brakes">Brakes</SelectItem>
          <SelectItem value="Electrical & Lighting">Electrical & Lighting</SelectItem>
          <SelectItem value="Cooling System">Cooling System</SelectItem>
          <SelectItem value="Fuel System">Fuel System</SelectItem>
          <SelectItem value="Air Conditioning & Heating">Air Conditioning & Heating</SelectItem>
          <SelectItem value="Body Parts">Body Parts</SelectItem>
          <SelectItem value="Interior Accessories">Interior Accessories</SelectItem>
          <SelectItem value="Exhaust System">Exhaust System</SelectItem>
          <SelectItem value="Filters">Filters</SelectItem>
          <SelectItem value="Tires & Wheels">Tires & Wheels</SelectItem>
          <SelectItem value="Lubricants & Fluids">Lubricants & Fluids</SelectItem>
          <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCatagory;
