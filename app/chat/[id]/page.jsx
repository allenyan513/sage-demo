"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Send, Brain, BookOpen, Clock, Shield, FileText,
  Sparkles, User,
} from "lucide-react";
import { getMentor } from "@/lib/mentors";
import { RITA_SUGGESTIONS, RITA_RESPONSES, GENERIC_RESPONSE } from "@/lib/chat-data";
import Avatar from "@/components/Avatar";
import Paywall from "@/components/Paywall";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const mentor = getMentor(params.id);

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const chatRef = useRef(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  if (!mentor) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Mentor not found.</p>
      </div>
    );
  }

  const isRita = mentor.id === "rita-orji";
  const suggestions = isRita ? RITA_SUGGESTIONS : [
    `What's your best career advice?`,
    `How did you get to where you are?`,
    `What skills should I develop?`,
  ];

  const sendMessage = (text) => {
    if (!text.trim() || isTyping) return;

    if (msgCount >= 3) {
      setShowPaywall(true);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputVal("");
    setMsgCount((c) => c + 1);
    setIsTyping(true);

    const idx = responseIndex.current;
    const response = isRita ? (RITA_RESPONSES[idx] || RITA_RESPONSES[2]) : GENERIC_RESPONSE;

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", ...response }]);
      setIsTyping(false);
      responseIndex.current += 1;
    }, 1200 + Math.random() * 800);
  };

  // Collect all sources and personalization from messages
  const allSources = messages.filter((m) => m.sources?.length).flatMap((m) => m.sources);
  const allPersonalized = messages.filter((m) => m.personalized?.length).flatMap((m) => m.personalized);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => router.push("/")} className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Avatar mentor={mentor} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{mentor.name}</p>
            <p className="text-xs text-gray-500 truncate">{mentor.title}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
          </div>
        </div>
        {/* Mode Tabs */}
        <div className="flex gap-1 px-4 pb-2">
          {["Career Advice", "Research", "Life Philosophy"].map((mode, i) => (
            <button
              key={mode}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                i === 0 ? "bg-emerald-100 text-emerald-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── Left Panel: Mentor Profile ─── */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-100 overflow-y-auto flex-shrink-0 custom-scrollbar">
          <div className="p-5">
            <div className="text-center mb-5">
              <Avatar mentor={mentor} size="xl" />
              <h3 className="font-bold text-gray-900 mt-3">{mentor.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{mentor.title}</p>
              <p className="text-xs text-gray-400">{mentor.org}</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Knowledge Base</span>
              </div>
              <p className="text-xs text-emerald-600">{mentor.dataPoints}</p>
              {isRita && <p className="text-xs text-gray-500 mt-1">Stanford Top 2% Scientist</p>}
            </div>

            {mentor.education && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Career Timeline</h4>
                <div className="space-y-3">
                  {mentor.education.map((e, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5" />
                        {i < mentor.education.length - 1 && <div className="w-px flex-1 bg-emerald-200 mt-1" />}
                      </div>
                      <div className="pb-3">
                        <span className="text-xs font-semibold text-emerald-600">{e.year}</span>
                        <p className="text-xs text-gray-600 leading-snug">{e.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mentor.keyPapers && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Publications</h4>
                {mentor.keyPapers.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5">
                    <FileText className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600">{p}</p>
                  </div>
                ))}
              </div>
            )}

            {mentor.quotes && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Philosophy</h4>
                {mentor.quotes.slice(0, 2).map((q, i) => (
                  <blockquote key={i} className="text-xs text-gray-500 italic border-l-2 border-emerald-300 pl-2.5 py-1.5 mb-2">
                    &quot;{q}&quot;
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ─── Main Chat ─── */}
        <main className="flex-1 flex flex-col min-w-0">
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {/* Welcome */}
            <div className="text-center mb-8 pt-4 animate-fade-in">
              <Avatar mentor={mentor} size="lg" />
              <h2 className="font-bold text-gray-900 text-lg mt-3">Chat with {mentor.name}</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                {mentor.bio || mentor.tagline}
              </p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {mentor.dataPoints}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Available 24/7</span>
              </div>
            </div>

            {/* Suggestions (only show before first message) */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6 animate-fade-in">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-sm text-gray-700 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className="animate-fade-in">
                {msg.role === "user" ? (
                  <div className="flex justify-end mb-4">
                    <div className="bg-emerald-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-lg text-sm leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 mb-5">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                      {mentor.avatar}
                    </div>
                    <div className="flex-1 max-w-2xl">
                      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                          {msg.text}
                        </div>
                      </div>
                      {msg.sources?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.sources.map((s, j) => (
                            <span key={j} className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                              <FileText className="w-3 h-3" /> {s.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 mb-5">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {mentor.avatar}
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1.5 py-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full typing-dot" />
                    <span className="w-2 h-2 bg-gray-300 rounded-full typing-dot" />
                    <span className="w-2 h-2 bg-gray-300 rounded-full typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 p-4">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(inputVal)}
                placeholder={`Ask ${mentor.name.split(" ")[0]} anything...`}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                onClick={() => sendMessage(inputVal)}
                disabled={isTyping}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl px-4 py-3 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              Responses generated from {mentor.name}&apos;s published work and public data. {msgCount}/3 free messages used.
            </p>
          </div>
        </main>

        {/* ─── Right Panel: Context ─── */}
        <aside className="hidden xl:block w-64 bg-white border-l border-gray-100 overflow-y-auto flex-shrink-0 custom-scrollbar">
          <div className="p-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">About You</h4>
            <div className="space-y-2 mb-6">
              {["CS Year 2, Dalhousie", "Goal: Research career", "Challenge: Burnout"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
                  <User className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-blue-700">{item}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sources Referenced</h4>
            <div className="space-y-2 mb-6">
              {allSources.length > 0 ? (
                allSources.slice(-5).map((s, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5">
                    <FileText className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">Sources will appear here as you chat.</p>
              )}
            </div>

            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Personalization</h4>
            <div className="space-y-2">
              {allPersonalized.length > 0 ? (
                allPersonalized.slice(-4).map((p, i) => (
                  <div key={i} className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-700">{p}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">Personalization insights will appear here.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
