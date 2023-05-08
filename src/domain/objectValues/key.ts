import { EMovement } from "../enums/movement"

export class Key {
    private readonly _code: string
    private readonly _movement: EMovement
    private _isActive: boolean

    constructor(code: string, movement: EMovement) {
        this._code = code
        this._movement = movement
        this._isActive = false
    }

    public get code() {
        return this._code
    }

    public get movement() {
        return this._movement
    }

    public get isActive() {
        return this._isActive
    }

    public set isActive(value: boolean) {
        this._isActive = value
    }
}