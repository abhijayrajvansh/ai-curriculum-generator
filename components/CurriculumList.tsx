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
const curriculum_data= [
  {
    id: "CURR-001",
    curriculumName: "how to master software engineering",
    createdBy: "abhijay",
    createdAt: "30th Sept 2024",
    downloadLink: "",
  },
  {
    id: "CURR-002",
    curriculumName: "Devops with azure roadmap",
    createdBy: "yashank",
    createdAt: "1st Oct 2024",
    downloadLink: "",
  }
];

export default function CurriculumList() {
  return (
    <div className="rounded border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr. No</TableHead>
            <TableHead>Curriculum Name</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right pr-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
       
       <TableBody>
          {curriculum_data.map((curriculum) => (
            <TableRow key={curriculum.id}>
              <TableCell>{curriculum.id}</TableCell>
              <TableCell className="font-medium">{curriculum.curriculumName}</TableCell>
              <TableCell>{curriculum.createdBy}</TableCell>
              <TableCell className="text-right">{curriculum.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-3 justify-end">
                <Button variant={'outline'} size={'sm'}>download</Button>
                <Button variant={'destructive'} size={'sm'}>
                  <MdDeleteForever size={20}/>
                </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
}
