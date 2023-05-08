import { EMovement } from "../enums/movement";
import { Key } from "../objectValues/key";
import { Position } from "../objectValues/position";
import { PlayerCommands } from "./player-commands";

export class Player {
    private readonly _position: Position
    private readonly _speed: number
    private _horizontalDirection: number
    private _verticalDirection: number
    private readonly _radius: number
    private _limit: Position[]

    constructor(position: Position, keys: Key[]) {
        this._position = position
        new PlayerCommands(keys, this.updateDirection.bind(this))

        this._speed = 0.20
        this._horizontalDirection = 0
        this._verticalDirection = 0
        this._radius = 2
        this._limit = []

        this.setLimit()
        setInterval(this.updatePosition.bind(this), 20)
    }

    public get position() {
        return this._position
    }

    public get limit() {
        return this._limit
    }

    public get horizontalDirection() {
        return this._horizontalDirection
    }

    public get verticalDirection() {
        return this._verticalDirection
    }

    private updateDirection(key: Key): void {
        switch (key.movement) {
            case EMovement.up:
                this._verticalDirection = key.isActive ? -1 : 0
                break;
            
            case EMovement.left:
                this._horizontalDirection = key.isActive ? -1 : 0
                break;

            case EMovement.right:
                this._horizontalDirection = key.isActive ? 1 : 0
                break;

            case EMovement.down:
                this._verticalDirection = key.isActive ? 1 : 0
                break;

            default:
                break;
        }
    }

    private updatePosition() {
        this._position.x += this._horizontalDirection * this._speed
        this._position.z += this._verticalDirection * this._speed

        this.setLimit()
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