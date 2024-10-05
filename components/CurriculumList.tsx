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
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CurriculumList({
  userEmail,
}: {
  userEmail: string | null;
}) {
  const [userCurriculums, setUserCurriculums] = useState([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await axios.post("/api/get-curriculum", {
          userEmail: userEmail,
        });

        setUserCurriculums(response.data.userCurriculums);
      } catch (error) {
        console.error("Error fetching curriculums:", error);
      }
    };
    fetchCurriculums();
  }, []);

  interface curriculumProps {
    id: string;
    curriculumName: string;
    createdAt: string;
  }

  const handleDelete = async (curriculumId: string) => {
    try {
      axios.post('/api/delete-curriculum', {
        curriculumId
      })
    } catch (error) {
      console.log(error)
    }

    window.location.reload()
  };

  const router = useRouter();

  return (
    <div className="rounded border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] pl-4">Sr. No</TableHead>
            <TableHead>Curriculum Name</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-right pr-12">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {userCurriculums.map((curriculum: curriculumProps, index) => (
            <TableRow key={curriculum.id}>
              <TableCell className="pl-6">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {curriculum.curriculumName}
              </TableCell>
              <TableCell className="text-left">
                {new Date(curriculum.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-3 justify-end">
                  <Button variant={"outline"} size={"sm"} onClick={() => router.push(`/dashboard/${curriculum.id}`)}>
                    View
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"destructive"} size={"sm"}>
                        <MdDeleteForever size={20} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your curriculum from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(curriculum.id)}
                          className="bg-red-500 font-medium hover:bg-red-600"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
