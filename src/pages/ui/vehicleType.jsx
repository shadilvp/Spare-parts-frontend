import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";


const SUbCatagory = () => {
  return (
    <Select className="w-full">
      <SelectTrigger className="w-[180px] text-gray-400 font-extralight">
        <SelectValue placeholder="SubCatagory" className="text-slate-600  "/>
      </SelectTrigger>
      <SelectContent className="bg-[#070824] text-slate-300">
        <SelectItem value="light">Bike</SelectItem>
        <SelectItem value="dark">Car</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SUbCatagory;
