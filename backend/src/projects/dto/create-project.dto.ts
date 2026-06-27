import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Project name is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  members?: string[];
}
