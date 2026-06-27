import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading: isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <main style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* LEFT SIDE: Auth Form */}
      <section
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--surface)',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Header */}
          <header style={{ marginBottom: 'var(--space-xl)' }}>
            <h1
              className="text-headline-lg"
              style={{ color: 'var(--on-background)', marginBottom: 'var(--space-sm)' }}
            >
              Create an account
            </h1>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Sign up to start managing your projects and tasks.
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
              {/* Full Name Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <label
                  htmlFor="name"
                  className="text-label-md"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Full name
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
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <label
                  htmlFor="password"
                  className="text-label-md"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Password
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
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <footer style={{ textAlign: 'center', paddingTop: 'var(--space-md)' }}>
            <p className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Sign in
              </Link>
            </p>
          </footer>
        </div>
      </section>

      {/* RIGHT SIDE: Visual Branding */}
      <section
        className="gradient-mesh"
        style={{
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
