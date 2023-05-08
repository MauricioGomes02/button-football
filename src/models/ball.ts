import { CylinderGeometryBuilder } from "../builders/cylinder-geometry-builder"
import { MeshBasicMaterialBuilder } from "../builders/mesh-basic-material-builder"
import { Measures } from "./measures"

export function createBall() {
    const cylinderBuilder = new CylinderGeometryBuilder()
    const materialBuilder = new MeshBasicMaterialBuilder()

    materialBuilder.withColor(0xffffff)
    const material = materialBuilder.build()

    cylinderBuilder.withHeight(Measures.lineWidth)
    const radius = Measures.lineWidth * 3
    cylinderBuilder.withRadiusTop(radius)
    cylinderBuilder.withRadiusBottom(radius)

    cylinderBuilder.withMaterial(material)

    const cylinder = cylinderBuilder.build()
    cylinder.position.set(0, Measures.lineWidth / 2, 0)
    
    return cylinder
}