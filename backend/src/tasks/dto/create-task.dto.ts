import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsMongoId, Min, Max } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Task title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['To Do', 'In Progress', 'Completed'])
  status?: string;

  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High'])
  priority?: string;

  @IsNotEmpty({ message: 'Project ID is required' })
  @IsMongoId({ message: 'Invalid project ID' })
  project: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid assignee ID' })
  assignee?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;
}
