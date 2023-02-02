import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Vector3 } from 'three'
import './styles/background.css'

interface Sphere {
  velocity: THREE.Vector3
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>
}

export default function Background() {
  // initialize threejs
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    const fov = 75
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2
    const scene = new THREE.Scene()

    scene.add(new THREE.AmbientLight(0x404040))

    const spheres: Sphere[] = []

    const spawnSphere = (x: number, y: number, z: number): Sphere => {
      const starColor = (): string => {
        const c = ['#87CEEB', '#FFFFFF', '#FFFF00', '#FFA500', '#FF4500']
        return c[Math.floor(Math.random() * c.length)]
      }
      const geometry = new THREE.SphereGeometry(0.1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        emissive: starColor(),
        color: 0xffffff,
      })
      const sphere: Sphere = {
        mesh: new THREE.Mesh(geometry, material),
        velocity: new THREE.Vector3(
          Math.random() * 0.01,
          Math.random() * 0.01,
          Math.random() * 0.01
        ),
      }
      sphere.mesh.position.set(x, y, z)
      scene.add(sphere.mesh)

      return sphere
    }

    for (let i = 0; i < 500; i++) {
      spheres.push(
        spawnSphere(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        )
      )
    }

    const composer = new EffectComposer(renderer)

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1,
      0.4,
      0.5
    )
    composer.addPass(bloomPass)

    const animate = () => {
      requestAnimationFrame(animate)
      spheres.forEach(sphere => {
        sphere.mesh.position.add(sphere.velocity)
        if (sphere.mesh.position.x > 5 || sphere.mesh.position.x < -5) {
          sphere.velocity.x *= -1
        }
        if (sphere.mesh.position.y > 5 || sphere.mesh.position.y < -5) {
          sphere.velocity.y *= -1
        }
        if (sphere.mesh.position.z > 5 || sphere.mesh.position.z < -5) {
          sphere.velocity.z *= -1
        }
      })
      composer.render()
    }

    animate()
  }, [canvasRef])

  return <canvas id="c" ref={canvasRef}></canvas>
}
