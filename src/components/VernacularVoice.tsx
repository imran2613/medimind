import React, { useState, useEffect } from 'react';
import { Volume2, Globe, Sparkles, Square } from 'lucide-react';
import { ttsService } from '../services/ttsService';
import type { SupportedLang } from '../services/ttsService';

interface VernacularVoiceProps {
  vernacular: {
    en: { text: string; simple: string };
    hi: { text: string; simple: string; title: string };
    te: { text: string; simple: string; title: string };
  };
}

export const VernacularVoice: React.FC<VernacularVoiceProps> = ({ vernacular }) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLang>('en');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  const handleToggleSpeak = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
      return;
    }

    const currentData = vernacular[selectedLang];
    const textToSpeak = currentData.simple || currentData.text;

    setIsPlaying(true);
    ttsService.speak(
      textToSpeak,
      selectedLang,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const currentData = vernacular[selectedLang];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Vernacular Audio Explainer ("Explain Like I'm 10")
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Regional Voice
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Zero medical jargon. Native voice read-out in Telugu, Hindi, or English for rural patients and elderly family members.
            </p>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              ttsService.stop();
              setIsPlaying(false);
              setSelectedLang('en');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedLang === 'en'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              ttsService.stop();
              setIsPlaying(false);
              setSelectedLang('hi');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedLang === 'hi'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी (Hindi)
          </button>
          <button
            onClick={() => {
              ttsService.stop();
              setIsPlaying(false);
              setSelectedLang('te');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedLang === 'te'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            తెలుగు (Telugu)
          </button>
        </div>
      </div>

      {/* Main Audio & Text Card */}
      <div className="mt-5 p-5 rounded-xl bg-purple-50/50 border border-purple-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wide">
                {'title' in currentData ? (currentData as any).title : 'Plain Language Audio Script'}
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-800 font-medium leading-relaxed">
              "{currentData.simple}"
            </p>
          </div>

          {/* Audio Speaker Button */}
          <div className="shrink-0 flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-md ${
                isPlaying
                  ? 'bg-rose-600 text-white shadow-rose-500/30 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20 hover:scale-105'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>
                    Listen in {selectedLang === 'hi' ? 'Hindi' : selectedLang === 'te' ? 'Telugu' : 'English'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated wave bars when playing */}
        {isPlaying && (
          <div className="flex items-center justify-center space-x-1 pt-4 mt-3 border-t border-purple-200">
            <span className="text-xs text-purple-700 font-semibold mr-2">Speaking aloud...</span>
            <div className="w-1.5 h-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-5 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-4 bg-purple-600 rounded-full animate-bounce" />
            <div className="w-1.5 h-6 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.2s]" />
          </div>
        )}
      </div>
    </div>
  );
};
