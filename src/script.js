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



const artTextureLoader = new THREE.TextureLoader()
const artcolorTexture = artTextureLoader.load('textures/picture_frame/textures/diff.png')
const artAlphaTexture = artTextureLoader.load('textures/picture_frame/textures/alpha.png');
const artAmbientOcclusionTexture = artTextureLoader.load('textures/picture_frame/textures/ao.png');
const artHeightTexture = artTextureLoader.load('textures/picture_frame/textures/arm.png');
const artNormalTexture = artTextureLoader.load('textures/picture_frame/textures/normal.png');
const artMetalnessTexture = artTextureLoader.load('textures/picture_frame/textures/metal.png');
const artRoughnessTexture = artTextureLoader.load('textures/picture_frame/textures/rough.png');




const floortextureLoader = new THREE.TextureLoader()
const floorcolorTexture = floortextureLoader.load('textures/FLOORING/Base.png')
// const floorAlphaTexture = floortextureLoader.load('textures/picture_frame/textures/alpha.png');
// const floorAmbientOcclusionTexture = floortextureLoader.load('textures/picture_frame/textures/ao.png');
const floorHeightTexture = floortextureLoader.load('textures/FLOORING/Height.png');
const floorNormalTexture = floortextureLoader.load('textures/FLOORING/Normal.png');
// const floorMetalnessTexture = floortextureLoader.load('textures/picture_frame/textures/metal.png');
const floorRoughnessTexture = floortextureLoader.load('textures/FLOORING/Roughness.png');


const rooftextureLoader = new THREE.TextureLoader()
const roofcolorTexture = rooftextureLoader.load('textures/picture_frame/textures/diff.png')
const roofAlphaTexture = rooftextureLoader.load('textures/picture_frame/textures/alpha.png');
const roofAmbientOcclusionTexture = rooftextureLoader.load('textures/picture_frame/textures/ao.png');
const roofHeightTexture = rooftextureLoader.load('textures/picture_frame/textures/arm.png');
const roofNormalTexture = rooftextureLoader.load('textures/picture_frame/textures/normal.png');
const roofMetalnessTexture = rooftextureLoader.load('textures/picture_frame/textures/metal.png');
const roofRoughnessTexture = rooftextureLoader.load('textures/picture_frame/textures/rough.png');

const walltextureLoader = new THREE.TextureLoader()
const wallcolorTexture = walltextureLoader.load('textures/joe-wood/joe-wood.jpg')
// const wallAlphaTexture = walltextureLoader.load('textures/joe-wood/pinpoint.jpg');
// const wallAmbientOcclusionTexture = walltextureLoader.load('textures/joe-wood/pinpoint.jpg');
// const wallHeightTexture = walltextureLoader.load('textures/joe-wood/pinpoint.jpg');
const wallNormalTexture = walltextureLoader.load('textures/joe-wood/wall.jpg');
const wallMetalnessTexture = walltextureLoader.load('textures/joe-wood/metal.jpg');
const wallRoughnessTexture = walltextureLoader.load('textures/joe-wood/pinpoint.jpg');


// Scene
const scene = new THREE.Scene()


const roofMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide,
    // map: roofcolorTexture,
    // aoMap: roofAmbientOcclusionTexture,
    // aoMapIntensity: 1,
    // displacementMap: roofHeightTexture,
    // displacementScale: 0.05,
    // metalnessMap: roofMetalnessTexture,
    // roughnessMap: roofRoughnessTexture,
    // normalMap: roofNormalTexture
    // material.normalScale.set(0.5, 0.5)
    // material.alphaMap = frameAlphaTexture
    // material.transparent = true 
})

const floorMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide,
    map: floorcolorTexture,
    roughnessMap: floorRoughnessTexture,
    normalMap: floorNormalTexture
})
const wallMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide,
    map: wallcolorTexture,
    // aoMap: wallMetalnessTexture,
    // aoMapIntensity: 1,
    // displacementMap: wallcolorTexture,
    // displacementScale: 0.05,
    // metalnessMap: wallMetalnessTexture,
    // roughnessMap: wallRoughnessTexture,
    normalMap: wallNormalTexture
})
const frameMaterial = new THREE.MeshBasicMaterial({
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide,
    // map: framecolorTexture,
    emissive: '#fffffff'
    // aoMap: wallMetalnessTexture,
    // aoMapIntensity: 1,
    // displacementMap: wallcolorTexture,
    // displacementScale: 0.05,
    // metalnessMap: wallMetalnessTexture,
    // roughnessMap: wallRoughnessTexture,
    // normalMap: framecolorTexture
})

const house = new THREE.Object3D();
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 14, 4), floorMaterial)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = -2

house.add(floor)

const wall1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 7), wallMaterial)
wall1.rotation.y = - Math.PI * 0.5
wall1.position.x = 7

const wall2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 7), wallMaterial)
wall2.rotation.y = - Math.PI * 0.5
wall2.position.x = - 7

const wall3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 7), wallMaterial)
wall3.position.z = - 7

const wall4 = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 7), wallMaterial)
wall4.position.z = 7

const roof = new THREE.Mesh(new THREE.PlaneBufferGeometry(14, 14), roofMaterial)
roof.rotation.x = - Math.PI * 0.5
roof.position.y = 3.5

house.add(wall1, wall2, wall3, wall4, roof)

const frameObject = new THREE.Object3D()
const photoFrame1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
photoFrame1.position.set(-3.5, 1, -6)
const photoFrame2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
photoFrame2.position.set(0, 1, -6)
const photoFrame3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
photoFrame3.position.set(3.5, 1, -6)
frameObject.add(photoFrame1, photoFrame2, photoFrame3)

const frameObject2 = new THREE.Object3D()
const f2photoFrame1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
f2photoFrame1.position.set(-3.5, 1, -6)
const f2photoFrame2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
f2photoFrame2.position.set(0, 1, -6)
const f2photoFrame3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
f2photoFrame3.position.set(3.5, 1, -6)
frameObject2.add(f2photoFrame1, f2photoFrame2, f2photoFrame3)
frameObject2.rotation.set(3,0,0)
house.add(frameObject,frameObject2)


// const w1photoFrame1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w1photoFrame1.position.set(-3.5, 1, -6)
// w1photoFrame1.rotation.set(0 , 0, 0) 
// const w1photoFrame2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w1photoFrame2.position.set(0, 1, -6)
// const w1photoFrame3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w1photoFrame3.position.set(3.5, 1, -6)
// house.add(w1photoFrame1, w1photoFrame2, w1photoFrame3)


// const w2photoFrame1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w2photoFrame1.position.set(-3.5, 1, -6)
// const w2photoFrame2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w2photoFrame2.position.set(0, 1, -6)
// const w2photoFrame3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w2photoFrame3.position.set(3.5, 1, -6)
// house.add(w2photoFrame1, w2photoFrame2, w2photoFrame3)

// const w3photoFrame1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w3photoFrame1.position.set(-3.5, 1, -6)
// const w3photoFrame2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w3photoFrame2.position.set(0, 1, -6)
// const w3photoFrame3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.5, 2), frameMaterial)
// w3photoFrame3.position.set(3.5, 1, -6)
// house.add(w3photoFrame1, w3photoFrame2, w3photoFrame3)

scene.add(house)
//light
const ambLight = new THREE.AmbientLight(0xffffff, 0.2)
const pointLight = new THREE.PointLight(0x00ff00, 1)
pointLight.position.set(0, 0, 0)
const wall2pointLight = new THREE.PointLight(0xff0000, 1)
wall2pointLight.position.set(1, 1, 1)
const wall3pointLight = new THREE.PointLight(0x0000ff, 1)
wall3pointLight.position.set(1, 1, 1)
scene.add(ambLight, pointLight, wall2pointLight, wall3pointLight)

let sensitivity = 0.02;
// document.addEventListener('keydown', event => {
//     // if (event.key == 'Shift') {
//     //     camera.position.y -= event.movementY * sensitivity / 0.10
//     //     camera.position.x -= event.movementX * sensitivity / 0.10
//     //     camera.position.z -= event.movementX * sensitivity / 0.10
//     // }
//     camera.position.y -= 1
//     // camera.position.x -= event.movementX * 0.001
//     // camera.position.z -= event.movementX * 0.001
// })

// document.addEventListener('keyup', event => {
//     // if (event.key == 'Shift') {
//     camera.position.y += 1
//     // camera.position.x = event.movementX * 0.001
//     // camera.position.z = event.movementX * 0.001
//     // }
// })

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
// const camera = new THREE.OrthographicCamera( sizes.width / - 2,  sizes.width / 2,  sizes.height / 2,  sizes.height / - 2, 1, 1000 );
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
// camera.target = new THREE.Vector3(1, 1, 1);  
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