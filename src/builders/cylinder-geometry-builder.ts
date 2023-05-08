import * as THREE from 'three'
import { MeshBasicMaterialBuilder } from './mesh-basic-material-builder'

export class CylinderGeometryBuilder {
    private _radiusTop: number
    private _radiusBottom: number
    private _height: number
    private _radialSegments: number
    private _heightSegments: number
    private _openEnded: boolean
    private _thetaStart: number
    private _thetaLength: number
    private _material: THREE.Material 

    constructor() {
        this._radiusTop = 1
        this._radiusBottom = 1
        this._height = 1
        this._radialSegments = 32
        this._heightSegments = 1
        this._openEnded = false
        this._thetaStart = 0
        this._thetaLength = Math.PI * 2

        const materialBuilder = new MeshBasicMaterialBuilder()
        materialBuilder.withColor(0xffffff)
        const material = materialBuilder.build()
        this._material = material
    }

    withRadiusTop(value: number): CylinderGeometryBuilder {
        this._radiusTop = value
        return this
    }

    withRadiusBottom(value: number): CylinderGeometryBuilder {
        this._radiusBottom = value
        return this
    }

    withHeight(value: number): CylinderGeometryBuilder {
        this._height = value
        return this
    }

    withRadialSegments(value: number): CylinderGeometryBuilder {
        this._radialSegments = value
        return this
    }

    withMaterial(value: THREE.Material): CylinderGeometryBuilder {
        this._material = value
        return this
    }
    
    withHeightSegments(value: number): CylinderGeometryBuilder {
        this._heightSegments = value
        return this
    }

    withOpenEnded(value: boolean): CylinderGeometryBuilder {
        this._openEnded = value
        return this
    }

    withThetaStart(value: number): CylinderGeometryBuilder {
        this._thetaStart = value
        return this
    }

    withThetaLength(value: number): CylinderGeometryBuilder {
        this._thetaLength = value
        return this
    }

    build(): THREE.Mesh {
        const geometry = new THREE.CylinderGeometry(
            this._radiusTop, 
            this._radiusBottom, 
            this._height, 
            this._radialSegments,
            this._heightSegments,
            this._openEnded,
            this._thetaStart,
            this._thetaLength)
        const material = this._material
        return new THREE.Mesh(geometry, material)
    }
}