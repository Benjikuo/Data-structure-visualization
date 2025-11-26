class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.id = Math.random();
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    cloneTree(node) {
        if (!node) return null;
        const newNode = new TreeNode(node.value);
        newNode.id = node.id;
        newNode.left = this.cloneTree(node.left);
        newNode.right = this.cloneTree(node.right);
        return newNode;
    }

    insert(value) {
        const steps = [];
        
        if (!this.root) {
            this.root = new TreeNode(value);
            steps.push({
                treeRoot: this.cloneTree(this.root),
                compareIndices: [], sortedIndices: [this.root.id],
                description: `Tree is empty. ${value} becomes Root.`
            });
            return steps;
        }

        let current = this.root;
        while (true) {
            steps.push({
                treeRoot: this.cloneTree(this.root),
                compareIndices: [current.id], sortedIndices: [],
                description: `Comparing ${value} with ${current.value}...`
            });

            if (value < current.value) {
                if (!current.left) {
                    current.left = new TreeNode(value);
                    steps.push({
                        treeRoot: this.cloneTree(this.root),
                        compareIndices: [], sortedIndices: [current.left.id],
                        description: `${value} < ${current.value}. Inserted to the Left.`
                    });
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = new TreeNode(value);
                    steps.push({
                        treeRoot: this.cloneTree(this.root),
                        compareIndices: [], sortedIndices: [current.right.id],
                        description: `${value} >= ${current.value}. Inserted to the Right.`
                    });
                    break;
                }
                current = current.right;
            }
        }
        return steps;
    }

    search(value) {
        const steps = [];
        let current = this.root;
        
        while (current) {
            steps.push({
                treeRoot: this.cloneTree(this.root),
                compareIndices: [current.id], sortedIndices: [],
                description: `Checking node ${current.value}...`
            });

            if (value === current.value) {
                steps.push({
                    treeRoot: this.cloneTree(this.root),
                    compareIndices: [], sortedIndices: [current.id],
                    description: `Found ${value}!`
                });
                return steps;
            }
            
            current = value < current.value ? current.left : current.right;
        }

        steps.push({
            treeRoot: this.cloneTree(this.root),
            compareIndices: [], sortedIndices: [],
            description: `${value} not found in tree.`
        });
        return steps;
    }

    traverse(type) {
        const steps = [];
        const visitedIds = [];
        
        const helper = (node) => {
            if (!node) return;

            if (type === 'preorder') {
                visitedIds.push(node.id);
                steps.push({
                    treeRoot: this.cloneTree(this.root),
                    compareIndices: [], sortedIndices: [...visitedIds],
                    description: `Visiting ${node.value}`
                });
            }

            helper(node.left);

            if (type === 'inorder') {
                visitedIds.push(node.id);
                steps.push({
                    treeRoot: this.cloneTree(this.root),
                    compareIndices: [], sortedIndices: [...visitedIds],
                    description: `Visiting ${node.value}`
                });
            }

            helper(node.right);

            if (type === 'postorder') {
                visitedIds.push(node.id);
                steps.push({
                    treeRoot: this.cloneTree(this.root),
                    compareIndices: [], sortedIndices: [...visitedIds],
                    description: `Visiting ${node.value}`
                });
            }
        };

        helper(this.root);
        return steps;
    }
}
