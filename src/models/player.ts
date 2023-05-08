import { CylinderGeometryBuilder } from '../builders/cylinder-geometry-builder'
import { MeshBasicMaterialBuilder } from '../builders/mesh-basic-material-builder'

export function createPlayer(color: number) {
    const cylinderBuilder = new CylinderGeometryBuilder()
    const materialBuilder = new MeshBasicMaterialBuilder()

    materialBuilder.withColor(color)
    const material = materialBuilder.build()

    cylinderBuilder.withHeight(1)
    cylinderBuilder.withRadiusTop(2)
    cylinderBuilder.withRadiusBottom(2)

    cylinderBuilder.withMaterial(material)

    return cylinderBuilder.build()
}