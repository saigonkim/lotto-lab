"use client";

interface LottoBallProps {
  number: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  delay?: number;
}

function getBallStyle(num: number): string {
  if (num <= 10) return "bg-yellow-400 text-yellow-900 shadow-yellow-200";
  if (num <= 20) return "bg-blue-500 text-white shadow-blue-200";
  if (num <= 30) return "bg-red-500 text-white shadow-red-200";
  if (num <= 40) return "bg-gray-500 text-white shadow-gray-200";
  return "bg-green-500 text-white shadow-green-200";
}

const sizeMap = {
  sm: "w-8 h-8 text-sm font-bold",
  md: "w-12 h-12 text-base font-bold",
  lg: "w-16 h-16 text-xl font-bold",
};

export default function LottoBall({
  number,
  size = "lg",
  animate = false,
  delay = 0,
}: LottoBallProps) {
  return (
    <div
      className={`
        ${sizeMap[size]}
        ${getBallStyle(number)}
        rounded-full flex items-center justify-center
        shadow-lg select-none
        ${animate ? "animate-bounce-in" : ""}
      `}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      {String(number).padStart(2, "0")}
    </div>
  );
}
