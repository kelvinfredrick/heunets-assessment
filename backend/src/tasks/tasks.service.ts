import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private projectsService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel({
      ...createTaskDto,
      project: new Types.ObjectId(createTaskDto.project),
      assignee: createTaskDto.assignee ? new Types.ObjectId(createTaskDto.assignee) : undefined,
    });
    const savedTask = await task.save();
    await this.recalculateProjectProgress(createTaskDto.project);
    return savedTask;
  }

  async findAll(projectId: string | undefined, userId: string): Promise<Task[]> {
    if (projectId && projectId !== 'undefined' && projectId !== 'null' && projectId.trim() !== '') {
      return this.taskModel
        .find({ project: new Types.ObjectId(projectId) })
        .populate('assignee', 'name email avatar')
        .exec();
    }

    const projects = await this.projectsService.findAll(userId);
    const projectIds = projects.map((p) => p._id);

    return this.taskModel
      .find({ project: { $in: projectIds } })
      .populate('assignee', 'name email avatar')
      .exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate('assignee', 'name email avatar')
      .exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.findOne(id);
    const updateData: any = { ...updateTaskDto };

    if (updateTaskDto.assignee) {
      updateData.assignee = new Types.ObjectId(updateTaskDto.assignee);
    }

    // Handle completed tasks having progress automatically set to 100%
    if (updateTaskDto.status === 'Completed') {
      updateData.progress = 100;
    }

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .populate('assignee', 'name email avatar')
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.recalculateProjectProgress(existingTask.project.toString());
    return updatedTask;
  }

  async remove(id: string): Promise<{ message: string }> {
    const task = await this.findOne(id);
    await this.taskModel.findByIdAndDelete(id).exec();
    await this.recalculateProjectProgress(task.project.toString());
    return { message: 'Task successfully deleted' };
  }

  private async recalculateProjectProgress(projectId: string): Promise<void> {
    const projectObjectId = new Types.ObjectId(projectId);
    const tasks = await this.taskModel.find({ project: projectObjectId }).exec();
    if (tasks.length === 0) {
      await this.projectsService.updateProgress(projectId, 0);
      return;
    }

    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const progress = Math.round((completedTasks / tasks.length) * 100);
    await this.projectsService.updateProgress(projectId, progress);
  }
}
