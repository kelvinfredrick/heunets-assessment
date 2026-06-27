import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectsService.create(createProjectDto, req.user._id);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req,
  ) {
    return this.projectsService.update(id, updateProjectDto, req.user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.projectsService.remove(id, req.user._id);
  }
}
