export class Stack < T > {
    private pipe: T[];

    constructor() {
        this.pipe = [];
    }

    public push(value: T) {
        this.pipe.push(value);
    }
    public pop(): T {
        return this.pop();
    }
}
