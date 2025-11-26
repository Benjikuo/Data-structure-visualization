class QuickSort {
    generateSteps(initialArray) {
        let array = [...initialArray];
        let steps = [];

        steps.push(AnimationStep.initial(array));
        this.quickSortHelper(array, 0, array.length - 1, steps);
        steps.push(AnimationStep.completed(array));

        return steps;
    }

    quickSortHelper(array, low, high, steps) {
        if (low < high) {
            let pi = this.partition(array, low, high, steps);
            this.quickSortHelper(array, low, pi - 1, steps);
            this.quickSortHelper(array, pi + 1, high, steps);
        }
    }

    partition(array, low, high, steps) {
        let pivot = array[high];
        let i = low - 1;

        steps.push(new AnimationStep(
            array,
            [high],
            [],
            [],
            `Pivot selected: ${pivot}`
        ));

        for (let j = low; j < high; j++) {
            steps.push(new AnimationStep(
                array,
                [j, high],
                [],
                [],
                `Comparing ${array[j]} < Pivot (${pivot})?`
            ));

            if (array[j] < pivot) {
                i++;
                if (i !== j) {
                    Utils.swap(array, i, j);
                    steps.push(new AnimationStep(
                        array,
                        [high],
                        [i, j],
                        [],
                        `Swapping ${array[i]} (smaller) to left side`
                    ));
                }
            }
        }

        if (i + 1 !== high) {
            Utils.swap(array, i + 1, high);
            steps.push(new AnimationStep(
                array,
                [],
                [i + 1, high],
                [],
                `Moving Pivot to correct position`
            ));
        }

        return i + 1;
    }
}

window.QuickSort = QuickSort;
