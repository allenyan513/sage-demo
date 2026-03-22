"use client";

import { useState } from "react";
import { X, User, TrendingUp, Upload, MessageSquare, ExternalLink } from "lucide-react";

const STEPS = [
  {
    title: "Basic Info",
    Icon: User,
    fields: [
      { label: "Name", placeholder: "Your full name" },
      { label: "School", placeholder: "e.g. Dalhousie University" },
      { label: "Program", placeholder: "e.g. Computer Science" },
      { label: "Year", placeholder: "e.g. 2nd year" },
    ],
  },
  {
    title: "Goals & Challenges",
    Icon: TrendingUp,
    tags: [
      "Career Direction", "Burnout & Stress", "Skill Gaps", "Research Guidance",
      "Networking", "Work-Life Balance", "Imposter Syndrome", "Interview Prep",
      "Graduate School", "Entrepreneurship",
    ],
  },
  {
    title: "Data Import",
    Icon: Upload,
    imports: [
      { label: "Upload personal data (ZIP)", Icon: Upload, desc: "Journals, notes, transcripts" },
      { label: "Import ChatGPT history", Icon: MessageSquare, desc: "Connect your OpenAI account" },
      { label: "Connect LinkedIn", Icon: ExternalLink, desc: "Import career & education data" },
    ],
  },
];

export default function ProfileModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const current = STEPS[step];

  const toggleTag = (tag) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        {/* Progress bar */}
        <div className="flex gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-emerald-500" : "bg-gray-200"}`} />
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <current.Icon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{current.title}</h2>
            <p className="text-sm text-gray-500">Step {step + 1} of {STEPS.length}</p>
          </div>
        </div>

        {/* Step 1 */}
        {current.fields && (
          <div className="space-y-4">
            {current.fields.map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        )}

        {/* Step 2 */}
        {current.tags && (
          <div className="flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag) ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {current.imports && (
          <div className="space-y-3">
            {current.imports.map((imp) => (
              <button
                key={imp.label}
                className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <imp.Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{imp.label}</p>
                  <p className="text-xs text-gray-500">{imp.desc}</p>
                </div>
              </button>
            ))}
            <p className="text-xs text-gray-400 text-center mt-2">
              All data is encrypted and only used to personalize your mentorship.
            </p>
          </div>
        )}

        {/* Nav */}
        <div className="flex justify-between mt-8">
          <button onClick={() => (step > 0 ? setStep(step - 1) : onClose())} className="text-sm text-gray-500 hover:text-gray-700">
            {step > 0 ? "Back" : "Skip for now"}
          </button>
          <button
            onClick={() => (step < STEPS.length - 1 ? setStep(step + 1) : onClose())}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            {step < STEPS.length - 1 ? "Continue" : "Complete Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
