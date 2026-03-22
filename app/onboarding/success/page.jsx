"use client";

import Link from "next/link";
import { Brain, CheckCircle, Clock, Mail, ArrowRight, Shield } from "lucide-react";

export default function OnboardingSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Mentora</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="animate-slide-up">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
          <p className="text-gray-500 text-lg mb-8">
            Your mentor profile is now in our review queue. Our team will verify your identity and content.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Review Timeline</p>
                <p className="text-sm text-gray-500">Typically 1–3 business days. Complex profiles may take up to 5 days.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email Notification</p>
                <p className="text-sm text-gray-500">You'll receive an email once your profile is approved or if we need additional information.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">What We Review</p>
                <p className="text-sm text-gray-500">Identity verification, content quality, data source accessibility, and compliance with our community guidelines.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/admin"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              View Admin Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/"
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-xl text-sm transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
