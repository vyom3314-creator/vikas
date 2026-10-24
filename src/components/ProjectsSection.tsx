import React, { useState } from 'react';
import {
  ExternalLink,
  GitBranch,
  Sliders,
  X,
  Check,
  Code2,
  ShoppingBag,
  Layout,
} from 'lucide-react';
import { ProjectItem, PortfolioData } from '../types/portfolio';
import { isConfiguredUrl } from '../utils/portfolioLogic';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  isEditing: boolean;
  onUpdateField: <K extends keyof PortfolioData>(
    field: K,
    value: PortfolioData[K]
  ) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isEditing,
  onUpdateField,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || null;

  const handleProjectChange = (
    projectId: string,
    field: keyof ProjectItem,
    value: string | string[]
  ) => {
    const updated = projects.map((project) =>
      project.id === projectId ? { ...project, [field]: value } : project
    );
    onUpdateField('projects', updated);
  };

  const renderProjectArtwork = (visualType: ProjectItem['visualType'], title: string) => {
    if (visualType === 'codequest') {
      return (
        <svg
          viewBox="0 0 480 260"
          className="w-full h-full object-cover"
          role="img"
          aria-label={`${title} algorithmic coding platform preview`}
        >
          <defs>
            <linearGradient id="cqBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#070B19" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
            <linearGradient id="cqAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <rect width="480" height="260" fill="url(#cqBg)" />
          {/* Window Frame */}
          <rect
            x="28"
            y="24"
            width="424"
            height="212"
            rx="10"
            fill="#050508"
            stroke="#1E293B"
            strokeWidth="1.5"
          />
          <line x1="28" y1="52" x2="452" y2="52" stroke="#1E293B" strokeWidth="1" />
          <circle cx="46" cy="38" r="4" fill="#334155" />
          <circle cx="60" cy="38" r="4" fill="#334155" />
          <circle cx="74" cy="38" r="4" fill="#334155" />
          <text x="240" y="42" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="monospace">
            CODEQUEST — Algorithm Workspace
          </text>
          {/* Split Pane */}
          <line x1="210" y1="52" x2="210" y2="236" stroke="#1E293B" strokeWidth="1" />
          {/* Left Problem Prompt Lines */}
          <rect x="44" y="70" width="90" height="10" rx="3" fill="url(#cqAccent)" />
          <rect x="44" y="92" width="145" height="6" rx="2" fill="#334155" />
          <rect x="44" y="106" width="130" height="6" rx="2" fill="#334155" />
          <rect x="44" y="120" width="140" height="6" rx="2" fill="#334155" />
          {/* Graph Tree Visualization */}
          <circle cx="85" cy="170" r="12" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="145" cy="155" r="12" fill="#3B0764" stroke="#C084FC" strokeWidth="1.5" />
          <circle cx="145" cy="195" r="12" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <line x1="97" y1="166" x2="133" y2="158" stroke="#60A5FA" strokeWidth="1.5" />
          <line x1="97" y1="174" x2="133" y2="191" stroke="#64748B" strokeWidth="1.5" />
          {/* Right Code Editor Pane */}
          <rect x="228" y="70" width="110" height="7" rx="2" fill="#60A5FA" opacity="0.8" />
          <rect x="242" y="88" width="160" height="7" rx="2" fill="#94A3B8" opacity="0.5" />
          <rect x="256" y="106" width="140" height="7" rx="2" fill="#C084FC" opacity="0.8" />
          <rect x="256" y="124" width="170" height="7" rx="2" fill="#94A3B8" opacity="0.4" />
          <rect x="242" y="142" width="95" height="7" rx="2" fill="#60A5FA" opacity="0.7" />
          {/* Execution Output Box */}
          <rect
            x="228"
            y="174"
            width="204"
            height="44"
            rx="6"
            fill="#090D1A"
            stroke="#312E81"
            strokeWidth="1"
          />
          <text x="240" y="194" fill="#A5B4FC" fontSize="10" fontFamily="monospace">
            Time Complexity: O(V + E)
          </text>
          <text x="240" y="209" fill="#64748B" fontSize="9" fontFamily="monospace">
            All test suites validated
          </text>
        </svg>
      );
    }

    if (visualType === 'toyzy') {
      return (
        <svg
          viewBox="0 0 480 260"
          className="w-full h-full object-cover"
          role="img"
          aria-label={`${title} e-commerce catalog preview`}
        >
          <defs>
            <linearGradient id="twBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#090D1A" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#2E1065" />
            </linearGradient>
          </defs>
          <rect width="480" height="260" fill="url(#twBg)" />
          <rect
            x="28"
            y="24"
            width="424"
            height="212"
            rx="10"
            fill="#050508"
            stroke="#1E293B"
            strokeWidth="1.5"
          />
          {/* Storefront Header */}
          <rect x="46" y="42" width="90" height="10" rx="3" fill="#A78BFA" />
          <rect x="360" y="40" width="72" height="16" rx="4" fill="#1E3A8A" />
          <line x1="28" y1="68" x2="452" y2="68" stroke="#1E293B" strokeWidth="1" />
          {/* 3 Product Showcase Cards */}
          {[0, 1, 2].map((idx) => {
            const xOffset = 46 + idx * 134;
            return (
              <g key={idx}>
                <rect
                  x={xOffset}
                  y="84"
                  width="120"
                  height="134"
                  rx="8"
                  fill="#0B1120"
                  stroke="#1E293B"
                  strokeWidth="1"
                />
                <rect
                  x={xOffset + 10}
                  y="94"
                  width="100"
                  height="64"
                  rx="5"
                  fill={idx === 1 ? '#1E1B4B' : '#0F172A'}
                />
                {/* Geometric Toy Icon */}
                <polygon
                  points={`${xOffset + 60},104 ${xOffset + 80},144 ${xOffset + 40},144`}
                  fill={idx === 0 ? '#60A5FA' : idx === 1 ? '#C084FC' : '#818CF8'}
                  opacity="0.85"
                />
                <rect
                  x={xOffset + 10}
                  y="168"
                  width="70"
                  height="7"
                  rx="2"
                  fill="#E2E8F0"
                />
                <rect
                  x={xOffset + 10}
                  y="182"
                  width="48"
                  height="6"
                  rx="2"
                  fill="#64748B"
                />
                <rect
                  x={xOffset + 10}
                  y="196"
                  width="100"
                  height="12"
                  rx="3"
                  fill="#312E81"
                />
              </g>
            );
          })}
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 480 260"
        className="w-full h-full object-cover"
        role="img"
        aria-label={`${title} developer portfolio grid preview`}
      >
        <defs>
          <linearGradient id="pfBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050508" />
            <stop offset="50%" stopColor="#0B1120" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>
        <rect width="480" height="260" fill="url(#pfBg)" />
        <rect
          x="28"
          y="24"
          width="424"
          height="212"
          rx="10"
          fill="#070913"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        {/* Top Bar Contract Illustration */}
        <line x1="28" y1="54" x2="452" y2="54" stroke="#1E293B" strokeWidth="1" />
        <rect x="46" y="36" width="60" height="8" rx="2" fill="#F8FAFC" />
        <rect x="180" y="37" width="120" height="6" rx="2" fill="#64748B" />
        <rect x="374" y="34" width="60" height="12" rx="4" fill="#6D28D9" />
        {/* Hero Split */}
        <rect x="46" y="76" width="180" height="14" rx="3" fill="#F8FAFC" />
        <rect x="46" y="98" width="150" height="8" rx="2" fill="#818CF8" />
        <rect x="46" y="116" width="190" height="6" rx="2" fill="#475569" />
        <rect x="46" y="128" width="165" height="6" rx="2" fill="#475569" />
        <rect x="46" y="150" width="76" height="22" rx="5" fill="#2563EB" />
        <rect x="130" y="150" width="76" height="22" rx="5" fill="#1E293B" />
        {/* Right Architecture Box */}
        <rect
          x="266"
          y="74"
          width="166"
          height="104"
          rx="8"
          fill="#0B1120"
          stroke="#312E81"
          strokeWidth="1.5"
        />
        <line x1="286" y1="126" x2="412" y2="126" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="306" cy="126" r="14" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
        <circle cx="349" cy="126" r="14" fill="#312E81" stroke="#818CF8" strokeWidth="1.5" />
        <circle cx="392" cy="126" r="14" fill="#4C1D95" stroke="#C084FC" strokeWidth="1.5" />
        {/* Bottom KPI Strip */}
        <line x1="46" y1="196" x2="432" y2="196" stroke="#1E293B" strokeWidth="1" />
        <rect x="46" y="208" width="70" height="10" rx="2" fill="#334155" />
        <rect x="146" y="208" width="70" height="10" rx="2" fill="#334155" />
        <rect x="246" y="208" width="70" height="10" rx="2" fill="#334155" />
        <rect x="346" y="208" width="70" height="10" rx="2" fill="#334155" />
      </svg>
    );
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-20 md:py-24 border-b border-slate-800/80 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-mono text-violet-400 tracking-wide">
              Featured Software Engineering Work
            </p>
            <h2
              id="projects-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1"
            >
              03. Selected Projects
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-[65ch]">
              Explore CODEQUEST, Toyzy World, and this Portfolio. GitHub repository and Live Demo URLs are editable so you can attach your exact deployment links without hardcoded placeholders.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400 whitespace-nowrap shrink-0">
            {projects.length} Featured Projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project, index) => {
            const hasGithub = isConfiguredUrl(project.githubUrl);
            const hasLiveDemo = isConfiguredUrl(project.liveDemoUrl);

            return (
              <article
                key={project.id}
                className="rounded-2xl bg-gradient-to-b from-[#0B1120] via-[#090D18] to-[#0E091C] border border-slate-800/90 hover:border-slate-700 overflow-hidden flex flex-col justify-between smooth-gpu"
              >
                <div>
                  {/* Visual Preview Container */}
                  <div className="aspect-[16/9] w-full bg-[#050508] border-b border-slate-800/80 overflow-hidden relative group">
                    {renderProjectArtwork(project.visualType, project.title)}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Unboxed Editorial Number & Subtitle */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-violet-300">
                      <span>0{index + 1}. Project Showcase</span>
                      <span className="text-slate-400">
                        {project.technologies.length} Technologies
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        {project.visualType === 'codequest' && (
                          <Code2 className="w-5 h-5 text-blue-400 shrink-0" aria-hidden="true" />
                        )}
                        {project.visualType === 'toyzy' && (
                          <ShoppingBag className="w-5 h-5 text-purple-400 shrink-0" aria-hidden="true" />
                        )}
                        {project.visualType === 'portfolio' && (
                          <Layout className="w-5 h-5 text-indigo-400 shrink-0" aria-hidden="true" />
                        )}
                        <span>{project.title}</span>
                      </h3>
                      <p className="text-xs font-medium text-slate-300">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Unboxed Technology Metadata List (Zero-Pill Discipline) */}
                    <div className="pt-2">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">
                        Technology Stack:
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-indigo-300">
                        {project.technologies.map((tech, idx) => (
                          <React.Fragment key={tech}>
                            <span>{tech}</span>
                            {idx < project.technologies.length - 1 && (
                              <span aria-hidden="true" className="text-slate-600">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Inline URL Editing when Customize Mode is Active */}
                    {isEditing && (
                      <div className="pt-4 mt-4 border-t border-slate-800 space-y-3">
                        <div>
                          <label
                            htmlFor={`github-url-${project.id}`}
                            className="block text-xs font-mono text-slate-300 mb-1"
                          >
                            {project.title} GitHub URL
                          </label>
                          <input
                            id={`github-url-${project.id}`}
                            type="url"
                            value={project.githubUrl}
                            onChange={(e) =>
                              handleProjectChange(project.id, 'githubUrl', e.target.value)
                            }
                            placeholder="https://github.com/your-username/repo"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#050508] border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`demo-url-${project.id}`}
                            className="block text-xs font-mono text-slate-300 mb-1"
                          >
                            {project.title} Live Demo URL
                          </label>
                          <input
                            id={`demo-url-${project.id}`}
                            type="url"
                            value={project.liveDemoUrl}
                            onChange={(e) =>
                              handleProjectChange(project.id, 'liveDemoUrl', e.target.value)
                            }
                            placeholder="https://your-project-demo.example.com"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#050508] border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions (Single-Line Aligned) */}
                <div className="px-6 py-4 bg-[#060811] border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {hasGithub ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-white smooth-gpu whitespace-nowrap shrink-0"
                      >
                        <GitBranch className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-white smooth-gpu whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <GitBranch className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                        <span>GitHub</span>
                      </button>
                    )}

                    {hasLiveDemo ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/90 hover:bg-violet-500 text-xs font-medium text-white smooth-gpu whitespace-nowrap shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-white smooth-gpu whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                        <span>Live Demo</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProjectId(project.id)}
                    aria-label={`Inspect ${project.title} details and links`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 hover:text-white hover:bg-slate-900 smooth-gpu whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Edit Links</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Accessible Project Detail & Link Configuration Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-[#090D1A] border border-slate-700 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#050508]">
              <div>
                <span className="text-xs font-mono text-violet-400">
                  Project Overview &amp; Link Settings
                </span>
                <h3
                  id="project-modal-title"
                  className="font-display text-xl font-bold text-white"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                aria-label="Close project details modal"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div>
                <div className="text-xs font-mono text-slate-400">Subtitle</div>
                <p className="text-sm font-semibold text-slate-100 mt-0.5">
                  {selectedProject.subtitle}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">Project Summary</div>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">Architecture Notes</div>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">
                  {selectedProject.architectureNotes}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 mb-1">
                  Technologies Used (Comma-separated to edit)
                </div>
                <input
                  type="text"
                  aria-label={`${selectedProject.title} technologies`}
                  value={selectedProject.technologies.join(', ')}
                  onChange={(e) =>
                    handleProjectChange(
                      selectedProject.id,
                      'technologies',
                      e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#050508] border border-slate-700 text-xs font-mono text-indigo-300 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label
                    htmlFor="modal-github-url"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    GitHub Repository URL
                  </label>
                  <input
                    id="modal-github-url"
                    type="url"
                    value={selectedProject.githubUrl}
                    onChange={(e) =>
                      handleProjectChange(selectedProject.id, 'githubUrl', e.target.value)
                    }
                    placeholder="https://github.com/your-username/repo"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050508] border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-demo-url"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Live Demo URL
                  </label>
                  <input
                    id="modal-demo-url"
                    type="url"
                    value={selectedProject.liveDemoUrl}
                    onChange={(e) =>
                      handleProjectChange(selectedProject.id, 'liveDemoUrl', e.target.value)
                    }
                    placeholder="https://your-demo-url.example.com"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050508] border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#050508] border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Changes are saved automatically to your browser.
              </span>
              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white smooth-gpu cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Save &amp; Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
