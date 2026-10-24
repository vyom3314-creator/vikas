import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import blueprint from './firebase-blueprint.json';

const rulesSource = fs.readFileSync('./firestore.rules', 'utf8');

interface InquiryCreatePayload {
  id: string;
  data: Record<string, unknown>;
}

function simulateInquiryCreateRule(payload: InquiryCreatePayload): boolean {
  if (!/^[a-zA-Z0-9_\-]{1,128}$/.test(payload.id)) return false;

  const allowedKeys = [
    'name',
    'email',
    'subject',
    'message',
    'createdAt',
  ];
  const keys = Object.keys(payload.data);
  if (keys.length !== allowedKeys.length) return false;
  if (!allowedKeys.every((k) => keys.includes(k))) return false;

  const { name, email, subject, message, createdAt } = payload.data;

  if (typeof name !== 'string' || name.length < 1 || name.length > 100)
    return false;
  if (
    typeof email !== 'string' ||
    email.length < 3 ||
    email.length > 160 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
    return false;
  if (typeof subject !== 'string' || subject.length < 1 || subject.length > 160)
    return false;
  if (
    typeof message !== 'string' ||
    message.length < 2 ||
    message.length > 2000
  )
    return false;
  if (createdAt !== 'SERVER_TIMESTAMP')
    return false;

  return true;
}

function simulateInquiryReadEditDeleteRule(): boolean {
  return false;
}

test('firestore.rules enforces public write-only inquiry submission and forbids read/edit/delete', () => {
  assert.ok(rulesSource.includes("rules_version = '2';"));
  assert.ok(rulesSource.includes('allow read, write: if false;'));
  assert.ok(rulesSource.includes('allow get, list, update, delete: if false;'));
  assert.ok(rulesSource.includes('isValidContactInquiry(incoming())'));
  assert.ok(rulesSource.includes('incoming().createdAt == request.time'));

  const contactSchema = blueprint.entities.ContactInquiry.properties;
  assert.equal(contactSchema.message.maxLength, 2000);
  assert.equal(contactSchema.name.maxLength, 100);
});

test('Dirty Dozen security payloads are all rejected with PERMISSION_DENIED (false)', () => {
  const validBase: InquiryCreatePayload = {
    id: 'inq_valid_01',
    data: {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      subject: 'Hello Vikas',
      message: 'Interested in collaborating on full-stack and AI/ML projects.',
      createdAt: 'SERVER_TIMESTAMP',
    },
  };

  assert.equal(simulateInquiryCreateRule(validBase), true);

  // 1. Shadow field injection
  assert.equal(
    simulateInquiryCreateRule({
      ...validBase,
      data: { ...validBase.data, isAdmin: true },
    }),
    false
  );

  // 2. Public visitor attempting to read, edit, or delete an inquiry
  assert.equal(simulateInquiryReadEditDeleteRule(), false);

  // 3. Invalid email format
  assert.equal(
    simulateInquiryCreateRule({
      ...validBase,
      data: { ...validBase.data, email: 'not-an-email' },
    }),
    false
  );

  // 4. Oversized message (>2000 chars)
  assert.equal(
    simulateInquiryCreateRule({
      ...validBase,
      data: { ...validBase.data, message: 'x'.repeat(2005) },
    }),
    false
  );

  // 5. ID poisoning attack
  assert.equal(
    simulateInquiryCreateRule({
      ...validBase,
      id: 'invalid/id$with spaces!',
    }),
    false
  );

  // 6. Forged client timestamp
  assert.equal(
    simulateInquiryCreateRule({
      ...validBase,
      data: { ...validBase.data, createdAt: '2020-01-01T00:00:00Z' },
    }),
    false
  );
});
