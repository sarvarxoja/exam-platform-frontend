import React, { useEffect, useState } from "react";
import { ChevronRight, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../loader/Loader";

export const ExamQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTest();
  }, []);

  async function fetchTest() {
    try {
      let { data } = await axios.get(`/tests/all`);
      setQuestions(data.questions || []);
    } catch (error) {
      console.log(error);
    }
  }

  const totalPages = questions.length;

  const getCurrentQuestion = () => {
    return questions[currentPage - 1];
  };

  const handleAnswerSelect = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswers[getCurrentQuestion()?._id]) return;

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const answersPayload = {
      answers: Object.entries(selectedAnswers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })),
    };

    try {
      let user = localStorage.getItem("user_data");
      let data = {
        user: JSON.parse(user),
        answers: answersPayload.answers,
      };
      console.log(data);
      const response = await axios.post(
        "/results/create",
        data
      );
      localStorage.setItem("check", true);
      localStorage.setItem("correctCount", response.data.correctCount);
      localStorage.setItem("correctPercentage", response.data.correctPercentage);
      localStorage.setItem("wrongCount", response.data.wrongCount);
      return navigate("/exam/answer");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingAnimation />
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Yakuniy Imtihon</h1>
            <span className="text-sm text-gray-600">
              Test: {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {getCurrentQuestion() && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              {selectedAnswers[getCurrentQuestion()._id] && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>

            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {getCurrentQuestion().question}
            </h2>

            <div className="space-y-3">
              {getCurrentQuestion().options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswerSelect(getCurrentQuestion()._id, option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start space-x-3
                    ${
                      selectedAnswers[getCurrentQuestion()._id] === option
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50"
                    }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    ${
                      selectedAnswers[getCurrentQuestion()._id] === option
                        ? "border-indigo-500 text-indigo-500"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span className="text-gray-700">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedAnswers[getCurrentQuestion()?._id]}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 
              ${
                selectedAnswers[getCurrentQuestion()?._id]
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {currentPage < totalPages ? "Keyingi" : "Tugatish"}
            <ChevronRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
