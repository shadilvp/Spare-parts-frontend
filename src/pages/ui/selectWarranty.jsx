import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";


const SelectWarranty = () => {
  return (
    <Select className="w-full">
      <SelectTrigger className="w-[180px] text-slate-300 font-medium">
        <SelectValue placeholder="Peried" className="text-slate-300  "/>
      </SelectTrigger>
      <SelectContent className="bg-[#070824] text-slate-300">
        <SelectItem value="light">Year</SelectItem>
        <SelectItem value="dark">Month</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectWarranty;
