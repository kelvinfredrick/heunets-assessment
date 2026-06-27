import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="backdrop-blur-custom"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 45,
            backgroundColor: 'rgba(9, 20, 38, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      <main
        className="main-content"
        style={{
          flex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <TopBar onMenuClick={toggleSidebar} />
        <div
          style={{
            marginTop: 64,
            padding: 'var(--space-lg)',
            flex: 1,
            overflowX: 'hidden', // prevent horizontal page scroll leaks on mobile
          }}
        >
          <div className="container-max">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
