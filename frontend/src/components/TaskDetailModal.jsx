import { useEffect, useState } from 'react';
import StatusChip from './StatusChip';

export default function TaskDetailModal({ taskId, onClose, onSave, onDelete }) {
  const [status, setStatus] = useState('In Progress');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState(
    'Implement a secure, scalable authentication system using JWT and OAuth2. The module should support:\n\n• Email/Password registration and login with Argon2 hashing\n• Social login integration (Google & GitHub)\n• Multi-factor authentication (TOTP)\n• Refresh token rotation and secure cookie handling\n\nArchitecture must follow the existing hexagonal patterns established in the /services/identity directory.'
  );
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Sarah Miller',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWGy_Aa1TLjTNsPHucQaBF_VtL0RMqzWM5KyjVrEmyGDY8YUN_AHZN6iV9IZz3kEpB5VRQiFGzxngvw4KTXAXtDcHuGlQYDwr-LNtikHkVcxW9CXizUWI_N4tTDTUKS0CNtEdYwODzSAjcvnq8dnnNeDAlgrZ47PThkF9wLi1vrZhxap1X3YvjLjXphzpHfMUzQQdayGf1jpZaj7QfP6FAqG7_Us9j0rMTHeKVz0_V7IXN5jrGqGxNXXq-IDZh6WwZIsUgsjBKN9LT',
      time: '2 hours ago',
      content: "I've finished the UI mockups for the login flow. Let me know if you need the Figma link for the API response messages.",
      likes: 2,
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: 'Alex Morgan',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6R5FqFaOC1j2V5ynBu3WWkLOX-FAaIeLLe0K9Oxv-nK_xsPBWfvc7imCyTFqdyuhHnYnwqNHdTHq7570j9SD_Y4iPUcyduSM3aVInoQSHpWtpwNWqXVTz9OhVvrcK8TeCPPJ3Y4T9P377t9t04AZsMsr3pFDr5dMgh2UpwBhXwLyqWj0tB9HB9DAPrdeiOhhE9UlLgoQSETOnxTd2M3cdXUnhTcxDVM9EWD--LMRzUMuH_a1E_IdI50ol3hOsYJKyLvKPXqtUEN4E',
        time: 'Just now',
        content: newComment,
        likes: 0,
      }
    ]);
    setNewComment('');
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
      {/* Modal Container */}
      <div
        className="animate-fade-in-scale task-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--surface-container-lowest)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--outline-variant)',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Left/Main Column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            borderRight: '1px solid var(--outline-variant)',
          }}
          className="scrollbar-hide"
        >
          {/* Header */}
          <header
            style={{
              padding: 'var(--space-lg) var(--space-xl)',
              borderBottom: '1px solid var(--outline-variant)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              position: 'sticky',
              top: 0,
              backgroundColor: 'var(--surface-container-lowest)',
              zIndex: 10,
            }}
          >
            <div style={{ flex: 1, marginRight: 'var(--space-xl)' }}>
              <div
                className="text-label-sm"
                style={{
                  color: 'var(--on-surface-variant)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  marginBottom: 'var(--space-sm)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>folder_open</span>
                <span>Platform Redesign</span>
                <span>/</span>
                <span>TASK-1024</span>
              </div>
              <h2 className="text-headline-lg" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                Develop User Auth Module
              </h2>
            </div>
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

          {/* Details Body */}
          <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Metadata Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {/* Status */}
              <div>
                <label className="text-label-md" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                  Status
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(80, 95, 118, 0.1)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-sm) var(--space-md)',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--secondary)',
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>In Review</option>
                    <option>Done</option>
                  </select>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--on-surface-variant)',
                      fontSize: 18,
                    }}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="text-label-md" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                  Priority
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    backgroundColor: 'var(--error-container)',
                    border: '1px solid rgba(186, 26, 26, 0.2)',
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: 'var(--error)', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
                    flag
                  </span>
                  <span className="text-label-md" style={{ color: 'var(--error)', fontWeight: 700 }}>
                    {priority}
                  </span>
                </div>
              </div>

              {/* Assignee */}
              <div>
                <label className="text-label-md" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                  Assignee
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '2px solid var(--primary)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--surface-container)',
                    }}
                  >
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_K2yUTAwYp02WxN2sm32UYIQobyveHSpSEYGR3OAv8foSUotNHodTujeQrUyfUOW4L_MNjpth3-hmY4pAQfUnrVKiPvQk7hWydsQa18zeKqvYjZmQGcmvEB1GplwQn-a9-dLVNz194ibSPkK3r9b4wysDDewoEspzhwFY9770EPndH_K_sRNOEWzJaT9T3zVjO9fDCLPI4QXRILuEMtHH8IoVh1lFwG7Knh2mE1MmaGKJvRbKRcpBeflaxaRv9GsmG9rF4eXkmm4S"
                      alt="David Chen"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span className="text-label-md" style={{ color: 'var(--on-surface)', fontWeight: 600 }}>
                    David Chen
                  </span>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="text-label-md" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                  Due Date
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    fontSize: 13,
                    color: 'var(--on-surface)',
                    backgroundColor: 'var(--surface-container)',
                    border: '1px solid var(--outline-variant)',
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--on-surface-variant)' }}>
                    calendar_month
                  </span>
                  <span>Oct 24, 2023</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                <h3 className="text-headline-md" style={{ color: 'var(--primary)' }}>Description</h3>
                <button
                  className="text-label-sm"
                  style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>edit</span> Edit
                </button>
              </div>
              <div
                className="text-body-md"
                style={{
                  color: 'var(--on-surface-variant)',
                  backgroundColor: 'var(--surface-container-low)',
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(197, 198, 205, 0.3)',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {description}
              </div>
            </section>

            {/* Comments */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                <h3 className="text-headline-md" style={{ color: 'var(--primary)' }}>Comments</h3>
                <span
                  style={{
                    backgroundColor: 'var(--surface-container-high)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {comments.length}
                </span>
              </div>

              {/* Comment List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                {comments.map((comment) => (
                  <div key={comment.id} style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      {comment.avatar ? (
                        <img src={comment.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyText: 'center', fontSize: 12, fontWeight: 700 }}>
                          {comment.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                        <span className="text-label-md" style={{ color: 'var(--on-surface)', fontWeight: 700 }}>{comment.author}</span>
                        <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', fontWeight: 400 }}>{comment.time}</span>
                      </div>
                      <div
                        className="text-body-md"
                        style={{
                          backgroundColor: 'var(--surface-container)',
                          borderRadius: '0 8px 8px 8px',
                          padding: 'var(--space-md)',
                          color: 'var(--on-surface-variant)',
                          border: '1px solid rgba(197, 198, 205, 0.2)',
                        }}
                      >
                        {comment.content}
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-lg)', marginTop: 'var(--space-xs)' }}>
                        <button className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Reply</button>
                        <button className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>thumb_up</span> {comment.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* New Comment Input */}
                <div style={{ display: 'flex', gap: 'var(--space-md)', paddingTop: 'var(--space-md)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--outline-variant)' }}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHkm1gNkhF3AC_NfB5c-INiWF5X-lWjUhvYri-2fVEpp1AwB_b5_k_bBcDEcXIvfWQQ_4973fDAAN8LxXwmdrn4yL3vxeql3gXXDpiC3ygzjCTggDgFJvyT9ThKJW9rg0MdIcWAJDsY3B4I7ntfIKu1RN7MrAyzqpTxyYG0xcI-lGlW5I3kd-vAtu2qxnDC7a3AAwxhszwu-57eFbJuUUxzRmBVdQ3e2Uo58fWNgjWBZTWdskSceBelnHkI1-Fjz6Y_T7R_ywFIgLG"
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: 80,
                        backgroundColor: 'var(--surface-container-lowest)',
                        border: '1px solid var(--outline-variant)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-md)',
                        paddingRight: 80,
                        fontSize: 14,
                        color: 'var(--on-surface)',
                        resize: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--outline-variant)')}
                    />
                    <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 'var(--space-sm)' }}>
                      <button style={{ padding: 4, color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>attach_file</span>
                      </button>
                      <button
                        onClick={handlePostComment}
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--on-primary)',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius)',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <footer
            style={{
              padding: 'var(--space-lg)',
              borderTop: '1px solid var(--outline-variant)',
              backgroundColor: 'var(--surface-container-low)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              bottom: 0,
              zIndex: 10,
              marginTop: 'auto',
            }}
          >
            <button
              onClick={() => onDelete && onDelete(taskId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                color: 'var(--error)',
                fontWeight: 700,
                fontSize: 14,
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--error-container)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
              Delete Task
            </button>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <button
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
                onClick={() => onSave && onSave(taskId, { status, priority, description })}
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
                Save Changes
              </button>
            </div>
          </footer>
        </div>

        {/* Right Column: Activity Log */}
        <aside style={{ width: 320, backgroundColor: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column' }}>
          <header style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--outline-variant)' }}>
            <h3 className="text-headline-md" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: 16 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>history</span>
              Activity Log
            </h3>
          </header>

          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Timeline Item 1 */}
            <div style={{ position: 'relative', paddingLeft: 'var(--space-gutter)' }}>
              <div style={{ position: 'absolute', left: 0, top: 4, bottom: -24, width: 2, backgroundColor: 'var(--outline-variant)' }} />
              <div style={{ position: 'absolute', left: -4, top: 4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--secondary)' }} />
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>Today, 10:45 AM</div>
              <div className="text-body-md" style={{ color: 'var(--on-surface)' }}>
                <span style={{ fontWeight: 700 }}>David Chen</span> moved status to{' '}
                <span
                  style={{
                    backgroundColor: 'var(--secondary-container)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius)',
                    color: 'var(--secondary)',
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                >
                  In Progress
                </span>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div style={{ position: 'relative', paddingLeft: 'var(--space-gutter)' }}>
              <div style={{ position: 'absolute', left: 0, top: 4, bottom: -24, width: 2, backgroundColor: 'var(--outline-variant)' }} />
              <div style={{ position: 'absolute', left: -4, top: 4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--outline)' }} />
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>Today, 09:12 AM</div>
              <div className="text-body-md" style={{ color: 'var(--on-surface)' }}>
                <span style={{ fontWeight: 700 }}>David Chen</span> changed priority to{' '}
                <span style={{ color: 'var(--error)', fontWeight: 700 }}>High</span>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div style={{ position: 'relative', paddingLeft: 'var(--space-gutter)' }}>
              <div style={{ position: 'absolute', left: 0, top: 4, bottom: -24, width: 2, backgroundColor: 'var(--outline-variant)' }} />
              <div style={{ position: 'absolute', left: -4, top: 4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--outline)' }} />
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>Yesterday, 04:30 PM</div>
              <div className="text-body-md" style={{ color: 'var(--on-surface)' }}>
                <span style={{ fontWeight: 700 }}>Sarah Miller</span> added an attachment{' '}
                <span style={{ color: 'var(--secondary)', textDecoration: 'underline', textDecorationStyle: 'dotted' }}>
                  auth_flow_v2.pdf
                </span>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div style={{ position: 'relative', paddingLeft: 'var(--space-gutter)' }}>
              <div style={{ position: 'absolute', left: -4, top: 4, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--outline)' }} />
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>Oct 20, 2023</div>
              <div className="text-body-md" style={{ color: 'var(--on-surface)' }}>
                <span style={{ fontWeight: 700 }}>Admin</span> created this task
              </div>
            </div>
          </div>

          {/* Timestamps Info */}
          <div
            style={{
              padding: 'var(--space-lg)',
              backgroundColor: 'var(--surface-container-high)',
              borderTop: '1px solid var(--outline-variant)',
              marginTop: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>
              <span>Created:</span>
              <span style={{ color: 'var(--on-surface)' }}>Oct 20, 2023</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--on-surface-variant)' }}>
              <span>Last Updated:</span>
              <span style={{ color: 'var(--on-surface)' }}>1 hour ago</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
