'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

import { P26_DESIGNS, P26_PHOTOS, P26_SKY_STOPS } from './data'

type Scene3DProps = {
  progressRef: MutableRefObject<number>
  chapterIndexRef: MutableRefObject<number>
  onSkyChange?: (sky: {
    top: string
    mid: string
    bottom: string
    glow: string
    label: string
  }) => void
}

function lerpHex(a: number, b: number, t: number) {
  const ar = (a >> 16) & 255
  const ag = (a >> 8) & 255
  const ab = a & 255
  const br = (b >> 16) & 255
  const bg = (b >> 8) & 255
  const bb = b & 255
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return (r << 16) | (g << 8) | bl
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
    glow: a.glow, // soft blend via opacity elsewhere
    label: t < 0.5 ? a.label : b.label,
    fog: lerpHex(a.fog, b.fog, t),
  }
}

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

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    )
    camera.position.set(0, 1.2, 10)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    wrap.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    scene.add(ambient)
    const sunLight = new THREE.DirectionalLight(0xffe0b0, 1.4)
    sunLight.position.set(4, 8, 2)
    scene.add(sunLight)
    const moonLight = new THREE.PointLight(0xb8c8ff, 0, 60)
    moonLight.position.set(-6, 4, -8)
    scene.add(moonLight)

    // ——— Sun ———
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xfff0c8,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      }),
    )
    scene.add(sun)
    const sunGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff9a4a,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      }),
    )
    sun.add(sunGlow)

    // ——— Moon ———
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xe8eef8,
        roughness: 0.9,
        metalness: 0.05,
        emissive: 0x334466,
        emissiveIntensity: 0.35,
      }),
    )
    scene.add(moon)

    // ——— Horizon ground ———
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(28, 64),
      new THREE.MeshStandardMaterial({
        color: 0x1a1410,
        roughness: 1,
        metalness: 0,
      }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2.4
    scene.add(ground)

    // Soft mist ring
    const mist = new THREE.Mesh(
      new THREE.RingGeometry(6, 18, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffc080,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    )
    mist.rotation.x = -Math.PI / 2
    mist.position.y = -2.35
    scene.add(mist)

    // ——— Stars ———
    const starCount = reduced ? 200 : 900
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80
      starPos[i * 3 + 1] = Math.random() * 40 + 2
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ——— Floating dust / pollen ———
    const dustCount = reduced ? 150 : 500
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 20
      dustPos[i * 3 + 1] = Math.random() * 8 - 1
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 24
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0xffe0b0,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // ——— Photo / design planes ———
    const loader = new THREE.TextureLoader()
    const planeGeo = new THREE.PlaneGeometry(2.6, 3.4, 1, 1)
    const designGeo = new THREE.PlaneGeometry(2.8, 2.0, 1, 1)
    const mediaMeshes: {
      mesh: THREE.Mesh
      baseZ: number
      baseY: number
      baseX: number
      kind: 'photo' | 'design'
    }[] = []

    const photoUrls = P26_PHOTOS.map((p) => p.src)
    const designUrls = P26_DESIGNS.slice(0, 6).map((d) => d.src)

    const loadPlane = (
      url: string,
      geo: THREE.BufferGeometry,
      x: number,
      y: number,
      z: number,
      rotY: number,
      kind: 'photo' | 'design',
    ) => {
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.minFilter = THREE.LinearFilter
          const mat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.92,
            metalness: 0.02,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide,
          })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(x, y, z)
          mesh.rotation.y = rotY
          scene.add(mesh)
          mediaMeshes.push({
            mesh,
            baseZ: z,
            baseY: y,
            baseX: x,
            kind,
          })
        },
        undefined,
        () => {
          /* skip broken asset */
        },
      )
    }

    photoUrls.forEach((url, i) => {
      const angle = (i / photoUrls.length) * Math.PI * 2
      const radius = 5.5 + (i % 3) * 0.6
      loadPlane(
        url,
        planeGeo,
        Math.cos(angle) * radius,
        -0.2 + Math.sin(i * 1.7) * 0.9,
        -4 - i * 2.1,
        -angle * 0.4,
        'photo',
      )
    })

    designUrls.forEach((url, i) => {
      const side = i % 2 === 0 ? 1 : -1
      loadPlane(
        url,
        designGeo,
        side * (3.8 + (i % 3) * 0.4),
        0.6 + (i % 4) * 0.25,
        -6 - i * 2.4,
        side * -0.35,
        'design',
      )
    })

    let raf = 0
    let running = true
    const clock = new THREE.Clock()
    let lastSkyLabel = ''

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
      const sky = sampleSky(p)

      scene.fog = new THREE.FogExp2(sky.fog, 0.028 + p * 0.01)
      if (sky.label !== lastSkyLabel) {
        lastSkyLabel = sky.label
      }
      onSkyRef.current?.({
        top: sky.top,
        mid: sky.mid,
        bottom: sky.bottom,
        glow: sky.glow,
        label: sky.label,
      })

      // Camera dolly — fly through the day
      camera.position.z = 10 - p * 22
      camera.position.y = 1.2 + Math.sin(p * Math.PI) * 0.55
      camera.position.x = Math.sin(p * Math.PI * 1.5) * 0.85
      camera.lookAt(0, 0.3, camera.position.z - 8)

      // Sun arc (visible early → mid)
      const sunT = Math.min(1, p / 0.55)
      const sunAngle = Math.PI * (0.05 + sunT * 0.9)
      sun.position.set(
        Math.cos(sunAngle) * 12,
        Math.sin(sunAngle) * 7 - 1.5,
        -6 - p * 8,
      )
      const sunVis = p < 0.58 ? 1 - Math.max(0, (p - 0.45) / 0.13) : 0
      ;(sun.material as THREE.MeshBasicMaterial).opacity = sunVis
      ;(sun.material as THREE.MeshBasicMaterial).transparent = true
      sunGlow.material.opacity = 0.18 * sunVis
      sunLight.intensity = 0.4 + sunVis * 1.2
      sunLight.position.copy(sun.position)

      // Moon arc (late)
      const moonT = Math.max(0, (p - 0.52) / 0.48)
      const moonAngle = Math.PI * (0.15 + moonT * 0.75)
      moon.position.set(
        -Math.cos(moonAngle) * 10,
        Math.sin(moonAngle) * 6 - 0.5,
        -10 - moonT * 6,
      )
      const moonVis = Math.min(1, moonT * 2.2)
      moon.scale.setScalar(0.7 + moonVis * 0.4)
      moonLight.intensity = moonVis * 2.4
      moonLight.position.copy(moon.position)

      starMat.opacity = Math.max(0, (p - 0.5) * 2.2)
      stars.rotation.y = t * 0.01 + p * 0.2

      dust.rotation.y = t * 0.03
      dustMat.opacity = 0.15 + (1 - Math.abs(p - 0.25)) * 0.25
      mist.material.opacity = 0.04 + sunVis * 0.08
      mist.rotation.z = t * 0.02

      // Media parallax / chapter focus
      mediaMeshes.forEach((item, i) => {
        const mesh = item.mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        const focus = i % 7 === chapter % 7 ? 1 : 0.55
        mat.opacity += (focus * 0.95 - mat.opacity) * 0.06
        mesh.position.y =
          item.baseY + Math.sin(t * 0.55 + i) * 0.12
        mesh.rotation.z = Math.sin(t * 0.2 + i) * 0.03
        const pull = i === chapter % Math.max(1, mediaMeshes.length) ? 1.4 : 0
        mesh.position.z += (item.baseZ + pull - mesh.position.z) * 0.05
      })

      ground.position.z = camera.position.z - 14
      mist.position.z = camera.position.z - 12

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mediaMeshes.forEach(({ mesh }) => {
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.map?.dispose()
        mat.dispose()
      })
      planeGeo.dispose()
      designGeo.dispose()
      starGeo.dispose()
      starMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      sun.geometry.dispose()
      ;(sun.material as THREE.Material).dispose()
      moon.geometry.dispose()
      ;(moon.material as THREE.Material).dispose()
      ground.geometry.dispose()
      ;(ground.material as THREE.Material).dispose()
      mist.geometry.dispose()
      ;(mist.material as THREE.Material).dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement)
      }
    }
  }, [progressRef, chapterIndexRef])

  return <div ref={wrapRef} className="p26-canvas-wrap" aria-hidden />
}
