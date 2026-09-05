import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';
import { CRISIS_NUMBERS } from '../../constants';

export const PublicFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">TeenTalk</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An academic and institutional web initiative fostering adolescent safety, cyber awareness, emotional
              wellbeing, and confidential harassment redressal.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>Confidential & End-to-End Encrypted Redressal</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/modules" className="hover:text-teal-400 transition-colors">
                  Safety Modules
                </Link>
              </li>
              <li>
                <Link to="/file-complaint" className="hover:text-teal-400 transition-colors">
                  File Confidential Complaint
                </Link>
              </li>
              <li>
                <Link to="/track-complaint" className="hover:text-teal-400 transition-colors">
                  Track Incident Status
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  Platform Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Role Portals</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">
                  Teen Learner Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">
                  Parent / Guardian Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">
                  School Admin Console
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">
                  POSH Internal Committee (IC)
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">
                  NGO & Counselor Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: 24/7 Crisis Helpline */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Emergency Hotlines</h4>
            <ul className="space-y-3">
              {CRISIS_NUMBERS.slice(0, 3).map((item) => (
                <li key={item.number} className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                    <span className="text-xs font-bold text-rose-400">{item.number}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 TeenTalk Academic Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" /> by Team TeenTalk
            (Payal, Tejas, Nisha, Harshada)
          </div>
        </div>
      </div>
    </footer>
  );
};
