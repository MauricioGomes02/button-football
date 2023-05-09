import * as THREE from 'three'
import { MeshBasicMaterialBuilder } from './mesh-basic-material-builder'

export class CircleGeometryBuilder {
    private _radius: number
    private _segments: number
    private _thetaStart: number
    private _thetaLength: number
    private _material: THREE.Material 

    constructor() {
        this._radius = 1
        this._segments = 32
        this._thetaStart = 0
        this._thetaLength = Math.PI * 2

        const materialBuilder = new MeshBasicMaterialBuilder()
        materialBuilder.withColor(0xffffff)
        const material = materialBuilder.build()
        this._material = material
    }

    withRadius(value: number): CircleGeometryBuilder {
        this._radius = value
        return this
    }

    withSegments(value: number): CircleGeometryBuilder {
        this._segments = value
        return this
    }

    withThetaStart(value: number): CircleGeometryBuilder {
        this._thetaStart = value
        return this
    }

    withThetaLength(value: number): CircleGeometryBuilder {
        this._thetaLength = value
        return this
    }

    withMaterial(value: THREE.Material): CircleGeometryBuilder {
        this._material = value
        return this
    }

    build(): THREE.Mesh {
        const geometry = new THREE.CircleGeometry(this._radius, this._segments, this._thetaStart, this._thetaLength)
        const material = this._material
        return new THREE.Mesh(geometry, material)
    }
}