import * as THREE from 'three'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const FIELD_OF_VIEW = 60 // extent of the scene that is seen on the display at any given moment. The value is in degrees.
const ASPECT_RATIO = WIDTH / HEIGHT
const NEAR = 0.05
const FAR = 1000

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})

renderer.setSize(WIDTH, HEIGHT)

const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT_RATIO, NEAR, FAR)
const scene = new THREE.Scene()

const baseArea = new THREE.Mesh(
	new THREE.BoxGeometry(1.84, 0, 1.20), 
	new THREE.MeshBasicMaterial({ color: 0x808080 })
)

const footballField = new THREE.Group()
let a = 0.0835

for (let index = 0; index < 10; index++) {
	const newLine = new THREE.Mesh(
		new THREE.BoxGeometry(0.167, 0, 1.04), 
		new THREE.MeshBasicMaterial({ color: index % 2 === 0 ? 0x7cfc00 : 0x1b4119 })
	)
	newLine.position.set(-0.835 + a, 0, 0)
	a += 0.167
	footballField.add(newLine)
}

const line = new THREE.Line(
	new THREE.BufferGeometry().setFromPoints([
		new THREE.Vector3(-0.835, 0, 0.01),
		new THREE.Vector3(0.835, 0, 0.01)
	]),
	new THREE.LineBasicMaterial({
		color: 0xffffff
	})
)

line.position.set(0, 0, -0.48)

scene.add(baseArea)
scene.add(footballField)
scene.add(line)

camera.position.set(0, 1.2, 1.2)
camera.lookAt(0, 0, 0)

function animate() {
  requestAnimationFrame(animate)

	// footballField.rotation.x += 0.01;
	// footballField.rotation.y += 0.01;

	renderer.render(scene, camera)
}

animate()
