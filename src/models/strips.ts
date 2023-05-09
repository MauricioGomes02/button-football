import * as THREE from "three"
import { Measures } from "./measures"

export function createStrips() {
    const width = Measures.footballField.width / 22
    const depth = Measures.footballField.height

    const group = new THREE.Group()
    for (let index = 0; index < 22; index++) {
        const geometry = new THREE.BoxGeometry(width, 0, depth)
        const materialParameters: THREE.MeshBasicMaterialParameters = {
            color: index % 2 === 0 ? 0x006600 : 0x00a000
        }
        const material = new THREE.MeshBasicMaterial(materialParameters)
        const strip = new THREE.Mesh(geometry, material)

        const x = -(Measures.footballField.width / 2) + (width / 2) + (width * index)
        strip.position.set(x, 0.05, 0)

        group.add(strip)
    }

    return group
}