import { MeshBasicMaterialBuilder } from "../builders/mesh-basic-material-builder";
import { PlaneGeometryBuilder } from "../builders/plane-geometry-builder";
import { Measures } from "./measures";

export function createBaseArea(): THREE.Mesh {
    const planeBuilder = new PlaneGeometryBuilder()
    const materialBuilder = new MeshBasicMaterialBuilder()

    materialBuilder.withColor(0x808080)
    const material = materialBuilder.build()
    
    planeBuilder.withWidth(Measures.baseArea.width)
    planeBuilder.withHeight(Measures.baseArea.height)

    planeBuilder.withMaterial(material)

    const plane = planeBuilder.build()

    plane.rotateX(Math.PI / 180 * -(90))

    return plane
}