import StatusChip from './StatusChip';

export default function TaskCard({ task, onClick }) {
  const isCompleted = task.status === 'Completed';

  // Determine top stripe color
  const getStripeColor = () => {
    if (task.priority === 'High') return 'var(--error)';
    if (task.priority === 'Medium') return 'var(--tertiary-fixed-dim)';
    return 'var(--secondary-fixed-dim)';
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick && onClick(task.id)}
      style={{
        backgroundColor: 'var(--surface-container-lowest)',
        border: '1px solid var(--outline-variant)',
        borderRadius: 'var(--radius)',
        padding: 'var(--space-md)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'grab',
        opacity: isCompleted ? 0.7 : 1,
        transition: 'all 0.15s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-sm)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'none';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = 'grabbing';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = 'grab';
      }}
    >
      {/* Top Stripe */}
      {!isCompleted && (
        <div
          style={{
            height: 4,
            width: '100%',
            backgroundColor: getStripeColor(),
            borderRadius: 'var(--radius-full)',
          }}
        />
      )}

      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--primary)',
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </h4>
        {isCompleted && (
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        )}
      </div>

      {/* Image Mockup (if exists) */}
      {task.image && (
        <div
          style={{
            height: 128,
            backgroundColor: 'var(--surface-container-high)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            margin: 'var(--space-xs) 0',
          }}
        >
          <img src={task.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Progress Bar (if exists) */}
      {task.progress !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <div
            style={{
              flex: 1,
              height: 6,
              backgroundColor: 'var(--surface-container-high)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: 'var(--primary)',
                width: `${task.progress}%`,
              }}
            />
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--on-surface-variant)' }}>
            {task.progress}%
          </span>
        </div>
      )}

      {/* Description */}
      {task.description && !task.image && (
        <p className="text-label-sm line-clamp-2" style={{ color: 'var(--on-surface-variant)', fontWeight: 400 }}>
          {task.description}
        </p>
      )}

      {/* Metadata Bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-xs)' }}>
        <StatusChip status={task.priority} />
        {task.date && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              color: 'var(--on-surface-variant)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              calendar_today
            </span>
            <span>{task.date}</span>
          </div>
        )}
      </div>
    </div>
  );
}
