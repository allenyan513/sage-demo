"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain, Users, MessageSquare, Shield, CheckCircle, XCircle, Clock,
  ChevronRight, Eye, Search, Filter, MoreHorizontal, Send,
  ArrowLeft, User, Star, AlertCircle, TrendingUp, BarChart3,
  ExternalLink, Check, X as XIcon
} from "lucide-react";

// Mock data for pending reviews
const PENDING_REVIEWS = [
  {
    id: "app-001",
    name: "Dr. Emily Zhang",
    title: "Associate Professor, AI Ethics",
    institution: "University of Toronto",
    email: "e.zhang@utoronto.ca",
    avatar: "EZ",
    avatarColor: "bg-violet-600",
    submittedAt: "2 hours ago",
    sources: ["Google Scholar", "Personal Website", "YouTube"],
    tags: ["AI Ethics", "Machine Learning", "Policy"],
    pricing: "Subscription — $9.99/mo",
    documents: 3,
    status: "pending",
  },
  {
    id: "app-002",
    name: "Marcus Johnson",
    title: "VP of Engineering",
    institution: "Shopify",
    email: "m.johnson@shopify.com",
    avatar: "MJ",
    avatarColor: "bg-orange-600",
    submittedAt: "5 hours ago",
    sources: ["LinkedIn", "Twitter / X", "Podcast Appearances"],
    tags: ["Software Engineering", "Leadership", "Startups"],
    pricing: "Per Session — $2.99/chat",
    documents: 1,
    status: "pending",
  },
  {
    id: "app-003",
    name: "Dr. Sarah Kim",
    title: "Research Scientist",
    institution: "DeepMind",
    email: "s.kim@deepmind.com",
    avatar: "SK",
    avatarColor: "bg-pink-600",
    submittedAt: "1 day ago",
    sources: ["Google Scholar", "Personal Website"],
    tags: ["Deep Learning", "Reinforcement Learning", "AI Safety"],
    pricing: "Free",
    documents: 5,
    status: "pending",
  },
];

// Mock chat logs
const CHAT_LOGS = [
  {
    mentorId: "rita-orji",
    mentorName: "Dr. Rita Orji",
    mentorAvatar: "RO",
    mentorColor: "bg-emerald-600",
    conversations: [
      {
        id: "conv-001",
        userName: "Alex Chen",
        userAvatar: "AC",
        lastMessage: "How do I transition from web dev to HCI research?",
        time: "10 min ago",
        messages: 5,
        flagged: false,
        needsHumanReply: true,
      },
      {
        id: "conv-002",
        userName: "Maria Santos",
        userAvatar: "MS",
        lastMessage: "What conferences should I target for my first paper?",
        time: "2 hours ago",
        messages: 8,
        flagged: false,
        needsHumanReply: false,
      },
      {
        id: "conv-003",
        userName: "James Liu",
        userAvatar: "JL",
        lastMessage: "I'm struggling with my PhD motivation...",
        time: "5 hours ago",
        messages: 12,
        flagged: true,
        needsHumanReply: true,
      },
    ],
  },
  {
    mentorId: "stan-matwin",
    mentorName: "Prof. Stan Matwin",
    mentorAvatar: "SM",
    mentorColor: "bg-blue-700",
    conversations: [
      {
        id: "conv-004",
        userName: "Emma Wilson",
        userAvatar: "EW",
        lastMessage: "Best approach for imbalanced datasets in NLP?",
        time: "1 hour ago",
        messages: 4,
        flagged: false,
        needsHumanReply: false,
      },
    ],
  },
];

// Mock conversation detail
const MOCK_MESSAGES = [
  { role: "user", text: "Hi Dr. Orji, I've been doing web development for 3 years but I'm really interested in moving into HCI research. How do I make that transition?", time: "10:32 AM" },
  { role: "ai", text: "That's a fantastic question, and your web development background is actually a strong asset for HCI research! Many of the best HCI researchers I know started in industry. Here's what I'd suggest:\n\n1. Start reading papers from CHI, CSCW, and UIST conferences\n2. Identify a specific HCI area that excites you (interaction design, accessibility, persuasive tech, etc.)\n3. Look for Master's or PhD programs with faculty whose work aligns with your interests\n4. Consider building research prototypes using your dev skills\n\nYour practical experience gives you a unique edge in building functional research systems.", time: "10:32 AM", isAi: true },
  { role: "user", text: "That's really helpful. But I'm worried about the academic gap — I don't have any publications. Is it too late to start at 27?", time: "10:35 AM" },
  { role: "ai", text: "Absolutely not! 27 is not late at all. I started my PhD at a similar stage, and many successful HCI researchers came from industry backgrounds.\n\nFor the publications gap, here are some practical steps:\n- Attend local HCI meetups or workshops\n- Volunteer as a student volunteer at CHI or related conferences\n- Reach out to professors whose work interests you — many welcome collaboration with industry professionals\n- Consider writing a workshop paper or a poster as your first entry\n\nThe key is to start somewhere. Your industry experience actually makes your research perspective more grounded and practical.", time: "10:35 AM", isAi: true },
  { role: "user", text: "How do I transition from web dev to HCI research? I want to apply to grad schools but I need guidance on building a research portfolio.", time: "10:41 AM" },
];

const TABS = [
  { id: "reviews", label: "Review Queue", Icon: Shield, count: 3 },
  { id: "mentors", label: "Active Mentors", Icon: Users, count: 11 },
  { id: "chats", label: "Chat Logs", Icon: MessageSquare, count: 24 },
  { id: "stats", label: "Analytics", Icon: BarChart3 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedConv, setSelectedConv] = useState(null);
  const [humanReply, setHumanReply] = useState("");
  const [reviews, setReviews] = useState(PENDING_REVIEWS);
  const [approvedToast, setApprovedToast] = useState(null);

  const handleApprove = (id) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: "approved" } : r));
    setSelectedReview(null);
    setApprovedToast(reviews.find((r) => r.id === id)?.name);
    setTimeout(() => setApprovedToast(null), 3000);
  };

  const handleReject = (id) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" } : r));
    setSelectedReview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {approvedToast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-up">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{approvedToast} has been approved and is now live!</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Mentora</span>
              </Link>
              <span className="text-xs bg-gray-800 text-white font-medium px-2 py-0.5 rounded-full ml-1">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ExternalLink className="w-4 h-4" /> View Site
              </Link>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pending Reviews", value: reviews.filter((r) => r.status === "pending").length, color: "amber", Icon: Clock },
            { label: "Active Mentors", value: "11", color: "emerald", Icon: Users },
            { label: "Total Conversations", value: "1,247", color: "blue", Icon: MessageSquare },
            { label: "Revenue (MTD)", value: "$4,280", color: "emerald", Icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.Icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 mb-6">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedReview(null); setSelectedConv(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.id ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}>
              <tab.Icon className="w-4 h-4" />
              {tab.label}
              {tab.count && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-white/20" : "bg-gray-100"
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Review Queue Tab */}
        {activeTab === "reviews" && !selectedReview && (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id}
                className={`bg-white rounded-xl border p-5 transition-all ${
                  review.status === "approved" ? "border-emerald-200 bg-emerald-50/30" :
                  review.status === "rejected" ? "border-red-200 bg-red-50/30 opacity-60" :
                  "border-gray-200 hover:border-emerald-300 hover:shadow-sm cursor-pointer"
                }`}
                onClick={() => review.status === "pending" && setSelectedReview(review)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${review.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{review.name}</h3>
                        {review.status === "approved" && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Approved
                          </span>
                        )}
                        {review.status === "rejected" && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Rejected</span>
                        )}
                        {review.status === "pending" && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{review.title} — {review.institution}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400">Submitted {review.submittedAt}</span>
                        <span className="text-xs text-gray-400">{review.sources.length} sources</span>
                        <span className="text-xs text-gray-400">{review.documents} docs</span>
                      </div>
                    </div>
                  </div>
                  {review.status === "pending" && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Detail */}
        {activeTab === "reviews" && selectedReview && (
          <div className="animate-fade-in">
            <button onClick={() => setSelectedReview(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Queue
            </button>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${selectedReview.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {selectedReview.avatar}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedReview.name}</h2>
                      <p className="text-gray-600">{selectedReview.title}</p>
                      <p className="text-sm text-gray-500">{selectedReview.institution} · {selectedReview.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Data Sources</h3>
                  <div className="space-y-2">
                    {selectedReview.sources.map((src) => (
                      <div key={src} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-700">{src}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Expertise Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReview.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Pricing</h3>
                  <p className="text-sm text-gray-900">{selectedReview.pricing}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Uploaded Documents</h3>
                  <p className="text-sm text-gray-900">{selectedReview.documents} file(s)</p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
                <button onClick={() => handleReject(selectedReview.id)}
                  className="flex items-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
                <button onClick={() => handleApprove(selectedReview.id)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors">
                  <CheckCircle className="w-4 h-4" /> Approve & Publish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Mentors Tab */}
        {activeTab === "mentors" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Mentor</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Conversations</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Revenue</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Dr. Rita Orji", org: "Dalhousie", avatar: "RO", color: "bg-emerald-600", status: "Active", convs: 342, revenue: "$1,240", rating: 4.9 },
                    { name: "Prof. Stan Matwin", org: "Dalhousie", avatar: "SM", color: "bg-blue-700", status: "Active", convs: 198, revenue: "$890", rating: 4.8 },
                    { name: "Dr. Srini Sampalli", org: "Dalhousie", avatar: "SS", color: "bg-indigo-600", status: "Active", convs: 156, revenue: "$640", rating: 4.9 },
                    { name: "Satya Nadella", org: "Microsoft", avatar: "SN", color: "bg-sky-700", status: "Active", convs: 89, revenue: "$420", rating: 4.7 },
                    { name: "Jensen Huang", org: "NVIDIA", avatar: "JH", color: "bg-green-700", status: "Active", convs: 124, revenue: "$580", rating: 4.8 },
                    { name: "Sam Altman", org: "OpenAI", avatar: "SA", color: "bg-teal-700", status: "Active", convs: 201, revenue: "$510", rating: 4.6 },
                    { name: "Dr. Emily Zhang", org: "U of Toronto", avatar: "EZ", color: "bg-violet-600", status: "New", convs: 0, revenue: "$0", rating: "—" },
                  ].map((m) => (
                    <tr key={m.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 ${m.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{m.avatar}</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{m.name}</p>
                            <p className="text-xs text-gray-500">{m.org}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          m.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                          m.status === "New" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>{m.status}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-900">{m.convs}</td>
                      <td className="px-5 py-3 text-sm text-gray-900">{m.revenue}</td>
                      <td className="px-5 py-3 text-sm text-gray-900 flex items-center gap-1">
                        {m.rating !== "—" && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                        {m.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Chat Logs Tab */}
        {activeTab === "chats" && !selectedConv && (
          <div className="space-y-4">
            {CHAT_LOGS.map((mentor) => (
              <div key={mentor.mentorId}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 ${mentor.mentorColor} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {mentor.mentorAvatar}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{mentor.mentorName}</h3>
                  <span className="text-xs text-gray-400">{mentor.conversations.length} conversation(s)</span>
                </div>
                <div className="space-y-2 ml-11">
                  {mentor.conversations.map((conv) => (
                    <button key={conv.id} onClick={() => setSelectedConv({ ...conv, mentor })}
                      className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-emerald-300 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                            {conv.userAvatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{conv.userName}</p>
                              {conv.flagged && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> Flagged
                                </span>
                              )}
                              {conv.needsHumanReply && (
                                <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">Needs Human Reply</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{conv.lastMessage}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xs text-gray-400">{conv.time}</p>
                          <p className="text-xs text-gray-400">{conv.messages} msgs</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Detail with Human Reply */}
        {activeTab === "chats" && selectedConv && (
          <div className="animate-fade-in">
            <button onClick={() => setSelectedConv(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Chat Logs
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Chat Messages */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ maxHeight: "70vh" }}>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${selectedConv.mentor.mentorColor} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                      {selectedConv.mentor.mentorAvatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{selectedConv.mentor.mentorName}</p>
                      <p className="text-xs text-gray-500">Conversation with {selectedConv.userName}</p>
                    </div>
                  </div>
                  {selectedConv.flagged && (
                    <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Flagged for Review
                    </span>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {MOCK_MESSAGES.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        msg.role === "user" ? "bg-gray-200 text-gray-600" : `${selectedConv.mentor.mentorColor} text-white`
                      }`}>
                        {msg.role === "user" ? selectedConv.userAvatar : selectedConv.mentor.mentorAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-700">
                            {msg.role === "user" ? selectedConv.userName : selectedConv.mentor.mentorName}
                          </span>
                          {msg.isAi && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">AI</span>}
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-800 whitespace-pre-line">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Human Reply Input */}
                <div className="p-4 border-t border-gray-100 bg-amber-50">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">Reply as {selectedConv.mentor.mentorName} (Human)</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={humanReply} onChange={(e) => setHumanReply(e.target.value)}
                      placeholder="Type a human response to this conversation..."
                      className="flex-1 border border-amber-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white" />
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span className="text-sm font-medium">Send</span>
                    </button>
                  </div>
                  <p className="text-xs text-amber-600 mt-2">This message will be marked as a verified human reply from the real mentor.</p>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">User Profile</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                        {selectedConv.userAvatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedConv.userName}</p>
                        <p className="text-xs text-gray-500">CS Year 3 · Dalhousie</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100 space-y-1">
                      <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Goal:</span> HCI Research</p>
                      <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Plan:</span> Pro ($9.99/mo)</p>
                      <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Messages:</span> {selectedConv.messages} in this session</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Conversation Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" /> Flag as Sensitive
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" /> Mark as Reviewed
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" /> Star Conversation
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">AI Quality Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Relevance</span>
                      <span className="font-medium text-emerald-600">94%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Accuracy</span>
                      <span className="font-medium text-emerald-600">91%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tone Match</span>
                      <span className="font-medium text-amber-600">87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Top Mentors by Conversations</h3>
              <div className="space-y-3">
                {[
                  { name: "Dr. Rita Orji", count: 342, pct: 100 },
                  { name: "Sam Altman", count: 201, pct: 59 },
                  { name: "Prof. Stan Matwin", count: 198, pct: 58 },
                  { name: "Dr. Srini Sampalli", count: 156, pct: 46 },
                  { name: "Jensen Huang", count: 124, pct: 36 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Platform Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: "Avg. Messages per Session", value: "6.3" },
                  { label: "Avg. Session Duration", value: "12 min" },
                  { label: "User Satisfaction", value: "4.7/5" },
                  { label: "Human Reply Rate", value: "8%" },
                  { label: "Pro Conversion Rate", value: "23%" },
                  { label: "Monthly Active Users", value: "847" },
                ].map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
