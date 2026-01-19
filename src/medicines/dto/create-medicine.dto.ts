import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsArray
} from 'class-validator';

export class CreateMedicineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  dosage: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  qrData?: any;

  // 🔥 NUEVOS CAMPOS
  @IsOptional()
  @IsString()
  time?: string;     // Deprecated: usar times

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  times?: string[];  // ["08:00", "14:00", "20:00"]

  @IsOptional()
  @IsArray()
  days?: string[];   // ["Lu","Ma","Mi"]

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsInt()
  slot?: number; // 0-6 (0 means no slot)

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stockAlert?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}
