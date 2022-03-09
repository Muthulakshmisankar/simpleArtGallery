import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * textures
 */

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load(['/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png'])

const textureLoader = new THREE.TextureLoader()
const framecolorTexture = textureLoader.load('textures/picture_frame/textures/diff.png')
const frameAlphaTexture = textureLoader.load('textures/picture_frame/textures/alpha.png');
const frameAmbientOcclusionTexture = textureLoader.load('textures/picture_frame/textures/ao.png');
const frameHeightTexture = textureLoader.load('textures/picture_frame/textures/arm.png');
const frameNormalTexture = textureLoader.load('textures/picture_frame/textures/normal.png');
const frameMetalnessTexture = textureLoader.load('textures/picture_frame/textures/metal.png');
const frameRoughnessTexture = textureLoader.load('textures/picture_frame/textures/rough.png');
// const matCaptTexture = textureLoader.load('textures/picture_frame/textures/diff.png')
// const gradientTexture = textureLoader.load('textures/picture_frame/textures/diff.png')

// Scene
const scene = new THREE.Scene()
scene.background = environmentMapTexture;
scene.environment = environmentMapTexture;

const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 0.6
material.map = framecolorTexture
material.aoMap = frameAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = frameHeightTexture
material.displacementScale = 0.05
material.metalnessMap = frameMetalnessTexture
material.roughnessMap = frameRoughnessTexture
material.normalMap = frameNormalTexture
material.normalScale.set(0.5, 0.5)
// material.alphaMap = frameAlphaTexture
// material.transparent = true 


// box.position.z = -80
// box.position.y = -10
// for (let i = 0; i < 5; i++) {
const box = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 0.2, 5),
    material
)
box.position.z = -80
box.position.y = -10

const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 0.2, 5),
    material
)
box2.position.z = -80
box2.position.y = -10
box2.position.x = 60

const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 0.2, 5),
    material
)
box3.position.z = -70
box3.position.y = -10
box3.position.x = -60

const box4 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 0.2, 5),
    material
)
box4.position.z = -80
box4.position.y = -10
box4.position.x = -10

scene.add(box, box2, box3);
// }



//light
const ambLight = new THREE.AmbientLight(0xffffff, 0.2)
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(ambLight, pointLight)

let sensitivity = 0.02;
document.addEventListener('keydown', event => {
    // if (event.key == 'Shift') {
    //     camera.position.y -= event.movementY * sensitivity / 0.10
    //     camera.position.x -= event.movementX * sensitivity / 0.10
    //     camera.position.z -= event.movementX * sensitivity / 0.10
    // }
    camera.position.y -= 1
    // camera.position.x -= event.movementX * 0.001
    // camera.position.z -= event.movementX * 0.001
})

document.addEventListener('keyup', event => {
    // if (event.key == 'Shift') {
    camera.position.y += 1
    // camera.position.x = event.movementX * 0.001
    // camera.position.z = event.movementX * 0.001
    // }
})

// const loader = new GLTFLoader();
// loader.load(this.url, ((gltf) => {
//     // gltf.scene.scale.set(300, 300, 300);
//     // gltf.scene.position.set(220, 10, 400)
//     scene.add(gltf.scene);

//     // camera.position.z = 7
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// }), undefined, ((err) => { console.log(err) }))



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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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