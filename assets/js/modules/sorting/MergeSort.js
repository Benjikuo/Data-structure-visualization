class MergeSort {

    generateSteps(initialArray) {
        let array = [...initialArray];
        let steps = [];

        steps.push(AnimationStep.initial(array));

        let auxiliaryArray = [...initialArray];
        this.mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, steps);

        steps.push(AnimationStep.completed(array));

        return steps;
    }

    mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, steps) {
        if (startIdx === endIdx) return;

        const midIdx = Math.floor((startIdx + endIdx) / 2);

        this.mergeSortHelper(mainArray, startIdx, midIdx, auxiliaryArray, steps);
        this.mergeSortHelper(mainArray, midIdx + 1, endIdx, auxiliaryArray, steps);

        this.doMerge(mainArray, startIdx, midIdx, endIdx, auxiliaryArray, steps);
    }

    doMerge(mainArray, startIdx, midIdx, endIdx, auxiliaryArray, steps) {
        let k = startIdx;
        let i = startIdx;
        let j = midIdx + 1;

        for (let x = startIdx; x <= endIdx; x++) {
            auxiliaryArray[x] = mainArray[x];
        }

        while (i <= midIdx && j <= endIdx) {
            steps.push(new AnimationStep(
                mainArray,
                [i, j],
                [],
                [],
                `Comparing index ${i} (${auxiliaryArray[i]}) and ${j} (${auxiliaryArray[j]})`
            ));

            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                mainArray[k] = auxiliaryArray[i];
                steps.push(new AnimationStep(
                    mainArray,
                    [],
                    [k],
                    [],
                    `Overwriting index ${k} with ${auxiliaryArray[i]}`
                ));
                i++;
            } else {
                mainArray[k] = auxiliaryArray[j];
                steps.push(new AnimationStep(
                    mainArray,
                    [],
                    [k],
                    [],
                    `Overwriting index ${k} with ${auxiliaryArray[j]}`
                ));
                j++;
            }
            k++;
        }

        while (i <= midIdx) {
            steps.push(new AnimationStep(
                mainArray,
                [i],
                [],
                [],
                "Taking remaining value from left side"
            ));

            mainArray[k] = auxiliaryArray[i];

            steps.push(new AnimationStep(
                mainArray,
                [],
                [k],
                [],
                `Overwriting index ${k} with ${auxiliaryArray[i]}`
            ));
            
            i++;
            k++;
        }
    }
}

window.MergeSort = MergeSort;
