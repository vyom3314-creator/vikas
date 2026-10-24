import React, { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  RefreshCw,
  Layers,
  BrainCircuit,
  FileSpreadsheet,
  FileCode2,
  Palette,
  Braces,
  Atom,
  Server,
  Database,
  GitBranch,
  FolderGit2,
  Terminal,
  Code2,
} from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import {
  SkillFilter,
  filterSkills,
  countSkillsByLevel,
} from '../utils/portfolioLogic';

interface SkillsSectionProps {
  skills: SkillItem[];
  isEditing: boolean;
  onToggleSkillLevel: (skillId: string) => void;
}

function getSkillIcon(skillId: string) {
  switch (skillId) {
    case 'fullstack':
      return Layers;
    case 'aiml':
      return BrainCircuit;
    case 'msoffice':
      return FileSpreadsheet;
    case 'html':
      return FileCode2;
    case 'css':
      return Palette;
    case 'javascript':
      return Braces;
    case 'react':
      return Atom;
    case 'nodejs':
      return Server;
    case 'sql':
      return Database;
    case 'git':
      return GitBranch;
    case 'github':
      return FolderGit2;
    case 'python':
      return Terminal;
    default:
      return Code2;
  }
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isEditing,
  onToggleSkillLevel,
}) => {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('All');
  const filteredSkills = filterSkills(skills, activeFilter);
  const counts = countSkillsByLevel(skills);

  const filterButtons: { label: string; value: SkillFilter; count: number }[] = [
    { label: 'All Skills', value: 'All', count: counts.total },
    { label: 'Proficient', value: 'Proficient', count: counts.proficient },
    { label: 'Learning', value: 'Learning', count: counts.learning },
  ];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 py-20 md:py-24 border-b border-slate-800/80 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-mono text-violet-400 tracking-wide">
              Core Competencies &amp; Active Learning Roadmap
            </p>
            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1"
            >
              02. Technical Skills
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-[62ch]">
              Accurate breakdown of current technical proficiency across frontend, backend, database, version control, productivity, and AI/ML technologies.
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented Button Group) */}
          <div
            role="group"
            aria-label="Filter skills by proficiency level"
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-start md:self-auto"
          >
            {filterButtons.map((btn) => {
              const isSelected = activeFilter === btn.value;
              return (
                <button
                  key={btn.value}
                  type="button"
                  onClick={() => setActiveFilter(btn.value)}
                  aria-pressed={isSelected}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold smooth-gpu whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{btn.label}</span>{' '}
                  <span className="font-mono opacity-85">({btn.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const isProficient = skill.level === 'Proficient';
            const SkillIcon = getSkillIcon(skill.id);
            return (
              <article
                key={skill.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1120] to-[#080B14] border border-slate-800/90 hover:border-slate-700 smooth-gpu flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-400">{skill.category}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 font-semibold ${
                        isProficient ? 'text-indigo-300' : 'text-purple-300'
                      }`}
                    >
                      {isProficient ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                      ) : (
                        <Compass className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
                      )}
                      <span>{skill.level}</span>
                    </span>
                  </div>

                  {/* Skill Title with Monochrome Tech Stack Icon */}
                  <h3 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 shrink-0"
                      aria-hidden="true"
                    >
                      <SkillIcon className="w-4 h-4 text-slate-300" />
                    </span>
                    <span>{skill.name}</span>
                  </h3>

                  {/* Skill Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {skill.summary}
                  </p>
                </div>

                {/* Architectural Mastery Meter + Optional Customize Toggle */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>
                      Status:{' '}
                      <strong className="text-slate-200 font-medium">
                        {isProficient ? 'Proficient — Production Ready' : 'Learning — Active Study'}
                      </strong>
                    </span>
                  </div>

                  <div
                    className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-full rounded-full ${
                        isProficient
                          ? 'w-4/5 bg-gradient-to-r from-blue-500 to-indigo-400'
                          : 'w-2/5 bg-gradient-to-r from-purple-500 to-violet-400'
                      }`}
                    />
                  </div>

                  {isEditing && (
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onToggleSkillLevel(skill.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-violet-300 hover:text-white smooth-gpu cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" aria-hidden="true" />
                        <span>
                          Switch {skill.name} to{' '}
                          {isProficient ? 'Learning' : 'Proficient'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
