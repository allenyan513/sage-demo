"use client";

const SIZES = {
  sm: { container: "w-10 h-10 text-sm", imgSize: 40 },
  md: { container: "w-14 h-14 text-lg", imgSize: 56 },
  lg: { container: "w-20 h-20 text-2xl", imgSize: 80 },
  xl: { container: "w-28 h-28 text-4xl", imgSize: 112 },
};

export default function Avatar({ mentor, size = "md" }) {
  const { container } = SIZES[size];

  if (mentor.image) {
    return (
      <img
        src={mentor.image}
        alt={mentor.name}
        className={`${container} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${container} ${mentor.avatarColor} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {mentor.avatar}
    </div>
  );
}
