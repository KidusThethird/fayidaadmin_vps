"use client";
import { apiUrl } from "@/api_config";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

export default function UploadBotQuestionImage(params: any) {
  const QuestionId = params.questionId;

  console.log("QuestionId: " + QuestionId);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<any>(null);

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   // Start the upload process
  //   setUploading(true);

  //   // Get the form data
  //   const formData = new FormData(event.target);

  //   // Create a new XMLHttpRequest object
  //   const xhr = new XMLHttpRequest();

  //   // Track the progress
  //   xhr.upload.onprogress = (event) => {
  //     if (event.lengthComputable) {
  //       const progress = Math.round((event.loaded / event.total) * 100);
  //       setUploadProgress(progress);
  //     }
  //   };

  //   // Handle the upload completion
  //   xhr.onload = () => {
  //     // Upload completed, reset the progress
  //     setUploadProgress(0);
  //     setUploading(false);

  //     // Handle any further actions after the upload
  //     // ...
  //   };

  //   // Set up the request
  //   xhr.open(
  //     "POST",
  //     `${apiUrl}/packages/upload_package_thumbnail/${PackageId}`
  //   );
  //   xhr.send(formData);
  // };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setUploading(true); // Set uploading state to true before sending request
    setUploadError(null); // Clear any previous error

    try {
      const formData = new FormData(event.target);
      const response = await fetch(
        `${apiUrl}/botquestions/upload_botquestion_image/${QuestionId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload response:", data); // Log the response for debugging
      // Handle successful upload (e.g., display success message)
    } catch (error) {
      console.error("Upload error:", error);
      // setUploadError(error?.message); // Set error message for display
    } finally {
      setUploading(false);
      toast({
        title: "Success!",
        description: "File Uploaded",
      }); // Set uploading state to false regardless of success/error
    }
  };

  return (
    <div>
      {/* {uploading && <p>{uploadProgress}% uploaded</p>}
      {uploadProgress != 0 && <Progress value={uploadProgress} />} */}
      <div>{uploading ? <h1>Uploading In Progress</h1> : <h1></h1>}</div>
      <form
        method="POST"
        action={`${apiUrl}/botquestions/upload_botquestion_image/${QuestionId}`}
        id="myForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="bot_question_image"
          className="px-3 bg-yellow-300 cursor-pointer"
        >
          <span className="text-blue-900 font-semibold">
            Update Question Image
          </span>
        </label>
        <input
          type="file"
          className="hidden"
          id="bot_question_image"
          name="bot_question_image"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
