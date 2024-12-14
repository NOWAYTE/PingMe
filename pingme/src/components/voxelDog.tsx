"use client"
import { loadGLTFModel } from '@/app/lib/model'
import { useRef, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three'

const VoxelDog = () => {
    const refContainer = useRef<HTMLDivElement | null>(null)
    const refRenderer = useRef<THREE.WebGLRenderer | null>(null)
  
    const localDogGLB = '/dog.glb'
  
    const easeOutCirc = (x: number) => {
      return Math.sqrt(1 - Math.pow(x - 1, 4))
    }
  
    useEffect(() => {
      const { current: container } = refContainer
      if (container) {
        const scW = container.clientWidth
        const scH = container.clientHeight
  
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(scW, scH)
        renderer.outputEncoding = THREE.sRGBEncoding
        container.appendChild(renderer.domElement)
        refRenderer.current = renderer
  
        const scene = new THREE.Scene()
  
        const target = new THREE.Vector3(-0.5, 1.2, 0)
        const initialCameraPosition = new THREE.Vector3(
          20 * Math.sin(0.2 * Math.PI),
          10,
          20 * Math.cos(0.2 * Math.PI)
        )
  
        const scale = scH * 0.005 + 4.8
        const camera = new THREE.OrthographicCamera(
          -scale,
          scale,
          scale,
          -scale,
          0.01,
          50000
        )
        camera.position.copy(initialCameraPosition)
        camera.lookAt(target)
  
        const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI)
        scene.add(ambientLight)
  
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.autoRotate = true
        controls.target = target
  
        loadGLTFModel(scene, localDogGLB, {
          receiveShadow: false,
          castShadow: false,
        }).then(() => {
          animate()
        })
  
        let req: number | null = null
        let frame = 0
  
        const animate = () => {
          req = requestAnimationFrame(animate)
  
          frame = frame <= 100 ? frame + 1 : frame
  
          if (frame <= 100) {
            const p = initialCameraPosition
            const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
  
            camera.position.y = 10
            camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
            camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
            camera.lookAt(target)
          } else {
            controls.update()
          }
  
          renderer.render(scene, camera)
        }
  
        return () => {
          if (req) cancelAnimationFrame(req)
          renderer.domElement.remove()
          renderer.dispose()
        }
      }
    }, [])
  
    return <div className='flex items-center justify-center'
    ref={refContainer} style={{ width: '100%', height: '100%' }} />
  }
  
export default VoxelDog
