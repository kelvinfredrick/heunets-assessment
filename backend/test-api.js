/**
 * TeamBoard API Integration Test Script
 * Sequential testing of auth, project and task endpoints.
 */

const BASE_URL = 'http://localhost:5005/api';

async function runTests() {
  console.log('=== Starting TeamBoard API Integration Tests ===\n');

  let token = '';
  let userId = '';
  let projectId = '';
  let taskId1 = '';
  let taskId2 = '';

  const testUser = {
    email: `alex.${Date.now()}@example.com`,
    password: 'password123',
    name: 'Alex Rivera',
  };

  try {
    // 1. Register User
    console.log('1. Testing User Registration (POST /auth/register)...');
    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });
    const registerData = await registerRes.json();
    if (registerRes.ok && registerData.token) {
      console.log('   ✅ Registration successful');
      token = registerData.token;
      userId = registerData.user._id;
    } else {
      throw new Error(`Registration failed: ${JSON.stringify(registerData)}`);
    }

    // 2. Login User
    console.log('\n2. Testing User Login (POST /auth/login)...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: testUser.password }),
    });
    const loginData = await loginRes.json();
    if (loginRes.ok && loginData.token) {
      console.log('   ✅ Login successful');
    } else {
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }

    // 3. Create Project
    console.log('\n3. Testing Project Creation (POST /projects)...');
    const projectRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'Website Redesign 2026',
        description: 'Complete overhaul of frontend visuals.',
      }),
    });
    const projectData = await projectRes.json();
    if (projectRes.ok && projectData._id) {
      console.log(`   ✅ Project created successfully: "${projectData.name}" (ID: ${projectData._id})`);
      projectId = projectData._id;
    } else {
      throw new Error(`Project creation failed: ${JSON.stringify(projectData)}`);
    }

    // 4. Create Task 1 (To Do)
    console.log('\n4. Testing Task Creation 1 (POST /tasks - To Do)...');
    const task1Res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Design Hero Section Mockup',
        description: 'Create high fidelity visual assets.',
        project: projectId,
        priority: 'Medium',
      }),
    });
    const task1Data = await task1Res.json();
    if (task1Res.ok && task1Data._id) {
      console.log(`   ✅ Task 1 created successfully: "${task1Data.title}" (ID: ${task1Data._id})`);
      taskId1 = task1Data._id;
    } else {
      throw new Error(`Task 1 creation failed: ${JSON.stringify(task1Data)}`);
    }

    // 5. Create Task 2 (To Do)
    console.log('\n5. Testing Task Creation 2 (POST /tasks - To Do)...');
    const task2Res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Fix Color Contrast Accessibility',
        description: 'Solve accessibility errors in navbar.',
        project: projectId,
        priority: 'High',
      }),
    });
    const task2Data = await task2Res.json();
    if (task2Res.ok && task2Data._id) {
      console.log(`   ✅ Task 2 created successfully: "${task2Data.title}" (ID: ${task2Data._id})`);
      taskId2 = task2Data._id;
    } else {
      throw new Error(`Task 2 creation failed: ${JSON.stringify(task2Data)}`);
    }

    // 6. Verify Project Progress starts at 0%
    console.log('\n6. Verifying Initial Project Progress (GET /projects/:id)...');
    let projectCheckRes = await fetch(`${BASE_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let projectCheckData = await projectCheckRes.json();
    console.log(`   👉 Project Progress: ${projectCheckData.progress}%`);
    if (projectCheckData.progress !== 0) {
      throw new Error(`Expected progress 0%, got ${projectCheckData.progress}%`);
    }
    console.log('   ✅ Initial progress is correct (0%)');

    // 7. Update Task 1 to Completed (recalculating progress)
    console.log('\n7. Moving Task 1 to Completed (PUT /tasks/:id - Recalculate Progress)...');
    const updateTask1Res = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'Completed' }),
    });
    const updateTask1Data = await updateTask1Res.json();
    if (updateTask1Res.ok && updateTask1Data.status === 'Completed') {
      console.log('   ✅ Task 1 moved to Completed successfully');
    } else {
      throw new Error(`Failed to update Task 1: ${JSON.stringify(updateTask1Data)}`);
    }

    // 8. Verify Project Progress is updated (1 of 2 tasks complete = 50%)
    console.log('\n8. Verifying Recalculated Project Progress (GET /projects/:id)...');
    projectCheckRes = await fetch(`${BASE_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    projectCheckData = await projectCheckRes.json();
    console.log(`   👉 Project Progress: ${projectCheckData.progress}%`);
    if (projectCheckData.progress !== 50) {
      throw new Error(`Expected progress 50%, got ${projectCheckData.progress}%`);
    }
    console.log('   ✅ Progress auto-recalculated correctly (50%)');

    // 9. Delete Task 2 (1 of 1 remaining task is Completed = 100%)
    console.log('\n9. Deleting Task 2 (DELETE /tasks/:id - Recalculate Progress)...');
    const deleteRes = await fetch(`${BASE_URL}/tasks/${taskId2}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (deleteRes.ok) {
      console.log('   ✅ Task 2 deleted successfully');
    } else {
      throw new Error('Failed to delete Task 2');
    }

    // 10. Verify Project Progress becomes 100%
    console.log('\n10. Verifying Final Recalculated Project Progress (GET /projects/:id)...');
    projectCheckRes = await fetch(`${BASE_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    projectCheckData = await projectCheckRes.json();
    console.log(`   👉 Project Progress: ${projectCheckData.progress}%`);
    if (projectCheckData.progress !== 100) {
      throw new Error(`Expected progress 100%, got ${projectCheckData.progress}%`);
    }
    console.log('   ✅ Final progress auto-recalculated correctly (100%)');

    // 11. Clean Up / Delete Project
    console.log('\n11. Cleaning Up: Deleting Project (DELETE /projects/:id)...');
    const deleteProjRes = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (deleteProjRes.ok) {
      console.log('   ✅ Project deleted successfully');
    } else {
      const deleteProjData = await deleteProjRes.json();
      throw new Error(`Failed to delete project: [Status ${deleteProjRes.status}] ${JSON.stringify(deleteProjData)}`);
    }

    console.log('\n🎉 ALL INTEGRATION TESTS COMPLETED SUCCESSFULLY! 🎉');

  } catch (error) {
    console.error(`\n❌ TEST FAILURE: ${error.message}`);
    process.exit(1);
  }
}

runTests();
