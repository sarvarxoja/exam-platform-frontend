import React from 'react';
import { Trophy, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

export const TestResults = () => {
  const correctPercentage = localStorage.getItem("correctPercentage")
  const correctCount = localStorage.getItem("correctCount")
  const result = {
    score: 75,
    totalQuestions: 20,
    correctAnswers: 15,
    passed: true,
    advice: "Algoritmlarga ko'proq e'tibor berish kerak. Masalalar yechishni ko'paytiring."
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  function getIntegerPart(num) {
  return Math.trunc(num);
}

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Test Natijasi</h2>
        </div>
        
        <div className="p-6">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chap tomon - Asosiy natija */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <span className={`text-4xl lg:text-5xl font-bold ${getScoreColor(correctPercentage)}`}>
                    {getIntegerPart(correctPercentage)}%
                  </span>
                </div>
              </div>
            </div>

            {/* O'ng tomon - Batafsil ma'lumotlar */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-700 text-lg">To'g'ri javoblar</span>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  <span className="text-gray-900 text-lg">{correctCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pastki qism - Maslahat */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-700 text-lg mb-2">Qo'shimcha</h4>
                <p className="text-blue-600 text-lg">
                  Siz bilan tez orada bizning xodimlarimiz bog'lanishadi 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};