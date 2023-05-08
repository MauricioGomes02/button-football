import * as THREE from 'three'
import { CylinderGeometryBuilder } from "../builders/cylinder-geometry-builder";
import { MeshBasicMaterialBuilder } from "../builders/mesh-basic-material-builder";
import { Measures } from "./measures";

export function createGoals() {
    const group = new THREE.Group()

    const verticalBeansX = (Measures.footballField.width / 2) - (Measures.lineWidth / 2)
    const leftVerticalBeams = createVerticalBeams()
    leftVerticalBeams.position.set(-verticalBeansX, 0, 0)
    const rightVerticalBeamns = createVerticalBeams()
    rightVerticalBeamns.position.set(verticalBeansX, 0, 0)
    
    group.add(leftVerticalBeams)
    group.add(rightVerticalBeamns)

    return group
}

function createVerticalBeams() {
    const group = new THREE.Group()

    const beam1 = createBeam(Measures.goal.height)
    const beam2 = createBeam(Measures.goal.height)

    const x = 0
    const y = Measures.goal.height / 2
    const z = (Measures.goal.width / 2) + (Measures.lineWidth / 2)

    beam1.position.set(x, y, z)
    beam2.position.set(x, y, -z)

    group.add(beam1)
    group.add(beam2)

    const beam3 = createBeam(Measures.goal.width + Measures.lineWidth)
    beam3.rotateX(Math.PI / 180 * 90)
    const _x = 0
    const _y = Measures.goal.height
    const _z = 0
    beam3.position.set(_x, _y, _z)

    group.add(beam3)

    return group
}

function createBeam(length: number,) {
    const cylinderBuilder = new CylinderGeometryBuilder()
    const materialBuilder = new MeshBasicMaterialBuilder()

    materialBuilder.withColor(0xffffff)
    const material = materialBuilder.build()

    cylinderBuilder.withHeight(length)
    const radius = Measures.lineWidth / 2
    cylinderBuilder.withRadiusTop(radius)
    cylinderBuilder.withRadiusBottom(radius)

    cylinderBuilder.withMaterial(material)

    return cylinderBuilder.build()
}