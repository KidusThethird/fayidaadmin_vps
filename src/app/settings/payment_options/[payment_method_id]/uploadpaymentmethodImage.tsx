"use client";
import { apiUrl } from "@/api_config";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Heading1 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function UploadPaymentMethodImage(params: any) {
  const PaymentMethodId = params.payementMethodId;

  console.log("PaymentMethodId: " + PaymentMethodId);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<any>(null);

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   // Start the upload process
  //   // setUploading(true);

  //   // Get the form data
  //   const formData = new FormData(event.target);

  //   // Create a new XMLHttpRequest object
  //   // const xhr = new XMLHttpRequest();

  //   // Track the progress
  //   // xhr.upload.onprogress = (event) => {
  //   //   if (event.lengthComputable) {
  //   //     const progress = Math.round((event.loaded / event.total) * 100);
  //   //     setUploadProgress(progress);
  //   //   }
  //   // };

  //   // Handle the upload completion
  //   // xhr.onload = () => {
  //   //   // Upload completed, reset the progress
  //   //   setUploadProgress(0);
  //   //   setUploading(false);

  //   //   // Handle any further actions after the upload
  //   //   // ...
  //   // };

  //   // Set up the request
  //   xhr.open(
  //     "POST",
  //     `${apiUrl}/paymentmethods/upload_paymentmethod_image/${PaymentMethodId}`
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
        `${apiUrl}/paymentmethods/upload_paymentmethod_image/${PaymentMethodId}`,
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
        //  action={`${apiUrl}/paymentmethods/upload_paymentmethod_image/${PaymentMethodId}`}
        id="myForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="paymentmethod_image"
          className="px-3 bg-yellow-300 cursor-pointer"
        >
          <span className="text-blue-900 font-semibold">
            Add Payment Method Image
          </span>
        </label>
        <input
          type="file"
          className="hidden"
          id="paymentmethod_image"
          name="paymentmethod_image"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
