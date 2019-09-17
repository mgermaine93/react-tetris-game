import { useState } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = () => {
    // useState should return an array with two items in it...
    const [stage, setStage] = useState(createStage());
    
    return [stage, setStage];
}