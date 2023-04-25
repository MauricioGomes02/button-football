import * as THREE from 'three'
import { FootballField } from './models/football-field'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const FIELD_OF_VIEW = 60 // extent of the scene that is seen on the display at any given moment. The value is in degrees.
const ASPECT_RATIO = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 1000

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})
renderer.setSize(WIDTH, HEIGHT)
const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT_RATIO, NEAR, FAR)
const scene = new THREE.Scene()

const footballField = FootballField._getObject(100)

scene.add(footballField)

camera.position.set(0, 1.2 * 100, 0)
camera.lookAt(0, 0, 0)

function animate() {
  	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()
