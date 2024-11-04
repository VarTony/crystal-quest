import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerCount: number;

  @Column()
  gridSize: number;

  @Column({ default: '' })
  gameState: string; // JSON-строка с состоянием игры
}

