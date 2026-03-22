"use client";

import { Lock, Check, X } from "lucide-react";

export default function Paywall({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Unlimited Mentorship</h2>
          <p className="text-gray-500 mb-6">
            You&apos;ve used your 3 free messages. Upgrade to keep the conversation going.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 text-left">
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-2">Free</p>
              <p className="text-2xl font-bold text-gray-900">$0</p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-500">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-gray-400" /> 3 msgs / month</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-gray-400" /> Browse mentors</li>
                <li className="flex items-center gap-1.5"><X className="w-3.5 h-3.5 text-gray-300" /> Source refs</li>
                <li className="flex items-center gap-1.5"><X className="w-3.5 h-3.5 text-gray-300" /> Memory</li>
              </ul>
            </div>
            <div className="border-2 border-emerald-500 rounded-xl p-4 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Popular
              </span>
              <p className="font-semibold text-gray-900 mb-2">Pro</p>
              <p className="text-2xl font-bold text-gray-900">
                $9.99<span className="text-sm font-normal text-gray-400">/mo</span>
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Unlimited msgs</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> All mentors</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Source refs</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Memory</li>
              </ul>
            </div>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors">
            Upgrade to Pro — $9.99/mo
          </button>
          <button onClick={onClose} className="mt-3 text-sm text-gray-400 hover:text-gray-600 block mx-auto">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
