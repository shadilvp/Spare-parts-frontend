import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";


const ProductStatusSelect = () => {
  return (
    <Select className="w-full">
      <SelectTrigger className="w-[180px] text-slate-300 ">
        <SelectValue placeholder="Availability" className="text-slate-400  font-extralight"/>
      </SelectTrigger>
      <SelectContent className="bg-[#070824] text-slate-300">
        <SelectItem value="light">Available</SelectItem>
        <SelectItem value="dark">Unavailable</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ProductStatusSelect;
