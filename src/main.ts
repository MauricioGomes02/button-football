import * as THREE from 'three'
import { createBaseArea } from './models/base-area'
import { createLines } from './models/lines'
import { createPlayer } from './models/player'
import { createGoals } from './models/goal'
import { Player } from './domain/entities/player'
import { Position } from './domain/objectValues/position'
import { Key } from './domain/objectValues/key'
import { EMovement } from './domain/enums/movement'
import { createBall } from './models/ball'
import { createStrips } from './models/strips'

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

const positionPlayer1 = new Position(-9.15, 0.2, 0)
const commandKeysPlayer1 = [
	new Key('w', EMovement.up),
	new Key('a', EMovement.left),
	new Key('d', EMovement.right),
	new Key('s', EMovement.down)
]
const player1 = new Player(positionPlayer1, commandKeysPlayer1)

const positionPlayer2 = new Position(9.15, 0.2, 0)
const commandKeysPlayer2 = [
	new Key('ArrowUp', EMovement.up),
	new Key('ArrowLeft', EMovement.left),
	new Key('ArrowRight', EMovement.right),
	new Key('ArrowDown', EMovement.down)
]
const player2 = new Player(positionPlayer2, commandKeysPlayer2)

const baseArea = createBaseArea()
const strips = createStrips()
const lines = createLines()
const player1Model = createPlayer(0x0000ff)
const player2Model = createPlayer(0xff0000)
const goals = createGoals()
const ball = createBall()

baseArea.position.set(0, 0, 0)
lines.position.set(0, 0.1, 0)
goals.position.set(0, 0.1, 0)
ball.position.set(0, 0.1, 0)

player1Model.position.set(
	player1.position.x,
	player1.position.y,
	player1.position.z
)

player2Model.position.set(
	player2.position.x, 
	player2.position.y,
	player2.position.z
)

scene.add(baseArea)
scene.add(strips)
scene.add(lines)
scene.add(player1Model)
scene.add(player2Model)
scene.add(goals)
scene.add(ball)

camera.position.set(ball.position.x, 20, ball.position.z + 20)
camera.lookAt(ball.position.x, ball.position.y, ball.position.z)

function animate() {
	player1Model.position.set(
		player1.position.x,
		player1.position.y,
		player1.position.z
	)
	
	player2Model.position.set(
		player2.position.x, 
		player2.position.y,
		player2.position.z
	)

	const diffXPlayer1 = Math.abs(player1.position.x - ball.position.x)
	const diffZPlayer1 = Math.abs(player1.position.z - ball.position.z)

	const length1 = Math.sqrt(Math.pow(diffXPlayer1, 2) + Math.pow(diffZPlayer1, 2))

	const diffXPlayer2 = Math.abs(player2.position.x - ball.position.x)
	const diffZPlayer2 = Math.abs(player2.position.z - ball.position.z)

	const length2 = Math.sqrt(Math.pow(diffXPlayer2, 2) + Math.pow(diffZPlayer2, 2))

	if (length1 <= 1.5) {
		ball.position.x += (length1 - 1) * (diffXPlayer1 / length1) * player1.horizontalDirection
		ball.position.z += (length1 - 1) * (diffZPlayer1 / length1) * player1.verticalDirection
	}
	if (length2 <= 1.5) {
		ball.position.x += (length2 - 1) * (diffXPlayer2 / length2) * player2.horizontalDirection
		ball.position.z += (length2 - 1) * (diffZPlayer2 / length2) * player2.verticalDirection
	}

	camera.position.set(ball.position.x, 20, ball.position.z + 20)
	camera.lookAt(ball.position.x, ball.position.y, ball.position.z)

	renderer.render(scene, camera)
}


renderer.setAnimationLoop(animate)
