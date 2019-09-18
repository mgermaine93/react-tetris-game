// useEffect is used for creating side effects with React.  Think of it as a replacement for the lifecycle methods in the class components.
import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    // useState should return an array with two items in it...
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage =>
            newStage.reduce((accumulator, row) => {

                // If we have a completed row, clear it, move the other rows down, then add a new (blank) row on top.
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(previous => previous + 1);
                    accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return accumulator;
                }
                // If we don't have a completed row, just return the row as it is in the array.
                accumulator.push(row);
                return accumulator;
            }, [])

        const updateStage = previousStage => {
            
            // First, flush the stage
            const newStage = previousStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Then, draw the new tetromino.
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0) {
                        newStage[y + player.position.y][x + player.position.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // Check if we collided.
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }
            return newStage;
        };

        setStage(previous => updateStage(previous));

    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};