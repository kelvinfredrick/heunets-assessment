import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Async Thunks
export const fetchProjectAndTasks = createAsyncThunk(
  'tasks/fetchProjectAndTasks',
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      let projData;
      let targetProjId = projectId;

      if (projectId === 'website-redesign') {
        const list = await api.getProjects(auth.token);
        if (list.length > 0) {
          projData = list[0];
          targetProjId = list[0]._id;
        }
      } else {
        projData = await api.getProject(auth.token, projectId);
      }

      if (!projData) {
        throw new Error('Project not found');
      }

      let taskList = await api.getTasks(auth.token, targetProjId);

      // Seed default tasks if project is empty
      if (taskList.length === 0) {
        const seeds = [
          {
            title: 'User Journey Mapping',
            description: 'Define the primary user paths for the checkout flow and landing page experience.',
            priority: 'Medium',
            project: targetProjId,
            status: 'To Do',
          },
          {
            title: 'Fix Accessibility Issues',
            description: 'Resolve color contrast violations in the global navigation bar.',
            priority: 'High',
            project: targetProjId,
            status: 'To Do',
          },
          {
            title: 'Homepage Hero Redesign',
            description: 'Create high fidelity visual assets.',
            priority: 'Low',
            project: targetProjId,
            status: 'In Progress',
          },
          {
            title: 'CMS Integration',
            description: 'Connect modules to the headless service.',
            priority: 'Medium',
            project: targetProjId,
            status: 'In Progress',
            progress: 65,
          },
          {
            title: 'Brand Guidelines Finalization',
            description: 'Export brand guidelines package.',
            priority: 'Low',
            project: targetProjId,
            status: 'Completed',
          },
        ];

        for (const seed of seeds) {
          await api.createTask(auth.token, seed);
        }
        taskList = await api.getTasks(auth.token, targetProjId);
        
        // Refetch project to get updated progress (seeding completes the completed task, progress goes up)
        projData = await api.getProject(auth.token, targetProjId);
      }

      return { project: projData, tasks: taskList };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load project board');
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  'tasks/createTaskThunk',
  async (taskData, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const newTask = await api.createTask(auth.token, taskData);
      // Reload tasks & progress
      dispatch(fetchProjectAndTasks(taskData.project));
      return newTask;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create task');
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTaskThunk',
  async ({ taskId, updateData, projectId }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const updated = await api.updateTask(auth.token, taskId, updateData);
      // Reload tasks & progress
      dispatch(fetchProjectAndTasks(projectId));
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update task');
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTaskThunk',
  async ({ taskId, projectId }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const result = await api.deleteTask(auth.token, taskId);
      // Reload tasks & progress
      dispatch(fetchProjectAndTasks(projectId));
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete task');
    }
  }
);

const initialState = {
  items: [],
  project: null,
  loading: false,
  creatingTask: false,
  updatingTask: false,
  deletingTask: false,
  error: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasksError: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Project and Tasks
      .addCase(fetchProjectAndTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectAndTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.project;
        state.items = action.payload.tasks;
      })
      .addCase(fetchProjectAndTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Task
      .addCase(createTaskThunk.pending, (state) => {
        state.creatingTask = true;
        state.createError = null;
      })
      .addCase(createTaskThunk.fulfilled, (state) => {
        state.creatingTask = false;
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.creatingTask = false;
        state.createError = action.payload;
      })
      // Update Task
      .addCase(updateTaskThunk.pending, (state) => {
        state.updatingTask = true;
        state.updateError = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state) => {
        state.updatingTask = false;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.updatingTask = false;
        state.updateError = action.payload;
      })
      // Delete Task
      .addCase(deleteTaskThunk.pending, (state) => {
        state.deletingTask = true;
        state.deleteError = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state) => {
        state.deletingTask = false;
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.deletingTask = false;
        state.deleteError = action.payload;
      });
  },
});

export const { clearTasksError } = tasksSlice.actions;
export default tasksSlice.reducer;
