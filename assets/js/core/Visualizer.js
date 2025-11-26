class Visualizer {
    constructor(canvasParentId) {
        this.parentId = canvasParentId;
        this.p5 = null;
        this.steps = [];
        this.currentStepIndex = 0;
        this.isPlaying = false;
        this.speed = 1;
        this.frameCounter = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.barWidth = 0;
        
        this.initP5();
    }

    initP5() {
        const sketch = (p) => {
            p.setup = () => {
                const container = document.getElementById(this.parentId);
                this.updateCanvasSize(container, p);

                this.resizeObserver = new ResizeObserver(entries => {
                    for (const entry of entries) {
                        if (entry.contentRect.width > 0) {
                            this.updateCanvasSize(document.getElementById(this.parentId), p);
                            p.redraw();
                        }
                    }
                });
                this.resizeObserver.observe(container);
            };

            p.draw = () => {
                p.background(255);
                this.update();
                this.render(p);
            };
        };
        this.p5 = new p5(sketch, this.parentId);
    }

    updateCanvasSize(container, p) {
        if (!p) p = this.p5;

        const newWidth = container.offsetWidth || 800;
        const newHeight = container.offsetHeight || 500;

        if (newWidth !== this.canvasWidth || newHeight !== this.canvasHeight) {
            this.canvasWidth = newWidth;
            this.canvasHeight = newHeight;
            if (p) p.resizeCanvas(newWidth, newHeight);
            this.calculateLayout();
        }
    }

    loadAlgorithm(algorithmInstance, data) {
        this.pause();
        this.currentStepIndex = 0;

        this.updateCanvasSize(document.getElementById(this.parentId), this.p5);

        this.steps = algorithmInstance.generateSteps(data);
        
        if (this.steps.length === 0) {
            this.steps.push(AnimationStep.initial(data));
        }

        this.calculateLayout();
        this.dispatchUpdateEvent();
        this.p5.redraw();
    }

    calculateLayout() {
        if (this.steps.length > 0 && this.steps[0].array) {
            const dataSize = this.steps[0].array.length;
            this.barWidth = Math.min(this.canvasWidth / dataSize, 80);
        }
    }

    update() {
        if (!this.isPlaying) return;
        const speedFactor = Math.floor((100 - this.speed) / 10); 
        if (this.frameCounter >= speedFactor) {
            this.stepForward();
            this.frameCounter = 0;
        } else {
            this.frameCounter++;
        }
    }

    render(p) {
        if (!this.steps || this.steps.length === 0) return;
        const step = this.steps[this.currentStepIndex];

        if (step.treeRoot) {
            this.renderTree(p, step.treeRoot, step);
        } else if (step.array) {
            this.renderArray(p, step.array, step);
        }
    }

    renderArray(p, array, step) {
        const maxVal = Math.max(...array, 100); 
        for (let i = 0; i < array.length; i++) {
            const val = array[i];
            const effectiveHeight = this.canvasHeight > 0 ? this.canvasHeight : 500;
            const barHeight = (val / maxVal) * (effectiveHeight * 0.9);
            const x = i * (this.barWidth > 0 ? this.barWidth : 10); 
            const y = effectiveHeight - barHeight;

            let color = '#94a3b8'; 
            if (step.compareIndices.includes(i)) color = '#fbbf24'; 
            else if (step.swapIndices.includes(i)) color = '#ef4444'; 
            else if (step.sortedIndices.includes(i)) color = '#22c55e'; 

            p.fill(color);
            p.noStroke();
            const w = this.barWidth > 2 ? this.barWidth - 1 : this.barWidth;
            p.rect(x, y, w, barHeight);
        }
    }
    
    renderTree(p, node, step, x = this.canvasWidth / 2, y = 50, level = 1) {
        if (!node) return;

        const xOffset = this.canvasWidth / Math.pow(2, level + 1);

        p.stroke('#cbd5e1');
        p.strokeWeight(2);
        if (node.left) p.line(x, y, x - xOffset, y + 60);
        if (node.right) p.line(x, y, x + xOffset, y + 60);

        let fillColor = 'white';
        let strokeColor = '#334155';
        let textColor = '#334155';

        if (step.compareIndices.includes(node.id)) {
            fillColor = '#fef3c7'; strokeColor = '#d97706';
        } 
        if (step.sortedIndices.includes(node.id)) {
            fillColor = '#dcfce7'; strokeColor = '#16a34a';
        }

        p.fill(fillColor);
        p.stroke(strokeColor);
        p.strokeWeight(2);
        p.ellipse(x, y, 40, 40);

        p.fill(textColor);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        p.text(node.value, x, y);

        this.renderTree(p, node.left, step, x - xOffset, y + 60, level + 1);
        this.renderTree(p, node.right, step, x + xOffset, y + 60, level + 1);
    }
    
    play() { this.isPlaying = true; }
    pause() { this.isPlaying = false; }

    stepForward() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            this.dispatchUpdateEvent();
        } else { 
            this.isPlaying = false; 
        }
    }

    stepBackward() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            this.dispatchUpdateEvent();
        }
    }

    setSpeed(val) { this.speed = val; }

    dispatchUpdateEvent() {
        const event = new CustomEvent('viz-update', {
            detail: {
                currentStep: this.currentStepIndex,
                totalSteps: this.steps.length,
                description: this.steps[this.currentStepIndex]?.description || ""
            }
        });
        document.dispatchEvent(event);
    }
}
window.Visualizer = Visualizer;
