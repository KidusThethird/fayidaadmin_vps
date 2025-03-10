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
  linkId: string;
}

export default function DeleteMaterialAndLink({
  materialId,
  courseId,
  linkId,
}: DeleteDialogProps) {
  const accessToken = getAccessToken();

  const { push } = useRouter();
  const MaterialId = materialId;
  const CourseId = courseId;
  const LinkId = linkId;

  const { toast } = useToast();

  const handleDeleteClick = async () => {
    try {
      console.log("printed");
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
        const response2 = await fetch(`${apiUrl}/materiallink/${LinkId}`, {
          method: "delete",
          credentials: "include",
          // Add any necessary headers or authentication tokens
        });
        if (response2.ok) {
          console.log("Material Link Deleted");
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
        <AlertDialogTrigger>
          <h1 className="text-red-500 hover:underline">Delete</h1>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Delete from Materials?
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
