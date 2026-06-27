import { useSelector } from 'react-redux';

export default function TopBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header
      style={{
        height: 64,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 'var(--sidebar-width)',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--outline-variant)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 var(--space-lg)',
        zIndex: 40,
      }}
    >
      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', flex: 1 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 448 }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--on-surface-variant)',
              fontSize: 20,
            }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search tasks, projects, or people..."
            style={{
              width: '100%',
              backgroundColor: 'var(--surface-container-low)',
              border: '1px solid var(--outline-variant)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px 8px 40px',
              fontSize: 14,
              lineHeight: '20px',
              color: 'var(--on-surface)',
              transition: 'all 0.15s ease',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px var(--primary)';
              e.target.style.borderColor = 'transparent';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = 'var(--outline-variant)';
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {/* Notification Bell */}
        <button
          style={{
            padding: 8,
            borderRadius: '50%',
            color: 'var(--on-surface-variant)',
            position: 'relative',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container-high)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span className="material-symbols-outlined">notifications</span>
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 8,
              height: 8,
              backgroundColor: 'var(--error)',
              borderRadius: '50%',
            }}
          />
        </button>

        {/* Help */}
        <button
          style={{
            padding: 8,
            borderRadius: '50%',
            color: 'var(--on-surface-variant)',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container-high)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        {/* Divider */}
        <div
          style={{
            height: 32,
            width: 1,
            backgroundColor: 'var(--outline-variant)',
            margin: '0 var(--space-sm)',
          }}
        />

        {/* User */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            padding: '4px 12px 4px 4px',
            borderRadius: 'var(--radius-full)',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container-high)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--surface-variant)',
              overflow: 'hidden',
              border: '1px solid var(--outline-variant)',
            }}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 12,
                  color: 'var(--primary)',
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <span
            className="text-label-sm"
            style={{ color: 'var(--on-surface)', fontWeight: 600 }}
          >
            {user?.name?.split(' ')[0] || 'User'}
          </span>
        </button>
      </div>
    </header>
  );
}
