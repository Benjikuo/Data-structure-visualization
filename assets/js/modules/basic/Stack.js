class Stack {
    
    static generatePushSteps(currentArray, value) {
        let array = [...currentArray];
        let steps = [];
        
        array.push(value);
        const n = array.length - 1;

       steps.push(new AnimationStep(
            array, 
            [n],
            [], 
            [], 
            `Ready to Push ${value}. Highlighting top slot.`
        ));
        
        steps.push(new AnimationStep(
            array, 
            [], 
            [], 
            [n],
            `Pushed ${value}. Stack Size: ${array.length}`
        ));

        steps.push(new AnimationStep(
            array, 
            [], 
            [], 
            [],
            `Push completed.`
        ));

        return { steps, newArray: array };
    }

    static generatePopSteps(currentArray) {
        let array = [...currentArray];
        let steps = [];
        const n = array.length;

        if (n === 0) {
            steps.push(new AnimationStep(array, [], [], [], "Stack is empty! Cannot Pop."));
            return { steps, newArray: array };
        }

        steps.push(new AnimationStep(array, [n - 1], [], [], `Prepare to Pop Top (Index ${n-1})`));
        steps.push(new AnimationStep(array, [], [n - 1], [], `Popping value ${array[n-1]}`));

        array.pop();

        steps.push(new AnimationStep(array, [], [], [], `Pop completed. Stack Size: ${array.length}`));

        return { steps, newArray: array };
    }
}

window.Stack = Stack;