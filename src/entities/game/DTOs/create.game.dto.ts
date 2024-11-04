import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateGameDto {
  @IsInt()
  @Min(1)
  playerCount: number;

  @IsInt()
  @Min(2)
  gridSize: number;
}
