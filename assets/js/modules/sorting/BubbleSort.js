class BubbleSort {
    generateSteps(initialArray) {
        let array = [...initialArray];
        let steps = [];
        let n = array.length;

        steps.push(AnimationStep.initial(array));

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;

            for (let j = 0; j < n - i - 1; j++) {
                steps.push(new AnimationStep(
                    array,
                    [j, j + 1],
                    [],
                    this.getSortedIndices(n, i),
                    `Comparing ${array[j]} and ${array[j+1]}`
                ));

                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;

                    steps.push(new AnimationStep(
                        array,
                        [],
                        [j, j + 1],
                        this.getSortedIndices(n, i),
                        `Swapping ${array[j]} and ${array[j+1]}`
                    ));
                }
            }
            
            if (!swapped) break;
        }

        steps.push(AnimationStep.completed(array));
        return steps;
    }

    getSortedIndices(n, currentPass) {
        let sorted = [];
        for (let k = n - currentPass; k < n; k++) {
            sorted.push(k);
        }
        return sorted;
    }
}

window.BubbleSort = BubbleSort;
