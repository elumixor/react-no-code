export type IPoint = { x: number; y: number };

export class Point {
    x;
    y;

    constructor({ x = 0, y = 0 } = {}) {
        this.x = x;
        this.y = y;
    }
}
