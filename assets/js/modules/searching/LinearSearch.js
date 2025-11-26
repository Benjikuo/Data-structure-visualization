class LinearSearch {
    constructor(target) {
        this.target = target;
    }

    generateSteps(initialArray) {
        let array = [...initialArray];
        let steps = [];
        let found = false;

        steps.push(AnimationStep.initial(array));

        for (let i = 0; i < array.length; i++) {
            steps.push(new AnimationStep(
                array,
                [i],
                [],
                [],
                `Checking index ${i}: Is ${array[i]} == ${this.target}?`
            ));

            if (array[i] === this.target) {
                found = true;
                steps.push(new AnimationStep(
                    array,
                    [],
                    [],
                    [i],
                    `Found target ${this.target} at index ${i}!`
                ));
                break;
            }
        }

        if (!found) {
            steps.push(new AnimationStep(
                array,
                [],
                [],
                [],
                `Target ${this.target} not found in the array.`
            ));
        }

        return steps;
    }
}

window.LinearSearch = LinearSearch;
