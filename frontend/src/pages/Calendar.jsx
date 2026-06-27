export default function Calendar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', animation: 'fade-in 0.4s ease-out' }}>
      <h2 className="text-display" style={{ color: 'var(--primary)' }}>
        Calendar Schedule
      </h2>
      <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)' }}>
        Plan deadlines and schedule meetings.
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
          calendar_today
        </span>
        <p className="text-body-md" style={{ fontWeight: 600 }}>Calendar integration coming soon</p>
        <p className="text-label-sm">Track milestones and deliverables across deadlines.</p>
      </div>
    </div>
  );
}
