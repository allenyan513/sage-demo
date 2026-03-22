"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain, User, Globe, Upload, Tag, Eye, ArrowLeft, ArrowRight,
  Check, Shield, BookOpen, Youtube, Twitter, Mic, GraduationCap,
  FileText, Lock, DollarSign, ChevronDown, Linkedin, Search as SearchIcon,
  ExternalLink, X, Plus, Info
} from "lucide-react";

const STEPS = [
  { title: "Identity Verification", subtitle: "Confirm who you are", Icon: Shield },
  { title: "Public Data Sources", subtitle: "Authorize knowledge extraction", Icon: Globe },
  { title: "Private Knowledge", subtitle: "Upload proprietary content", Icon: Lock },
  { title: "Category & Pricing", subtitle: "Set your terms", Icon: Tag },
  { title: "Preview & Submit", subtitle: "Review your mentor profile", Icon: Eye },
];

const DATA_SOURCES = [
  { id: "scholar", label: "Google Scholar", Icon: GraduationCap, desc: "Papers, citations, h-index", color: "blue" },
  { id: "website", label: "Personal Website / Blog", Icon: Globe, desc: "Articles, bio, portfolio", color: "emerald" },
  { id: "youtube", label: "YouTube Channel", Icon: Youtube, desc: "Talks, lectures, interviews", color: "red" },
  { id: "twitter", label: "Twitter / X", Icon: Twitter, desc: "Threads, opinions, insights", color: "sky" },
  { id: "podcast", label: "Podcast Appearances", Icon: Mic, desc: "Episodes, transcripts", color: "purple" },
  { id: "linkedin", label: "LinkedIn", Icon: Linkedin, desc: "Career history, endorsements", color: "blue" },
];

const INDUSTRY_TAGS = [
  "Computer Science", "Artificial Intelligence", "Machine Learning", "Cybersecurity",
  "Data Science", "Software Engineering", "Business Strategy", "Entrepreneurship",
  "Finance & Investing", "Healthcare & Medicine", "Education", "Law & Policy",
  "Marketing & Growth", "Design & UX", "Blockchain & Web3", "Climate & Energy",
];

const PRICING_MODELS = [
  { id: "free", label: "Free", desc: "Open access, build reputation", price: "$0", icon: "🌱" },
  { id: "subscription", label: "Subscription", desc: "Monthly recurring access", price: "$9.99/mo", icon: "💎" },
  { id: "per-session", label: "Per Session", desc: "Pay per conversation", price: "$2.99/chat", icon: "⚡" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", institution: "", title: "", linkedinUrl: "",
  });
  const [selectedSources, setSelectedSources] = useState([]);
  const [sourceUrls, setSourceUrls] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pricingModel, setPricingModel] = useState("free");
  const [chatQuota, setChatQuota] = useState("unlimited");
  const [agreedTerms, setAgreedTerms] = useState(false);

  const toggleSource = (id) =>
    setSelectedSources((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleTag = (tag) =>
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleSubmit = () => {
    router.push("/onboarding/success");
  };

  const canProceed = () => {
    if (step === 0) return form.name && form.email && form.institution;
    if (step === 1) return selectedSources.length > 0;
    if (step === 3) return selectedTags.length > 0;
    if (step === 4) return agreedTerms;
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Mentora</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2 py-0.5 rounded-full ml-1">
                Mentor Portal
              </span>
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                  i < step ? "bg-emerald-600 text-white" :
                  i === step ? "bg-emerald-600 text-white ring-4 ring-emerald-100" :
                  "bg-gray-200 text-gray-500"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-colors ${i < step ? "bg-emerald-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              {(() => { const Icon = STEPS[step].Icon; return <Icon className="w-5 h-5 text-emerald-600" />; })()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{STEPS[step].title}</h1>
              <p className="text-sm text-gray-500">{STEPS[step].subtitle} — Step {step + 1} of {STEPS.length}</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 animate-fade-in">

          {/* Step 1: Identity */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800">We verify every mentor's identity before publishing. Your information is kept secure and only used for verification.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="e.g. Dr. Jane Smith" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="jane.smith@university.edu" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution / Company *</label>
                <input type="text" value={form.institution} onChange={(e) => setForm({...form, institution: e.target.value})}
                  placeholder="e.g. Dalhousie University" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                  placeholder="e.g. Full Professor, Department of Computer Science" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="url" value={form.linkedinUrl} onChange={(e) => setForm({...form, linkedinUrl: e.target.value})}
                    placeholder="https://linkedin.com/in/janesmith" className="w-full border border-gray-200 rounded-lg pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG. Min 400x400px</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Data Sources */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">How it works</p>
                  <p className="text-sm text-blue-700 mt-1">Select the platforms where your public knowledge lives. Our AI will analyze and extract insights to build your digital mentor persona. You can review everything before it goes live.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DATA_SOURCES.map((src) => (
                  <button key={src.id} onClick={() => toggleSource(src.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedSources.includes(src.id)
                        ? "border-emerald-500 bg-emerald-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedSources.includes(src.id) ? "bg-emerald-100" : "bg-gray-100"
                      }`}>
                        <src.Icon className={`w-5 h-5 ${selectedSources.includes(src.id) ? "text-emerald-600" : "text-gray-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">{src.label}</p>
                          {selectedSources.includes(src.id) && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{src.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedSources.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700">Provide URLs for selected sources:</p>
                  {selectedSources.map((srcId) => {
                    const src = DATA_SOURCES.find((s) => s.id === srcId);
                    return (
                      <div key={srcId} className="flex items-center gap-3">
                        <src.Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <input type="url" placeholder={`${src.label} URL`}
                          value={sourceUrls[srcId] || ""}
                          onChange={(e) => setSourceUrls({...sourceUrls, [srcId]: e.target.value})}
                          className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-600">I authorize Mentora to access, analyze, and use my publicly available content from the selected sources to create my digital mentor profile. I can revoke access at any time.</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Private Data */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">Private & Secure</p>
                  <p className="text-sm text-amber-700 mt-1">These materials are encrypted and never shared publicly. They enrich your AI mentor's knowledge beyond what's publicly available.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Upload documents (optional)</p>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700">Drag & drop files here</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOCX, TXT, MD — Max 50MB per file</p>
                  <button className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Suggested content types:</p>
                {[
                  { label: "Course Syllabi & Lecture Notes", desc: "Help students understand your teaching approach" },
                  { label: "Unpublished Research & Working Papers", desc: "Share cutting-edge insights not yet public" },
                  { label: "Industry Reports & Analysis", desc: "Proprietary market or technical analysis" },
                  { label: "Personal Playbooks & Frameworks", desc: "Your unique methodologies and mental models" },
                  { label: "Mentorship Q&A Archive", desc: "Past advice you've given to mentees" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated uploaded files */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">CS_4001_Syllabus_2025.pdf</p>
                    <p className="text-xs text-gray-500">2.4 MB — Uploaded just now</p>
                  </div>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Mentorship_Framework_v3.docx</p>
                    <p className="text-xs text-gray-500">890 KB — Uploaded just now</p>
                  </div>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Category & Pricing */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Select your expertise areas *</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_TAGS.map((tag) => (
                    <button key={tag} onClick={() => toggleTag(tag)}
                      className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedTags.includes(tag) ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Choose your pricing model</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRICING_MODELS.map((pm) => (
                    <button key={pm.id} onClick={() => setPricingModel(pm.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        pricingModel === pm.id
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                      <span className="text-2xl">{pm.icon}</span>
                      <p className="font-bold text-gray-900 mt-2">{pm.label}</p>
                      <p className="text-emerald-600 font-semibold text-sm">{pm.price}</p>
                      <p className="text-xs text-gray-500 mt-1">{pm.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Monthly chat quota</p>
                <div className="flex gap-3">
                  {[
                    { id: "unlimited", label: "Unlimited" },
                    { id: "100", label: "100 chats" },
                    { id: "50", label: "50 chats" },
                    { id: "20", label: "20 chats" },
                  ].map((q) => (
                    <button key={q.id} onClick={() => setChatQuota(q.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        chatQuota === q.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Revenue Split</p>
                    <p className="text-xs text-gray-500 mt-0.5">You receive 70% of subscription revenue</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">70 / 30</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preview & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <p className="text-sm text-gray-500">Here's how your mentor card will appear to users</p>
              </div>

              {/* Card Preview */}
              <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {form.name ? form.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "??"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{form.name || "Your Name"}</h3>
                        <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">New</span>
                      </div>
                      <p className="text-sm text-gray-600">{form.title || "Your Title"}</p>
                      <p className="text-xs text-gray-500">{form.institution || "Your Institution"}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                    {selectedTags.length > 3 && (
                      <span className="text-xs text-gray-400">+{selectedTags.length - 3} more</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {selectedSources.length} data source{selectedSources.length !== 1 ? "s" : ""} connected
                    </span>
                    <span className="text-xs text-emerald-600 font-medium">
                      {PRICING_MODELS.find((p) => p.id === pricingModel)?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Submission Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Data Sources</span>
                      <span className="text-gray-900 font-medium">{selectedSources.map((id) => DATA_SOURCES.find((s) => s.id === id)?.label).join(", ") || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Private Documents</span>
                      <span className="text-gray-900 font-medium">2 files uploaded</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Categories</span>
                      <span className="text-gray-900 font-medium">{selectedTags.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pricing</span>
                      <span className="text-gray-900 font-medium">{PRICING_MODELS.find((p) => p.id === pricingModel)?.label} — {PRICING_MODELS.find((p) => p.id === pricingModel)?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Chat Quota</span>
                      <span className="text-gray-900 font-medium">{chatQuota === "unlimited" ? "Unlimited" : `${chatQuota}/month`}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-600">I agree to the Mentora Mentor Terms of Service. I confirm that I am authorized to share the provided content and that my profile information is accurate. I understand that my submission will be reviewed before going live.</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={() => step > 0 ? setStep(step - 1) : router.push("/")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5">
            <ArrowLeft className="w-4 h-4" />
            {step > 0 ? "Back" : "Cancel"}
          </button>
          <button
            onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : handleSubmit()}
            disabled={!canProceed()}
            className={`flex items-center gap-2 font-medium px-6 py-2.5 rounded-xl text-sm transition-colors ${
              canProceed()
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}>
            {step < STEPS.length - 1 ? (
              <>Continue <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Submit for Review <Check className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
