export default function Reports() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', animation: 'fade-in 0.4s ease-out' }}>
      <h2 className="text-display" style={{ color: 'var(--primary)' }}>
        Performance Reports
      </h2>
      <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)' }}>
        Insights and delivery speed tracking.
      </p>

      <div
        style={{
          backgroundColor: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          color: 'var(--on-surface-variant)',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>
          bar_chart
        </span>
        <p className="text-body-md" style={{ fontWeight: 600 }}>Analytics & Reports coming soon</p>
        <p className="text-label-sm">Track team velocity, workload balance, and task resolution rates.</p>
      </div>
    </div>
  );
}
