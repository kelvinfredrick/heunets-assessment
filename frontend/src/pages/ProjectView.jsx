import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjectAndTasks,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
  clearTasksError
} from '../store/slices/tasksSlice';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import CreateTaskModal from '../components/CreateTaskModal';

export default function ProjectView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    items: tasks,
    project,
    loading,
    creatingTask,
    updatingTask,
    deletingTask,
    createError,
    updateError,
    deleteError
  } = useSelector((state) => state.tasks);
  
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [createTaskCol, setCreateTaskCol] = useState(null); // holds col name, e.g. 'To Do'
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    if (user && id) {
      dispatch(fetchProjectAndTasks(id));
    }
  }, [id, user, dispatch]);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseModal = () => {
    setSelectedTaskId(null);
    dispatch(clearTasksError());
  };

  const handleSaveTask = async (taskId, updatedData) => {
    try {
      await dispatch(
        updateTaskThunk({
          taskId,
          updateData: {
            status: updatedData.status,
            priority: updatedData.priority,
            description: updatedData.description,
          },
          projectId: project._id,
        })
      ).unwrap();
      setSelectedTaskId(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(
        deleteTaskThunk({
          taskId,
          projectId: project._id,
        })
      ).unwrap();
      setSelectedTaskId(null);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetColumn) => {
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;
    try {
      await dispatch(
        updateTaskThunk({
          taskId,
          updateData: { status: targetColumn },
          projectId: project._id,
        })
      ).unwrap();
    } catch (err) {
      console.error('Failed to drop task:', err);
    }
  };

  const handleOpenAddTaskModal = (colName) => {
    setCreateTaskCol(colName);
  };

  const handleCloseAddTaskModal = () => {
    setCreateTaskCol(null);
    dispatch(clearTasksError());
  };

  const handleCreateTask = async (taskData) => {
    if (!project) return;
    try {
      await dispatch(
        createTaskThunk({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          project: project._id,
          status: taskData.status,
        })
      ).unwrap();
      setCreateTaskCol(null);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const columns = ['To Do', 'In Progress', 'Completed'];

  if (loading && !project) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 112px)', gap: 'var(--space-lg)', animation: 'fade-in 0.4s ease-out' }}>
        {/* Header Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', width: '45%' }}>
            <div className="skeleton" style={{ width: 120, height: 16, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-full)' }} />
            <div className="skeleton" style={{ width: '80%', height: 32, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-lg)', marginTop: 8 }} />
            <div className="skeleton" style={{ width: '100%', height: 16, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)', marginTop: 4 }} />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <div className="skeleton" style={{ width: 100, height: 36, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-lg)' }} />
            <div className="skeleton" style={{ width: 80, height: 36, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-lg)' }} />
          </div>
        </div>

        {/* Board Columns Skeletons */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
            overflow: 'hidden',
          }}
        >
          {['To Do', 'In Progress', 'Completed'].map((colName, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'rgba(240, 237, 239, 0.5)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md)',
                gap: 'var(--space-md)',
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: 80, height: 16, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-full)' }} />
                <div className="skeleton" style={{ width: 24, height: 16, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-full)' }} />
              </div>

              {/* Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {[1, 2].map((cardIdx) => (
                  <div
                    key={cardIdx}
                    style={{
                      backgroundColor: 'var(--surface-container-lowest)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="skeleton" style={{ width: 60, height: 14, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)' }} />
                      <div className="skeleton" style={{ width: 20, height: 14, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)' }} />
                    </div>
                    <div className="skeleton" style={{ width: '80%', height: 18, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)' }} />
                    <div className="skeleton" style={{ width: '100%', height: 28, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                      <div className="skeleton" style={{ width: 50, height: 14, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius)' }} />
                      <div className="skeleton" style={{ width: 24, height: 24, backgroundColor: 'var(--surface-container-high)', borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 112px)', animation: 'fade-in 0.4s ease-out' }}>
      {/* Project Header */}
      <div
        className="header-actions-wrap"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'var(--space-lg)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <div
            className="text-label-sm"
            style={{
              color: 'var(--on-surface-variant)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
            }}
          >
            <span>Projects</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              chevron_right
            </span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{project?.name}</span>
          </div>
          <h2 className="text-headline-lg" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            {project?.name} ({project?.progress || 0}%)
          </h2>
        </div>

        <div className="header-actions-row" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          {/* Team Avatars */}
          <div style={{ display: 'flex', gap: -8 }}>
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDBczSpsdnj8bUzVX68v_Nw8VCo166etsoSBBbpdnqPJh3ly1q0Kg-sntIte40VZYK0bhAoBDnGS9taBiWhigM7ojm4p0hnSn0_n9agIoTvSeaOPfGy2aaK4cmhHmvRZUYb9TBJTqHbaZZ1GfMZF2jtDCo53E1_RlYvl0uCeNQqq4G2QRLlHo1ckI5sPBJSdTSROtT2bIkV6SGfxSyFvvwVOVnI3Eove3uFyrEIwmVQ9iub0F_OY4z-0AoFPzlez0B8-XmTEs-2CPCD',
            ].map((src, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
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

          {/* Real-time search query input */}
          <div style={{ position: 'relative', width: 180 }}>
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--on-surface-variant)',
                fontSize: 16,
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
                backgroundColor: 'var(--surface-container-high)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius)',
                padding: '6px 8px 6px 28px',
                fontSize: 12,
                lineHeight: '16px',
                color: 'var(--on-surface)',
              }}
            />
          </div>

          {/* Priority filter dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                backgroundColor: 'var(--surface-container-high)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius)',
                padding: '6px 24px 6px 8px',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--on-surface)',
                appearance: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: 'var(--on-surface-variant)',
                fontSize: 16,
              }}
            >
              expand_more
            </span>
          </div>

          <button
            onClick={() => handleOpenAddTaskModal('To Do')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              padding: 'var(--space-sm) var(--space-md)',
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
              borderRadius: 'var(--radius)',
              fontSize: 12,
              fontWeight: 700,
              transition: 'opacity 0.15s ease',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              add
            </span>
            New Task
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div
        style={{
          flex: 1,
          overflowX: 'auto',
          display: 'flex',
          gap: 'var(--space-lg)',
          paddingBottom: 'var(--space-lg)',
        }}
        className="scrollbar-hide"
      >
        {columns.map((colName) => {
          const filteredTasks = tasks.filter((t) => {
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
            return matchesSearch && matchesPriority;
          });
          const colTasks = filteredTasks.filter((t) => t.status === colName);

          return (
            <div
              key={colName}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, colName)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'rgba(240, 237, 239, 0.5)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  padding: 'var(--space-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <span className="text-label-sm" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {colName}
                  </span>
                  <span
                    style={{
                      backgroundColor: colName === 'In Progress' ? 'var(--secondary-container)' : 'var(--surface-container-high)',
                      color: colName === 'In Progress' ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task list container */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '0 var(--space-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                }}
                className="scrollbar-hide"
              >
                {colTasks.length === 0 ? (
                  <div
                    style={{
                      padding: 'var(--space-lg) var(--space-md)',
                      border: '1px dashed var(--outline-variant)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--on-surface-variant)',
                      opacity: 0.6,
                      fontSize: 12,
                      gap: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      margin: 'var(--space-sm) 0',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                      inbox
                    </span>
                    <span>No tasks in {colName}</span>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard key={task._id} task={{ ...task, id: task._id }} onClick={handleTaskClick} />
                  ))
                )}

                <button
                  onClick={() => handleOpenAddTaskModal(colName)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-sm) 0',
                    border: '2px dashed var(--outline-variant)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--on-surface-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)',
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    add
                  </span>
                  Add Task
                </button>
              </div>
            </div>
          );
        })}
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

      {/* Create Task Modal Overlay (instead of browser prompts) */}
      {createTaskCol && (
        <CreateTaskModal
          columnStatus={createTaskCol}
          onClose={handleCloseAddTaskModal}
          onCreate={handleCreateTask}
          isCreating={creatingTask}
          error={createError}
        />
      )}
    </div>
  );
}
