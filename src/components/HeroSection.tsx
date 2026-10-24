import React, { useState } from 'react';
import { ArrowRight, Mail, Layers, Cpu, Database } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import {
  countSkillsByLevel,
  calculate3DTilt,
  calculateParallaxOffset,
} from '../utils/portfolioLogic';

interface HeroSectionProps {
  data: PortfolioData;
  isEditing: boolean;
  onUpdateField: <K extends keyof PortfolioData>(field: K, value: PortfolioData[K]) => void;
  onEnableEdit: () => void;
}

type ArchitectureTab = 'frontend' | 'backend' | 'aiml';

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  isEditing,
  onUpdateField,
}) => {
  const [activeLayer, setActiveLayer] = useState<ArchitectureTab>('frontend');
  const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [parallax, setParallax] = useState({
    shiftX: 0,
    shiftY: 0,
    spotlightX: 50,
    spotlightY: 50,
  });

  const skillCounts = countSkillsByLevel(data.skills);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setParallax(
      calculateParallaxOffset(
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height,
        18
      )
    );
  };

  const handleSectionMouseLeave = () => {
    setParallax({ shiftX: 0, shiftY: 0, spotlightX: 50, spotlightY: 50 });
    setHeroTilt({ rotateX: 0, rotateY: 0 });
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleHeroPointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroTilt(
      calculate3DTilt(
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height,
        9
      )
    );
  };

  const handleCardPointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardTilt(
      calculate3DTilt(
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height,
        8
      )
    );
  };

  const layers: Record<
    ArchitectureTab,
    {
      title: string;
      subtitle: string;
      stack: string;
      description: string;
      metrics: string;
    }
  > = {
    frontend: {
      title: 'Frontend Interface Layer',
      subtitle: 'Accessible Component Systems & Responsive Layouts',
      stack: 'React · JavaScript · HTML · CSS',
      description:
        'Crafting keyboard-accessible, responsive user interfaces with semantic HTML5, modern CSS Grid/Flexbox layouts, and modular React state architecture.',
      metrics: '4 Core Technologies · Proficient',
    },
    backend: {
      title: 'Backend & Persistence Layer',
      subtitle: 'APIs, Relational Queries & Version Control',
      stack: 'Node.js · SQL · Python · Git · GitHub',
      description:
        'Designing normalized relational database schemas in SQL, scripting in Python, managing collaborative Git workflows, and building Node.js backend services.',
      metrics: '5 Core Technologies · Active Stack',
    },
    aiml: {
      title: 'Intelligent Systems & AI/ML',
      subtitle: 'Data Workflows & Machine Learning Foundations',
      stack: 'Python · AI/ML · Data Modeling',
      description:
        'Exploring supervised and unsupervised learning algorithms, feature preprocessing pipelines, and practical integration of intelligent models into web apps.',
      metrics: 'Applied AI/ML · Continuous Learning',
    },
  };

  const currentLayer = layers[activeLayer];

  return (
    <section
      id="home"
      aria-label="Introduction and Hero"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      data-parallax-x={parallax.shiftX}
      data-parallax-y={parallax.shiftY}
      className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/80 hero-3d-perspective"
    >
      {/* Dynamic Mouse-Follow 3D Spotlight Layer */}
      <div
        aria-hidden="true"
        data-testid="hero-mouse-spotlight"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(560px circle at ${parallax.spotlightX}% ${parallax.spotlightY}%, rgba(99, 102, 241, 0.14), rgba(147, 51, 234, 0.06) 45%, transparent 75%)`,
        }}
      />

      {/* Multi-Depth Parallax Ambient Glows & 3D Geometric Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-blue-900/25 blur-[130px] smooth-gpu"
        style={{
          transform: `translate3d(${-parallax.shiftX * 1.2}px, ${-parallax.shiftY * 1.2}px, 0)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-1/6 w-[460px] h-[460px] rounded-full bg-purple-900/25 blur-[130px] smooth-gpu"
        style={{
          transform: `translate3d(${parallax.shiftX * 1.4}px, ${parallax.shiftY * 1.4}px, 0)`,
        }}
      />

      {/* Parallax 3D Wireframe Orbital Rings */}
      <div
        aria-hidden="true"
        data-testid="hero-parallax-orbit"
        className="pointer-events-none absolute top-8 left-12 hidden md:block smooth-gpu"
        style={{
          transform: `translate3d(${-parallax.shiftX * 1.6}px, ${-parallax.shiftY * 1.6}px, -40px)`,
        }}
      >
        <div className="w-72 h-72 rounded-full border border-indigo-500/20 orbit-ring-3d" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-10 hidden lg:block smooth-gpu"
        style={{
          transform: `translate3d(${parallax.shiftX * 1.8}px, ${parallax.shiftY * 1.5}px, -25px)`,
        }}
      >
        <div className="w-56 h-56 rounded-full border border-purple-500/20 orbit-ring-3d" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Interactive 3D Typographic Stage & Multi-Plane Parallax */}
          <div
            onMouseMove={handleHeroPointerMove}
            onMouseLeave={() => setHeroTilt({ rotateX: 0, rotateY: 0 })}
            data-testid="hero-3d-stage"
            className="lg:col-span-7 flex flex-col justify-between space-y-6 hero-3d-perspective"
          >
            <div
              className="space-y-5 preserve-3d p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0B1120]/85 via-[#070B16]/90 to-[#140B29]/85 border border-indigo-500/25 shadow-2xl shadow-purple-950/40 relative"
              style={{
                transform: `rotateX(${heroTilt.rotateX}deg) rotateY(${heroTilt.rotateY}deg) translate3d(${parallax.shiftX * 0.35}px, ${parallax.shiftY * 0.35}px, 0px)`,
              }}
            >
              {/* Unboxed Editorial Metadata Kicker in 3D Depth Layer */}
              <div
                className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wide text-violet-300/90 smooth-gpu"
                style={{
                  transform: `translate3d(${parallax.shiftX * 0.45}px, ${parallax.shiftY * 0.45}px, 18px)`,
                }}
              >
                <span>Vikas Kumar</span>
                <span aria-hidden="true">·</span>
                <span>BCA — AI &amp; Machine Learning</span>
                <span aria-hidden="true">·</span>
                <span>Full Stack Web Development</span>
              </div>

              {/* Main Display Headline with 3D Extruded Depth, Floating Motion & Mouse Parallax */}
              {isEditing ? (
                <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-violet-500/40">
                  <div>
                    <label
                      htmlFor="hero-name-input"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Your Full Name (Displayed in Hero &amp; Header)
                    </label>
                    <input
                      id="hero-name-input"
                      type="text"
                      value={data.name}
                      onChange={(e) => onUpdateField('name', e.target.value)}
                      placeholder="Vikas Kumar"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#050508] border border-slate-700 text-white font-display text-xl font-bold focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hero-headline-input"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Role Headline
                    </label>
                    <input
                      id="hero-headline-input"
                      type="text"
                      value={data.roleHeadline}
                      onChange={(e) => onUpdateField('roleHeadline', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#050508] border border-slate-700 text-slate-100 text-sm font-medium focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hero-intro-input"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Short Introduction
                    </label>
                    <textarea
                      id="hero-intro-input"
                      rows={3}
                      value={data.heroIntro}
                      onChange={(e) => onUpdateField('heroIntro', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#050508] border border-slate-700 text-slate-200 text-sm leading-relaxed focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="preserve-3d py-1 smooth-gpu"
                    style={{
                      transform: `translate3d(${parallax.shiftX * 0.75}px, ${parallax.shiftY * 0.75}px, 36px)`,
                    }}
                  >
                    <h1
                      data-testid="hero-3d-heading"
                      className="hero-title-3d font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]"
                    >
                      <span className="hero-greeting-3d">Hi, I&apos;m </span>
                      <span className="name-3d-gradient inline-block bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                        {data.name}
                      </span>
                    </h1>
                  </div>

                  <p
                    className="font-display text-lg sm:text-xl font-semibold text-slate-200 tracking-wide smooth-gpu"
                    style={{
                      transform: `translate3d(${parallax.shiftX * 0.5}px, ${parallax.shiftY * 0.5}px, 24px)`,
                    }}
                  >
                    {data.roleHeadline}
                  </p>

                  <p
                    className="text-base text-slate-300 leading-relaxed max-w-[65ch] smooth-gpu"
                    style={{
                      transform: `translate3d(${parallax.shiftX * 0.3}px, ${parallax.shiftY * 0.3}px, 16px)`,
                    }}
                  >
                    {data.heroIntro}
                  </p>
                </>
              )}

              {/* Action Buttons in 3D Foreground Plane */}
              <div
                className="pt-2 flex flex-wrap items-center gap-4 smooth-gpu"
                style={{
                  transform: `translate3d(${parallax.shiftX * 0.6}px, ${parallax.shiftY * 0.6}px, 28px)`,
                }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.03] text-white text-sm font-semibold shadow-lg shadow-purple-950/60 smooth-gpu whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={`mailto:${data.contact.email}?subject=${encodeURIComponent(
                    `Portfolio Inquiry for ${data.name}`
                  )}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 hover:scale-[1.03] text-slate-100 border border-slate-700/80 hover:border-violet-500/60 text-sm font-semibold smooth-gpu whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <Mail className="w-4 h-4 text-violet-400" aria-hidden="true" />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Full-Stack & AI/ML Architecture Blueprint Card */}
          <div
            onMouseMove={handleCardPointerMove}
            onMouseLeave={() => setCardTilt({ rotateX: 0, rotateY: 0 })}
            className="lg:col-span-5 flex hero-3d-perspective"
          >
            <div
              className="w-full h-full rounded-2xl bg-gradient-to-b from-[#0B1120] via-[#090D1A] to-[#120B24] border border-slate-800/90 p-6 flex flex-col justify-between preserve-3d shadow-2xl shadow-blue-950/30"
              style={{
                transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg) translate3d(${-parallax.shiftX * 0.35}px, ${-parallax.shiftY * 0.35}px, 0px)`,
              }}
            >
              <div
                className="space-y-4 smooth-gpu"
                style={{
                  transform: `translate3d(${parallax.shiftX * 0.3}px, ${parallax.shiftY * 0.3}px, 20px)`,
                }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-white tracking-tight">
                      Technical Focus Architecture
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Select a domain layer to inspect core stack
                    </p>
                  </div>
                  <span className="text-xs font-mono text-violet-300 whitespace-nowrap shrink-0">
                    3 Layers
                  </span>
                </div>

                {/* Interactive Segmented Layer Selector */}
                <div
                  role="tablist"
                  aria-label="Technical Focus Layers"
                  className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#050508]/90 border border-slate-800/80"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeLayer === 'frontend'}
                    onClick={() => setActiveLayer('frontend')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] sm:text-xs font-medium smooth-gpu whitespace-nowrap shrink-0 cursor-pointer ${
                      activeLayer === 'frontend'
                        ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white border border-violet-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Frontend</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeLayer === 'backend'}
                    onClick={() => setActiveLayer('backend')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] sm:text-xs font-medium smooth-gpu whitespace-nowrap shrink-0 cursor-pointer ${
                      activeLayer === 'backend'
                        ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white border border-violet-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Backend</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeLayer === 'aiml'}
                    onClick={() => setActiveLayer('aiml')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] sm:text-xs font-medium smooth-gpu whitespace-nowrap shrink-0 cursor-pointer ${
                      activeLayer === 'aiml'
                        ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white border border-violet-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>AI / ML</span>
                  </button>
                </div>

                {/* Architectural SVG Blueprint Visualization */}
                <div className="relative rounded-xl bg-[#050508]/80 border border-slate-800/70 p-4 overflow-hidden">
                  <svg
                    viewBox="0 0 400 130"
                    className="w-full h-28 smooth-gpu"
                    style={{
                      transform: `translate3d(${parallax.shiftX * 0.25}px, ${parallax.shiftY * 0.25}px, 0)`,
                    }}
                    role="img"
                    aria-label={`Diagram illustrating ${currentLayer.title}`}
                  >
                    <defs>
                      <linearGradient id="navyPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#9333EA" stopOpacity="0.35" />
                      </linearGradient>
                      <linearGradient id="lineAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#C084FC" />
                      </linearGradient>
                    </defs>

                    {/* Architectural Grid Lines */}
                    <line x1="0" y1="32" x2="400" y2="32" stroke="#1E293B" strokeWidth="1" />
                    <line x1="0" y1="65" x2="400" y2="65" stroke="#1E293B" strokeWidth="1" />
                    <line x1="0" y1="98" x2="400" y2="98" stroke="#1E293B" strokeWidth="1" />
                    <line x1="133" y1="0" x2="133" y2="130" stroke="#1E293B" strokeWidth="1" />
                    <line x1="266" y1="0" x2="266" y2="130" stroke="#1E293B" strokeWidth="1" />

                    {/* Connecting Path */}
                    <path
                      d="M 65 65 L 200 65 L 335 65"
                      stroke="url(#lineAccent)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Node 1: UI / Client */}
                    <rect
                      x="20"
                      y="35"
                      width="90"
                      height="60"
                      rx="8"
                      fill={activeLayer === 'frontend' ? 'url(#navyPurpleGrad)' : '#0B1120'}
                      stroke={activeLayer === 'frontend' ? '#818CF8' : '#334155'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="65"
                      y="60"
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11"
                      fontWeight="600"
                    >
                      React &amp; UI
                    </text>
                    <text x="65" y="77" textAnchor="middle" fill="#94A3B8" fontSize="9">
                      HTML · CSS · JS
                    </text>

                    {/* Node 2: Runtime & Data */}
                    <rect
                      x="155"
                      y="35"
                      width="90"
                      height="60"
                      rx="8"
                      fill={activeLayer === 'backend' ? 'url(#navyPurpleGrad)' : '#0B1120'}
                      stroke={activeLayer === 'backend' ? '#818CF8' : '#334155'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="200"
                      y="60"
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11"
                      fontWeight="600"
                    >
                      Node &amp; SQL
                    </text>
                    <text x="200" y="77" textAnchor="middle" fill="#94A3B8" fontSize="9">
                      Git · GitHub
                    </text>

                    {/* Node 3: AI/ML Engine */}
                    <rect
                      x="290"
                      y="35"
                      width="90"
                      height="60"
                      rx="8"
                      fill={activeLayer === 'aiml' ? 'url(#navyPurpleGrad)' : '#0B1120'}
                      stroke={activeLayer === 'aiml' ? '#C084FC' : '#334155'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="335"
                      y="60"
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11"
                      fontWeight="600"
                    >
                      Python AI/ML
                    </text>
                    <text x="335" y="77" textAnchor="middle" fill="#94A3B8" fontSize="9">
                      Models &amp; Data
                    </text>
                  </svg>
                </div>
              </div>

              {/* Selected Layer Details */}
              <div
                className="pt-4 space-y-2 smooth-gpu"
                style={{
                  transform: `translate3d(${parallax.shiftX * 0.45}px, ${parallax.shiftY * 0.45}px, 24px)`,
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                  <span>{currentLayer.stack}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{currentLayer.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLayer.description}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{currentLayer.subtitle}</span>
                  <span className="text-slate-300">{currentLayer.metrics}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Portfolio Summary Row Below the Split */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="font-mono text-2xl font-bold text-white tabular-nums">
              {skillCounts.total}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Technical Skills ({skillCounts.proficient} Proficient · {skillCounts.learning}{' '}
              Learning)
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl font-bold text-white tabular-nums">
              {data.projects.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Featured Engineering Projects (CODEQUEST · Toyzy World · Portfolio)
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl font-bold text-white tabular-nums">
              Full Stack
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Frontend UI · Relational SQL · Node.js &amp; Python
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl font-bold text-violet-300 tabular-nums">
              AI / ML
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Applied Machine Learning &amp; Data Exploration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
