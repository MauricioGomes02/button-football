import { Key } from "../objectValues/key";

export class PlayerCommands {
    private readonly _keys: Record<string, Key>
    private readonly _onKeyChange: (key: Key) => void

    constructor(keys: Key[], onKeyChange: (key: Key) => void) {
        this._keys = {}
        keys.forEach(key => {
            this._keys[key.code] = key
        })
        this._onKeyChange = onKeyChange

        window.addEventListener('keydown', this.onKeyDown.bind(this))
        window.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    private onKeyDown(event: KeyboardEvent) {
        const key = this._keys[event.key]
        if (key) {
            key.isActive = true
            this._onKeyChange(key)
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        const key = this._keys[event.key]
        if (key) {
            key.isActive = false
            this._onKeyChange(key)
        }
    }
}