import { useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;

export default function NoteForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [consented, setConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!supabase || !consented || trimmedMessage.length === 0) return;

    setIsSubmitting(true);
    setStatus('');
    setHasError(false);

    try {
      const { error } = await supabase
        .from('notes')
        .insert({
          name: trimmedName || 'Anonymous',
          message: trimmedMessage,
        });

      if (error) {
        console.error('Supabase could not save the birthday note.', error);
        setHasError(true);
        if (error.code === 'PGRST205') {
          setStatus(
            'Supabase cannot find the notes table. Check that it exists in the same project configured in .env.local and that it is available through the public API.',
          );
        } else if (error.code === '42501') {
          setStatus(
            'Supabase rejected this note because table permissions are missing. Re-run supabase/schema.sql in your project’s SQL Editor, then try again.',
          );
        } else {
          setStatus(
            `Your note could not be saved (${error.code || 'Supabase error'}). Check the Supabase project and table permissions, then try again.`,
          );
        }
        return;
      }

      setName('');
      setMessage('');
      setConsented(false);
      setStatus('Thanks for leaving a note. Have a lovely day ☺️');
    } catch (error) {
      console.error('The birthday note request could not reach Supabase.', error);
      setHasError(true);
      setStatus('Your note could not be sent right now. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="note-section glass-card" aria-labelledby="note-heading">
      <div className="note-copy">
        <p className="eyebrow">Only if you feel like it</p>
        <h2 id="note-heading">Leave a little note</h2>
        <p>
          If you feel like saying hi, you’re welcome to leave a short note. Expectation the surprise is
          complete either way. Your note won’t appear on this page. Udhaya (DLF) can read it in his Database, where
          authorized project admins only have access. Please don’t include private or sensitive information.
        </p>
      </div>

      {isSupabaseConfigured ? (
        <form className="note-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="birthday-name">
            Your name <span>(optional, up to {MAX_NAME_LENGTH} characters)</span>
          </label>
          <input
            id="birthday-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, MAX_NAME_LENGTH))}
            maxLength={MAX_NAME_LENGTH}
            autoComplete="name"
            placeholder="Leave blank to send anonymously"
            aria-describedby="note-consent"
          />

          <label className="field-label" htmlFor="birthday-note">
            Your message <span>(optional, up to {MAX_MESSAGE_LENGTH} characters)</span>
          </label>
          <textarea
            id="birthday-note"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            maxLength={MAX_MESSAGE_LENGTH}
            rows={4}
            placeholder="Write a short note…"
            aria-describedby="note-character-count note-consent note-status"
          />
          <div className="note-character-count" id="note-character-count">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </div>

          <label className="consent-label" htmlFor="note-consent">
            <input
              id="note-consent"
              type="checkbox"
              checked={consented}
              onChange={(event) => setConsented(event.target.checked)}
              required
            />
            <span>I agree that the name entered (or Anonymous if left blank), my message, and the submission time can be stored in Supabase for Udhaya (DLF) to read. Authorized project admins may also have access.</span>
          </label>

          <button
            type="submit"
            className="primary-button note-submit"
            disabled={isSubmitting || !message.trim() || !consented}
          >
            <svg className="note-submit-butterfly" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M30 28C23 10 5 7 7 23c1 9 11 12 22 13-10 2-16 8-12 15 5 8 14-2 16-15Z" />
              <path d="M34 28c7-18 25-21 23-5-1 9-11 12-22 13 10 2 16 8 12 15-5 8-14-2-16-15Z" />
              <path className="note-submit-butterfly-body" d="M32 27c-3 6-3 13 0 20 3-7 3-14 0-20Z" />
            </svg>
            <span>{isSubmitting ? 'Sending…' : 'Send'}</span>
          </button>

          <p
            className={hasError ? 'note-status error' : 'note-status'}
            id="note-status"
            role={hasError ? 'alert' : 'status'}
            aria-live="polite"
          >
            {status}
          </p>
        </form>
      ) : (
        <p className="note-setup-notice" role="status">
          Supabase isn’t connected in this environment yet. For a deployed site, add{' '}
          <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> to the Cloudflare Pages
          project’s environment variables and redeploy. Also run <code>supabase/schema.sql</code> in the matching
          Supabase project’s SQL Editor. Leaving a note is optional; you can enjoy the surprise without sharing
          anything.
        </p>
      )}
    </section>
  );
}
