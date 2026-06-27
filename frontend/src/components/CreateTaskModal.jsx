import { useEffect, useState } from 'react';

export default function CreateTaskModal({ onClose, onCreate, columnStatus }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title, description, priority, status: columnStatus });
  };

  return (
    <div
      className="backdrop-blur-custom"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-lg)',
      }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          backgroundColor: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--outline-variant)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: 'var(--space-lg) var(--space-xl)',
            borderBottom: '1px solid var(--outline-variant)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 className="text-headline-md" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            New Task ({columnStatus})
          </h3>
          <button
            onClick={onClose}
            style={{
              padding: 'var(--space-xs)',
              borderRadius: '50%',
              color: 'var(--on-surface-variant)',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Body / Form */}
        <form onSubmit={handleSubmit} style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label htmlFor="task-title" className="text-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>
              Task title
            </label>
            <input
              id="task-title"
              type="text"
              required
              placeholder="e.g. Design checkout interface"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-sm) var(--space-md)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 14,
                color: 'var(--on-surface)',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--secondary-container)';
                e.target.style.borderColor = 'var(--primary)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = 'var(--outline-variant)';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label htmlFor="task-desc" className="text-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>
              Description
            </label>
            <textarea
              id="task-desc"
              placeholder="Brief details about the requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                minHeight: 80,
                padding: 'var(--space-sm) var(--space-md)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 14,
                color: 'var(--on-surface)',
                resize: 'none',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px var(--secondary-container)';
                e.target.style.borderColor = 'var(--primary)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = 'var(--outline-variant)';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label htmlFor="task-priority" className="text-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>
              Priority level
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-sm) var(--space-md)',
                  fontSize: 14,
                  color: 'var(--on-surface)',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--on-surface-variant)',
                }}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--space-md)',
              paddingTop: 'var(--space-sm)',
              borderTop: '1px solid var(--outline-variant)',
              marginTop: 'var(--space-md)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: 'var(--space-sm) var(--space-lg)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 700,
                fontSize: 14,
                color: 'var(--on-surface-variant)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-container-high)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: 'var(--space-sm) var(--space-lg)',
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: '0 4px 10px rgba(9, 20, 38, 0.2)',
                transition: 'transform 0.1s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
