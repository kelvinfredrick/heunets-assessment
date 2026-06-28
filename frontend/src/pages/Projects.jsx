import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/slices/projectsSlice';
import StatusChip from '../components/StatusChip';

export default function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { list: projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    if (user) {
      dispatch(fetchProjects());
    }
  }, [user, dispatch]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', animation: 'fade-in 0.4s ease-out' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <h2 className="text-display" style={{ color: 'var(--primary)' }}>
          Projects Directory
        </h2>
        <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)' }}>
          Manage and monitor all active workspaces in your organization.
        </p>
      </section>

      {/* Grid of Projects */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-lg)',
        }}
      >
        {loading && projects.length === 0 ? (
          <>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: 'var(--surface-container-lowest)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg)',
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div className="skeleton" style={{ width: 80, height: 16, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-full)' }} />
                  <div className="skeleton" style={{ width: '70%', height: 24, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-lg)' }} />
                  <div className="skeleton" style={{ width: '90%', height: 16, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)' }} />
                </div>
                <div className="skeleton" style={{ width: '100%', height: 8, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-full)' }} />
              </div>
            ))}
          </>
        ) : projects.length === 0 ? (
          <div
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'var(--surface-container-lowest)',
              border: '2px dashed var(--outline-variant)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
              color: 'var(--on-surface-variant)',
              textAlign: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>
              folder
            </span>
            <p className="text-body-md" style={{ fontWeight: 600 }}>No projects found</p>
            <p className="text-label-sm">Create a new project from the sidebar to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project._id)}
              style={{
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
                  <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
                    {project.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
