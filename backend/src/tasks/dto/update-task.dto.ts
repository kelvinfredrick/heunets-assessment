import { IsOptional, IsString, IsEnum, IsNumber, IsMongoId, Min, Max } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['To Do', 'In Progress', 'Completed'])
  status?: string;

  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High'])
  priority?: string;

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
