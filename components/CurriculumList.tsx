import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { MdDeleteForever } from "react-icons/md";

const curriculum_data = [
  {
    id: "CUR-001",
    currName: "chess for dummies, become grandmaster",
    createdBy: "Abhijay",
    createdAt: "1st Oct 2024",
    downloadLink: "",
  },
  {
    id: "CUR-002",
    currName: "CRM development using microsoft dynamic 365",
    createdBy: "Somya",
    createdAt: "30th Sept 2024",
    downloadLink: "",
  },
  {
    id: "CUR-003",
    currName: "leads generation tool using outbound calls",
    createdBy: "Yashank",
    createdAt: "30th Sept 2024",
    downloadLink: "",
  },
];

export function CurriculumList() {
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#c88889]/50 border border-black">
          <TableRow>
            <TableHead className="w-[100px]">Sr. No:</TableHead>
            <TableHead>Curriculum Name</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right pr-12">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-[#4e564e] border border-black">
          {curriculum_data.map((curriculum) => (
            <TableRow key={curriculum.id} className="text-white">
              <TableCell className="font-medium">{curriculum.id}</TableCell>
              <TableCell>{curriculum.currName}</TableCell>
              <TableCell className="text-left">
                {curriculum.createdBy}
              </TableCell>
              <TableCell className="text-right">{curriculum.createdAt}</TableCell>
              <TableCell className="flex item gap-5 justify-end">
                <Button variant={"outline"} size={"sm"} className="text-black">
                  Download
                </Button>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="text-white"
                >
                  <MdDeleteForever size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
