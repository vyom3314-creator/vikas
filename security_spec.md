# Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: Any path not explicitly matched under `/portfolios/{portfolioId}` or `/inquiries/{inquiryId}` is unconditionally denied (`allow read, write: if false;`).
2. **Path Variable Hardening**: Every single-document operation (`get`, `create`, `update`, `delete`) validates its path ID using `isValidId(id)` (`id is string && id.size() >= 1 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$')`).
3. **Portfolio Profile Ownership (`/portfolios/{portfolioId}`)**:
   - Publicly readable via `get` (with valid `portfolioId`).
   - Only the verified admin (`isAdmin()`) can `create`, `update`, or `delete` a portfolio document, and `incoming().ownerId == request.auth.uid`.
4. **Public Contact Inquiry Write & Admin-Only Read/Manage (`/inquiries/{inquiryId}`)**:
   - Public visitors can `create` a document in `/inquiries/{inquiryId}` if and only if `isValidId(inquiryId)` holds, `isValidContactInquiry(incoming())` passes strict schema + key allowlist + length & email regex checks, `incoming().status == 'new'`, and `incoming().createdAt == request.time && incoming().updatedAt == request.time`.
   - Public visitors (and non-admin authenticated users) **cannot** `get`, `list`, `update`, or `delete` any document in `/inquiries/{inquiryId}`.
   - Only the authenticated, email-verified portfolio admin (`isAdmin()`) can `get`, `list`, `update`, or `delete` inquiries.
   - `update` enforces Terminal State Locking (`existing().status != 'archived'`), requires `isValidContactInquiry(incoming())`, preserves immutable fields (`name`, `email`, `subject`, `message`, `createdAt`), and only permits updating `status` and `updatedAt` (`incoming().updatedAt == request.time`).

## 2. The "Dirty Dozen" Payloads

1. **Shadow Field Injection on Inquiry Create**: Adding `"isAdmin": true` to `/inquiries/inq_1` -> Rejected by `data.keys().hasOnly(...)`.
2. **Public Visitor Attempting to Read (`get`) an Inquiry**: Unauthenticated or non-admin user reading `/inquiries/inq_1` -> Rejected by `allow get: if isAdmin()`.
3. **Public Visitor Attempting to List (`list`) Inquiries**: Unauthenticated or non-admin user listing `/inquiries` -> Rejected by `allow list: if isAdmin()`.
4. **Spoofed Admin Email Without Verification**: Calling `list` or `update` on `/inquiries` with `email == "vyom3314@gmail.com"` but `email_verified == false` -> Rejected by `isAdmin()`.
5. **Public Visitor Attempting to Update or Delete an Inquiry**: Non-admin user calling `update` or `delete` on `/inquiries/inq_1` -> Rejected by `isAdmin()`.
6. **Denial-of-Wallet Oversized Message**: Sending a 50,000-character string in `message` -> Rejected by `data.message.size() <= 2000`.
7. **ID Poisoning Attack**: Creating a document with non-alphanumeric or >128 char ID -> Rejected by `isValidId(inquiryId)`.
8. **Client Timestamp Forgery**: Providing a past or future `createdAt` or `updatedAt` timestamp -> Rejected by `incoming().createdAt == request.time` and `incoming().updatedAt == request.time`.
9. **Immortal Field Mutation on Admin Update**: Attempting to change `createdAt`, `name`, `email`, `subject`, or `message` during an `update` -> Rejected by immutability checks and `affectedKeys().hasOnly(['status', 'updatedAt'])`.
10. **Terminal State Bypass**: Updating an inquiry whose `existing().status == 'archived'` -> Rejected by `existing().status != 'archived'`.
11. **Value Poisoning on Update**: Updating `status` to `"hacked_state"` or an integer `123` -> Rejected by `isValidContactInquiry(incoming())` wrapping the `allow update` block.
12. **State Shortcutting on Create**: Creating an inquiry with `status: "archived"` or `status: "read"` immediately -> Rejected by `incoming().status == 'new'` on `create`.
