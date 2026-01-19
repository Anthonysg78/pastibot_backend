import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateMedicineDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  dosage?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  qrData?: any;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  days?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  times?: string[];

  @IsOptional()
  @IsInt()
  slot?: number;

  @IsOptional()
  @IsString()
  label?: string;
}
