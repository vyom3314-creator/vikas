import {
  PortfolioData,
  SkillItem,
  SkillLevel,
  DraftMessageInput,
} from '../types/portfolio';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  name: 'Vikas Kumar',
  roleHeadline: 'Aspiring Full Stack Developer | AI/ML Enthusiast',
  heroIntro:
    'Pursuing a BCA in Artificial Intelligence and Machine Learning (AI/ML) while actively developing Full Stack Web Development skills. Focused on building clean, responsive web applications and practical software solutions.',
  biography: [
    'I am Vikas Kumar, a student pursuing a Bachelor of Computer Applications (BCA) with a specialization in Artificial Intelligence and Machine Learning (AI/ML). I am passionate about combining my academic study in AI/ML with hands-on Full Stack Web Development.',
    'Alongside developing full-stack web applications using HTML, CSS, JavaScript, React, Node.js, SQL, and Python, I am proficient in MS Office for technical documentation, data organization, and presentation workflows.',
  ],
  education: [
    {
      id: 'edu-bca-aiml',
      degree: 'BCA — Artificial Intelligence and Machine Learning (AI/ML)',
      institution: 'Bachelor of Computer Applications',
      period: 'Area of Study',
      details:
        'Focused on Artificial Intelligence and Machine Learning (AI/ML) foundations, computer applications, programming logic, and full-stack web development.',
    },
  ],
  skills: [
    {
      id: 'fullstack',
      name: 'Full Stack Web Development',
      category: 'Web Engineering (Developing)',
      level: 'Learning',
      summary:
        'Actively learning and developing end-to-end web applications across frontend interfaces, backend runtimes, and relational databases.',
    },
    {
      id: 'aiml',
      name: 'AI/ML',
      category: 'BCA Specialization (Area of Study)',
      level: 'Learning',
      summary:
        'Core academic area of study in BCA — covering Artificial Intelligence and Machine Learning concepts, data preparation, and model fundamentals.',
    },
    {
      id: 'msoffice',
      name: 'MS Office',
      category: 'Productivity & Documentation',
      level: 'Proficient',
      summary:
        'Structured documentation in MS Word, spreadsheet analysis and data organization in MS Excel, and technical presentations in MS PowerPoint.',
    },
    {
      id: 'html',
      name: 'HTML',
      category: 'Frontend Architecture',
      level: 'Proficient',
      summary:
        'Semantic markup, accessible document structure, ARIA landmarks, and SEO fundamentals.',
    },
    {
      id: 'css',
      name: 'CSS',
      category: 'Frontend Architecture',
      level: 'Proficient',
      summary:
        'Responsive Flexbox & CSS Grid layouts, custom properties, dark-theme design systems, and fluid typography.',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Core Language',
      level: 'Proficient',
      summary:
        'ES6+ syntax, asynchronous programming, DOM manipulation, closures, and modular state management.',
    },
    {
      id: 'react',
      name: 'React',
      category: 'Frontend Framework',
      level: 'Learning',
      summary:
        'Component-driven architecture, hooks, state lifting, reusable UI primitives, and single-page routing.',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend Runtime',
      level: 'Learning',
      summary:
        'Building RESTful APIs, server-side routing, middleware pipelines, and asynchronous I/O handling.',
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Data & Persistence',
      level: 'Learning',
      summary:
        'Relational schema design, queries, table joins, and structured data management.',
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Version Control',
      level: 'Proficient',
      summary:
        'Branching workflows, commit hygiene, merge conflict resolution, and version history management.',
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Collaboration & DevOps',
      level: 'Proficient',
      summary:
        'Repository hosting, code management, issue tracking, and project documentation workflows.',
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Core Language & AI/ML',
      level: 'Learning',
      summary:
        'Algorithmic problem solving, scripting, data manipulation, and foundational AI/ML programming.',
    },
  ],
  projects: [
    {
      id: 'codequest',
      title: 'CODEQUEST',
      subtitle: 'Interactive Coding Practice & Algorithmic Challenge Platform',
      description:
        'A structured problem-solving workspace designed to help developers practice algorithms, track challenge milestones, and review time-space complexity explanations through an intuitive dark-mode interface.',
      architectureNotes:
        'Built with modular UI components, problem filtering by difficulty and topic, interactive solution walkthrough views, and persistent progress tracking.',
      technologies: ['React', 'JavaScript', 'CSS', 'Node.js', 'SQL'],
      githubUrl: '',
      liveDemoUrl: '',
      featured: true,
      visualType: 'codequest',
    },
    {
      id: 'toyzy-world',
      title: 'Toyzy World',
      subtitle: 'Modern E-Commerce Showcase & Interactive Catalog Experience',
      description:
        'A responsive online storefront and product discovery platform crafted for browsing curated toy collections, filtering by age group and category, and managing an interactive shopping cart.',
      architectureNotes:
        'Features responsive grid layouts, instant client-side category filtering, accessible product detail modals, and cart state persistence.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      githubUrl: '',
      liveDemoUrl: '',
      featured: false,
      visualType: 'toyzy',
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      subtitle: 'Personal Developer Portfolio & Interactive Resume System',
      description:
        'This dark obsidian, navy blue, and violet developer portfolio website engineered with accessible semantic HTML, responsive layout architecture, live in-browser content customization, and smooth compositor transitions.',
      architectureNotes:
        'Implements a 3-zone navigation contract, zero-pill editorial metadata hierarchy, persistent local customization state, and client-side mailto draft composition.',
      technologies: ['React', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'],
      githubUrl: '',
      liveDemoUrl: '',
      featured: false,
      visualType: 'portfolio',
    },
  ],
  contact: {
    email: 'vyom3314@gmail.com',
    github: '',
    linkedin: '',
  },
};

export type SkillFilter = 'All' | SkillLevel;

export function filterSkills(skills: SkillItem[], filter: SkillFilter): SkillItem[] {
  if (filter === 'All') {
    return skills;
  }
  return skills.filter((skill) => skill.level === filter);
}

export function countSkillsByLevel(skills: SkillItem[]): {
  total: number;
  proficient: number;
  learning: number;
} {
  const proficient = skills.filter((s) => s.level === 'Proficient').length;
  const learning = skills.filter((s) => s.level === 'Learning').length;
  return {
    total: skills.length,
    proficient,
    learning,
  };
}

export function toggleSkillProficiency(skills: SkillItem[], skillId: string): SkillItem[] {
  return skills.map((skill) => {
    if (skill.id !== skillId) return skill;
    return {
      ...skill,
      level: skill.level === 'Proficient' ? 'Learning' : 'Proficient',
    };
  });
}

export function isConfiguredUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isPlaceholderValue(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return true;
  if (
    trimmed === 'your.email@example.com' ||
    trimmed === 'https://github.com/your-username' ||
    trimmed === 'https://linkedin.com/in/your-profile'
  ) {
    return true;
  }
  return false;
}

export const BLUEPRINT_LIMITS = {
  ID_PATTERN: /^[a-zA-Z0-9_\-]+$/,
  ID_MAX_LEN: 128,
  NAME_MAX_LEN: 100,
  HEADLINE_MAX_LEN: 160,
  HERO_INTRO_MAX_LEN: 600,
  EMAIL_MAX_LEN: 160,
  URL_MAX_LEN: 250,
  SUBJECT_MAX_LEN: 160,
  MESSAGE_MIN_LEN: 2,
  MESSAGE_MAX_LEN: 2000,
};

export function validateDraftMessage(input: DraftMessageInput): {
  valid: boolean;
  errors: Partial<Record<keyof DraftMessageInput, string>>;
} {
  const errors: Partial<Record<keyof DraftMessageInput, string>> = {};
  const name = input.senderName.trim();
  const email = input.senderEmail.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!name) {
    errors.senderName = 'Please enter your full name.';
  } else if (name.length > BLUEPRINT_LIMITS.NAME_MAX_LEN) {
    errors.senderName = `Full name must be ${BLUEPRINT_LIMITS.NAME_MAX_LEN} characters or fewer.`;
  }

  if (!email) {
    errors.senderEmail = 'Please enter your email address.';
  } else if (
    email.length < 3 ||
    email.length > BLUEPRINT_LIMITS.EMAIL_MAX_LEN ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.senderEmail = 'Please enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Please enter a subject.';
  } else if (subject.length > BLUEPRINT_LIMITS.SUBJECT_MAX_LEN) {
    errors.subject = `Subject must be ${BLUEPRINT_LIMITS.SUBJECT_MAX_LEN} characters or fewer.`;
  }

  if (!message || message.length < BLUEPRINT_LIMITS.MESSAGE_MIN_LEN) {
    errors.message = 'Please enter a message.';
  } else if (message.length > BLUEPRINT_LIMITS.MESSAGE_MAX_LEN) {
    errors.message = `Message must be ${BLUEPRINT_LIMITS.MESSAGE_MAX_LEN} characters or fewer.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizePortfolioProfilePayload(
  data: PortfolioData,
  ownerId: string
) {
  return {
    ownerId: ownerId.slice(0, BLUEPRINT_LIMITS.ID_MAX_LEN),
    name: (data.name.trim() || 'Vikas Kumar').slice(0, BLUEPRINT_LIMITS.NAME_MAX_LEN),
    roleHeadline: (
      data.roleHeadline.trim() ||
      'Aspiring Full Stack Developer | AI/ML Enthusiast'
    ).slice(0, BLUEPRINT_LIMITS.HEADLINE_MAX_LEN),
    heroIntro: (
      data.heroIntro.trim() || DEFAULT_PORTFOLIO_DATA.heroIntro
    ).slice(0, BLUEPRINT_LIMITS.HERO_INTRO_MAX_LEN),
    contactEmail: (data.contact.email.trim() || 'vyom3314@gmail.com').slice(
      0,
      BLUEPRINT_LIMITS.EMAIL_MAX_LEN
    ),
    githubUrl: data.contact.github.trim().slice(0, BLUEPRINT_LIMITS.URL_MAX_LEN),
    linkedinUrl: data.contact.linkedin.trim().slice(0, BLUEPRINT_LIMITS.URL_MAX_LEN),
  };
}

export function buildMailtoHref(recipientEmail: string, input: DraftMessageInput): string {
  const target = recipientEmail.trim() || 'vyom3314@gmail.com';
  const subject = encodeURIComponent(input.subject.trim());
  const bodyLines = [
    `Name: ${input.senderName.trim()}`,
    `Reply-To: ${input.senderEmail.trim()}`,
    '',
    input.message.trim(),
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${target}?subject=${subject}&body=${body}`;
}

export function shouldShowScrollToTop(
  scrollY: number,
  heroBottomOffset: number
): boolean {
  const threshold = heroBottomOffset > 0 ? heroBottomOffset : 500;
  return scrollY >= threshold;
}

export function calculate3DTilt(
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  maxDeg = 10
): { rotateX: number; rotateY: number } {
  if (width <= 0 || height <= 0) {
    return { rotateX: 0, rotateY: 0 };
  }
  const normX = Math.max(-1, Math.min(1, (offsetX / width - 0.5) * 2));
  const normY = Math.max(-1, Math.min(1, (offsetY / height - 0.5) * 2));
  return {
    rotateX: Number((-normY * maxDeg).toFixed(2)),
    rotateY: Number((normX * maxDeg).toFixed(2)),
  };
}

export function calculateParallaxOffset(
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  maxShiftPx = 18
): {
  shiftX: number;
  shiftY: number;
  spotlightX: number;
  spotlightY: number;
} {
  if (width <= 0 || height <= 0) {
    return { shiftX: 0, shiftY: 0, spotlightX: 50, spotlightY: 50 };
  }
  const ratioX = Math.max(0, Math.min(1, offsetX / width));
  const ratioY = Math.max(0, Math.min(1, offsetY / height));
  const normX = (ratioX - 0.5) * 2;
  const normY = (ratioY - 0.5) * 2;

  return {
    shiftX: Number((normX * maxShiftPx).toFixed(2)),
    shiftY: Number((normY * maxShiftPx).toFixed(2)),
    spotlightX: Number((ratioX * 100).toFixed(1)),
    spotlightY: Number((ratioY * 100).toFixed(1)),
  };
}



