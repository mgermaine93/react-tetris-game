export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            
            // First, check to make sure that we're on an actual tetromino cell.
            if (player.tetromino[y][x] !== 0) {
                if (
                
                // Second, check that our move is inside the game area's height (i.e., y).
                // We shouldn't go through the bottom of the play area.
                !stage[y + player.position.y + moveY] || 
                
                // Third, check that our move is inside the game area's width (i.e., x).App
                !stage[x + player.position.x + moveX] ||
                
                // Fourth, check that the cell we're moving to isn't set to clear.
                stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}