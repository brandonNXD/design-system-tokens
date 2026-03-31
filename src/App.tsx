import { useState } from 'react';
import { LoginScreen } from './components/organisms/LoginScreen/LoginScreen';
import { Button } from './components/atoms/Button/Button';

type View = 'login' | 'success' | 'demo';

export default function App() {
  const [view, setView]           = useState<View>('login');
  const [signedInAs, setSignedIn] = useState('');

  // ── Nav pill ────────────────────────────────────────────────────────────────
  const Nav = () => (
    <nav className="fixed top-md right-md z-50 flex gap-sm">
      <Button
        size="sm"
        variant={view === 'login' || view === 'success' ? 'primary' : 'secondary'}
        onClick={() => setView('login')}
      >
        Login Screen
      </Button>
      <Button
        size="sm"
        variant={view === 'demo' ? 'primary' : 'secondary'}
        onClick={() => setView('demo')}
      >
        Token Demo
      </Button>
    </nav>
  );

  // ── Success state ────────────────────────────────────────────────────────────
  if (view === 'success') {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-xl p-xl text-center">
          <div className="w-14 h-14 rounded-full bg-success flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-sm">
            <h1 className="text-h3 font-semibold text-foreground">You're signed in!</h1>
            <p className="text-small text-foreground-muted">Welcome back, <strong>{signedInAs}</strong></p>
          </div>
          <Button variant="secondary" onClick={() => { setView('login'); setSignedIn(''); }}>
            Sign out
          </Button>
        </div>
      </>
    );
  }

  // ── Token demo ───────────────────────────────────────────────────────────────
  if (view === 'demo') {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4xl p-4xl">
          <div className="text-center">
            <h1 className="text-h1 font-bold text-foreground">Design System</h1>
            <p className="text-large text-foreground-muted mt-md">
              Tailwind v4 · simplified semantic tokens · light/dark-aware CSS vars
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-md">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="icon-only" aria-label="Add">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" isLoading>Loading</Button>
          </div>

          <div className="flex flex-wrap gap-md">
            {(['sm', 'md', 'lg'] as const).map(size => (
              <Button key={size} variant="primary" size={size}>{size.toUpperCase()}</Button>
            ))}
          </div>

          <div className="flex flex-col gap-sm w-full max-w-[480px]">
            <p className="text-small font-medium text-foreground-muted">Active token classes:</p>
            {[
              'bg-primary · text-on-primary · hover:bg-primary-hover',
              'bg-surface · border-border · text-foreground',
              'bg-destructive · text-on-destructive',
              'bg-transparent · hover:bg-surface (ghost)',
              'ring-ring (focus) · bg-muted (disabled bg)',
              'text-foreground-muted · text-foreground-disabled',
              'text-link · hover:text-link-hover',
            ].map(cls => (
              <code key={cls} className="text-caption font-medium bg-surface text-foreground px-md py-sm rounded border border-border">
                {cls}
              </code>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Login screen ─────────────────────────────────────────────────────────────
  return (
    <>
      <Nav />
      <LoginScreen
        onSuccess={email => {
          setSignedIn(email);
          setView('success');
        }}
      />
    </>
  );
}
