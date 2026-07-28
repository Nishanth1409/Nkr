'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

type Scene3DProps = {
  progressRef: MutableRefObject<number>
  chapterIndexRef: MutableRefObject<number>
}

const CHAPTER_PALETTES = [
  ['#1a1612', '#c4a574', '#7a9a78'], // launch
  ['#12140f', '#8a9e6e', '#c4a574'], // roots
  ['#141218', '#d97a4a', '#c4a574'], // craft
  ['#0e1218', '#6a8fa8', '#c4a574'], // work
  ['#161210', '#c4a574', '#e8d5b5'], // success
  ['#0c0c0e', '#f3eee6', '#7a9a78'], // connect
]

function makePosterTexture(label: string, colors: string[], index: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, 1024, 640)
  g.addColorStop(0, colors[0])
  g.addColorStop(0.55, colors[1])
  g.addColorStop(1, colors[2])
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1024, 640)

  // Soft vignette + grid for “film still” feel
  ctx.fillStyle = 'rgba(0,0,0,0.28)'
  ctx.fillRect(0, 0, 1024, 640)
  ctx.strokeStyle = 'rgba(243,238,230,0.12)'
  ctx.lineWidth = 1
  for (let x = 64; x < 1024; x += 64) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 640)
    ctx.stroke()
  }
  for (let y = 64; y < 640; y += 64) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(1024, y)
    ctx.stroke()
  }

  ctx.fillStyle = 'rgba(243,238,230,0.92)'
  ctx.font = '600 42px system-ui, sans-serif'
  ctx.fillText('NKR · 2026', 72, 120)
  ctx.font = '400 28px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(243,238,230,0.7)'
  ctx.fillText(label.toUpperCase(), 72, 170)
  ctx.font = '500 22px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(196,165,116,0.95)'
  ctx.fillText('PLACEHOLDER → SWAP TO VIDEO', 72, 560)
  ctx.fillText(`FRAME 0${index + 1}`, 72, 595)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

export default function Scene3D({ progressRef, chapterIndexRef }: Scene3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x070708, 0.035)

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0.2, 8)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x070708, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    wrap.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xf3eee6, 1.1)
    key.position.set(4, 6, 8)
    scene.add(key)
    const rim = new THREE.PointLight(0xc4a574, 2.2, 40)
    rim.position.set(-6, 2, -4)
    scene.add(rim)

    // Particle field
    const count = reduced ? 400 : 1600
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 8
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xc4a574,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    // Floating media planes (placeholder stills → video later)
    const labels = ['Launch', 'Craft', 'Work', 'Success', 'Roots', 'Connect']
    const planes: THREE.Mesh[] = []
    const planeGeo = new THREE.PlaneGeometry(3.2, 2, 1, 1)

    for (let i = 0; i < 6; i++) {
      const colors = CHAPTER_PALETTES[i % CHAPTER_PALETTES.length]
      const tex = makePosterTexture(labels[i], colors, i)
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.85,
        metalness: 0.05,
        transparent: true,
        opacity: 0.92,
      })
      const mesh = new THREE.Mesh(planeGeo, mat)
      const angle = (i / 6) * Math.PI * 2
      mesh.position.set(
        Math.cos(angle) * 4.2,
        Math.sin(angle * 1.3) * 1.4,
        -i * 3.2 - 2,
      )
      mesh.rotation.y = -angle * 0.35
      mesh.rotation.x = -0.08
      scene.add(mesh)
      planes.push(mesh)
    }

    // Soft ground ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.5, 5.2, 64),
      new THREE.MeshBasicMaterial({
        color: 0xc4a574,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      }),
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = -2.2
    scene.add(ring)

    let raf = 0
    let running = true
    const clock = new THREE.Clock()

    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const tick = () => {
      if (!running) return
      const t = clock.getElapsedTime()
      const p = progressRef.current
      const chapter = chapterIndexRef.current

      // Camera dolly through depth as user scrolls
      camera.position.z = 8 - p * 18
      camera.position.y = 0.2 + Math.sin(p * Math.PI) * 0.35
      camera.position.x = Math.sin(p * Math.PI * 2) * 0.55
      camera.lookAt(0, 0, camera.position.z - 6)

      points.rotation.y = t * 0.02 + p * 0.8
      points.rotation.x = Math.sin(t * 0.1) * 0.05
      pMat.opacity = 0.35 + Math.sin(p * Math.PI) * 0.25

      planes.forEach((mesh, i) => {
        const target = i === chapter % planes.length ? 1 : 0.45
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.opacity += (target - mat.opacity) * 0.08
        mesh.rotation.y += 0.0015
        mesh.position.y += Math.sin(t * 0.6 + i) * 0.0008
        // Parallax pull toward camera on active chapter
        const zBase = -i * 3.2 - 2
        const zTarget = zBase + (i === chapter % planes.length ? 1.2 : 0)
        mesh.position.z += (zTarget - mesh.position.z) * 0.06
      })

      rim.intensity = 1.6 + Math.sin(t + chapter) * 0.6
      ring.rotation.z = t * 0.05 + p

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      planes.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial
        mat.map?.dispose()
        mat.dispose()
      })
      planeGeo.dispose()
      pGeo.dispose()
      pMat.dispose()
      ring.geometry.dispose()
      ;(ring.material as THREE.Material).dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement)
      }
    }
  }, [progressRef, chapterIndexRef])

  return <div ref={wrapRef} className="p26-canvas-wrap" aria-hidden />
}
