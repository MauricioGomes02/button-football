import * as THREE from 'three'
import { PlaneGeometryBuilder } from '../builders/plane-geometry-builder'
import { Measures } from './measures'
import { MeshBasicMaterialBuilder } from '../builders/mesh-basic-material-builder'
import { CircleGeometryBuilder } from '../builders/circle-geometry-builder'

export function createLines(): THREE.Group {
    const group = new THREE.Group()

    const footballFieldLines = createFootballFieldLines()
    const areasLines = createAreasLines()
    const centerLines = createCenterLines()

    group.add(footballFieldLines)
    group.add(areasLines)
    group.add(centerLines)

    return group
}

function createFootballFieldLines(): THREE.Group {
    const group = new THREE.Group()

    const topLine = createHorizontalLine(Measures.footballField.width)
    topLine.position.set(
        0,
        0,
        -((Measures.footballField.height / 2) - (Measures.lineWidth / 2))
    )

    const bottomLine = createHorizontalLine(Measures.footballField.width)
    bottomLine.position.set(
        0,
        0,
        ((Measures.footballField.height / 2) - (Measures.lineWidth / 2))
    )

    const leftLine = createVerticalLine(Measures.footballField.height)
    leftLine.position.set(
        -((Measures.footballField.width / 2) - (Measures.lineWidth / 2)),
        0,
        0
    )

    const rightLine = createVerticalLine(Measures.footballField.height)
    rightLine.position.set(
        ((Measures.footballField.width / 2) - (Measures.lineWidth / 2)),
        0,
        0
    )

    group.add(topLine)
    group.add(rightLine)
    group.add(bottomLine)
    group.add(leftLine)

    return group
}

function createAreasLines(): THREE.Group {
    const group = new THREE.Group()

    const smallAreas = createSmallAreasLines()
    const bigAreas = createBigAreasLines()

    group.add(smallAreas)
    group.add(bigAreas)

    return group
}

function createSmallAreasLines(): THREE.Group {
    const group = new THREE.Group()

    const leftSmallArea = createAreaLines(Measures.areas.small.width, Measures.areas.small.height)
    const rightSmallArea = createAreaLines(Measures.areas.small.width, Measures.areas.small.height)

    leftSmallArea.rotation.set(0, Math.PI / 180 * -90, 0)
    leftSmallArea.position.set(-((Measures.footballField.width / 2) - Measures.areas.small.height / 2) , 0, 0)

    rightSmallArea.rotation.set(0, Math.PI / 180 * 90, 0)
    rightSmallArea.position.set(((Measures.footballField.width / 2) - Measures.areas.small.height / 2) , 0, 0)

    group.add(leftSmallArea)
    group.add(rightSmallArea)

    return group
}

function createBigAreasLines(): THREE.Group {
    const group = new THREE.Group()

    const leftBigArea = createAreaLines(Measures.areas.big.width, Measures.areas.big.height, true)
    const rightBigArea = createAreaLines(Measures.areas.big.width, Measures.areas.big.height, true)

    leftBigArea.rotation.set(0, Math.PI / 180 * -90, 0)
    leftBigArea.position.set(-((Measures.footballField.width / 2) - Measures.areas.big.height / 2) , 0, 0)

    rightBigArea.rotation.set(0, Math.PI / 180 * 90, 0)
    rightBigArea.position.set(((Measures.footballField.width / 2) - Measures.areas.big.height / 2) , 0, 0)

    group.add(leftBigArea)
    group.add(rightBigArea)

    return group
}

function createAreaLines(horizontalLenght: number, verticalLength: number, createPenaltyMark: boolean = false): THREE.Group {
    const group = new THREE.Group()

    const topLine = createHorizontalLine(horizontalLenght)
    topLine.position.set(
        0,
        0,
        -((verticalLength / 2) - (Measures.lineWidth / 2))
    )

    const leftLine = createVerticalLine(verticalLength)
    leftLine.position.set(
        -((horizontalLenght / 2) - (Measures.lineWidth / 2)),
        0,
        0
    )

    const rightLine = createVerticalLine(verticalLength)
    rightLine.position.set(
        ((horizontalLenght / 2) - (Measures.lineWidth / 2)),
        0,
        0
    )

    group.add(topLine)
    group.add(rightLine)
    group.add(leftLine)

    if (createPenaltyMark) {
        const mark = createCircle(Measures.lineWidth, 32, 0, 360)

        mark.position.set(0, 0, -(Measures.areas.big.penaltyMark - (Measures.areas.big.height / 2)))

        group.add(mark)
    }

    return group
}

function createCenterLines(): THREE.Group {
    const group = new THREE.Group()

    const centerLine = createVerticalLine(Measures.footballField.height)
    const centerMark = createCircle(Measures.lineWidth, 32, 0, 360)

    group.add(centerLine)
    group.add(centerMark)

    return group
}

function createHorizontalLine(lenght: number): THREE.Mesh {
    return createLine(lenght, Measures.lineWidth)
}

function createVerticalLine(lenght: number): THREE.Mesh {
    return createLine(Measures.lineWidth, lenght)
}

function createLine(width: number, height: number): THREE.Mesh {
    const planeBuilder = new PlaneGeometryBuilder()
    const materialBuilder = new MeshBasicMaterialBuilder()

    materialBuilder.withColor(0xffffff)
    const material = materialBuilder.build()

    planeBuilder.withWidth(width)
    planeBuilder.withHeight(height)

    planeBuilder.withMaterial(material)

    const plane = planeBuilder.build()
    
    plane.rotateX(Math.PI / 180 * (-90))
    return plane
}

function createCircle(radius: number, segments: number, startAngle: number, endAngle: number) {
    const circleBuilder = new CircleGeometryBuilder()
    const materialBuilder = new MeshBasicMaterialBuilder()

    materialBuilder.withColor(0xffffff)
    const material = materialBuilder.build()

    circleBuilder.withRadius(radius)
    circleBuilder.withSegments(segments)
    circleBuilder.withThetaStart(Math.PI / 180 * startAngle)
    circleBuilder.withThetaLength(Math.PI / 180 * endAngle)

    circleBuilder.withMaterial(material)

    const circle = circleBuilder.build()

    circle.rotateX(Math.PI / 180 * (-90))
    return circle
}

// function createCircleLine(): THREE.Group {

// }