"use client";
import React from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { apiUrl, localUrl } from "@/api_config";
import useRefetchStore from "@/store/autoFetch";
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";

interface DeleteDialogProps {
  studentId: string;
  courseId: string;
  unit: string;
}

export default function CreateCourseUnit({
  studentId,
  courseId,
  unit,
}: DeleteDialogProps) {
  const accessToken = getAccessToken();

  // const { push } = useRouter();
  const RecivedStudentId = studentId;
  const RecivedCourseId = courseId;
  const RecivedUnit = unit;

  const SetCourseUnitsFetched = useRefetchStore(
    (state) => state.setCourseUnitsFetched
  );
  const CourseUnitsFetched = useRefetchStore(
    (state) => state.courseUnitsFetched
  );

  const { toast } = useToast();

  const handleCreateClick = async () => {
    const timer = setTimeout(() => {
      SetCourseUnitsFetched(CourseUnitsFetched + "1");
    }, 2000);

    try {
      console.log("printed");
      const response = await fetch(
        `${apiUrl}/courseunits/accessone/${RecivedStudentId}/${RecivedCourseId}/${RecivedUnit}`,
        {
          method: "get",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
          // Add any necessary headers or authentication tokens
        }
      );

      if (response.ok) {
        // File successfully deleted
        console.log("File deleted");
        // push(`${localUrl}/${BackTo}`);
        toast({
          title: `Successful!`,
          // description: `Deleted from ${RecivedType}`,
        });
      } else {
        // File deletion failed
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  return (
    <div className=" ">
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <h1 className="text-green-600 hover:underline">Add</h1>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to activate for the student?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will let the student access the unit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleCreateClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
