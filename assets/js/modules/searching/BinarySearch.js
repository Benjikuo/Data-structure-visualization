class BinarySearch {
    constructor(target) {
        this.target = target;
    }

    generateSteps(initialArray) {
        let array = [...initialArray].sort((a, b) => a - b);
        let steps = [];
        
        steps.push(new AnimationStep(
            array, 
            [], [], [], 
            "Binary Search requires sorted data. Array sorted."
        ));

        let low = 0;
        let high = array.length - 1;
        let found = false;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);

            steps.push(new AnimationStep(
                array,
                [low, mid, high], 
                [], 
                [], 
                `Range: [${low}, ${high}], Checking Mid: ${mid} (${array[mid]})`
            ));

            if (array[mid] === this.target) {
                found = true;
                steps.push(new AnimationStep(
                    array,
                    [], 
                    [], 
                    [mid],
                    `Found target ${this.target} at index ${mid}!`
                ));
                break;
            } else if (array[mid] < this.target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (!found) {
            steps.push(new AnimationStep(
                array,
                [], [], [], 
                `Target ${this.target} not found.`
            ));
        }

        return steps;
    }
}

window.BinarySearch = BinarySearch;
