import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
    
    // useState should return an array with two items in it...
    const [player, setPlayer] = useState({
        position: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    // This rotates the actual tetrominos.
    const rotate = (matrix, direction) => {
        
        // Make the rows become columns...
        const rotatedTetromino = matrix.map ((_, index) =>
            matrix.map(column => column[index]),
        );
        
        // Reverse each row to get a rotated matrix...
        if (direction > 0) return rotatedTetromino.map(row => row.reverse());
        return rotatedTetromino.reverse();
    };

    const playerRotate = (stage, direction) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

        // Prevents tetrominos from overlapping when they rotate.  (This is likely the most advanced function in this project.)
        const position = clonedPlayer.position.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -direction);
                clonedPlayer.position.x = position;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPosition = ({ x, y, collided }) => {
        setPlayer(previous => ({
            // spread the previous state
            ...previous,
            position: { x: (previous.position.x += x), y: (previous.position.y += y)},
            collided,
        }))
    }

    // This prevents an infinity loop
    const resetPlayer = useCallback(() => {
        setPlayer({
            position: { x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])

    return [player, updatePlayerPosition, resetPlayer, playerRotate];
}