import React, { useEffect, useState } from 'react';

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      if (elapsed < duration) {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => setShow(false), 200);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4F46E5] rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="relative w-96 flex flex-col items-center gap-8">
        {/* Main circular progress */}
        <div className="relative w-48 h-48">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-4 h-4 bg-[#4F46E5] rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-sm" />
          </div>
          
          {/* Progress circles */}
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              className="text-black/5"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="69"
              cx="96"
              cy="96"
            />
            {/* Main progress circle */}
            <circle
              className="text-[#4F46E5]"
              strokeWidth="10"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="69"
              cx="96"
              cy="96"
              strokeDasharray={`${2 * Math.PI * 69}`}
              strokeDashoffset={`${2 * Math.PI * 69 * (1 - progress / 100)}`}
              style={{
                transition: 'stroke-dashoffset 0.1s ease'
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-4xl font-bold text-[#4F46E5]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-2xl font-medium text-black/70">
          Yuklanmoqda...
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#4F46E5]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[#4F46E5]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`;
document.head.appendChild(style);

export default LoadingAnimation;