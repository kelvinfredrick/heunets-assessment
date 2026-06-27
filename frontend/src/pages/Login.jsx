import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { loading: isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <main className="auth-layout">
      {/* LEFT SIDE: Auth Form */}
      <section className="auth-form-side">
        {/* Mobile Branding (hidden on desktop) */}
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Header */}
          <header style={{ marginBottom: 'var(--space-xl)' }}>
            <h1
              className="text-headline-lg"
              style={{ color: 'var(--on-background)', marginBottom: 'var(--space-sm)' }}
            >
              Welcome back
            </h1>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Please enter your details to sign in to your project workspace.
            </p>
          </header>

          {error && (
            <div
              style={{
                backgroundColor: 'var(--error-container)',
                color: 'var(--on-error-container)',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 'var(--space-md)',
                border: '1px solid rgba(186, 26, 26, 0.2)',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* Email Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <label
                  htmlFor="email"
                  className="text-label-md"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Email address
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      paddingLeft: 'var(--space-md)',
                      display: 'flex',
                      alignItems: 'center',
                      pointerEvents: 'none',
                      color: 'var(--outline)',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>mail</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: 44,
                      paddingRight: 'var(--space-md)',
                      paddingTop: 'var(--space-sm)',
                      paddingBottom: 'var(--space-sm)',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 14,
                      lineHeight: '20px',
                      color: 'var(--on-surface)',
                      transition: 'all 0.15s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px var(--secondary-container)';
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.previousSibling.style.color = 'var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = 'var(--outline-variant)';
                      e.target.previousSibling.style.color = 'var(--outline)';
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label
                    htmlFor="password"
                    className="text-label-md"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-label-sm"
                    style={{ color: 'var(--on-primary-fixed-variant)', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      paddingLeft: 'var(--space-md)',
                      display: 'flex',
                      alignItems: 'center',
                      pointerEvents: 'none',
                      color: 'var(--outline)',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: 44,
                      paddingRight: 'var(--space-md)',
                      paddingTop: 'var(--space-sm)',
                      paddingBottom: 'var(--space-sm)',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 14,
                      lineHeight: '20px',
                      color: 'var(--on-surface)',
                      transition: 'all 0.15s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px var(--secondary-container)';
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.previousSibling.style.color = 'var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = 'var(--outline-variant)';
                      e.target.previousSibling.style.color = 'var(--outline)';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: 16,
                  height: 16,
                  accentColor: 'var(--primary)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--outline-variant)',
                  cursor: 'pointer',
                }}
              />
              <label
                htmlFor="remember-me"
                className="text-label-md"
                style={{ marginLeft: 'var(--space-sm)', color: 'var(--on-surface-variant)', cursor: 'pointer' }}
              >
                Remember for 30 days
              </label>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 'var(--space-sm) var(--space-lg)',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                  fontWeight: 500,
                  fontSize: 13,
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-sm)',
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary-container)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', padding: 'var(--space-base) 0' }}>
                <div style={{ flex: 1, borderTop: '1px solid var(--outline-variant)' }} />
                <span
                  className="text-label-sm"
                  style={{ padding: '0 var(--space-md)', color: 'var(--outline)' }}
                >
                  or continue with
                </span>
                <div style={{ flex: 1, borderTop: '1px solid var(--outline-variant)' }} />
              </div>

              {/* Google Button */}
              <button
                type="button"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  padding: 'var(--space-sm) var(--space-lg)',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline-variant)',
                  color: 'var(--on-surface)',
                  fontWeight: 500,
                  fontSize: 13,
                  borderRadius: 'var(--radius-lg)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
            </div>
          </form>

          {/* Footer */}
          <footer style={{ textAlign: 'center', paddingTop: 'var(--space-md)' }}>
            <p className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>
              New to TeamBoard?{' '}
              <Link
                to="/signup"
                style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Create an account
              </Link>
            </p>
          </footer>
        </div>
      </section>

      {/* RIGHT SIDE: Visual Branding */}
      <section className="gradient-mesh auth-brand-side">
        {/* Decorative Blurs */}
        <div
          className="animate-pulse-soft"
          style={{
            position: 'absolute',
            top: 80,
            right: 80,
            width: 256,
            height: 256,
            backgroundColor: 'rgba(250, 223, 184, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 384,
            height: 384,
            backgroundColor: 'rgba(216, 227, 251, 0.05)',
            borderRadius: '50%',
            filter: 'blur(120px)',
          }}
        />

        {/* Central Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: 480,
            padding: '0 var(--space-xl)',
            textAlign: 'center',
          }}
        >
          {/* Branding */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                backgroundColor: 'var(--on-primary-fixed-variant)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 25px rgba(9, 20, 38, 0.2)',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: 'var(--on-primary)',
                  fontSize: 32,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                dashboard
              </span>
            </div>
            <div>
              <span
                className="text-display"
                style={{
                  color: 'var(--on-primary)',
                  letterSpacing: '-0.04em',
                  display: 'block',
                }}
              >
                TeamBoard
              </span>
              <div
                style={{
                  height: 4,
                  width: 48,
                  backgroundColor: 'var(--tertiary-fixed)',
                  margin: '8px auto 0',
                  borderRadius: 'var(--radius-full)',
                }}
              />
            </div>
          </div>

          {/* Value Prop */}
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h2
              className="text-headline-lg"
              style={{ color: 'var(--on-primary)', lineHeight: '1.3', marginBottom: 'var(--space-md)' }}
            >
              Manage projects effortlessly.
            </h2>
            <p
              className="text-body-lg"
              style={{
                color: 'var(--primary-fixed-dim)',
                opacity: 0.8,
                maxWidth: 360,
                margin: '0 auto',
              }}
            >
              The digital workspace designed for high-performance teams. Reduce cognitive load and focus on what truly matters.
            </p>
          </div>

          {/* Floating Task Card */}
          <div style={{ marginTop: 'var(--space-xl)', position: 'relative' }}>
            <div
              className="auth-card-blur animate-float"
              style={{
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: 'var(--shadow-xl)',
                maxWidth: 360,
                margin: '0 auto',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-sm)',
                }}
              >
                <span
                  style={{
                    padding: '2px 8px',
                    backgroundColor: 'rgba(208, 225, 251, 0.3)',
                    color: 'var(--on-secondary-fixed)',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  In Progress
                </span>
                <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: 18 }}>
                  more_horiz
                </span>
              </div>
              <h4
                style={{
                  fontWeight: 700,
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-xs)',
                  fontSize: 16,
                }}
              >
                Refactor Authentication Flow
              </h4>
              <p className="text-label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: 'var(--space-md)' }}>
                Clean, modular, and performant UI components.
              </p>
              <div style={{ display: 'flex', gap: -4 }}>
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuMOyOi7jjacKC_APxn_IvODu22WRYAKDie44VdaOY0GJJICFVkdy-PTXrz7cyJZKNiWkefTK6igL-RFno21I40qNfGpD-ffpOYOPVwpLqpyfmkF37wQu3VOzvOwtl0toN_lEFvEqIFIRQ_PHvxRZXqwVX8UzjlmbNKwVvXLKvEZGPEJJTOaIGKXsrJlZi4QEa7rxW3rpoQ2fg9uRf7Yy9jATyVFCcKSaQqhDMWSaGNbv9QZkXykIKFAHM--t1vVVLN6567uRb7Qq',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCfF4iEQzl2CT72nT9ScJQqDjBR_03m6DqSJGMfu2q6sKlFvRdz5bREuEnL0SUadZu59e2U-lxtk64DuqFZSS_KvyEaVs3WBrldZ_4gz2k8sfps_xCXkXRI2UX8ZIfkGRJVNxhmpwBoTdmlzxaDqqizj8Mqw4UGRB54uMefKxoFHfDRcdRVV9GCvg2tX-C6Yn8pWNCU7puPAKAd4vPZsylq2-fbAXmN4dSDQ4e4bR0tT_G5ImjSUvtuzABJU_BipfpBxq5HYDNYugZz',
                ].map((src, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '2px solid white',
                      overflow: 'hidden',
                      backgroundColor: 'var(--surface-container)',
                      marginLeft: i > 0 ? -8 : 0,
                    }}
                  >
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid white',
                    backgroundColor: 'var(--primary-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: 'white',
                    fontWeight: 700,
                    marginLeft: -8,
                  }}
                >
                  +3
                </div>
              </div>
            </div>

            {/* Secondary card */}
            <div
              className="auth-card-blur"
              style={{
                position: 'absolute',
                bottom: -32,
                right: 20,
                width: 192,
                height: 48,
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 var(--space-md)',
                gap: 'var(--space-sm)',
                opacity: 0.6,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: 'rgba(250, 223, 184, 0.2)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    color: 'var(--tertiary-fixed-dim)',
                    fontSize: 16,
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  check_circle
                </span>
              </div>
              <span className="text-label-sm" style={{ color: 'var(--primary)', fontWeight: 500 }}>
                Task Completed
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-label-sm"
          style={{
            position: 'absolute',
            bottom: 32,
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          © 2024 TeamBoard Enterprise Plan. All rights reserved.
        </div>
      </section>
    </main>
  );
}
