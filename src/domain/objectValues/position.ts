export class Position {
    private _x: number
    private _y: number
    private _z: number

    constructor(x: number, y: number, z: number) {
        this._x = x
        this._y = y
        this._z = z
    }

    public get x() {
        return this._x
    }

    public set x(value: number) {
        this._x = value
    }

    public get y() {
        return this._y
    }

    public set y(value: number) {
        this._y = value
    }

    public get z() {
        return this._z
    }

    public set z(value: number) {
        this._z = value
    }
}