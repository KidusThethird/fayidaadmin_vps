"use client";
import { apiUrl } from "@/api_config";
import { Button } from "@/components/ui/button";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { CreateQuestion } from "@/my_components/create_question";
import DeleteDialog from "@/my_components/delete_dialog";
import DeleteMaterialAndAssessment from "@/my_components/delete_material_and_assessment";
import DeleteMaterialAndVideo from "@/my_components/delete_material_and_video";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditNumberCellDialog from "@/my_components/edit_number_cell_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadQuestionImage from "./uploaduestionImage";
import UploadCorrectionImage from "./uploadCorrectionImage";
import useRefetchStore from "@/store/autoFetch";

export default function ExamDetails({ params }: any) {
  const ExamId = params.examid;
  console.log("working");
  console.log("examid: " + ExamId);

  const [data, setData] = useState<any>([]);
  const [question_data, setQuestion_data] = useState<any>([]);

  //const setQuestionFetch = useRefetchStore((state) => state.setQuestionFetch);
  const questionFetch = useRefetchStore((state) => state.questionFetch);

  function formatTextToHTML(text: any) {
    if (!text) {
      return ""; // Return an empty string if text is null or undefined
    }

    const formattedText = text
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>") // Matches ^^superscript^^
      .replace(/\*\*\*(.*?)\*\*\*/g, "<sub>$1</sub>") // Matches ***subscript***
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Matches **bold**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Matches *italic*
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/&&8/g, "∞") // &&8  // infinity
      .replace(/&&f/g, "ƒ")
      .replace(/&&arf/g, "→")
      .replace(/&&arb/g, "←")
      .replace(/&&aru/g, "↑")
      .replace(/&&ard/g, "↓") // &&f   // function f
      .replace(/&&pi/g, "π")
      .replace(/&&sqrt/g, "√")
      .replace(/&&noteq/g, "≠")
      .replace(/&&empty/g, "∅")
      .replace(/&&integ/g, "∫")
      .replace(/&&triangle/g, "△")
      .replace(/&&imp/g, "⇒")
      .replace(/&&bimp/g, "⇔")
      .replace(/&&invv/g, "∧")
      .replace(/&&nl/g, "<br>")
      .replace(/&&alpha/g, "α")
      .replace(/&&beta/g, "β")
      .replace(/&&theta/g, "θ")
      .replace(/&&gamma/g, "γ")
      .replace(/&&lambda/g, "λ")
      .replace(/&&mu/g, "μ")
      .replace(/&&nu/g, "ν")
      .replace(/&&rho/g, "ρ")
      .replace(/&&tau/g, "τ")
      .replace(/&&phi/g, "φ")
      .replace(/&&psi/g, "ψ")
      .replace(/&&omega/g, "ω")
      .replace(/&&eta/g, "η")
      .replace(/&&dotdotdot/g, "⋮")
      .replace(/&&greaterequal/g, "≥")
      .replace(/&&lessequal/g, "≤")
      .replace(/&&plusminus/g, "±")
      .replace(/&&nl/g, "<br>")
      .replace(/&&dash/g, "________")
      .replace(/&&dashl/g, "______________________")
      // .replace(/&&r/g, "&#8477;")
      // .replace(/&&nat/g, "&naturals;")
      .replace(/&&r/g, "<span style='font-size:1.2em'>&#8477;</span>")
      .replace(/&&nat/g, "<span style='font-size:1.2em'>&naturals;</span>")

      .replace(/&&rarw&([^&]*)&&/g, function (_: any, text: any) {
        return text + " \u2192";
      })
      // .replace(
      //   /(\d+)\/(\d+)/g,
      //   '<span class="fraction"><sup class="numerator">$1</sup><sub class="denominator">$2</sub></span>'
      // ) // Matches _underline_

      .replace(/&&st(\d+)&&end(\d+)/g, function (_: any, start: any, end: any) {
        return start + "<sub>" + end + "</sub>";
      });

    const renderedHTML = (
      <div dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
    return renderedHTML;
  }

  // the first request it to get the assesment id from material list
  // const res = await fetch(`${apiUrl}/assesments/getexams/${ExamId}`, {
  //   next: {
  //     revalidate: 0,
  //   },
  // });
  // const data = await res.json();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/assesments/getexams/${ExamId}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const AssesmentId = data?.assementId?.id;

  console.log("data:" + data);
  // const MaterialIndex = data?.materialIndex;
  // const MaterialType = data?.materialType;
  // const MaterialPart = data?.part;

  const AssesmentTitle = data?.assesmentTitle;
  const AssesmentDescription = data?.assesmentDescription;
  //  const CourseId = data?.coursesId;
  const AssesmentPoints = data?.assesmentPoints;
  const AssesmentDuration = data?.duration;
  const AssesmentIndex = data?.assesmentIndex;

  console.log("test");

  // const res_questions = await fetch(
  //   `${apiUrl}/questions/accessquestions/${ExamId}`,
  //   {
  //     next: {
  //       revalidate: 0,
  //     },
  //   }
  // );
  // const question_data = await res_questions.json();

  const messagesEndRef = React.createRef();
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/questions/accessquestions/${ExamId}`
        );
        const data = await response.json();
        setQuestion_data(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [questionFetch]);

  //the second request it to access the specific video detail from vidos table using the video id we got from the first request
  // const res2 = await fetch(`${apiUrl}/videos/${VideoId}`, {
  //  next: {
  //    revalidate: 0,
  //  },
  //});
  //const data2 = await res2.json();
  interface Question {
    // Define the properties of a question
    id: number;
    text: string;
    // Add additional properties as needed
  }

  //  const runthis = () => {
  //     console.log(res_questions);
  //   };

  console.log("this is data" + data);
  // questions/accessquestions/:id  - where id is assesment id
  // http://localhost:5000/questions/accessquestions/52a33dfd-e3fc-4ab2-ba70-7924a75c78e4
  //to access all questions with a single assesment
  return (
    <div className="space-y-3 mx-5">
      <LoadProfileAuth />
      <h1 className="text-primaryColor font-semibold underline w-fit">
        Exam Details
      </h1>
      <div className="w-fit border-2 px-3">
        <Link href={`/exams/examlist`}>
          <span className=""> To Exams</span>
          {/* <h1>ExamId: {ExamId}</h1> */}
        </Link>
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-primaryColor font-semibold">
            Assessment Index:
          </span>{" "}
          {AssesmentIndex}
        </h1>
        <EditNumberCellDialog
          type="assesments"
          field="assesmentIndex"
          id={ExamId}
          content={AssesmentIndex}
          // dataType="text"
        />
      </div>

      <div className="flex space-x-3">
        <h1>
          <span className="text-primaryColor font-semibold">
            Assessment Title:
          </span>{" "}
          {AssesmentTitle}
        </h1>
        <EditCellDialog
          type="assesments"
          field="assesmentTitle"
          id={ExamId}
          content={AssesmentTitle}
          dataType="text"
        />
      </div>
      <div className="flex space-x-3">
        <h1>
          <span className="text-primaryColor font-semibold">
            Assessment Description:
          </span>{" "}
          {AssesmentDescription}
        </h1>
        <EditCellDialog
          type="assesments"
          field="assesmentDescription"
          id={ExamId}
          content={AssesmentDescription}
          dataType="text"
        />
      </div>
      <div className="flex space-x-6">
        <h1>
          <span className="text-primaryColor font-semibold">
            Assessment Points{" "}
          </span>{" "}
          {AssesmentPoints}
        </h1>
        <EditCellDialog
          type="assesments"
          field="assesmentPoints"
          id={ExamId}
          content={AssesmentPoints}
          dataType="number"
        />
      </div>
      <div className="flex space-x-6">
        <h1>
          <span className="text-primaryColor font-semibold">
            Assessment Points in minutes
          </span>{" "}
          {AssesmentDuration}
        </h1>
        <EditCellDialog
          type="assesments"
          field="duration"
          id={ExamId}
          content={AssesmentDuration}
          dataType="number"
        />
      </div>

      {/* <DeleteMaterialAndAssessment
        materialId={MaterialId}
        assessmentId={AssesmentId}
        courseId={CourseId}
      /> */}

      <DeleteDialog
        backTo="/exams/examlist"
        buttonTitle="Delete Exam"
        id={ExamId}
        type="assesments"
      />
      <div className="my-4 w-full flex justify-end   z-50 sticky top-14  ">
        {" "}
        <div className=" w-fit  ">
          <CreateQuestion assesmentId={ExamId} />
        </div>
      </div>

      <div>
        <h1>
          <span className="text-primaryColor font-semibold">
            Questions in assesment:
          </span>{" "}
          {AssesmentTitle}{" "}
        </h1>
        {question_data?.map((q: any, index: number) => {
          return (
            <div className="py-5" key={index}>
              <div className="flex space-x-3">
                <h2>{q.questionIndex}.</h2>

                <h2>{formatTextToHTML(q.question)}</h2>
              </div>
              <div>
                <h2 className="flex gap-2">A. {formatTextToHTML(q.choiseA)}</h2>
                <h2 className="flex gap-2">B. {formatTextToHTML(q.choiseB)}</h2>
                <h2 className="flex gap-2">C. {formatTextToHTML(q.choiseC)}</h2>
                <h2 className="flex gap-2">D. {formatTextToHTML(q.choiseD)}</h2>
                <h2>Correct Choice: {q.correctChoice}</h2>

                <div>
                  <h1>Exp: {formatTextToHTML(q.correction)}</h1>
                </div>
                <div className=" space-x-6">
                  <Link href={`/question_details/${q.id}`}>
                    <button className="bg-primaryColor text-white px-2 ">
                      Edit
                    </button>
                  </Link>
                  <div className="w-full border-2 border-lime-700 p-2 my-3">
                    <div className="grid grid-cols-2 w-full  gap-4">
                      <div className="col-span-1">
                        <div>
                          {/* <h1>Url: {q?.questionImgUrl}</h1>
                          <h1>Exam Id:{ExamId}</h1> */}
                          {q?.questionImage != null && (
                            <img
                              //  src={`${apiUrl}/upload_assets/images/question_images/${q?.questionImage}`}
                              src={q?.questionImgUrl}
                            />
                          )}
                        </div>

                        <div>
                          <UploadQuestionImage questionId={q?.id} />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div>
                          {q?.correctionImage != null && (
                            <img
                              //   src={`${apiUrl}/upload_assets/images/correction_images/${q?.correctionImage}`}
                              src={q?.correctionImageUrl}
                              alt="Explanation Image"
                            />
                          )}
                        </div>

                        <div>
                          <UploadCorrectionImage questionId={q?.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DeleteDialog
                      type="questions"
                      id={q.id}
                      backTo={`/exams/${ExamId}`}
                      buttonTitle="Delete Question"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
