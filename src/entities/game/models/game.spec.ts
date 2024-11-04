import { GameEntity } from './game.entity';

describe('Game', () => {
  it('should be defined', () => {
    expect(new GameEntity()).toBeDefined();
  });
});
