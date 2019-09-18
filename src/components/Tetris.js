import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import {StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

// Player Movement Functions

    const movePlayer = direction => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPosition({x: direction, y: 0});
        }
    }

    const startGame = () => {
        // Resets everything
        setStage(createStage());
        // 1000 = 1 second
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        
        // Increase the difficulty once the player has completed 10 rows.
        if (rows > (level + 1) * 10) {
            setLevel(previous => previous + 1);

            // Increase the speed as well.
            setDropTime(1000 / (level + 1) + 200);
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPosition({ x: 0, y: 1, collided: false})
        } else {
            // Game Over
            if (player.position.y < 1) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPosition({ x: 0, y: 0, collided: true});
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            // 40 = down arrow key
            if (keyCode === 40) {
                console.log("interval on")
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        console.log("interval off")
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if(!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            }
            else if (keyCode === 39) {
                movePlayer(1);
            }
            else if (keyCode === 40) {
                dropPlayer();
            }
            // Up Arrow rotates it clockwise.
            else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    return(
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`}/>
                            <Display text={`Rows: ${rows}`}/>
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
