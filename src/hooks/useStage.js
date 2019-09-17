// useEffect is used for creating side effects with React.  Think of it as a replacement for the lifecycle methods in the class components.
import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    // useState should return an array with two items in it...
    const [stage, setStage] = useState(createStage());
    
    useEffect(() => {
        const updateStage = previousStage => {
            
            // First, flush the stage
            const newStage = previousStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Then, draw the new tetromino
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
            return newStage;
        };

        setStage(previous => updateStage(previous))

    }, [player]);

    return [stage, setStage];
};