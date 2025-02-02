"use client";
import DeleteDialog from "@/my_components/delete_dialog";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../api_config";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import CreateForum from "@/my_components/create_form";
import UploadVideo from "./uploadCourseIntroductionVideo";
import AddCourseForm from "@/app/forms/createCourse";
import AddUnitList from "@/app/forms/createCourseUnitList";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import useRefetchStore from "@/store/autoFetch";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

//async function getData(): Promise<[]> {
// Fetch data from  API .
// return res.json();
//}

export default function CourseDetails({ params }: any) {
  const accessToken = getAccessToken();
  const courseId = params.courseId;
  const [forumId, setForumId] = useState("");
  const [videoLocation, setVideoLocation] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const CourseUnitsFetched = useRefetchStore(
    (state) => state.courseUnitsFetched
  );

  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    parts: "",
    partName: "",
    courseIntroductionVideo: "",
    CourseUnitsList: [],
    id: "",
  });
  const [checkForum, setCheckFourm] = useState("");

  useEffect(() => {
    const getCourse = async () => {
      const res = await fetch(`${apiUrl}/courses/${courseId}`, {
        next: {
          revalidate: 0,
        },
        method: "GET",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
},
      });
      const course = await res.json();
      setCourse(course);
      setForumId(course?.Forum?.id);
      setVideoLocation(course?.courseIntroductionVideo);
      setVideoUrl(course?.videoUrl);
      console.log("COurses: " + course?.courseName);
    };

    getCourse();
  }, [CourseUnitsFetched]);

  useEffect(() => {
    const getForum = async () => {
      const res = await fetch(`${apiUrl}/forums/checkcourseforum/${courseId}`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const forum = await res.json();
      setCheckFourm(forum?.length);
      console.log("Forum: " + forum?.length);
    };

    getForum();
  }, []);

  // const data = await res.json();
  // console.log(res);
  console.log("printed");
  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg font-semibold underline mb-2">
        Course Details
      </h1>
      {/* <h1>{courseId}</h1> */}
      {checkForum == "0" ? (
        <div>
          <CreateForum courseId={courseId} />
        </div>
      ) : (
        <div>
          <Link href={`/Forum/${forumId}`}>
            <h1 className="text-base font-semibold text-primary-color hover:underline w-fit">
              View Forum
            </h1>
          </Link>
        </div>
      )}
      <div className="flex space-x-6 py-3">
        <h1 className="text-primary-color font-semibold">Course Name:</h1>
        <h1>{course?.courseName}</h1>
        <div className="">
          <EditCellDialog
            type={"courses"}
            id={courseId}
            field={"courseName"}
            content={course?.courseName}
            dataType="text"
          />
        </div>
      </div>

      <div className=" space-x-6 py-3">
        <h1 className="text-primary-color font-semibold">
          Course Description:
        </h1>
        <div className="px-4 flex space-x-3 border-2 w-fit p-2">
          <h1>{course?.courseDescription}</h1>
          <div className=" ">
            <EditCellDialog
              type={"courses"}
              id={courseId}
              field={"courseDescription"}
              content={course?.courseDescription}
              dataType="text"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-6 py-3">
        <h1 className="text-primary-color font-semibold">Parts:</h1>
        <h1>{course?.parts}</h1>
        <div className="">
          <EditCellDialog
            type={"courses"}
            id={courseId}
            field={"parts"}
            content={course.parts}
            dataType="number"
          />
        </div>
      </div>

      <div className="flex space-x-6">
        <h1 className="text-primary-color font-semibold">Parts Name:</h1>
        <h1>{course?.partName}</h1>
        <div className="">
          <EditCellDialog
            type={"courses"}
            id={courseId}
            field={"partName"}
            content={course?.partName}
            dataType="text"
          />
        </div>
      </div>

      <div className="mt-7">
        <div>
          <h1 className="text-xl underline font-semibold">Create Units List</h1>
        </div>
        <AddUnitList courseId={courseId} />

        <div className="my-3">
          {course?.CourseUnitsList?.map((unit: any) => (
            <div
              key={unit.id}
              className="flex justify-between space-x-4 bg-gray-200 py-3 px-5 rounded my-3"
            >
              <div className="flex space-x-3">
                <h1>Unit {unit.UnitNumber}</h1>{" "}
                <div className="w-fit">
                  <EditNumberCellDialog
                    content={unit.UnitNumber}
                    field="UnitNumber"
                    id={unit.id}
                    type="courseunitslist"
                  />{" "}
                </div>
              </div>

              <div className="flex space-x-3 py-2">
                {" "}
                <h1>{unit.Title}</h1>
                <div>
                  <EditCellDialog
                    content={unit.Title}
                    dataType="text"
                    field="Title"
                    id={unit.id}
                    type="courseunitslist"
                  />
                </div>
              </div>
              <div>
                <DeleteDialog
                  backTo={`/courses/${courseId}`}
                  buttonTitle="Delete"
                  id={unit.id}
                  type="courseunitslist"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <UploadVideo courseId={courseId} /> */}

      <div className="py-5">
        {/* <video controls>
            <source
              src={`${apiUrl}/upload_assets/videos/course_introduction_videos/${course?.courseIntroductionVideo}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}

        {/* {videoLocation == "" ? (
          <div>
            <h1>Loading Video</h1>
          </div>
        ) : (
          <video controls>
            <source
              src={videoUrl}
            //  // src={`${apiUrl}/upload_assets/videos/course_introduction_videos/${videoLocation}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )} */}
      </div>

      <DeleteDialog
        type={"courses"}
        id={courseId}
        backTo="/courses"
        buttonTitle="Delete Course"
      />
    </div>
  );
}
