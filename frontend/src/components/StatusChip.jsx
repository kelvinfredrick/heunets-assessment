const statusStyles = {
  'in-progress': {
    backgroundColor: 'var(--secondary-container)',
    color: 'var(--primary)',
  },
  active: {
    backgroundColor: 'var(--tertiary-fixed)',
    color: 'var(--primary)',
  },
  'at-risk': {
    backgroundColor: 'var(--error-container)',
    color: 'var(--error)',
  },
  completed: {
    backgroundColor: 'var(--surface-container-high)',
    color: 'var(--on-surface-variant)',
  },
  high: {
    backgroundColor: 'var(--error-container)',
    color: 'var(--on-error-container)',
  },
  medium: {
    backgroundColor: 'rgba(250, 223, 184, 0.3)',
    color: 'var(--on-tertiary-fixed-variant)',
  },
  low: {
    backgroundColor: 'var(--secondary-container)',
    color: 'var(--on-secondary-container)',
  },
};

export default function StatusChip({ status, label }) {
  const key = status?.toLowerCase().replace(/\s+/g, '-') || 'active';
  const style = statusStyles[key] || statusStyles.active;

  return (
    <span
      style={{
        ...style,
        padding: '2px 8px',
        borderRadius: 'var(--radius-full)',
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        lineHeight: '16px',
        display: 'inline-block',
      }}
    >
      {label || status}
    </span>
  );
}
