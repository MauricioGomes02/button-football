import * as THREE from 'three'

export class MeshBasicMaterialBuilder {
    private _color: number
    constructor() {
        this._color = 0xffffff
    }

    withColor(value: number): MeshBasicMaterialBuilder {
        this._color = value
        return this
    }

    build(): THREE.Material {
        const materialParameters = {
            color: this._color
        } as THREE.MeshBasicMaterialParameters

        return new THREE.MeshBasicMaterial(materialParameters)
    }
}