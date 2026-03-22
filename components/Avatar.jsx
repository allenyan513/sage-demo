"use client";

const SIZES = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-lg",
  lg: "w-20 h-20 text-2xl",
  xl: "w-28 h-28 text-4xl",
};

export default function Avatar({ mentor, size = "md" }) {
  return (
    <div
      className={`${SIZES[size]} ${mentor.avatarColor} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {mentor.avatar}
    </div>
  );
}
