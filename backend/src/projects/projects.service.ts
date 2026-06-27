import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto, ownerId: string): Promise<Project> {
    const project = new this.projectModel({
      ...createProjectDto,
      owner: new Types.ObjectId(ownerId),
      members: createProjectDto.members?.map(id => new Types.ObjectId(id)) || [],
    });
    return project.save();
  }

  async findAll(userId: string): Promise<Project[]> {
    const userObjectId = new Types.ObjectId(userId);
    return this.projectModel
      .find({
        $or: [{ owner: userObjectId }, { members: userObjectId }],
      })
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar')
      .exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar')
      .exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string): Promise<Project> {
    const project = await this.findOne(id);
    const ownerIdStr = (project.owner as any)._id ? (project.owner as any)._id.toString() : project.owner.toString();
    if (ownerIdStr !== userId.toString()) {
      throw new ForbiddenException('Only the owner can update this project');
    }

    const updateData: any = { ...updateProjectDto };
    if (updateProjectDto.members) {
      updateData.members = updateProjectDto.members.map(mid => new Types.ObjectId(mid));
    }

    const updated = await this.projectModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const project = await this.findOne(id);
    const ownerIdStr = (project.owner as any)._id ? (project.owner as any)._id.toString() : project.owner.toString();
    if (ownerIdStr !== userId.toString()) {
      throw new ForbiddenException('Only the owner can delete this project');
    }
    await this.projectModel.findByIdAndDelete(id).exec();
    return { message: 'Project successfully deleted' };
  }

  async updateProgress(id: string, progress: number): Promise<Project | null> {
    return this.projectModel.findByIdAndUpdate(id, { $set: { progress } }, { new: true }).exec();
  }
}
