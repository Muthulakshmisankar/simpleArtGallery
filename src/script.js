import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')
var keyboard = ""
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

const floorMaterial = new THREE.MeshBasicMaterial({
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

const gallery = new THREE.TextureLoader()
const galleryTexture = gallery.load('gallery/1.jpg')
const frameMaterial = new THREE.MeshBasicMaterial({
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide,
    map: galleryTexture,
    emissive: '#fffffff',
    // envMap: galleryTexture
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
frameObject2.rotation.set(3, 0, 0)
frameObject2.position.set(0, 1, 0)
house.add(frameObject, frameObject2)


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
wall2pointLight.position.set(1, -1, 1)
const wall3pointLight = new THREE.PointLight(0x0000ff, 1)
wall3pointLight.position.set(1, 1, 1)
scene.add(ambLight, pointLight, wall2pointLight, wall3pointLight)
/**
 * BOX3
 */

const box = new THREE.Box3();

const cameramesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial()
);
cameramesh.position.set(0, 0, 0)
scene.add(cameramesh)

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
// camera.target = house.position
// const cameraTarget = new THREE.Vector3(0, 0, 0);
// const cameraController = new THREE.Object3D()
// cameraController.copy(camera)
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
 * Animation
 */

function move() {
    //var delta = clock.getDelta(); // seconds.
    //var moveDistance = 30 * delta; // 200 pixels per second
    //var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

    for (var i = 0; i < 4; i++) {
        if (detectCollisionCubes(wall1, cameramesh)) {
            // moveLeft = 0;
            console.log('Hitt wall1')
            updateCamera('left')
        }
        else if (detectCollisionCubes(wall2, cameramesh)) {
            // moveRight = 0;
            console.log('Hitt wall2')
            updateCamera('right')

        }

        if (detectCollisionCubes(wall3, cameramesh)) {
            // moveUp = 0;
            console.log('Hitt wall3')
            updateCamera('top')
        }
        else if (detectCollisionCubes(wall4, cameramesh)) {
            // moveDown = 0;
            console.log('Hitt wall4')
            updateCamera('bottom')
        }
    }

    // if (keyboard.pressed("A") && moveLeft == 1)
    // wall1.position.x -= 0.5;
    // else if (keyboard.pressed("A") && moveLeft == 0) {
    //     moveLeft = 1
    // }
    // if (keyboard.pressed("D") && moveRight == 1) wall1.position.x += 0.5;
    // else if (keyboard.pressed("D") && moveRight == 0) {
    //     moveRight = 1
    // }
    // if (keyboard.pressed("W") && moveUp == 1) wall1.position.y += 0.5;
    // else if (keyboard.pressed("W") && moveUp == 0) {
    //     moveUp = 1
    // }
    // if (keyboard.pressed("S") && moveDown == 1) wall1.position.y -= 0.5;
    // else if (keyboard.pressed("S") && moveDown == 0) {
    //     moveDown = 1
    // }
}

function updateCamera(direction) {
    if (direction == 'right') {
        camera.position.x += 0.5;
        // 
    } else if (direction == 'left') {
        camera.position.x -= 0.5;
    } else if (direction == 'top') {
        camera.position.y += 0.5;
    } else if (direction == 'bottom') {
        camera.position.y -= 0.5;
    }
    renderer.render(scene, camera)
}

function detectCollisionCubes(object1, object2) {
    object1.geometry.computeBoundingBox();
    object2.geometry.computeBoundingBox();
    object1.updateMatrixWorld();
    object2.updateMatrixWorld();
    let box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);
    let box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);

    return box1.intersectsBox(box2);
}
function leftreUpdateCamera() {
    const viewPos = camera.position
    camera.position.set(0, 0, 0)
    cameramesh.position.set(0, 0, 0)
    renderer.render(scene, camera)
}

function rightreUpdateCamera() {
    const viewPos = camera.position
    // camera.position.x = viewPos.z + 10
    camera.position.set(0, 0, 0)
    cameramesh.position.set(0, 0, 0)
    renderer.render(scene, camera)
}
function topreUpdateCamera() {
    const viewPos = camera.position
    // camera.position.y = viewPos.y - 10
    camera.position.set(0, 0, 0)
    cameramesh.position.set(0, 0, 0)
    renderer.render(scene, camera)
}
function bottomreUpdateCamera() {
    const viewPos = camera.position
    // camera.position.y = viewPos.z + 10
    camera.position.set(0, 0, 0)
    cameramesh.position.set(0, 0, 0)
    renderer.render(scene, camera)
}

// function animate() {
//     requestAnimationFrame(animate);

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    move()
    // cameraController.position.copy(house.position);
    // if(cameraController.position.y == ){

    // }
    // cameraTarget.copy(house.position)
    // cameraTarget.z += 6;
    // camera.lookAt(cameraTarget)   
    // Render

    const viewPos = camera.position
    cameramesh.position.x = viewPos.x
    cameramesh.position.y = viewPos.y
    cameramesh.position.z = viewPos.z
    // cameramesh.position.set(viewPos)
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}




tick()