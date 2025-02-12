import { Route, Routes, useNavigate } from "react-router-dom";
import { StudentForm } from "../component/enter/Enter";
import { ExamQuestions } from "../component/exam/Exam";
import { useEffect } from "react";
import { TestResults } from "../component/result/Result";

export const Router = () => {
  const navigate = useNavigate();

  let access = localStorage.getItem("exam_access");
  let check = localStorage.getItem("check")

  async function localData() {
    if(check === "true") {
      return navigate("/exam/answer")
    }
    if (!access || access === "false") {
      return navigate("/");
    }

    if (access === "true") {
      return navigate("/exams");
    }
  }

  useEffect(() => {
    localData();
  }, [access]);

  return (
    <Routes>
      <Route path="/" element={<StudentForm />} />
      <Route path="/exams" element={<ExamQuestions />} />
      <Route path="/exam/answer" element={<TestResults />} />
    </Routes>
  );
};
