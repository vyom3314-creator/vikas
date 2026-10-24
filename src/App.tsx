/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  DraftMessageInput,
  PortfolioData,
} from './types/portfolio';
import {
  DEFAULT_PORTFOLIO_DATA,
  toggleSkillProficiency,
  BLUEPRINT_LIMITS,
} from './utils/portfolioLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { RotateCcw, Check } from 'lucide-react';
import {
  db,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  OperationType,
  handleFirestoreError,
} from './firebase';

const STORAGE_KEY = 'dev_portfolio_custom_state_v2';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PORTFOLIO_DATA, ...parsed };
      }
    } catch {
      // Fallback to default data if localStorage is unavailable
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hasCustomChanges, setHasCustomChanges] = useState(false);

  // Load public portfolio profile from Firestore (/portfolios/main) if available
  useEffect(() => {
    let cancelled = false;
    async function fetchCloudProfile() {
      const path = 'portfolios/main';
      try {
        const snap = await getDoc(doc(db, 'portfolios', 'main'));
        if (!cancelled && snap.exists()) {
          const data = snap.data();
          setPortfolioData((prev) => ({
            ...prev,
            name: typeof data.name === 'string' ? data.name : prev.name,
            roleHeadline:
              typeof data.roleHeadline === 'string'
                ? data.roleHeadline
                : prev.roleHeadline,
            heroIntro:
              typeof data.heroIntro === 'string' ? data.heroIntro : prev.heroIntro,
            contact: {
              email:
                typeof data.contactEmail === 'string'
                  ? data.contactEmail
                  : prev.contact.email,
              github:
                typeof data.githubUrl === 'string'
                  ? data.githubUrl
                  : prev.contact.github,
              linkedin:
                typeof data.linkedinUrl === 'string'
                  ? data.linkedinUrl
                  : prev.contact.linkedin,
            },
          }));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, path);
      }
    }
    fetchCloudProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const serialized = JSON.stringify(portfolioData);
      const isDifferent =
        serialized !== JSON.stringify(DEFAULT_PORTFOLIO_DATA);
      setHasCustomChanges(isDifferent);
      if (isDifferent) {
        localStorage.setItem(STORAGE_KEY, serialized);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [portfolioData]);

  const handleUpdateField = <K extends keyof PortfolioData>(
    field: K,
    value: PortfolioData[K]
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleSkillLevel = (skillId: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: toggleSkillProficiency(prev.skills, skillId),
    }));
  };

  const handleResetDefaults = () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    setIsEditing(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleSubmitCloudInquiry = async (input: DraftMessageInput) => {
    const randomSuffix = Math.random().toString(36).slice(2, 10);
    const inquiryId = `inq_${Date.now()}_${randomSuffix}`.replace(
      /[^a-zA-Z0-9_\-]/g,
      '_'
    );
    const path = `inquiries/${inquiryId}`;
    try {
      await setDoc(doc(db, 'inquiries', inquiryId), {
        name: input.senderName.trim().slice(0, BLUEPRINT_LIMITS.NAME_MAX_LEN),
        email: input.senderEmail
          .trim()
          .slice(0, BLUEPRINT_LIMITS.EMAIL_MAX_LEN),
        subject: input.subject.trim().slice(0, BLUEPRINT_LIMITS.SUBJECT_MAX_LEN),
        message: input.message.trim().slice(0, BLUEPRINT_LIMITS.MESSAGE_MAX_LEN),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col selection:bg-violet-600/40 selection:text-white">
      <Navbar
        name={portfolioData.name}
        contactEmail={portfolioData.contact.email}
      />

      {/* Contextual Customization Mode Bar */}
      {isEditing && (
        <div
          role="region"
          aria-label="Portfolio Customization Controls"
          className="bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-purple-950/90 border-b border-violet-500/40 px-6 py-2.5"
        >
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-200">
              <strong className="font-semibold text-white">
                Customization Mode Active:
              </strong>{' '}
              Edit your details below. Changes save locally in your browser.
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              {hasCustomChanges && (
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 smooth-gpu cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                  <span>Reset Defaults</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-violet-600 hover:bg-violet-500 text-white font-semibold smooth-gpu cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Finish Editing</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        <HeroSection
          data={portfolioData}
          isEditing={isEditing}
          onUpdateField={handleUpdateField}
          onEnableEdit={() => setIsEditing(true)}
        />

        <AboutSection
          biography={portfolioData.biography}
          education={portfolioData.education}
          isEditing={isEditing}
          onUpdateField={handleUpdateField}
          onEnableEdit={() => setIsEditing(true)}
        />

        <SkillsSection
          skills={portfolioData.skills}
          isEditing={isEditing}
          onToggleSkillLevel={handleToggleSkillLevel}
        />

        <ProjectsSection
          projects={portfolioData.projects}
          isEditing={isEditing}
          onUpdateField={handleUpdateField}
        />

        <ContactSection
          contact={portfolioData.contact}
          isEditing={isEditing}
          onUpdateField={handleUpdateField}
          onEnableEdit={() => setIsEditing(true)}
          onSubmitCloudInquiry={handleSubmitCloudInquiry}
        />
      </main>

      <Footer
        name={portfolioData.name}
        contact={portfolioData.contact}
        hasCustomChanges={hasCustomChanges}
        onResetDefaults={handleResetDefaults}
      />

      <ScrollToTopButton />
    </div>
  );
}
