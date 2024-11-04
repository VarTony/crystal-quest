import { IsInt, Min } from 'class-validator';

export class UpdateGameStateDto {
  @IsInt()
  @Min(0)
  rowIndex: number;

  @IsInt()
  @Min(0)
  cellIndex: number;
}