import { useState, type FormEvent } from 'react';
import { Button } from '../../atoms/Button/Button';
import { TextInput } from '../../atoms/TextInput/TextInput';

// ── Logo mark ──────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="white" />
      </svg>
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────────
function OrDivider() {
  return (
    <div className="flex items-center gap-md w-full">
      <div className="flex-1 h-px bg-border" />
      <span className="text-caption text-foreground-muted px-sm">or</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ── Login screen ───────────────────────────────────────────────────────────────
export interface LoginScreenProps {
  onSuccess?: (email: string) => void;
}

export function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function validate() {
    let valid = true;
    if (!email) {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate network request
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess?.(email);
  }

  return (
    // Screen — full viewport, token-aware background
    <div className="min-h-screen bg-surface flex items-center justify-center p-xl">

      {/* Card — max-w-[400px] avoids --spacing-sm token clash in Tailwind v4 */}
      <div className="w-full max-w-[400px] bg-background rounded-xl border border-border shadow-sm flex flex-col items-center gap-2xl px-5xl py-5xl">

        {/* Logo */}
        <LogoMark />

        {/* Heading */}
        <div className="text-center flex flex-col gap-sm">
          <h1 className="text-h3 font-semibold text-foreground">Welcome back</h1>
          <p className="text-small text-foreground-muted">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-lg">

          <TextInput
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError}
          />

          <div className="flex flex-col gap-sm">
            <TextInput
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={passwordError}
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="text-small font-medium text-link hover:text-link-hover transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="w-full"
          >
            Sign in
          </Button>
        </form>

        <OrDivider />

        {/* Create account */}
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="w-full"
        >
          Create an account
        </Button>

        {/* Footer */}
        <p className="text-caption text-foreground-muted text-center">
          By signing in, you agree to our{' '}
          <button type="button" className="underline hover:text-foreground transition-colors">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="underline hover:text-foreground transition-colors">
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </div>
  );
}
