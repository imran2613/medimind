import React from 'react';
import { ShieldAlert, AlertTriangle, PhoneCall, Hospital } from 'lucide-react';

interface EmergencyBannerProps {
  alert?: {
    isCritical: boolean;
    title: string;
    description: string;
    triggerBiomarkers: string[];
    actionRequired: string;
  };
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ alert }) => {
  if (!alert || !alert.isCritical) return null;

  return (
    <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-5 mb-6 shadow-md animate-pulse">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-rose-600 rounded-xl text-white shadow-md shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white uppercase tracking-wider">
                Emergency Triage Alert
              </span>
              <span className="text-rose-700 text-xs font-bold">Immediate ER Protocol Required</span>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-rose-900 mt-1">
              {alert.title}
            </h3>
            <p className="text-sm text-rose-800 mt-1 max-w-3xl leading-relaxed font-medium">
              {alert.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {alert.triggerBiomarkers.map((b, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-white text-rose-700 border border-rose-300 shadow-2xs"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
          <a
            href="tel:108"
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 108 (Ambulance)</span>
          </a>
          <div className="px-4 py-2.5 rounded-xl bg-white border border-rose-300 text-rose-800 text-xs text-center flex items-center justify-center gap-1.5 font-bold">
            <Hospital className="w-4 h-4 text-rose-600" />
            <span>Proceed to Emergency Room</span>
          </div>
        </div>
      </div>
    </div>
  );
};
