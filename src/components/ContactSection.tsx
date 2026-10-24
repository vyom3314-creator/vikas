import React, { useState } from 'react';
import {
  Mail,
  GitPullRequest,
  Linkedin,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ContactInfo,
  DraftMessageInput,
  PortfolioData,
} from '../types/portfolio';
import {
  validateDraftMessage,
  isConfiguredUrl,
  BLUEPRINT_LIMITS,
} from '../utils/portfolioLogic';

interface ContactSectionProps {
  contact: ContactInfo;
  isEditing: boolean;
  onUpdateField: <K extends keyof PortfolioData>(
    field: K,
    value: PortfolioData[K]
  ) => void;
  onEnableEdit: () => void;
  onSubmitCloudInquiry: (input: DraftMessageInput) => Promise<void>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  isEditing,
  onUpdateField,
  onEnableEdit,
  onSubmitCloudInquiry,
}) => {
  const [draft, setDraft] = useState<DraftMessageInput>({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof DraftMessageInput, string>>
  >({});
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'saved' | 'error'
  >('idle');
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    onUpdateField('contact', {
      ...contact,
      [field]: value,
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'submitting') return;

    const validation = validateDraftMessage(draft);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitStatus('submitting');
    setSubmitErrorMsg(null);

    try {
      await onSubmitCloudInquiry(draft);
      setSubmitStatus('saved');
      setDraft({ senderName: '', senderEmail: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
      setSubmitErrorMsg(
        err instanceof Error && err.message
          ? 'Unable to submit your inquiry right now. Please check your connection and try again.'
          : 'Failed to submit inquiry. Please try again.'
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 py-20 md:py-24 border-b border-slate-800/80 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-mono text-violet-400 tracking-wide">
              Direct Channels &amp; Public Inquiry Form
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1"
            >
              04. Contact Me
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-[62ch]">
              Connect with Vikas Kumar for full-stack developer roles, internships, or AI/ML collaborations.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Email, GitHub, and LinkedIn Cards */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-display text-xl font-semibold text-white">
              Direct Contact &amp; Profiles
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Reach out via{' '}
              <span className="font-mono text-slate-100">{contact.email}</span> or submit an inquiry using the form.
            </p>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email Address</span>
              </div>

              {isEditing ? (
                <div>
                  <label htmlFor="contact-email-input" className="sr-only">
                    Contact Email
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    maxLength={BLUEPRINT_LIMITS.EMAIL_MAX_LEN}
                    value={contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="vyom3314@gmail.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              ) : (
                <div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-sm font-mono font-medium text-white hover:text-violet-300 break-all smooth-gpu"
                  >
                    {contact.email}
                  </a>
                </div>
              )}
            </div>

            {/* GitHub Card */}
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                <GitPullRequest className="w-4 h-4" aria-hidden="true" />
                <span>GitHub Profile</span>
              </div>

              {isEditing ? (
                <div>
                  <label htmlFor="contact-github-input" className="sr-only">
                    GitHub Profile URL
                  </label>
                  <input
                    id="contact-github-input"
                    type="url"
                    maxLength={BLUEPRINT_LIMITS.URL_MAX_LEN}
                    value={contact.github}
                    onChange={(e) => handleContactChange('github', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  {isConfiguredUrl(contact.github) ? (
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-white hover:text-violet-300 break-all smooth-gpu"
                    >
                      <span>{contact.github}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onEnableEdit}
                      className="text-xs font-mono text-slate-400 hover:text-violet-300 cursor-pointer"
                    >
                      GitHub profile not linked yet
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn Profile</span>
              </div>

              {isEditing ? (
                <div>
                  <label htmlFor="contact-linkedin-input" className="sr-only">
                    LinkedIn Profile URL
                  </label>
                  <input
                    id="contact-linkedin-input"
                    type="url"
                    maxLength={BLUEPRINT_LIMITS.URL_MAX_LEN}
                    value={contact.linkedin}
                    onChange={(e) => handleContactChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#050508] border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  {isConfiguredUrl(contact.linkedin) ? (
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-white hover:text-violet-300 break-all smooth-gpu"
                    >
                      <span>{contact.linkedin}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onEnableEdit}
                      className="text-xs font-mono text-slate-400 hover:text-violet-300 cursor-pointer"
                    >
                      LinkedIn profile not linked yet
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Public Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0B1120] to-[#090B14] border border-slate-800/90 space-y-6">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <div className="text-xs font-mono text-violet-300">
                  Public Contact Inquiry Form
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete the fields below and click Submit Inquiry to send your message directly to Vikas Kumar.
                </p>
              </div>

              <form onSubmit={handleSubmitForm} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-full-name"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="inquiry-full-name"
                      name="fullName"
                      type="text"
                      required
                      maxLength={BLUEPRINT_LIMITS.NAME_MAX_LEN}
                      value={draft.senderName}
                      onChange={(e) => {
                        if (submitStatus === 'saved' || submitStatus === 'error') {
                          setSubmitStatus('idle');
                        }
                        setDraft((prev) => ({ ...prev, senderName: e.target.value }));
                      }}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050508] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                    />
                    {errors.senderName && (
                      <p className="text-xs text-rose-400 mt-1" role="alert">
                        {errors.senderName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email-address"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="inquiry-email-address"
                      name="emailAddress"
                      type="email"
                      required
                      maxLength={BLUEPRINT_LIMITS.EMAIL_MAX_LEN}
                      value={draft.senderEmail}
                      onChange={(e) => {
                        if (submitStatus === 'saved' || submitStatus === 'error') {
                          setSubmitStatus('idle');
                        }
                        setDraft((prev) => ({ ...prev, senderEmail: e.target.value }));
                      }}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050508] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                    />
                    {errors.senderEmail && (
                      <p className="text-xs text-rose-400 mt-1" role="alert">
                        {errors.senderEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-subject"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="inquiry-subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={BLUEPRINT_LIMITS.SUBJECT_MAX_LEN}
                    value={draft.subject}
                    onChange={(e) => {
                      if (submitStatus === 'saved' || submitStatus === 'error') {
                        setSubmitStatus('idle');
                      }
                      setDraft((prev) => ({ ...prev, subject: e.target.value }));
                    }}
                    placeholder="Full Stack Developer Internship / Interview Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050508] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 mt-1" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={4}
                    required
                    maxLength={BLUEPRINT_LIMITS.MESSAGE_MAX_LEN}
                    value={draft.message}
                    onChange={(e) => {
                      if (submitStatus === 'saved' || submitStatus === 'error') {
                        setSubmitStatus('idle');
                      }
                      setDraft((prev) => ({ ...prev, message: e.target.value }));
                    }}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050508] border border-slate-700 text-sm text-white placeholder:text-slate-500 leading-relaxed focus:outline-none focus:border-violet-500"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-start">
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    aria-busy={submitStatus === 'submitting'}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold shadow-md shadow-purple-950/50 smooth-gpu whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>

              {submitStatus === 'saved' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>Submitted Successfully!</span>
                </div>
              )}

              {submitStatus === 'error' && submitErrorMsg && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                  <span>{submitErrorMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
