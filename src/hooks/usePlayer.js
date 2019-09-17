import { useState } from 'react';

import {randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    // useState should return an array with two items in it...
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: randomTetromino().shape,
        collided: false,
    });

    return [player];
}