import React from 'react';
import { BookOpen, GraduationCap, Plus, Trash2, Edit3 } from 'lucide-react';
import { EducationItem, PortfolioData } from '../types/portfolio';

interface AboutSectionProps {
  biography: string[];
  education: EducationItem[];
  isEditing: boolean;
  onUpdateField: <K extends keyof PortfolioData>(field: K, value: PortfolioData[K]) => void;
  onEnableEdit: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  biography,
  education,
  isEditing,
  onUpdateField,
  onEnableEdit,
}) => {
  const handleBioChange = (index: number, value: string) => {
    const updated = [...biography];
    updated[index] = value;
    onUpdateField('biography', updated);
  };

  const handleAddBioParagraph = () => {
    onUpdateField('biography', [
      ...biography,
      'Add another paragraph highlighting your academic projects, hackathons, or software engineering goals.',
    ]);
  };

  const handleRemoveBioParagraph = (index: number) => {
    if (biography.length <= 1) return;
    onUpdateField(
      'biography',
      biography.filter((_, i) => i !== index)
    );
  };

  const handleEducationChange = (
    id: string,
    field: keyof EducationItem,
    value: string
  ) => {
    const updated = education.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdateField('education', updated);
  };

  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '[Degree / Certification Title]',
      institution: '[Institution Name]',
      period: '[Start Year – End Year]',
      details: 'Describe relevant coursework, honors, or academic focus.',
    };
    onUpdateField('education', [...education, newItem]);
  };

  const handleRemoveEducation = (id: string) => {
    if (education.length <= 1) return;
    onUpdateField(
      'education',
      education.filter((item) => item.id !== id)
    );
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-20 md:py-24 border-b border-slate-800/80 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-mono text-violet-400 tracking-wide">
              Background &amp; Academic Foundation
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1"
            >
              01. About Me
            </h2>
          </div>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-white">
                  Developer Biography
                </h3>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                {biography.map((paragraph, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`bio-paragraph-${index}`}
                        className="text-xs font-mono text-slate-400"
                      >
                        Biography Paragraph {index + 1}
                      </label>
                      {biography.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBioParagraph(index)}
                          aria-label={`Remove biography paragraph ${index + 1}`}
                          className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                    <textarea
                      id={`bio-paragraph-${index}`}
                      rows={4}
                      value={paragraph}
                      onChange={(e) => handleBioChange(index, e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050508] border border-slate-700 text-sm text-slate-100 leading-relaxed focus:outline-none focus:border-violet-500"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddBioParagraph}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 smooth-gpu cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                  <span>Add Biography Paragraph</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                {biography.map((paragraph, index) => (
                  <p key={index} className="max-w-[68ch]">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Key Engineering Values Summary */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800/80">
                <div className="text-xs font-mono text-blue-400">Primary Engineering Focus</div>
                <div className="text-sm font-semibold text-white mt-1">
                  Full-Stack Web Applications
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  End-to-end development from semantic HTML/React interfaces to Node.js and SQL databases.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800/80">
                <div className="text-xs font-mono text-purple-400">Research &amp; Exploration</div>
                <div className="text-sm font-semibold text-white mt-1">
                  Python &amp; Applied AI/ML
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Building foundational fluency in machine learning workflows, data analysis, and model evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editable Education Placeholders */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-white">
                  Education &amp; Academic Timeline
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {education.length} {education.length === 1 ? 'Entry' : 'Entries'}
              </span>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <article
                  key={edu.id}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1120] to-[#0D0B18] border border-slate-800/90 space-y-3"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-violet-300">
                          Education Entry #{index + 1}
                        </span>
                        {education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEducation(edu.id)}
                            aria-label={`Remove education entry ${index + 1}`}
                            className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor={`edu-degree-${edu.id}`}
                          className="block text-xs text-slate-400 mb-1"
                        >
                          Degree / Program
                        </label>
                        <input
                          id={`edu-degree-${edu.id}`}
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(edu.id, 'degree', e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-sm text-white font-medium focus:outline-none focus:border-violet-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`edu-inst-${edu.id}`}
                            className="block text-xs text-slate-400 mb-1"
                          >
                            Institution / University
                          </label>
                          <input
                            id={`edu-inst-${edu.id}`}
                            type="text"
                            value={edu.institution}
                            onChange={(e) =>
                              handleEducationChange(edu.id, 'institution', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`edu-period-${edu.id}`}
                            className="block text-xs text-slate-400 mb-1"
                          >
                            Timeline / Graduation Year
                          </label>
                          <input
                            id={`edu-period-${edu.id}`}
                            type="text"
                            value={edu.period}
                            onChange={(e) =>
                              handleEducationChange(edu.id, 'period', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-violet-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`edu-details-${edu.id}`}
                          className="block text-xs text-slate-400 mb-1"
                        >
                          Coursework &amp; Highlights
                        </label>
                        <textarea
                          id={`edu-details-${edu.id}`}
                          rows={2}
                          value={edu.details}
                          onChange={(e) =>
                            handleEducationChange(edu.id, 'details', e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-xs text-slate-300 leading-relaxed focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-violet-300">
                        <span>{edu.institution}</span>
                        <span aria-hidden="true">·</span>
                        <span>{edu.period}</span>
                      </div>

                      <h4 className="font-display text-lg font-semibold text-white">
                        {edu.degree}
                      </h4>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {edu.details}
                      </p>
                    </>
                  )}
                </article>
              ))}

              {isEditing && (
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 smooth-gpu cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                  <span>Add Education Entry</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
