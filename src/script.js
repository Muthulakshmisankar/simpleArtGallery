import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**scene */
const scene = new THREE.Scene( )
// scene.background = null
/**
 * GlTF loader
 */
const url = 'DamagedHelmet/glTF/DamagedHelmet.gltf'
const url1 = 'the-great-drawing-room/source/src/model.obj'
const url2 = ''
const loader = new GLTFLoader();
loader.load(url2, ((gltf) => {
    // gltf.scene.scale.set(300, 300, 300);
    // gltf.scene.position.set(220, 10, 400)
    // scene.add(gltf.scene.children[0]);
console.log(gltf)
    // camera.position.z = 7
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

}), undefined, ((err) => { console.log(err) }))

const objloader = new OBJLoader();

// load a resource
objloader.load(
	// resource URL
	 url1,
	// called when resource is loaded
	function ( object ) {
        console.log(object)
        let mesh = object.children[0]
        mesh.position.y = -2
		scene.add(mesh  );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //  alpha: true,
    //  antialias: true 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
//  scene.add(ambientLight)
 const ambientLight2 = new THREE.AmbientLight(0x2a622a, 0.8)
//  scene.add(ambientLight2)
 const directionalLight = new THREE.DirectionalLight(0xff0000, 0.5)
 directionalLight.castShadow = true
 directionalLight.shadow.mapSize.set(1024, 1024)
 directionalLight.shadow.camera.far = 15
 directionalLight.shadow.camera.left = - 7
 directionalLight.shadow.camera.top = 7
 directionalLight.shadow.camera.right = 7
 directionalLight.shadow.camera.bottom = - 7
 directionalLight.position.set(- 5, 5, 0)
//  scene.add(directionalLight)

const pointLight = new THREE.PointLight(0xCC7722,0.4)
// pointLight.position.set(4,4,4)
const pointLight2 = new THREE.PointLight(0xff0000,0.3)
pointLight2.position.set(-6,-6,0)
const pointLight3 = new THREE.PointLight(0xFFD800,0.4)
pointLight3.position.set(-4,-4,0)

const floorLight = new THREE.PointLight(0xff0000,0.4)
floorLight.position.set(0,0,0)
const floorLight1 = new THREE.PointLight(0xffffff,0.4)
floorLight1.position.set(-4,0,0)
const floorLight2 = new THREE.PointLight(0xffffff,0.4)
floorLight.position.set(4,0,0)
const floorLight3 = new THREE.PointLight(0xffffff,0.4)
floorLight3.position.set(8,0,0)
const greenLight = new THREE.PointLight(0x37a52e,0.4)
// greenLight.position.set(4,-4,0)
scene.add(pointLight ,pointLight2 , pointLight3 , floorLight , floorLight2)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}




tick()