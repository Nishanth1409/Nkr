'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

import { P26_SCENE_IMAGES, P26_SKY_STOPS } from './data'

type Scene3DProps = {
  progressRef: MutableRefObject<number>
  chapterIndexRef: MutableRefObject<number>
  onSkyChange?: (sky: {
    top: string
    mid: string
    bottom: string
    glow: string
  }) => void
}

function lerpHex(a: number, b: number, t: number) {
  const ar = (a >> 16) & 255
  const ag = (a >> 8) & 255
  const ab = a & 255
  const br = (b >> 16) & 255
  const bg = (b >> 8) & 255
  const bb = b & 255
  return (
    (Math.round(ar + (br - ar) * t) << 16) |
    (Math.round(ag + (bg - ag) * t) << 8) |
    Math.round(ab + (bb - ab) * t)
  )
}

function sampleSky(progress: number) {
  const stops = P26_SKY_STOPS
  let i = 0
  while (i < stops.length - 1 && progress > stops[i + 1].t) i++
  const a = stops[i]
  const b = stops[Math.min(i + 1, stops.length - 1)]
  const span = b.t - a.t || 1
  const t = Math.min(1, Math.max(0, (progress - a.t) / span))
  const mix = (c1: string, c2: string) => {
    const x = new THREE.Color(c1)
    const y = new THREE.Color(c2)
    return `#${x.lerp(y, t).getHexString()}`
  }
  return {
    top: mix(a.top, b.top),
    mid: mix(a.mid, b.mid),
    bottom: mix(a.bottom, b.bottom),
    glow: a.glow,
    fog: lerpHex(a.fog, b.fog, t),
  }
}

/**
 * Calm cinematic field — soft atmosphere + ONE focal uploaded image.
 * No poster grids, no clutter of floating frames.
 */
export default function Scene3D({
  progressRef,
  chapterIndexRef,
  onSkyChange,
}: Scene3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const onSkyRef = useRef(onSkyChange)
  onSkyRef.current = onSkyChange

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0.4, 7)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    wrap.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.65)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xffe8c8, 0.85)
    key.position.set(3, 5, 4)
    scene.add(key)

    // Soft dust — few particles only
    const dustCount = reduced ? 80 : 220
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 16
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0xc8b090,
      size: 0.025,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // Single focal plane — crossfade between uploaded images
    const loader = new THREE.TextureLoader()
    const planeGeo = new THREE.PlaneGeometry(4.2, 2.6, 1, 1)
    const planes: THREE.Mesh[] = []

    P26_SCENE_IMAGES.forEach((url, i) => {
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.minFilter = THREE.LinearFilter
          const mat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.95,
            metalness: 0,
            transparent: true,
            opacity: i === 0 ? 0.92 : 0,
            depthWrite: false,
          })
          const mesh = new THREE.Mesh(planeGeo, mat)
          mesh.position.set(0.15, 0.15, -1.2)
          mesh.rotation.y = -0.08
          mesh.rotation.x = -0.04
          scene.add(mesh)
          planes[i] = mesh
        },
        undefined,
        () => {
          /* skip missing upload */
        },
      )
    })

    let raf = 0
    let running = true
    const clock = new THREE.Clock()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const tick = () => {
      if (!running) return
      const t = clock.getElapsedTime()
      const p = progressRef.current
      const chapter = chapterIndexRef.current
      const sky = sampleSky(p)

      scene.fog = new THREE.FogExp2(sky.fog, 0.045)
      onSkyRef.current?.({
        top: sky.top,
        mid: sky.mid,
        bottom: sky.bottom,
        glow: sky.glow,
      })

      // Gentle camera drift — smooth, not jittery
      camera.position.z = 7 - p * 2.2
      camera.position.y = 0.4 + Math.sin(p * Math.PI) * 0.12
      camera.position.x = Math.sin(p * Math.PI) * 0.2
      camera.lookAt(0, 0.1, -2)

      dust.rotation.y = t * 0.015
      dustMat.opacity = 0.18 + Math.sin(p * Math.PI) * 0.1

      // Crossfade one image per chapter
      const target = Math.min(planes.length - 1, chapter % Math.max(1, P26_SCENE_IMAGES.length))
      planes.forEach((mesh, i) => {
        if (!mesh) return
        const mat = mesh.material as THREE.MeshStandardMaterial
        const want = i === target ? 0.9 : 0
        mat.opacity += (want - mat.opacity) * 0.045
        mesh.position.y = 0.15 + Math.sin(t * 0.35 + i) * 0.04
        mesh.rotation.y = -0.08 + Math.sin(t * 0.2) * 0.02
      })

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      planes.forEach((mesh) => {
        if (!mesh) return
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.map?.dispose()
        mat.dispose()
      })
      planeGeo.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement)
      }
    }
  }, [progressRef, chapterIndexRef])

  return <div ref={wrapRef} className="p26-canvas-wrap" aria-hidden />
}
