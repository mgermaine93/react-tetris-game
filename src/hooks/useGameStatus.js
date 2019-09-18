import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    // Scoring point levels.
    const linePoints = [40, 100, 300, 1200];

    const calculateScore = useCallback(() => {
        // Check to see if we have a score.
        if (rowsCleared > 0) {
            // This is how the original Tetris Game score is calculated.
            setScore(previous => previous + linePoints[rowsCleared - 1] * (level + 1));
            setRows(previous => previous + rowsCleared);
        }
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calculateScore();
    }, [calculateScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
}