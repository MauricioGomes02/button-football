import * as THREE from 'three'

export class FootballField {
	#baseArea
    #strips
    #lines


	constructor() {
		this.#baseArea = this.#createBaseArea()
        this.#strips = this.#createStrips()
        this.#lines = this.#createLines()
	}

	get mesh() {
		const group = new THREE.Group()
        this.#baseArea.position.set(0, 0, 0)
		group.add(this.#baseArea)
        this.#strips.position.set(0, 0, 0)
        group.add(this.#strips)
        this.#lines.position.set(0, 0, 0)
        group.add(this.#lines)

		return group
	}

	#createBaseArea() {
		const width = 1.84
		const height = 0
		const depth = 1.2
		const geometry = new THREE.BoxGeometry(width, height, depth)
		const materialParameters: THREE.MeshBasicMaterialParameters = {
			color: 0x808080
		}
		const material = new THREE.MeshBasicMaterial(materialParameters)
		return new THREE.Mesh(geometry, material)
	}

    #createStrips() {
        const stripWidht = 1.67
        const stripHeight = 1.04
        const quantity = 12

        const group = new THREE.Group()

        for (let index = 0; index < quantity; index++) {
            const geometry = new THREE.BoxGeometry(stripWidht / quantity, 0, stripHeight)
            const materialParameters: THREE.MeshBasicMaterialParameters = {
                color: index % 2 === 0 ? 0x006600 : 0x00a000
            }
            const material = new THREE.MeshBasicMaterial(materialParameters)
            const strip = new THREE.Mesh(geometry, material)
            const x = -(stripWidht / 2) + (stripWidht / quantity / 2) + (stripWidht / quantity * index)
            strip.position.set(x, 0, 0)
            group.add(strip)
        }

        return group
    }

    #createLines() {
        const group = new THREE.Group()        
        
        const topLine = this.#createLine(-0.835, 0, -0.52, 0.835, 0, -0.52)
        const bottomLine = this.#createLine(-0.835, 0, 0.52, 0.835, 0, 0.52)

        const leftLine = this.#createLine(-0.835, 0, -0.52, -0.835, 0, 0.52)
        const centerLine = this.#createLine(0, 0, -0.52, 0, 0, 0.52)
        const rightLine = this.#createLine(0.835, 0, -0.52, 0.835, 0, 0.52)

        const centerCircle = this.#createCircle(0.160, 32)

        group.add(topLine)
        group.add(bottomLine)

        group.add(leftLine)
        group.add(centerLine)
        group.add(rightLine)
        
        group.add(centerCircle)

        return group
    }

    #createLine(x: number, y: number, z: number, _x: number, _y: number, _z: number) {
        const geometry = new THREE.BufferGeometry()
        const points = [
            new THREE.Vector3(x, y, z),
            new THREE.Vector3(_x, _y, _z)
        ]
        geometry.setFromPoints(points)
        const materialParameters: THREE.LineBasicMaterialParameters = {
            color: 0xffffff
        }
        const material = new THREE.LineBasicMaterial(materialParameters)
        return new THREE.Line(geometry, material)
    }

    #createCircle(radius: number, segments: number) {
        const geometry = new THREE.CircleGeometry(radius, segments)
        const materialParameters: THREE.LineBasicMaterialParameters = {
            color: 0xffffff
        }
        const material = new THREE.LineBasicMaterial(materialParameters)
        return new THREE.LineLoop(geometry, material)
    }
}
