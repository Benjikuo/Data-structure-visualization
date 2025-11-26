class Queue {

    static generateEnqueueSteps(currentArray, value) {
        let array = [...currentArray];
        let steps = [];

        const n = array.length;
        array.push(value); 

        steps.push(new AnimationStep(
            array, 
            [], 
            [], 
            [], 
            `Ready to Enqueue ${value} at Tail`
        ));

        steps.push(new AnimationStep(
            array, 
            [], 
            [], 
            [n], 
            `Enqueue Done.`
        ));

        steps.push(new AnimationStep(
            array, 
            [], 
            [], 
            [], 
            `Enqueue completed.`
        ));

        return { steps, newArray: array };
    }

    static generateDequeueSteps(currentArray) {
        let array = [...currentArray];
        let steps = [];

        if (array.length === 0) {
            steps.push(new AnimationStep(array, [], [], [], "Queue is empty!"));
            return { steps, newArray: array };
        }

        steps.push(new AnimationStep(array, [], [], [], `Checking Head (Value: ${array[0]})`));
        steps.push(new AnimationStep(array, [], [0], [], `Dequeueing ${array[0]}...`));

        const removedVal = array.shift();

        steps.push(new AnimationStep(array, [], [], [], `Dequeued ${removedVal}. All elements shifted left.`));

        return { steps, newArray: array };
    }
}

window.Queue = Queue;