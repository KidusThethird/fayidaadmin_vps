"use client";
import { apiUrl } from "@/api_config";
import LoadProfileAuth from "@/main_components/loadProfileAuth";
import TransactionButton from "@/my_components/agent_transaction_update";
import EditCellDialog from "@/my_components/edit_cell_dialog";
import EditSwitch from "@/my_components/edit_switch";
import SwitchDialog from "@/my_components/switch_dialog";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadBotQuestionImage from "./imageUpload";

export default function StudentDetails({ params }: any) {
  const QuestionId = params.questionId;

  const [data, setData] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const [transactionList, setTransactionList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/botquestions/${QuestionId}`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-2 mx-10 my-5">
      <LoadProfileAuth />
      <div>
        <h1 className="text-lg text-blue-800 underline font-semibold">
          Question Details
        </h1>
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Question Text:</span>{" "}
          {data?.text}
        </h1>
      </div>
      <EditCellDialog
        content={data?.text}
        dataType="text"
        field="text"
        id={QuestionId}
        type="botquestions"
      />
      <div>
        <h1>
          <span className="text-blue-800 font-semibold">
            Period In Minutes:
          </span>{" "}
          {data?.period}
        </h1>
        <EditCellDialog
          content={data?.period}
          dataType="text"
          field="period"
          id={QuestionId}
          type="botquestions"
        />
      </div>
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Students Limit:</span>{" "}
          {data?.studentLimit}
        </h1>
      </div>
      <EditCellDialog
        content={data?.studentLimit}
        dataType="text"
        field="studentLimit"
        id={QuestionId}
        type="botquestions"
      />
      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Target Grade:</span>{" "}
          {data?.grade}
        </h1>
      </div>

      <EditCellDialog
        content={data?.grade}
        dataType="text"
        field="grade"
        id={QuestionId}
        type="botquestions"
      />
      <div>
        <div>
          {data?.image != null && <img src={data?.imgUrl} alt="Image" />}
        </div>

        <UploadBotQuestionImage questionId={QuestionId} />
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold"> Status: </span>
          {data?.status}
        </h1>
      </div>

      <div>
        <h1>
          <span className="text-blue-800 font-semibold">Created At:</span>{" "}
          {data?.createdAt ? new Date(data.createdAt).toLocaleString() : "N/A"}
        </h1>
      </div>

      {data?.status == "down" ? (
        <div>
          <EditSwitch
            buttonTitle="Activate"
            changeTo="active"
            id={QuestionId}
            recivedField="status"
            type="botquestions"
          />
        </div>
      ) : (
        <div>
          <EditSwitch
            buttonTitle="Deactivate"
            changeTo="down"
            id={QuestionId}
            recivedField="status"
            type="botquestions"
          />
        </div>
      )}

      <div className="my-8 py-2 mx-5">
        <h1>Answers Given:</h1>
        <div>
          {data?.answers?.length > 0 ? (
            <ul>
              {data.answers.map((answer: any) => (
                <li
                  key={answer.id}
                  style={{
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <h3>Status: {answer.correct}</h3>
                  <div className="space-x-4 flex py-4">
                    <EditSwitch
                      buttonTitle="Change to Correct"
                      changeTo="correct"
                      id={answer.id}
                      recivedField="correct"
                      type="botquestions/botquestionanswer"
                    />
                    <EditSwitch
                      buttonTitle="Change to Incorrect"
                      changeTo="incorrect"
                      id={answer.id}
                      recivedField="correct"
                      type="botquestions/botquestionanswer"
                    />
                  </div>
                  <p>
                    <strong>Answer Posted:</strong>{" "}
                    {new Date(answer.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Student Full Name:</strong>{" "}
                    {`${answer.student.firstName} ${answer.student.lastName} ${answer.student.grandName}`}
                  </p>
                  <p>
                    <strong>Student ID:</strong> {answer.student.id}
                  </p>
                  <p>
                    <strong>Student Answers:</strong>
                    <br />
                    {answer.text.split("\n").map((line: any, index: any) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No answers available.</p>
          )}
        </div>
      </div>
    </div>
  );
}