import { Measures } from "../../models/measures";
import { Position } from "../objectValues/position";

export class Ball {
    private readonly _position: Position
    private readonly _radius: number
    private _limit: Position[]

    constructor(position: Position) {
        this._position = position
        this._radius = Measures.lineWidth * 3
        this._limit = []

        this.setLimit()
    }

    public get limit() {
        return this._limit
    }

    private setLimit() {
        this._limit = []
        const segments = 32
        
        for (let index = 0; index < segments; index++) {
            const theta = 2 * Math.PI * index / segments
            const x = this._radius * Math.cos(theta) + this._position.x
            const z = this._radius * Math.sin(theta) + this._position.z

            const position = new Position(x, 0, z)
            this._limit.push(position)
        }
    }
}