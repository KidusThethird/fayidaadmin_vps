"use client";
//this deletes both material and video
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
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";

interface DeleteDialogProps {
  materialId: string;
  courseId: string;
  fileId: string;
  fileLocation: string;
}

export default function DeleteMaterialAndFile({
  materialId,
  courseId,
  fileId,
  fileLocation,
}: DeleteDialogProps) {
  const accessToken = getAccessToken();

  const { push } = useRouter();
  const MaterialId = materialId;
  const CourseId = courseId;
  const FileId = fileId;
  const FileLocation = fileLocation;

  const { toast } = useToast();

  const handleDeleteClick = async () => {
    try {
      console.log("printed");
      //DELETE http://localhost:5000/videos/deleteVideoFromUploads/1697905866362.mp4
      //this deletes the video from the material
      const response = await fetch(`${apiUrl}/materials/${MaterialId}`, {
        method: "delete",
        credentials: "include",
       
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        },
        // Add any necessary headers or authentication tokens
      });

      if (response.ok) {
        //this deletes the video created in 'videos' table in the db
        // const response2 = await fetch(`${apiUrl}/videos/${VideoId}`, {
        //   method: "delete",
        //   credentials: "include",

        //   // Add any necessary headers or authentication tokens
        // });
        if (response.ok) {
          //this deletes the actual video from uploads folder
          const response3 = await fetch(
            `${apiUrl}/materialfiles/deleteFileFromUploads/${FileLocation}/${FileId}`,
            {
              method: "delete",
              credentials: "include",
              // Add any necessary headers or authentication tokens
            }
          );
          console.log("FIle Deleted");
        }

        // File successfully deleted
        console.log("File deleted");
        push(`${localUrl}/courses/managematerials/${CourseId}`);
        toast({
          title: `Delete Successful!`,
          description: `Deleted from Materials!`,
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
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Delete from Materials?
              {/* <h1>LOc:{FileLocation}</h1> */}
              <h1>Id: {FileId}</h1>
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
