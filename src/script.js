import './style.css'
import * as THREE from 'three'
// import * as THREEx from 'threex';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
/**
 * Base
 */

 var moveRight = 1;
 var moveLeft = 1;
 var moveUp = 1;
 var moveDown = 1;
// Canvas
const canvas = document.querySelector('canvas.webgl')
var HouseMesh ;
/**scene */
const scene = new THREE.Scene()
const masBlocks = []
// scene.background = null

// const keyboard = new THREEx.KeyboardState();
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
    function (object) {
        console.log(object)
        let mesh = object.children[0]
        mesh.name = 'goldenhouse'
        mesh.position.y = -2
        
        scene.add(mesh);
        HouseMesh = scene.getObjectByName('goldenhouse');
    },
    // called when loading is in progresses
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

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
controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
}
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

const pointLight = new THREE.PointLight(0xCC7722, 0.4)
// pointLight.position.set(4,4,4)
const pointLight2 = new THREE.PointLight(0xff0000, 0.3)
pointLight2.position.set(-6, -6, 0)
const pointLight3 = new THREE.PointLight(0xFFD800, 0.4)
pointLight3.position.set(-4, -4, 0)

const floorLight = new THREE.PointLight(0xff0000, 0.4)
floorLight.position.set(0, 0, 0)
const floorLight1 = new THREE.PointLight(0xffffff, 0.4)
floorLight1.position.set(-4, 0, 0)
const floorLight2 = new THREE.PointLight(0xffffff, 0.4)
floorLight.position.set(4, 0, 0)
const floorLight3 = new THREE.PointLight(0xffffff, 0.4)
floorLight3.position.set(8, 0, 0)
const greenLight = new THREE.PointLight(0x37a52e, 0.4)
// greenLight.position.set(4,-4,0)
scene.add(pointLight, pointLight2, pointLight3, floorLight, floorLight2)

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1), new THREE.MeshBasicMaterial())
cube.position.set(0,0,0);
scene.add(cube)

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

const setupKeyControls = () => {
   
    
    document.onkeydown = (e) => {
      
        switch (e.key) {
            case "a":
                HouseMesh.position.x += 0.1;
                break;
            case "w":
                HouseMesh.position.z -= 0.1;
                break;
            case "s":
                HouseMesh.position.x -= 0.1;
                break;
            case "d":
                HouseMesh.position.z += 0.1;
                break;
        }
    };
}
setupKeyControls()

tick()
move()

function move() {
    //var delta = clock.getDelta(); // seconds.
    //var moveDistance = 30 * delta; // 200 pixels per second
    //var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
  const masBlocks =[];
    // for (var i = 0; i < masBlocks.length; i++) {
      if (detectCollisionCubes(cube, HouseMesh)) {
        moveLeft = 0;
        console.log('left')
      }
      else if (detectCollisionCubes(cube, HouseMesh)) {
        moveRight = 0;
        console.log('Right')
      }
      if (detectCollisionCubes(cube, HouseMesh)) {
        moveUp = 0;
        console.log('up')
      }
      else if (detectCollisionCubes(cube, HouseMesh)) {
        moveDown = 0;
        console.log('down')
      }
    // }
        
    if ( keyboard.pressed("A") && moveLeft == 1) player.position.x -= 0.5;
    else if (keyboard.pressed("A") && moveLeft == 0) {
      moveLeft = 1
    }
    if ( keyboard.pressed("D") && moveRight == 1) player.position.x += 0.5;
    else if (keyboard.pressed("D") && moveRight == 0) {
      moveRight = 1
    }
    if ( keyboard.pressed("W") && moveUp == 1) player.position.y += 0.5;
    else if (keyboard.pressed("W") && moveUp == 0) {
      moveUp = 1
    }
    if ( keyboard.pressed("S") && moveDown == 1) player.position.y -= 0.5;
    else if (keyboard.pressed("S") && moveDown == 0) {
      moveDown = 1
    }
    
    
   
  }
function detectCollisionCubes(object1, object2){
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