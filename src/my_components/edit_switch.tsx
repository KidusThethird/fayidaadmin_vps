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
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";


interface UpdateProps {
  type: string;
  id: string;
  recivedField: string;
  // backTo: string;
  buttonTitle: string;
  changeTo: string;
}

export default function EditSwitch({
  type,
  id,
  recivedField,
  //backTo,
  buttonTitle,
  changeTo,
}: UpdateProps) {
  const accessToken = getAccessToken();

  const { push } = useRouter();
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = recivedField;
  // const BackTo = backTo;
  const ButtonTitle = buttonTitle;
  const ChangeTo = changeTo;
  // console.log("Back to =" + BackTo);

  const { toast } = useToast();

  const updatedData = {
    [RecivedField.toString()]: ChangeTo,
  };

  const handleUpdateClick = async () => {
    try {
      console.log("printed");
      const response = await fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify(updatedData),
        credentials: "include",

        // Add any necessary headers or authentication tokens
      });

      if (response.ok) {
        // File successfully deleted
        console.log("File updated");
        // push(`${localUrl}/${BackTo}`);
        toast({
          title: `Updated Successfuly!`,
          //description: ` ${RecivedType}`,
        });
      } else {
        // File deletion failed
        console.error("Failed to update file");
      }
    } catch (error) {
      console.error("Error updating file", error);
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>{ButtonTitle}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to change the state ?
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleUpdateClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
