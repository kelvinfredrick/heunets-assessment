import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createProject } from '../store/slices/projectsSlice';
import { logoutUser } from '../store/slices/authSlice';
import CreateProjectModal from './CreateProjectModal';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'folder', label: 'Projects', path: '/projects' },
  { icon: 'assignment', label: 'Tasks', path: '/tasks' },
  { icon: 'calendar_today', label: 'Calendar', path: '/calendar' },
  { icon: 'bar_chart', label: 'Reports', path: '/reports' },
];

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProj = await dispatch(createProject(projectData)).unwrap();
      setIsModalOpen(false);
      navigate(`/projects/${newProj._id}`);
    } catch (err) {
      alert(err.message || 'Failed to create project');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/projects') {
      return location.pathname.startsWith('/projects');
    }
    return location.pathname === path;
  };

  return (
    <>
      <aside
        style={{
          width: 'var(--sidebar-width)',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: 'var(--primary)',
          borderRight: '1px solid var(--outline-variant)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 'var(--space-lg)',
          paddingBottom: 'var(--space-lg)',
          zIndex: 50,
          overflowY: 'auto',
        }}
      >
        {/* Branding */}
        <div style={{ padding: '0 var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          <h1
            className="text-headline-md"
            style={{ color: 'var(--on-primary)', fontWeight: 700 }}
          >
            TeamBoard
          </h1>
          <p
            className="text-label-md"
            style={{ color: 'var(--on-primary-container)', opacity: 0.8 }}
          >
            Enterprise Plan
          </p>
        </div>

        {/* New Project Button */}
        <button
          style={{
            margin: '0 var(--space-lg)',
            marginBottom: 'var(--space-xl)',
            padding: 'var(--space-sm) var(--space-md)',
            backgroundColor: 'var(--tertiary-fixed)',
            color: 'var(--primary)',
            fontWeight: 700,
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          onClick={handleOpenModal}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
          New Project
        </button>

        {/* Navigation */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-sm) var(--space-md)',
                  color: active ? 'var(--on-primary)' : 'var(--on-primary-container)',
                  opacity: active ? 1 : 0.6,
                  borderLeft: active ? '3px solid var(--tertiary-fixed)' : '3px solid transparent',
                  fontWeight: active ? 700 : 400,
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                  fontSize: 13,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.backgroundColor = 'rgba(208, 225, 251, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div
          style={{
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: 'var(--space-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {[
            { icon: 'settings', label: 'Settings', action: null },
            { icon: 'help', label: 'Support', action: null },
            { icon: 'logout', label: 'Logout', action: handleLogout },
          ].map((item) => {
            const Component = item.action ? 'button' : 'a';
            const props = item.action
              ? { onClick: item.action }
              : { href: '#' };

            return (
              <Component
                key={item.label}
                {...props}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-sm) var(--space-md)',
                  color: item.label === 'Logout' ? 'var(--error-container)' : 'var(--on-primary-container)',
                  opacity: 0.6,
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                  fontSize: 13,
                  width: '100%',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.backgroundColor = 'rgba(208, 225, 251, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.6';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: item.label === 'Logout' ? 'var(--error)' : 'inherit' }}>
                  {item.icon}
                </span>
                {item.label}
              </Component>
            );
          })}

          {/* User Profile */}
          <div
            style={{
              padding: '0 var(--space-lg)',
              marginTop: 'var(--space-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'var(--secondary-fixed)',
                overflow: 'hidden',
                flexShrink: 0,
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
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p
                style={{
                  color: 'var(--on-primary)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: 14,
                }}
              >
                {user?.name || 'User'}
              </p>
              <p
                className="text-label-sm"
                style={{
                  color: 'var(--on-primary-container)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.role || 'Member'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Project Creation Custom Modal */}
      {isModalOpen && (
        <CreateProjectModal
          onClose={handleCloseModal}
          onCreate={handleCreateProject}
        />
      )}
    </>
  );
}
