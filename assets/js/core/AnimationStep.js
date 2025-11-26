class AnimationStep {
    constructor(array, compareIndices = [], swapIndices = [], sortedIndices = [], description = "") {
        this.array = [...array];
        this.compareIndices = [...compareIndices];
        this.swapIndices = [...swapIndices];
        this.sortedIndices = [...sortedIndices];
        this.description = description;
    }

    static initial(array) {
        return new AnimationStep(array, [], [], [], "Initial State");
    }

    static completed(array) {
        const allIndices = Array.from({ length: array.length }, (_, i) => i);
        return new AnimationStep(array, [], [], allIndices, "Sorting Completed!");
    }
}

window.AnimationStep = AnimationStep;
