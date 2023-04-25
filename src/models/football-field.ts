import * as THREE from 'three'

const BASE_AREA_VERTICAL_LENGTH = 1.20 //meters
const BASE_AREA_HORIZONTAL_LENGTH = 1.84 //meters
const BASE_AREA_HEIGHT = 0 //meters

const FOOTBALL_FIELD_VERTICAL_LENGTH = 1.04 //meters
const FOOTBALL_FIELD_HORIZONTAL_LENGTH = 1.67 //meters

const STRIPS_HEIGHT = 0.05
const LINES_HEIGHT = 0.1

const SMALL_AREA_VERTICAL_LENGTH = 0.110 //meters
const SMALL_AREA_HORIZONTAL_LENGTH = 0.300 //meters

const BIG_AREA_VERTICAL_LENGTH = 0.300 //meters
const BIG_AREA_HORIZONTAL_LENGTH = 0.600 //meters

const CIRCLE_RADIUS = 0.160

export class FootballField {
    static _getObject(scale: number): THREE.Group {
        const group = new THREE.Group()
        
        const baseArea = this.createBaseArea(scale)
        group.add(baseArea)

        const strips = this.createStrips(scale)
        group.add(strips)

        const lines = this.createLines(scale)
        group.add(lines)

        return group
    }

    private static createBaseArea(scale: number): THREE.Mesh {
        const width = BASE_AREA_HORIZONTAL_LENGTH * scale
        const depth = BASE_AREA_VERTICAL_LENGTH * scale
		const geometry = new THREE.BoxGeometry(width, 0, depth)

		const materialParameters: THREE.MeshBasicMaterialParameters = {
			color: 0x808080
		}
		const material = new THREE.MeshBasicMaterial(materialParameters)

		const baseArea = new THREE.Mesh(geometry, material)
        baseArea.position.set(0, BASE_AREA_HEIGHT, 0)

        return baseArea
    }

    private static createStrips(scale: number, stripsQuantity: number = 15): THREE.Group {
        const width = FOOTBALL_FIELD_HORIZONTAL_LENGTH / stripsQuantity * scale
        const depth = FOOTBALL_FIELD_VERTICAL_LENGTH * scale

        const group = new THREE.Group()
        for (let index = 0; index < stripsQuantity; index++) {
            const geometry = new THREE.BoxGeometry(width, 0, depth)
            const materialParameters: THREE.MeshBasicMaterialParameters = {
                color: index % 2 === 0 ? 0x006600 : 0x00a000
            }
            const material = new THREE.MeshBasicMaterial(materialParameters)
            const strip = new THREE.Mesh(geometry, material)

            const x = -(FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2 * scale) + (width / 2) + (width * index)
            strip.position.set(x, STRIPS_HEIGHT, 0)

            group.add(strip)
        }

        return group
    }

    private static createLines(scale: number): THREE.Group {
        const group = new THREE.Group()

        const footballFieldLines = this.createFootBallFieldLines(scale)

        const smallAreaLinesLeft = this.createSmallAreaLines(scale)
        smallAreaLinesLeft.position.set(
            -((FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale) + ((SMALL_AREA_VERTICAL_LENGTH / 2) * scale), 
            LINES_HEIGHT, 
            0)
        smallAreaLinesLeft.rotation.set(0, Math.PI / 180 * -90, 0)

        const smallAreaLinesRight = this.createSmallAreaLines(scale)
        smallAreaLinesRight.position.set(
            ((FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale) - ((SMALL_AREA_VERTICAL_LENGTH / 2) * scale), 
            LINES_HEIGHT, 
            0)
        smallAreaLinesRight.rotation.set(0, Math.PI / 180 * 90, 0)

        const bigAreaLinesLeft = this.createBigAreaLines(scale)
        bigAreaLinesLeft.position.set(
            -((FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale) + ((BIG_AREA_VERTICAL_LENGTH / 2) * scale), 
            LINES_HEIGHT, 
            0)
        bigAreaLinesLeft.rotation.set(0, Math.PI / 180 * -90, 0)

        const bigAreaLinesRight = this.createBigAreaLines(scale)
        bigAreaLinesRight.position.set(
            ((FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale) - ((BIG_AREA_VERTICAL_LENGTH / 2) * scale), 
            LINES_HEIGHT, 
            0)
        bigAreaLinesRight.rotation.set(0, Math.PI / 180 * 90, 0)

        const centerLines = this.createCenterLines(scale)

        group.add(footballFieldLines)
        group.add(smallAreaLinesLeft)
        group.add(smallAreaLinesRight)
        group.add(bigAreaLinesLeft)
        group.add(bigAreaLinesRight)
        group.add(centerLines)

        return group
    }

    private static createFootBallFieldLines(scale: number): THREE.Line {
        const points = [
            // top
            new THREE.Vector3(-(FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale, 0, -(FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale),
            new THREE.Vector3((FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale, 0, -(FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale),
            // right
            new THREE.Vector3((FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale, 0, (FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale),
            // bottom
            new THREE.Vector3(-(FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale, 0, (FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale),
            // left
            new THREE.Vector3(-(FOOTBALL_FIELD_HORIZONTAL_LENGTH / 2) * scale, 0, -(FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale),
        ]

        const footballFieldLines = this.createLine(points)
        footballFieldLines.position.set(0, LINES_HEIGHT, 0)
        return footballFieldLines
    }

    private static createSmallAreaLines(scale: number): THREE.Line {
        const points = [
            // left
            new THREE.Vector3(-(SMALL_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, (SMALL_AREA_VERTICAL_LENGTH / 2) * scale),
            new THREE.Vector3(-(SMALL_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, -(SMALL_AREA_VERTICAL_LENGTH / 2) * scale),
            // top
            new THREE.Vector3((SMALL_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, -(SMALL_AREA_VERTICAL_LENGTH / 2) * scale),
            // right
            new THREE.Vector3((SMALL_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, (SMALL_AREA_VERTICAL_LENGTH / 2) * scale),
        ]

        const smallAreaLines = this.createLine(points)
        smallAreaLines.position.set(0, LINES_HEIGHT, 0)
        return smallAreaLines
    }

    private static createBigAreaLines(scale: number): THREE.Group {
        const group = new THREE.Group()

        const points = [
            // left
            new THREE.Vector3(-(BIG_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, (BIG_AREA_VERTICAL_LENGTH / 2) * scale),
            new THREE.Vector3(-(BIG_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, -(BIG_AREA_VERTICAL_LENGTH / 2) * scale),
            // top
            new THREE.Vector3((BIG_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, -(BIG_AREA_VERTICAL_LENGTH / 2) * scale),
            // right
            new THREE.Vector3((BIG_AREA_HORIZONTAL_LENGTH / 2) * scale, LINES_HEIGHT, (BIG_AREA_VERTICAL_LENGTH / 2) * scale),
        ]

        const bigAreaLines = this.createLine(points)
        bigAreaLines.position.set(0, LINES_HEIGHT, 0)

        const circle = this.createCircle(CIRCLE_RADIUS * scale, 32, Math.PI / 180 * 17, Math.PI / 180 * 160)
        circle.position.set(0, LINES_HEIGHT, -(BIG_AREA_VERTICAL_LENGTH * (205 / 3) / 2))
        circle.rotation.set(0, Math.PI / 180 * 180, 0)

        group.add(bigAreaLines)
        group.add(circle)

        return group
    }

    private static createCenterLines(scale: number): THREE.Group {
        const group = new THREE.Group()

        const points = [
            new THREE.Vector3(0, LINES_HEIGHT, -(FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale),
            new THREE.Vector3(0, LINES_HEIGHT, (FOOTBALL_FIELD_VERTICAL_LENGTH / 2) * scale)
        ]

        const line = this.createLine(points)
        const circle = this.createCircle(CIRCLE_RADIUS * scale, 32, 0, Math.PI / 180 * 360)
        circle.position.set(0, LINES_HEIGHT, 0)

        group.add(line)
        group.add(circle)

        return group
    }

    private static createLine(points: THREE.Vector3[]) {
        const geometry = new THREE.BufferGeometry()
        geometry.setFromPoints(points)
        const materialParameters: THREE.LineBasicMaterialParameters = {
            color: 0xffffff
        }
        const material = new THREE.LineBasicMaterial(materialParameters)
        return new THREE.Line(geometry, material)
    }

    private static createCircle(radius: number, segments: number, startAngle: number, endAngle: number) {
        const startSegment = startAngle * segments / 2 / Math.PI
        const endSegment = endAngle * segments / 2 / Math.PI

        const totalSegments = Math.abs(endSegment - startSegment)

        let segment = startSegment

        const points: THREE.Vector3[] = []
        for (let index = 0; index < totalSegments + 1; index++) {            
            if (segment >= segments) {
                segment = 0
            }

            const theta = 2 * Math.PI * segment / segments
            const x = radius * Math.cos(theta)
            const y = radius * Math.sin(theta)

            const point = new THREE.Vector3(x, 0, y)
            points.push(point)

            segment += 1
        }

        return this.createLine(points)
    }
}
