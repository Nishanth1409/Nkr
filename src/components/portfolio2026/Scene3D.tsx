'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

import { P26_DESIGNS, P26_FILM_PLATES, P26_PHOTOS } from './data'

type Scene3DProps = {
  progressRef: MutableRefObject<number>
  velocityRef: MutableRefObject<number>
  chapterIndexRef: MutableRefObject<number>
  onGrade?: (grade: {
    top: string
    mid: string
    bottom: string
    warmth: number
    night: number
  }) => void
}

/** Cinematic camera shots — Codrops “scroll as director” pattern */
const CAM_KEYS = [
  { t: 0, p: [0, 1.6, 11], l: [0, 0.4, 0] },
  { t: 0.18, p: [2.4, 2.2, 8], l: [0, 0.3, -1] },
  { t: 0.36, p: [-1.8, 1.2, 5.5], l: [0.4, 0.2, -2] },
  { t: 0.55, p: [1.2, 2.8, 4.2], l: [0, 0.5, -3] },
  { t: 0.72, p: [-2.5, 1.5, 7], l: [0, 0.8, -1] },
  { t: 1, p: [0, 1.1, 9.5], l: [0, 0.6, 0] },
] as const

const SKY_VERT = /* glsl */ `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const SKY_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vWorldPosition;
  uniform float uDay;
  uniform vec3 uSunDir;
  void main() {
    vec3 dir = normalize(vWorldPosition);
    float elev = dir.y;
    vec3 dawnZ = vec3(0.18, 0.12, 0.35);
    vec3 dawnH = vec3(1.0, 0.52, 0.28);
    vec3 dayZ = vec3(0.25, 0.50, 0.88);
    vec3 dayH = vec3(0.78, 0.90, 0.98);
    vec3 duskZ = vec3(0.10, 0.10, 0.32);
    vec3 duskH = vec3(1.0, 0.42, 0.18);
    vec3 nightZ = vec3(0.03, 0.04, 0.10);
    vec3 nightH = vec3(0.08, 0.10, 0.18);
    float d = uDay;
    vec3 zenith; vec3 horizon;
    if (d < 0.22) {
      float t = smoothstep(0.0, 1.0, d / 0.22);
      zenith = mix(dawnZ, dayZ, t); horizon = mix(dawnH, dayH, t);
    } else if (d < 0.48) {
      float t = smoothstep(0.0, 1.0, (d - 0.22) / 0.26);
      zenith = dayZ; horizon = mix(dayH, mix(dayH, duskH, 0.25), t);
    } else if (d < 0.68) {
      float t = smoothstep(0.0, 1.0, (d - 0.48) / 0.20);
      zenith = mix(dayZ, duskZ, t); horizon = mix(dayH, duskH, t);
    } else {
      float t = smoothstep(0.0, 1.0, (d - 0.68) / 0.32);
      zenith = mix(duskZ, nightZ, t); horizon = mix(duskH, nightH, t);
    }
    float h = smoothstep(-0.2, 0.7, elev);
    vec3 col = mix(horizon, zenith, h);
    float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
    float sunVis = 1.0 - smoothstep(0.52, 0.72, d);
    col += vec3(1.0, 0.75, 0.4) * pow(sunDot, 18.0) * sunVis;
    col += vec3(1.0, 0.55, 0.25) * pow(sunDot, 5.0) * 0.45 * sunVis;
    gl_FragColor = vec4(col, 1.0);
  }
`

function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(255,245,220,1)')
  g.addColorStop(0.25, 'rgba(255,200,120,0.65)')
  g.addColorStop(0.55, 'rgba(255,120,60,0.22)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function sampleCam(progress: number) {
  let i = 0
  while (i < CAM_KEYS.length - 1 && progress > CAM_KEYS[i + 1].t) i++
  const a = CAM_KEYS[i]
  const b = CAM_KEYS[Math.min(i + 1, CAM_KEYS.length - 1)]
  const span = b.t - a.t || 1
  const t = Math.min(1, Math.max(0, (progress - a.t) / span))
  const s = t * t * (3 - 2 * t)
  return {
    pos: [
      a.p[0] + (b.p[0] - a.p[0]) * s,
      a.p[1] + (b.p[1] - a.p[1]) * s,
      a.p[2] + (b.p[2] - a.p[2]) * s,
    ] as [number, number, number],
    look: [
      a.l[0] + (b.l[0] - a.l[0]) * s,
      a.l[1] + (b.l[1] - a.l[1]) * s,
      a.l[2] + (b.l[2] - a.l[2]) * s,
    ] as [number, number, number],
  }
}

const CYLINDER_IMAGES = [
  ...P26_FILM_PLATES,
  P26_PHOTOS[2].src,
  P26_PHOTOS[3].src,
  P26_DESIGNS[2].src,
  P26_PHOTOS[7].src,
]

/**
 * Mixed from CodePen / Codrops best patterns:
 * - Image cylinder atlas (scroll-rotated)
 * - Camera keyframe path (scroll as director)
 * - Velocity → particle inertia
 * - Shader sky + sun/moon film FX
 * - Uploaded media only on the cylinder / plates
 */
export default function Scene3D({
  progressRef,
  velocityRef,
  chapterIndexRef,
  onGrade,
}: Scene3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const onGradeRef = useRef(onGrade)
  onGradeRef.current = onGrade

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    )
    camera.position.set(0, 1.6, 11)

    const renderer = new THREE.WebGLRenderer({
      antialias: !reduced,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, reduced ? 1.25 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    wrap.appendChild(renderer.domElement)

    const skyUniforms = {
      uDay: { value: 0 },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    }
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(90, 64, 32),
      new THREE.ShaderMaterial({
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        uniforms: skyUniforms,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      }),
    )
    scene.add(sky)

    const hemi = new THREE.HemisphereLight(0xffe8c8, 0x1a1410, 0.55)
    scene.add(hemi)
    const sunLight = new THREE.DirectionalLight(0xfff0d0, 1.5)
    scene.add(sunLight)
    const moonLight = new THREE.PointLight(0xa8b8ff, 0, 80)
    scene.add(moonLight)

    const glowTex = makeGlowTexture()
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfff5e0 }),
    )
    const sunCorona = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.85,
      }),
    )
    sunCorona.scale.set(11, 11, 1)
    const sunGroup = new THREE.Group()
    sunGroup.add(sunCore)
    sunGroup.add(sunCorona)
    scene.add(sunGroup)

    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xffc080,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
    const rays: THREE.Mesh[] = []
    for (let i = 0; i < 5; i++) {
      const ray = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3 + i * 0.08, 26),
        rayMat.clone(),
      )
      ray.rotation.z = (i - 2) * 0.07
      sunGroup.add(ray)
      rays.push(ray)
    }

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xe8eef8,
        emissive: 0x334466,
        emissiveIntensity: 0.45,
        roughness: 0.95,
      }),
    )
    const moonGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xb0c4ff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0,
      }),
    )
    moonGlow.scale.set(3.2, 3.2, 1)
    const moonGroup = new THREE.Group()
    moonGroup.add(moon)
    moonGroup.add(moonGlow)
    scene.add(moonGroup)

    const starCount = reduced ? 250 : 700
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 55 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 0.85)
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.cos(phi)
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(48, 64),
      new THREE.MeshStandardMaterial({
        color: 0x120e0a,
        roughness: 1,
        transparent: true,
        opacity: 0.9,
      }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -3.5
    scene.add(ground)

    // ——— Codrops image cylinder ———
    const cylinderGroup = new THREE.Group()
    cylinderGroup.position.set(0, 0.35, -1.2)
    scene.add(cylinderGroup)

    const loader = new THREE.TextureLoader()
    const cellW = 512
    const cellH = 640
    const atlas = document.createElement('canvas')
    atlas.width = cellW * CYLINDER_IMAGES.length
    atlas.height = cellH
    const actx = atlas.getContext('2d')!
    actx.fillStyle = '#1a1410'
    actx.fillRect(0, 0, atlas.width, atlas.height)

    let atlasReady = 0
    const atlasTex = new THREE.CanvasTexture(atlas)
    atlasTex.colorSpace = THREE.SRGBColorSpace
    atlasTex.wrapS = THREE.ClampToEdgeWrapping
    atlasTex.wrapT = THREE.ClampToEdgeWrapping

    const cylGeo = new THREE.CylinderGeometry(
      2.35,
      2.35,
      3.1,
      64,
      1,
      true,
    )
    const cylMat = new THREE.MeshStandardMaterial({
      map: atlasTex,
      roughness: 0.75,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.97,
    })
    const cylinder = new THREE.Mesh(cylGeo, cylMat)
    cylinder.rotation.y = 0.4
    cylinderGroup.add(cylinder)

    CYLINDER_IMAGES.forEach((url, i) => {
      loader.load(
        url,
        (tex) => {
          const img = tex.image as HTMLImageElement
          if (!img || !actx) return
          const iw = img.width
          const ih = img.height
          const scale = Math.max(cellW / iw, cellH / ih)
          const dw = iw * scale
          const dh = ih * scale
          const dx = i * cellW + (cellW - dw) / 2
          const dy = (cellH - dh) / 2
          actx.drawImage(img, dx, dy, dw, dh)
          atlasTex.needsUpdate = true
          atlasReady++
          tex.dispose()
        },
        undefined,
        () => {
          atlasReady++
        },
      )
    })

    // Orbiting accent plates (few)
    const plateGeo = new THREE.PlaneGeometry(1.6, 2.05)
    const plates: THREE.Mesh[] = []
    ;[P26_PHOTOS[0].src, P26_PHOTOS[6].src, P26_DESIGNS[0].src].forEach(
      (url, i) => {
        loader.load(url, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          const mat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.9,
            transparent: true,
            opacity: 0.88,
            side: THREE.DoubleSide,
          })
          const mesh = new THREE.Mesh(plateGeo, mat)
          const a = (i / 3) * Math.PI * 2
          mesh.position.set(Math.cos(a) * 4.2, 0.3 + i * 0.2, Math.sin(a) * 4.2)
          mesh.lookAt(0, 0.3, 0)
          cylinderGroup.add(mesh)
          plates.push(mesh)
        })
      },
    )

    // Inertia orbit lines (Codrops particle arcs)
    const arcs: { mesh: THREE.Line; speed: number; radius: number; y: number }[] =
      []
    const arcMat = new THREE.LineBasicMaterial({
      color: 0xffd0a0,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    for (let i = 0; i < (reduced ? 6 : 14); i++) {
      const segs = 48
      const positions = new Float32Array((segs + 1) * 3)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mesh = new THREE.Line(geo, arcMat.clone())
      cylinderGroup.add(mesh)
      arcs.push({
        mesh,
        speed: 0.4 + Math.random() * 1.2,
        radius: 2.7 + Math.random() * 1.8,
        y: -1.2 + Math.random() * 2.6,
      })
    }

    const dustN = reduced ? 100 : 280
    const dustPos = new Float32Array(dustN * 3)
    for (let i = 0; i < dustN; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 20
      dustPos[i * 3 + 1] = Math.random() * 8 - 1
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 16
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0xffe0b0,
      size: 0.035,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    const pointer = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    let raf = 0
    let running = true
    const clock = new THREE.Clock()
    let momentum = 0
    let lastProgress = 0
    let cylAngle = 0.4
    const camPos = new THREE.Vector3()
    const camLook = new THREE.Vector3()
    const ease = (x: number) => x * x * (3 - 2 * x)

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
      const day = ease(p)
      const chapter = chapterIndexRef.current

      const vel = p - lastProgress
      lastProgress = p
      velocityRef.current = vel
      momentum = momentum * 0.9 + vel * 14

      skyUniforms.uDay.value = day

      const sunAngle = Math.PI * (0.08 + Math.min(1, day / 0.58) * 0.88)
      const sunPos = new THREE.Vector3(
        Math.cos(sunAngle) * 28,
        Math.sin(sunAngle) * 16 - 2.5,
        -18,
      )
      sunGroup.position.copy(sunPos)
      skyUniforms.uSunDir.value.copy(sunPos).normalize()
      sunLight.position.copy(sunPos)
      const sunVis = day < 0.62 ? 1 - Math.max(0, (day - 0.5) / 0.12) : 0
      sunCore.visible = sunVis > 0.02
      ;(sunCorona.material as THREE.SpriteMaterial).opacity = 0.8 * sunVis
      sunLight.intensity = 0.35 + sunVis * 1.45
      rays.forEach((ray, i) => {
        ;(ray.material as THREE.MeshBasicMaterial).opacity =
          0.045 * sunVis * (1 - i * 0.08)
        ray.lookAt(0, -2, 4)
      })

      const moonT = Math.max(0, (day - 0.52) / 0.48)
      const moonAngle = Math.PI * (0.12 + moonT * 0.78)
      moonGroup.position.set(
        -Math.cos(moonAngle) * 24,
        Math.sin(moonAngle) * 14 - 1,
        -20,
      )
      const moonVis = Math.min(1, moonT * 2.4)
      moonGlow.material.opacity = 0.55 * moonVis
      moonLight.intensity = moonVis * 2.1
      moonLight.position.copy(moonGroup.position)
      starMat.opacity = Math.max(0, (day - 0.55) * 2.4)

      const warmth = Math.max(0, 1 - Math.abs(day - 0.35) * 2.2)
      const night = Math.min(1, Math.max(0, (day - 0.58) * 2.5))
      onGradeRef.current?.({
        top:
          day < 0.25
            ? '#1a1438'
            : day < 0.5
              ? '#2a5080'
              : day < 0.7
                ? '#1a1838'
                : '#060810',
        mid:
          day < 0.25
            ? '#ff7a40'
            : day < 0.5
              ? '#6aa0c8'
              : day < 0.7
                ? '#d45830'
                : '#121828',
        bottom:
          day < 0.25
            ? '#ffc878'
            : day < 0.5
              ? '#c8d8e8'
              : day < 0.7
                ? '#4a2030'
                : '#0a0c14',
        warmth,
        night,
      })

      // Camera director path + mouse parallax
      const shot = sampleCam(p)
      camPos.set(
        shot.pos[0] + pointer.x * 0.45,
        shot.pos[1] + pointer.y * -0.25,
        shot.pos[2],
      )
      camLook.set(
        shot.look[0] + pointer.x * 0.3,
        shot.look[1] + pointer.y * -0.15,
        shot.look[2],
      )
      camera.position.lerp(camPos, 0.08)
      camera.lookAt(camLook)
      camera.fov = 40 + Math.sin(p * Math.PI) * 5 + Math.abs(momentum) * 8
      camera.updateProjectionMatrix()
      camera.rotation.z = pointer.x * 0.02 + momentum * 0.15

      // Cylinder scroll rotation + inertia spin
      cylAngle += 0.012 + Math.abs(momentum) * 0.35 + p * 0.00001
      const targetRot = p * Math.PI * 3.2 + cylAngle * 0.15
      cylinder.rotation.y += (targetRot - cylinder.rotation.y) * 0.08
      cylinderGroup.rotation.y = momentum * 0.4
      cylinderGroup.position.y = 0.35 + Math.sin(t * 0.4) * 0.06

      plates.forEach((mesh, i) => {
        const base = (i / Math.max(1, plates.length)) * Math.PI * 2 + t * 0.08
        const r = 4.1 + Math.sin(t * 0.3 + i) * 0.15
        mesh.position.x = Math.cos(base + cylinder.rotation.y * 0.3) * r
        mesh.position.z = Math.sin(base + cylinder.rotation.y * 0.3) * r
        mesh.position.y = 0.25 + Math.sin(t * 0.5 + i) * 0.12
        mesh.lookAt(camera.position)
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.opacity = i === chapter % 3 ? 0.95 : 0.55
      })

      // Arc inertia opacity
      const speed = Math.min(1, Math.abs(momentum) * 2.2)
      arcs.forEach((arc, i) => {
        const mat = arc.mesh.material as THREE.LineBasicMaterial
        mat.opacity += (speed * 0.55 - mat.opacity) * 0.12
        const pos = arc.mesh.geometry.attributes.position as THREE.BufferAttribute
        const arr = pos.array as Float32Array
        const segs = arr.length / 3 - 1
        const baseAngle = t * arc.speed * 0.2 + i + cylinder.rotation.y
        for (let j = 0; j <= segs; j++) {
          const u = j / segs
          const ang = baseAngle + u * 1.4
          arr[j * 3] = Math.cos(ang) * arc.radius
          arr[j * 3 + 1] = arc.y
          arr[j * 3 + 2] = Math.sin(ang) * arc.radius
        }
        pos.needsUpdate = true
      })

      dust.rotation.y = t * 0.02 + momentum
      dustMat.opacity = 0.15 + sunVis * 0.2 + speed * 0.15
      hemi.intensity = 0.35 + sunVis * 0.35
      ground.position.z = camera.position.z - 16

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      cylGeo.dispose()
      cylMat.map?.dispose()
      cylMat.dispose()
      plateGeo.dispose()
      plates.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial
        mat.map?.dispose()
        mat.dispose()
      })
      arcs.forEach((a) => {
        a.mesh.geometry.dispose()
        ;(a.mesh.material as THREE.Material).dispose()
      })
      sky.geometry.dispose()
      ;(sky.material as THREE.Material).dispose()
      ground.geometry.dispose()
      ;(ground.material as THREE.Material).dispose()
      starGeo.dispose()
      starMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      glowTex.dispose()
      sunCore.geometry.dispose()
      ;(sunCore.material as THREE.Material).dispose()
      moon.geometry.dispose()
      ;(moon.material as THREE.Material).dispose()
      rays.forEach((r) => {
        r.geometry.dispose()
        ;(r.material as THREE.Material).dispose()
      })
      atlasTex.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement)
      }
    }
  }, [progressRef, velocityRef, chapterIndexRef])

  return <div ref={wrapRef} className="p26-canvas-wrap" aria-hidden />
}
