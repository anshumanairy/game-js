export const GAME_WIDTH = typeof window !== 'undefined' ? window.innerWidth : 800;
export const GAME_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 600;
export const PLAYER_SPEED_HORIZONTAL = 8; // Increased horizontal speed
export const PLAYER_SPEED_VERTICAL = 5; // Kept vertical speed the same
export const ENEMY_SPEED = 2;
export const BULLET_SPEED = 7;
export const ENEMY_SPAWN_RATE = 60; // Frames between enemy spawns
export const INITIAL_FIRE_RATE = 5; // Bullets per second