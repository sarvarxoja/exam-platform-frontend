import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ExamQuestions = () => {
  const questionsPerPage = 10;
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

  // Jami sahifalar soni
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Hozirgi sahifadagi savollarni olish
  const getCurrentQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    return questions.slice(startIndex, startIndex + questionsPerPage);
  };

  const handleAnswerSelect = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedOption: optionText, // To'g'ridan-to'g'ri variant matnini saqlaymiz
      },
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    const answersPayload = {
      answers: Object.entries(selectedAnswers).map(([questionId, answer]) => ({
        questionId,
        selectedOption: answer.selectedOption,
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
        "http://localhost:2310/results/create",
        data
      );
      localStorage.setItem("check", true);
      localStorage.setItem("correctCount", response.data.correctCount)
      localStorage.setItem("correctPercentage", response.data.correctPercentage)
      localStorage.setItem("wrongCount", response.data.wrongCount)
      return navigate("/exam/answer");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Yakuniy Imtihon</h1>
            <span className="text-sm text-gray-600">
              Sahifa: {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {getCurrentQuestions().map((question) => (
            <div
              key={question._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                {selectedAnswers[question._id] && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>

              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(question._id, option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start space-x-3
      ${
        selectedAnswers[question._id]?.selectedOption === option
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50"
      }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
      ${
        selectedAnswers[question._id]?.selectedOption === option
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
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 
              ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Oldingi</span>
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 
                  ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentPage < totalPages ? (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <span>Keyingi</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5"
            >
              Tugatish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
