import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import blueberryMuffin from './assets/blueberry-muffin.glb'
import Cake01GLB from './assets/Cake_01.glb'
//import CakeGLB from './assets/Cake.glb'
import FlowerGLB from './assets/Flower.glb'
import modelGLB from './assets/model.glb'
import ramenGLB from './assets/model-2.glb'
import model3GLB from './assets/model-3.glb'
import sunflowerGLB from './assets/PUSHILIN_sunflower.glb'
import helveticaJSON from 'three/examples/fonts/helvetiker_bold.typeface.json'


// set up a renderer
const renderer = new THREE.WebGLRenderer({
	antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
// THREE colors look like 0xff00ff, same as #ff00ff
renderer.setClearColor(0xEEB79F, 1)

// find the element to add the renderer to!
const section = document.querySelector("section")
section.appendChild(renderer.domElement)

// lets create a scene
const scene = new THREE.Scene()

const loader = new GLTFLoader();

let muffin = null
let cake01 = null
let cake = null
let flower = null
let model = null
let ramen = null
let model3 = null
let sunflower = null

loader.load(blueberryMuffin, (gltf) => 	{ muffin = gltf.scene; muffin.scale.set(10,10,10) })
loader.load(Cake01GLB, (gltf) => 			{ cake01 = gltf.scene; cake01.scale.set(10,10,10)})
//loader.load(CakeGLB, (gltf) => 			{ cake = gltf.scene; cake.scale.set(10,10,10) })
loader.load(FlowerGLB, (gltf) => 			{ flower = gltf.scene })
loader.load(modelGLB, (gltf) => 			{ model = gltf.scene; model.scale.set(70,70,70) })
loader.load(ramenGLB, (gltf) => 			{ ramen = gltf.scene;ramen.scale.set(100,100,100) })
loader.load(model3GLB, (gltf) => 			{ model3 = gltf.scene;model3.scale.set(100,100,100) })
loader.load(sunflowerGLB, (gltf) =>		{ sunflower = gltf.scene;sunflower.scale.set(20,20,20) })

// lets create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
camera.position.z = -50
camera.lookAt(scene.position)

// lets add some lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, -1)
scene.add(light)

// hold some data about the shapes being added
const shapes = []

// lets add in an animation loop
const animate = function () {
	renderer.render(scene, camera)
	requestAnimationFrame(animate)

	camera.position.setZ(camera.position.z + 1)

	// lets rotate the shapes each frame
	shapes.forEach(shape => {
		shape.rotateX(-0.005)
		shape.rotateY(0.01)
	//shape.position.setZ(shape.position.z - 1)
	})
}

// start the animation
animate()

// lets hold a state of hue
let hue = 0

/* const fontLoader = new THREE.FontLoader()

console.log(helveticaJSON)
let helv = null
fontLoader.load(helveticaJSON, (font) => {
	helv = font
}) */

//const textProps = 

const createText = (text) => {
	const geometry = new THREE.TextGeometry(text, {
		font: new THREE.Font(helveticaJSON),
		size:40,
		height:5,
		curveSegment:12,
		bevelEnabled:false
	})
	const emissiveColor = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
	const material = new THREE.MeshLambertMaterial({
	  color: 0xBB55FE,
	  emissive: emissiveColor
	})
	
	const shape = new THREE.Mesh(geometry, material)
	shape.rotateY(Math.PI/2)	
	return shape;
}

// lets make a function that creates a shape
const createShape = function (x, y) {
const objs = [
 	createText("kathy"),
	createText("happ"),
	createText("birthdaye"),
	muffin,
	cake01,
//	cake,
	model,
 	flower,
	ramen,
	model3,
	sunflower,
]

const randNumber = Math.floor(Math.random() * objs.length)
const shape = objs[randNumber].clone()

shape.position.set(
	(window.innerWidth / 2) - x, 
	(window.innerHeight / 2) - y, 
	camera.position.z + 500
)

//console.log(shape)
// lets add it to the scene and the list of shapes
shapes.push(shape) 
scene.add(shape)
}

// lets do things on a draw
let isMouseDown = false

document.addEventListener("mousemove", function (event) {
if (isMouseDown) {
	//createShape(event.pageX, event.pageY)
}
})

document.addEventListener("mousedown", function (event) {
isMouseDown = true
createShape(event.pageX, event.pageY)
})

document.addEventListener("mouseup", function () {
isMouseDown = false
})

document.addEventListener("touchmove", function (event) {
if (isMouseDown) {
	//createShape(event.pageX, event.pageY)
}
})

document.addEventListener("touchstart", function () {
isMouseDown = true
})

document.addEventListener("touchend", function () {
isMouseDown = false
})

window.addEventListener("resize", function () {
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
renderer.setSize(window.innerWidth, window.innerHeight)
})