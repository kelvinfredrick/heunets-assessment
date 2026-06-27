import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar />
      <main
        style={{
          marginLeft: 'var(--sidebar-width)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopBar />
        <div
          style={{
            marginTop: 64,
            padding: 'var(--space-lg)',
            flex: 1,
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
