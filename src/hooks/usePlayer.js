import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

export const usePlayer = () => {
    // useState should return an array with two items in it...
    const [player, setPlayer] = useState({
        position: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

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

    return [player, updatePlayerPosition, resetPlayer];
}