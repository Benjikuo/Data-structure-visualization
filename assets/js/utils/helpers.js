const Utils = {
    generateRandomArray: (size, min = 5, max = 100) => {
        const arr = [];
        for (let i = 0; i < size; i++) {
            const val = Math.floor(Math.random() * (max - min + 1)) + min;
            arr.push(val);
        }
        return arr;
    },

    generateAlmostSortedArray: (size) => {
        const arr = Array.from({ length: size }, (_, i) => i + 5);
        for (let i = 0; i < size / 5; i++) {
            const idx1 = Math.floor(Math.random() * size);
            const idx2 = Math.floor(Math.random() * size);
            Utils.swap(arr, idx1, idx2);
        }
        return arr;
    },

    generateReversedArray: (size) => {
        return Array.from({ length: size }, (_, i) => size - i + 5);
    },

    swap: (array, i, j) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    },

    getQueryParam: (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

window.Utils = Utils;
