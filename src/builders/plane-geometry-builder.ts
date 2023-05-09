import * as THREE from 'three'
import { MeshBasicMaterialBuilder } from './mesh-basic-material-builder'

export class PlaneGeometryBuilder {
    private _width: number
    private _height: number
    private _widthSegments: number
    private _heightSegments: number
    private _material: THREE.Material 

    constructor() {
        this._width = 1
        this._height = 1
        this._widthSegments = 1
        this._heightSegments = 1

        const materialBuilder = new MeshBasicMaterialBuilder()
        materialBuilder.withColor(0xffffff)
        const material = materialBuilder.build()
        this._material = material
    }

    withWidth(value: number): PlaneGeometryBuilder {
        this._width = value
        return this
    }

    withHeight(value: number): PlaneGeometryBuilder {
        this._height = value
        return this
    }

    withWidthSegments(value: number): PlaneGeometryBuilder {
        this._widthSegments = value
        return this
    }

    withHeightSegments(value: number): PlaneGeometryBuilder {
        this._heightSegments = value
        return this
    }

    withMaterial(value: THREE.Material): PlaneGeometryBuilder {
        this._material = value
        return this
    }

    build(): THREE.Mesh {
        const geometry = new THREE.PlaneGeometry(this._width, this._height, this._widthSegments, this._heightSegments)
        const material = this._material
        return new THREE.Mesh(geometry, material)
    }
}