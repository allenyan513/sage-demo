"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Brain, User, Sparkles, ChevronRight, GraduationCap, Briefcase, Zap, Star, Plus, Shield, Upload, UserCircle, MessageSquare, Target, ArrowRight } from "lucide-react";
import { MENTORS, CATEGORIES } from "@/lib/mentors";
import MentorCard from "@/components/MentorCard";
import ProfileModal from "@/components/ProfileModal";

const CATEGORY_ICONS = {
  all: Sparkles,
  dalhousie: GraduationCap,
  local: Briefcase,
  bigtech: Zap,
  legends: Star,
};

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const filtered = MENTORS.filter((m) => {
    const matchCat = category === "all" || m.category === category;
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      m.org.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Mentora</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2 py-0.5 rounded-full ml-1">
                Beta
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/onboarding"
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Become a Mentor
              </Link>
              <button
                onClick={() => setShowProfile(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Build Your Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Your Personal Aristotle</h1>
          <p className="text-emerald-100 text-lg max-w-xl mb-8">
            AI-powered Digital Mentors built from real people&apos;s knowledge, experiences, and values.
            Get personalized 1-on-1 guidance, anytime.
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors by name, expertise, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/95 text-gray-900 placeholder-gray-400 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Onboarding Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-5">
        <button
          onClick={() => setShowProfile(true)}
          className="w-full bg-white border border-emerald-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Tell Mentora about yourself for personalized mentorship</p>
              <p className="text-xs text-gray-500">Share your goals, challenges, and background to get tailored advice</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" /> {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Become a Mentor CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <Link href="/onboarding"
          className="block bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-5 text-white hover:from-emerald-700 hover:to-teal-700 transition-all hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Are you a thought leader, professor, or industry expert?</p>
                <p className="text-emerald-100 text-sm">Create your AI mentor persona and reach thousands of mentees worldwide</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-emerald-200 flex-shrink-0 hidden sm:block" />
          </div>
        </Link>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No mentors found matching your search.</p>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-10">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-center text-lg font-bold text-gray-900 mb-1">How Mentora Works</h2>
            <p className="text-center text-sm text-gray-500 mb-8">Dual-context AI mentorship in four steps</p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-0 relative">
              {/* Connector arrows — desktop only */}
              <div className="hidden sm:block absolute top-8 left-[25%] right-[25%] h-[2px]">
                <div className="flex items-center justify-between h-full px-6">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex-1 flex items-center">
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-300 to-emerald-400" />
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 -ml-0.5 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center px-2">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3 relative z-10">
                  <Upload className="w-7 h-7 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 mb-1">Step 1</span>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Expert Uploads Knowledge</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Mentors contribute approved materials, frameworks, and decision-making style</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center px-2">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-3 relative z-10">
                  <UserCircle className="w-7 h-7 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-600 mb-1">Step 2</span>
                <h3 className="text-sm font-bold text-gray-900 mb-1">You Share Your Context</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Background, goals, constraints, and current challenges shape your experience</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center px-2">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-3 relative z-10">
                  <MessageSquare className="w-7 h-7 text-purple-600" />
                </div>
                <span className="text-xs font-semibold text-purple-600 mb-1">Step 3</span>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Choose Your Mentor</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Pick the expert perspective that matches your needs and trusted judgment style</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center px-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-3 relative z-10">
                  <Target className="w-7 h-7 text-amber-600" />
                </div>
                <span className="text-xs font-semibold text-amber-600 mb-1">Step 4</span>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Get Tailored Guidance</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Dual-context reasoning delivers advice shaped by expert insight and your situation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Link */}
        <div className="text-center pt-8 border-t border-gray-200 mt-8">
          <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
