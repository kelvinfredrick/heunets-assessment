import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/slices/projectsSlice';
import StatusChip from '../components/StatusChip';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, token } = useSelector((state) => state.auth);
  const { list: projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    if (token) {
      dispatch(fetchProjects());
    }
  }, [token, dispatch]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // Helper to map index to Bento Grid style
  const getCardStyle = (index) => {
    if (projects.length === 1) return { gridColumn: 'span 12' };
    if (index === 0) return { gridColumn: 'span 8' };
    if (index === 1 || index === 2) return { gridColumn: 'span 4' };
    return { gridColumn: 'span 6' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', animation: 'fade-in 0.4s ease-out' }}>
      {/* Welcome Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <h2 className="text-display" style={{ color: 'var(--primary)' }}>
          Welcome back, {user?.name || 'Alex'}!
        </h2>
        <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)' }}>
          Here's what's happening in your workspace today.
        </p>
      </section>

      {/* Stats Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-lg)',
        }}
      >
        {/* Stat 1 */}
        <div
          style={{
            backgroundColor: 'var(--surface-container-lowest)',
            border: '1px solid var(--outline-variant)',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'border-color 0.15s ease',
          }}
        >
          <div>
            <p className="text-label-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>
              Tasks Completed
            </p>
            <h3 className="text-display" style={{ lineHeight: 1, color: 'var(--primary)' }}>
              128
            </h3>
            <p
              className="text-label-sm"
              style={{
                color: 'var(--on-tertiary-container)',
                marginTop: 'var(--space-sm)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
              +12% from last week
            </p>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'var(--secondary-container)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>check_circle</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div
          style={{
            backgroundColor: 'var(--surface-container-lowest)',
            border: '1px solid var(--outline-variant)',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'border-color 0.15s ease',
          }}
        >
          <div>
            <p className="text-label-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>
              Active Projects
            </p>
            <h3 className="text-display" style={{ lineHeight: 1, color: 'var(--primary)' }}>
              {projects.length}
            </h3>
            <p
              className="text-label-sm"
              style={{
                color: 'var(--on-primary-container)',
                marginTop: 'var(--space-sm)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sync</span>
              Syncing via Redux Toolkit
            </p>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'var(--primary-fixed)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>rocket_launch</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div
          style={{
            backgroundColor: 'var(--surface-container-lowest)',
            border: '1px solid var(--outline-variant)',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'border-color 0.15s ease',
          }}
        >
          <div>
            <p className="text-label-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 'var(--space-xs)' }}>
              Upcoming Deadlines
            </p>
            <h3 className="text-display" style={{ lineHeight: 1, color: 'var(--error)' }}>
              3
            </h3>
            <p
              className="text-label-sm"
              style={{
                color: 'var(--on-error-container)',
                marginTop: 'var(--space-sm)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
              Priority: High
            </p>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'var(--error-container)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--error)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>timer</span>
          </div>
        </div>
      </div>

      {/* Project Overview Header */}
      <div>
        <div
          className="header-actions-wrap"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-md)',
          }}
        >
          <h4 className="text-headline-lg" style={{ color: 'var(--primary)' }}>
            Project Overview
          </h4>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            {['Filter', 'Sort by'].map((txt) => (
              <button
                key={txt}
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  backgroundColor: 'var(--surface-container-high)',
                  color: 'var(--on-surface)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 12,
                  transition: 'background-color 0.15s ease',
                }}
              >
                {txt}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {loading ? (
            <div style={{ padding: '40px 0', textAlign: 'center', gridColumn: 'span 12' }}>
              <p>Loading projects from MongoDB...</p>
            </div>
          ) : (
            projects.map((project, idx) => {
              return (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project._id)}
                  style={{
                    ...getCardStyle(idx),
                    backgroundColor: 'var(--surface-container-lowest)',
                    border: '1px solid var(--outline-variant)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--space-lg)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                      <div>
                        <StatusChip status={project.progress === 100 ? 'completed' : 'in-progress'} />
                      </div>
                      <h5 className="text-headline-md" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {project.name}
                      </h5>
                      <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: 512 }}>
                        {project.description || 'No description provided.'}
                      </p>
                    </div>
                    <button
                      style={{ padding: 8, borderRadius: '50%', color: 'var(--on-surface-variant)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--on-surface-variant)' }}>Overall Progress</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{project.progress}%</span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        width: '100%',
                        backgroundColor: 'var(--surface-container-high)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: project.progress === 100 ? 'var(--status-success)' : 'var(--primary)',
                          borderRadius: 'var(--radius-full)',
                          width: `${project.progress}%`,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 'var(--space-sm)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-gutter)' }}>
                        {/* Member Avatars */}
                        <div style={{ display: 'flex', gap: -8 }}>
                          {[
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuCaoeZ0sfoVo1g0ytq0fr1vn4x3n8xWfzeqvQ1MiXcOruf1Ugs32pZNVIKI7ruedw0hL648x9jbBRHDT2DFZkboRNOk4SoIys3vNmpd2S_MvZ7EkRWvluPDN2HThoPvb59rHv_Pv9zIq3J9JZ3WZdvnEkXHLHVenlbgigeIZKNw41gWRw8inqxVJj_q_mNQcLN92bRWBV3EKHjRFJtepivJ0GKAcJsBcLMsh2cQOzENY1WbJ25A866wByovJdnlZ37WVXZp0DmFNrpE',
                          ].map((src, i) => (
                            <div
                              key={i}
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                border: '2px solid white',
                                overflow: 'hidden',
                                backgroundColor: 'var(--surface-variant)',
                              }}
                            >
                              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                        <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>
                          Database Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
