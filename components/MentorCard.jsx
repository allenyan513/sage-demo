"use client";

import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import Avatar from "./Avatar";

export default function MentorCard({ mentor }) {
  return (
    <Link
      href={`/chat/${mentor.id}`}
      className="bg-white rounded-xl p-5 text-left hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-emerald-200 hover:-translate-y-0.5 group block"
    >
      <div className="flex items-start gap-4">
        <Avatar mentor={mentor} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-base truncate">{mentor.name}</h3>
            {mentor.featured && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">
            {mentor.title} · {mentor.org}
          </p>
          <p className="text-sm text-gray-700 mt-1.5 line-clamp-2">{mentor.tagline}</p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {mentor.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> {mentor.dataPoints}
            </span>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Chat now <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
