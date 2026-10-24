import React from 'react';
import { RotateCcw } from 'lucide-react';
import { ContactInfo } from '../types/portfolio';
import { isConfiguredUrl } from '../utils/portfolioLogic';

interface FooterProps {
  name: string;
  contact: ContactInfo;
  hasCustomChanges: boolean;
  onResetDefaults: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  contact,
  hasCustomChanges,
  onResetDefaults,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040407] py-12 text-slate-400">
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <a
              href="#home"
              className="font-display text-lg font-bold text-white tracking-tight hover:text-violet-300 smooth-gpu"
            >
              {name}
            </a>
            <p className="text-xs text-slate-400 mt-1">
              Aspiring Full Stack Developer | AI/ML Enthusiast
            </p>
          </div>

          {/* Section Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#home" className="hover:text-white smooth-gpu">
              Home
            </a>
            <a href="#about" className="hover:text-white smooth-gpu">
              About
            </a>
            <a href="#skills" className="hover:text-white smooth-gpu">
              Skills
            </a>
            <a href="#projects" className="hover:text-white smooth-gpu">
              Projects
            </a>
            <a href="#contact" className="hover:text-white smooth-gpu">
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-300 hover:text-violet-300 smooth-gpu"
            >
              Email
            </a>
            <span aria-hidden="true" className="text-slate-700">
              ·
            </span>
            {isConfiguredUrl(contact.github) ? (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-violet-300 smooth-gpu"
              >
                GitHub
              </a>
            ) : (
              <a href="#contact" className="text-slate-400 hover:text-slate-200 smooth-gpu">
                GitHub
              </a>
            )}
            <span aria-hidden="true" className="text-slate-700">
              ·
            </span>
            {isConfiguredUrl(contact.linkedin) ? (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-violet-300 smooth-gpu"
              >
                LinkedIn
              </a>
            ) : (
              <a href="#contact" className="text-slate-400 hover:text-slate-200 smooth-gpu">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {name}. All rights reserved.
          </p>

          {hasCustomChanges && (
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
              <span>Reset Custom Portfolio Edits to Defaults</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
