import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main
      className="auth-layout"
      style={{
        background: 'var(--background)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
        padding: 'var(--space-xl)',
        textAlign: 'center',
      }}
    >
      {/* Decorative background blurs */}
      <div
        className="animate-pulse-soft"
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 300,
          height: 300,
          backgroundColor: 'rgba(103, 80, 164, 0.06)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 400,
          height: 400,
          backgroundColor: 'rgba(250, 223, 184, 0.04)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      {/* 404 Number */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-md)',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(100px, 20vw, 180px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--tertiary-fixed) 50%, var(--primary-container) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
          }}
        >
          404
        </div>

        {/* Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--surface-container)',
            border: '1px solid var(--outline-variant)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-var(--space-md)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 36,
              color: 'var(--primary)',
              fontVariationSettings: "'FILL' 1",
            }}
          >
            explore_off
          </span>
        </div>

        {/* Text */}
        <h1
          className="text-headline-lg"
          style={{
            color: 'var(--on-background)',
            marginTop: 'var(--space-sm)',
          }}
        >
          Page not found
        </h1>
        <p
          className="text-body-lg"
          style={{
            color: 'var(--on-surface-variant)',
            maxWidth: 420,
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-md)',
            marginTop: 'var(--space-lg)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              padding: 'var(--space-sm) var(--space-xl)',
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              home
            </span>
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              padding: 'var(--space-sm) var(--space-xl)',
              backgroundColor: 'var(--surface-container)',
              color: 'var(--on-surface)',
              fontWeight: 500,
              fontSize: 14,
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--outline-variant)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-container-high)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-container)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              arrow_back
            </span>
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
