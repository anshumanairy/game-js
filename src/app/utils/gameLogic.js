import { GAME_WIDTH, GAME_HEIGHT, PLAYER_SPEED_HORIZONTAL, PLAYER_SPEED_VERTICAL, ENEMY_SPEED, BULLET_SPEED, ENEMY_SPAWN_RATE, INITIAL_FIRE_RATE } from './constants';

export const initializeGame = () => {
  return {
    player: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 },
    enemies: [],
    bullets: [],
    score: 0,
    level: 1,
    frameCount: 0,
    fireRate: INITIAL_FIRE_RATE,
    lives: 3,
  };
};

export const updateGameState = (prevState, setIsGameOver) => {
  const newState = { ...prevState };

  // Move bullets
  newState.bullets = newState.bullets.map((bullet) => ({
    ...bullet,
    y: bullet.y - BULLET_SPEED,
  })).filter((bullet) => bullet.y > 0);

  // Move enemies
  newState.enemies = newState.enemies.map((enemy) => ({
    ...enemy,
    y: enemy.y + ENEMY_SPEED,
  }));

  // Check for enemies that passed the screen
  newState.enemies = newState.enemies.filter((enemy) => {
    if (enemy.y > GAME_HEIGHT) {
      newState.lives = Math.max(0, newState.lives - 1);
      return false;
    }
    return true;
  });

  // Spawn new enemies
  if (newState.frameCount % ENEMY_SPAWN_RATE === 0) {
    newState.enemies.push({
      x: Math.random() * (GAME_WIDTH - 20),
      y: 0,
    });
  }

  // Check for collisions
  checkCollisions(newState, setIsGameOver);

  // Update score and level
  updateScoreAndLevel(newState);

  newState.frameCount++;

  if (newState.lives <= 0) {
    setIsGameOver(true);
  }

  return newState;
};

export const movePlayer = (state, direction) => {
  const newState = { ...state };
  const { player } = newState;

  switch (direction) {
    case 'left':
      player.x = Math.max(0, player.x - PLAYER_SPEED_HORIZONTAL);
      break;
    case 'right':
      player.x = Math.min(GAME_WIDTH, player.x + PLAYER_SPEED_HORIZONTAL);
      break;
    case 'up':
      player.y = Math.max(0, player.y - PLAYER_SPEED_VERTICAL);
      break;
    case 'down':
      player.y = Math.min(GAME_HEIGHT, player.y + PLAYER_SPEED_VERTICAL);
      break;
  }

  return newState;
};

export const shootBullet = (state) => {
  const newState = { ...state };
  newState.bullets.push({
    x: newState.player.x,
    y: newState.player.y - 20,
  });
  return newState;
};

function checkCollisions(state, setIsGameOver) {
  const remainingEnemies = state.enemies.filter(enemy => {
    const hitByBullet = state.bullets.some(bullet => {
      return (
        bullet.x < enemy.x + 30 && // Increased from 20 to 30 to cover full enemy width
        bullet.x + 5 > enemy.x &&
        bullet.y < enemy.y + 30 && // Increased from 20 to 30 to cover full enemy height
        bullet.y + 10 > enemy.y
      );
    });

    if (hitByBullet) {
      state.score += 10;
      return false;
    }
    return true;
  });

  state.enemies = remainingEnemies;
  state.bullets = state.bullets.filter(bullet => {
    return !state.enemies.some(enemy => {
      return (
        bullet.x < enemy.x + 30 && // Increased from 20 to 30 to cover full enemy width
        bullet.x + 5 > enemy.x &&
        bullet.y < enemy.y + 30 && // Increased from 20 to 30 to cover full enemy height
        bullet.y + 10 > enemy.y
      );
    });
  });

  // Check for collision between player and enemies
  const playerHit = state.enemies.some(enemy => {
    return (
      state.player.x < enemy.x + 30 && // Increased from 20 to 30 to cover full enemy width
      state.player.x + 40 > enemy.x && // Increased from 30 to 40 to cover full player width
      state.player.y < enemy.y + 30 && // Increased from 20 to 30 to cover full enemy height
      state.player.y + 40 > enemy.y // Increased from 30 to 40 to cover full player height
    );
  });

  if (playerHit) {
    state.lives = Math.max(0, state.lives - 1);
    // Remove the enemy that hit the player
    state.enemies = state.enemies.filter(enemy => !(
      state.player.x < enemy.x + 30 && // Increased from 20 to 30 to cover full enemy width
      state.player.x + 40 > enemy.x && // Increased from 30 to 40 to cover full player width
      state.player.y < enemy.y + 30 && // Increased from 20 to 30 to cover full enemy height
      state.player.y + 40 > enemy.y // Increased from 30 to 40 to cover full player height
    ));
  }
}

function updateScoreAndLevel(state) {
  const newLevel = Math.floor(state.score / 100) + 1;
  if (newLevel !== state.level) {
    state.level = newLevel;
    state.fireRate = INITIAL_FIRE_RATE + (newLevel - 1); // Increase fire rate with each level
  }
}