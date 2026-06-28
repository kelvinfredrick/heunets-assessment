import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../services/api';
import { fetchProjects } from '../store/slices/projectsSlice';
import { updateTaskThunk, deleteTaskThunk, clearTasksError } from '../store/slices/tasksSlice';
import StatusChip from '../components/StatusChip';
import TaskDetailModal from '../components/TaskDetailModal';

export default function Tasks() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { list: projects } = useSelector((state) => state.projects);
  const {
    updatingTask,
    deletingTask,
    updateError,
    deleteError
  } = useSelector((state) => state.tasks);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const loadAllTasks = () => {
    setLoading(true);
    api.getTasks()
      .then((taskList) => {
        setTasks(taskList || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load tasks:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchProjects());
      loadAllTasks();
    }
  }, [user, dispatch]);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseModal = () => {
    setSelectedTaskId(null);
    dispatch(clearTasksError());
  };

  const handleSaveTask = async (taskId, updatedData) => {
    try {
      const taskObj = tasks.find((t) => t._id === taskId);
      await dispatch(
        updateTaskThunk({
          taskId,
          updateData: {
            status: updatedData.status,
            priority: updatedData.priority,
            description: updatedData.description,
          },
          projectId: taskObj?.project,
        })
      ).unwrap();
      setSelectedTaskId(null);
      loadAllTasks();
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const taskObj = tasks.find((t) => t._id === taskId);
      await dispatch(
        deleteTaskThunk({
          taskId,
          projectId: taskObj?.project,
        })
      ).unwrap();
      setSelectedTaskId(null);
      loadAllTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // Find project name by id
  const getProjectName = (projId) => {
    const proj = projects.find((p) => p._id === projId);
    return proj ? proj.name : 'Unknown Project';
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', animation: 'fade-in 0.4s ease-out' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <h2 className="text-display" style={{ color: 'var(--primary)' }}>
          Tasks Manager
        </h2>
        <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)' }}>
          View, search, and edit all tasks assigned across your workspaces.
        </p>
      </section>

      {/* Filters Bar */}
      <div
        className="header-actions-wrap"
        style={{
          display: 'flex',
          gap: 'var(--space-md)',
          alignItems: 'center',
          backgroundColor: 'var(--surface-container-low)',
          padding: 'var(--space-md)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--outline-variant)',
        }}
      >
        {/* Search */}
        <div style={{ flex: 1, position: 'relative' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--outline)',
              fontSize: 20,
            }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-sm) var(--space-md)',
              paddingLeft: 40,
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline-variant)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 14,
              color: 'var(--on-surface)',
            }}
          />
        </div>

        <div className="header-actions-row" style={{ display: 'flex', gap: 'var(--space-md)' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--outline-variant)',
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)',
                fontSize: 13,
              }}
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Priority:
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--outline-variant)',
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)',
                fontSize: 13,
              }}
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Table/List */}
      <div
        style={{
          backgroundColor: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: 48, backgroundColor: 'var(--surface-container-high)', width: '100%' }} />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div
            style={{
              padding: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 250,
              color: 'var(--on-surface-variant)',
              textAlign: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 44, marginBottom: 'var(--space-sm)', opacity: 0.6 }}>
              assignment_late
            </span>
            <p className="text-body-md" style={{ fontWeight: 600 }}>No tasks match your filters</p>
            <p className="text-label-sm">Try relaxing your search parameters or check your projects.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface-container-low)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Task Title</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Project</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Priority</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    onClick={() => handleTaskClick(task._id)}
                    style={{
                      borderBottom: '1px solid var(--outline-variant)',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                    className="task-row-hover"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-container-low)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--primary)' }}>
                      {task.title}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--on-surface-variant)' }}>
                      {getProjectName(task.project)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <StatusChip status={task.priority} />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <StatusChip status={task.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Task Details Modal (for editing details) */}
      {selectedTaskId && (
        <TaskDetailModal
          taskId={selectedTaskId}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          isSaving={updatingTask}
          isDeleting={deletingTask}
          saveError={updateError}
          deleteError={deleteError}
        />
      )}
    </div>
  );
}
