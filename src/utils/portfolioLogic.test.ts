import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PORTFOLIO_DATA,
  filterSkills,
  countSkillsByLevel,
  toggleSkillProficiency,
  isConfiguredUrl,
  validateDraftMessage,
  buildMailtoHref,
  shouldShowScrollToTop,
  calculate3DTilt,
  calculateParallaxOffset,
} from './portfolioLogic';

test('DEFAULT_PORTFOLIO_DATA contains Vikas Kumar profile, BCA AI/ML education, skills, and projects', () => {
  assert.equal(DEFAULT_PORTFOLIO_DATA.name, 'Vikas Kumar');
  assert.equal(DEFAULT_PORTFOLIO_DATA.contact.email, 'vyom3314@gmail.com');
  assert.equal(
    DEFAULT_PORTFOLIO_DATA.education[0].degree,
    'BCA — Artificial Intelligence and Machine Learning (AI/ML)'
  );

  const skillNames = DEFAULT_PORTFOLIO_DATA.skills.map((s) => s.name);
  assert.ok(skillNames.includes('MS Office'));
  assert.ok(skillNames.includes('Full Stack Web Development'));
  assert.ok(skillNames.includes('AI/ML'));

  const msOffice = DEFAULT_PORTFOLIO_DATA.skills.find((s) => s.id === 'msoffice')!;
  assert.equal(msOffice.level, 'Proficient');

  const fullStack = DEFAULT_PORTFOLIO_DATA.skills.find((s) => s.id === 'fullstack')!;
  assert.equal(fullStack.level, 'Learning');

  const aiMl = DEFAULT_PORTFOLIO_DATA.skills.find((s) => s.id === 'aiml')!;
  assert.equal(aiMl.level, 'Learning');

  const projectTitles = DEFAULT_PORTFOLIO_DATA.projects.map((p) => p.title);
  assert.deepEqual(projectTitles, ['CODEQUEST', 'Toyzy World', 'Portfolio']);
});

test('filterSkills and countSkillsByLevel accurately partition Proficient and Learning skills', () => {
  const counts = countSkillsByLevel(DEFAULT_PORTFOLIO_DATA.skills);
  assert.equal(counts.total, 12);
  assert.equal(counts.proficient + counts.learning, 12);

  const proficientOnly = filterSkills(DEFAULT_PORTFOLIO_DATA.skills, 'Proficient');
  assert.equal(proficientOnly.length, counts.proficient);
  assert.ok(proficientOnly.every((s) => s.level === 'Proficient'));

  const learningOnly = filterSkills(DEFAULT_PORTFOLIO_DATA.skills, 'Learning');
  assert.equal(learningOnly.length, counts.learning);
  assert.ok(learningOnly.every((s) => s.level === 'Learning'));
});

test('toggleSkillProficiency flips a single skill level without mutating others', () => {
  const initial = DEFAULT_PORTFOLIO_DATA.skills;
  const htmlSkill = initial.find((s) => s.id === 'html')!;
  assert.equal(htmlSkill.level, 'Proficient');

  const updated = toggleSkillProficiency(initial, 'html');
  assert.equal(updated.find((s) => s.id === 'html')?.level, 'Learning');
  assert.equal(initial.find((s) => s.id === 'html')?.level, 'Proficient');
});

test('isConfiguredUrl validates http and https links accurately', () => {
  assert.equal(isConfiguredUrl(''), false);
  assert.equal(isConfiguredUrl('#'), false);
  assert.equal(isConfiguredUrl('javascript:alert(1)'), false);
  assert.equal(isConfiguredUrl('https://github.com/example/codequest'), true);
});

test('validateDraftMessage rejects empty or invalid fields and accepts valid input', () => {
  const invalidResult = validateDraftMessage({
    senderName: '',
    senderEmail: 'not-an-email',
    subject: '',
    message: '',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.senderName);
  assert.ok(invalidResult.errors.senderEmail);
  assert.ok(invalidResult.errors.subject);
  assert.ok(invalidResult.errors.message);

  const validResult = validateDraftMessage({
    senderName: 'Alex Rivera',
    senderEmail: 'alex@company.com',
    subject: 'Software Engineering Internship Opportunity',
    message: 'Hello, we reviewed your CODEQUEST project and would love to schedule an interview.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoHref encodes subject and body properly', () => {
  const href = buildMailtoHref('dev@example.com', {
    senderName: 'Alex Rivera',
    senderEmail: 'alex@company.com',
    subject: 'Internship Inquiry',
    message: 'Let us connect regarding the Full Stack Developer role.',
  });
  assert.ok(href.startsWith('mailto:dev@example.com?subject=Internship%20Inquiry&body='));
  assert.ok(href.includes('Alex%20Rivera'));
});

test('shouldShowScrollToTop returns true only when scrollY reaches or exceeds heroBottomOffset', () => {
  assert.equal(shouldShowScrollToTop(0, 640), false);
  assert.equal(shouldShowScrollToTop(400, 640), false);
  assert.equal(shouldShowScrollToTop(640, 640), true);
  assert.equal(shouldShowScrollToTop(900, 640), true);
});

test('calculate3DTilt computes bounded 3D rotation angles from pointer coordinates', () => {
  assert.deepEqual(calculate3DTilt(200, 100, 400, 200, 10), {
    rotateX: 0,
    rotateY: 0,
  });
  assert.deepEqual(calculate3DTilt(400, 0, 400, 200, 10), {
    rotateX: 10,
    rotateY: 10,
  });
  assert.deepEqual(calculate3DTilt(0, 200, 400, 200, 10), {
    rotateX: -10,
    rotateY: -10,
  });
});

test('calculateParallaxOffset computes bounded shift and spotlight coordinates', () => {
  assert.deepEqual(calculateParallaxOffset(200, 100, 400, 200, 20), {
    shiftX: 0,
    shiftY: 0,
    spotlightX: 50,
    spotlightY: 50,
  });
  assert.deepEqual(calculateParallaxOffset(400, 200, 400, 200, 20), {
    shiftX: 20,
    shiftY: 20,
    spotlightX: 100,
    spotlightY: 100,
  });
  assert.deepEqual(calculateParallaxOffset(0, 0, 400, 200, 20), {
    shiftX: -20,
    shiftY: -20,
    spotlightX: 0,
    spotlightY: 0,
  });
});


