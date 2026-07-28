'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

import { P26_FILM_PLATES } from './data'

type Scene3DProps = {
  progressRef: MutableRefObject<number>
  chapterIndexRef: MutableRefObject<number>
  onGrade?: (grade: {
    top: string
    mid: string
    bottom: string
    warmth: number
    night: number
  }) => void
}

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
    vec3 zenith;
    vec3 horizon;
    if (d < 0.22) {
      float t = smoothstep(0.0, 1.0, d / 0.22);
      zenith = mix(dawnZ, dayZ, t);
      horizon = mix(dawnH, dayH, t);
    } else if (d < 0.48) {
      float t = smoothstep(0.0, 1.0, (d - 0.22) / 0.26);
      zenith = mix(dayZ, dayZ, t);
      horizon = mix(dayH, mix(dayH, duskH, 0.25), t);
    } else if (d < 0.68) {
      float t = smoothstep(0.0, 1.0, (d - 0.48) / 0.20);
      zenith = mix(dayZ, duskZ, t);
      horizon = mix(dayH, duskH, t);
    } else {
      float t = smoothstep(0.0, 1.0, (d - 0.68) / 0.32);
      zenith = mix(duskZ, nightZ, t);
      horizon = mix(duskH, nightH, t);
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
  g.addColorStop(0.2, 'rgba(255,200,120,0.7)')
  g.addColorStop(0.5, 'rgba(255,120,60,0.25)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeStarTexture() {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(220,230,255,0.5)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/**
 * Film-like 3D FX world — shader sky, sun/moon arcs, god rays,
 * cinematic camera, uploaded stills as set plates (not wallpaper clutter).
 */
export default function Scene3D({
  progressRef,
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
    camera.position.set(0, 1.4, 9)

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

    // ——— Shader sky dome ———
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

    // ——— Lights ———
    const hemi = new THREE.HemisphereLight(0xffe8c8, 0x1a1410, 0.55)
    scene.add(hemi)
    const sunLight = new THREE.DirectionalLight(0xfff0d0, 1.6)
    scene.add(sunLight)
    const moonLight = new THREE.PointLight(0xa8b8ff, 0, 80)
    scene.add(moonLight)
    const rim = new THREE.PointLight(0xff8844, 0.4, 40)
    rim.position.set(-4, 2, 2)
    scene.add(rim)

    // ——— Sun + corona ———
    const glowTex = makeGlowTexture()
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfff5e0 }),
    )
    const sunCorona = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.9,
      }),
    )
    sunCorona.scale.set(10, 10, 1)
    const sunGroup = new THREE.Group()
    sunGroup.add(sunCore)
    sunGroup.add(sunCorona)
    scene.add(sunGroup)

    // God-ray shafts (additive planes)
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xffc080,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
    const rays: THREE.Mesh[] = []
    for (let i = 0; i < 5; i++) {
      const ray = new THREE.Mesh(
        new THREE.PlaneGeometry(0.35 + i * 0.1, 28),
        rayMat.clone(),
      )
      ray.rotation.z = (i - 2) * 0.08
      sunGroup.add(ray)
      rays.push(ray)
    }

    // ——— Moon ———
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xe8eef8,
        emissive: 0x334466,
        emissiveIntensity: 0.45,
        roughness: 0.95,
        metalness: 0,
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
    moonGlow.scale.set(3.5, 3.5, 1)
    const moonGroup = new THREE.Group()
    moonGroup.add(moon)
    moonGroup.add(moonGlow)
    scene.add(moonGroup)

    // ——— Stars ———
    const starCount = reduced ? 300 : 900
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
      map: makeStarTexture(),
      size: 0.55,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ——— Ground / horizon silhouette ———
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(60, 64),
      new THREE.MeshStandardMaterial({
        color: 0x0c0a08,
        roughness: 1,
        metalness: 0,
      }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2.6
    scene.add(ground)

    // Soft mist band
    const mist = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 18),
      new THREE.MeshBasicMaterial({
        color: 0xffb070,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    )
    mist.position.set(0, -1.2, -8)
    mist.rotation.x = 0.15
    scene.add(mist)

    // Floating pollen / ash
    const dustN = reduced ? 120 : 320
    const dustPos = new Float32Array(dustN * 3)
    for (let i = 0; i < dustN; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 24
      dustPos[i * 3 + 1] = Math.random() * 10 - 1
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0xffe0b0,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // ——— Film plates (uploaded stills as set pieces) ———
    const loader = new THREE.TextureLoader()
    const plateGeo = new THREE.PlaneGeometry(3.6, 2.25, 1, 1)
    const plates: {
      mesh: THREE.Mesh
      base: THREE.Vector3
      rotY: number
    }[] = []

    P26_FILM_PLATES.forEach((url, i) => {
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.minFilter = THREE.LinearFilter
          const mat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.88,
            metalness: 0.02,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
          })
          const mesh = new THREE.Mesh(plateGeo, mat)
          const side = i % 2 === 0 ? -1 : 1
          const base = new THREE.Vector3(
            side * (3.2 + (i % 3) * 0.35),
            0.2 + (i % 2) * 0.4,
            -2 - i * 3.5,
          )
          mesh.position.copy(base)
          const rotY = side * -0.45
          mesh.rotation.y = rotY
          scene.add(mesh)
          plates.push({ mesh, base, rotY })
        },
        undefined,
        () => {},
      )
    })

    // Mouse parallax (subtle)
    const pointer = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    let raf = 0
    let running = true
    const clock = new THREE.Clock()
    const look = new THREE.Vector3()
    const camTarget = new THREE.Vector3()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const ease = (x: number) => x * x * (3 - 2 * x)

    const tick = () => {
      if (!running) return
      const t = clock.getElapsedTime()
      const p = progressRef.current
      const chapter = chapterIndexRef.current
      const day = ease(p)

      skyUniforms.uDay.value = day

      // Sun arc across sky
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
      ;(sunCorona.material as THREE.SpriteMaterial).opacity = 0.75 * sunVis
      sunLight.intensity = 0.35 + sunVis * 1.5
      sunLight.color.setRGB(1, 0.92 - day * 0.2, 0.78 - day * 0.25)
      rays.forEach((ray, i) => {
        ;(ray.material as THREE.MeshBasicMaterial).opacity =
          0.04 * sunVis * (1 - i * 0.08)
        ray.lookAt(0, -2, 4)
      })
      mist.material.opacity = 0.04 + sunVis * 0.1
      mist.material.color.setRGB(1, 0.65 + sunVis * 0.1, 0.35)

      // Moon rise as day ends
      const moonT = Math.max(0, (day - 0.52) / 0.48)
      const moonAngle = Math.PI * (0.12 + moonT * 0.78)
      moonGroup.position.set(
        -Math.cos(moonAngle) * 24,
        Math.sin(moonAngle) * 14 - 1,
        -20,
      )
      const moonVis = Math.min(1, moonT * 2.4)
      moonGlow.material.opacity = 0.55 * moonVis
      moonLight.intensity = moonVis * 2.2
      moonLight.position.copy(moonGroup.position)
      starMat.opacity = Math.max(0, (day - 0.55) * 2.4)
      stars.rotation.y = t * 0.008

      // Atmosphere grade callback for CSS overlays
      const warmth = Math.max(0, 1 - Math.abs(day - 0.35) * 2.2)
      const night = Math.max(0, (day - 0.58) * 2.5)
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
              ? '#d8e8f0'
              : day < 0.7
                ? '#4a2030'
                : '#0a0c14',
        warmth,
        night: Math.min(1, night),
      })

      // Cinematic camera path (dolly + crane + FOV breathe)
      const dolly = 9.5 - day * 5.5
      const crane = 1.35 + Math.sin(day * Math.PI) * 0.85 + day * 0.3
      const drift = Math.sin(day * Math.PI * 1.2) * 1.1
      camTarget.set(
        drift + pointer.x * 0.35,
        crane + pointer.y * -0.2,
        dolly,
      )
      camera.position.lerp(camTarget, 0.06)
      camera.fov = 40 + Math.sin(day * Math.PI) * 4
      camera.updateProjectionMatrix()
      look.set(pointer.x * 0.6, 0.2 + pointer.y * -0.15, -6 - day * 8)
      camera.lookAt(look)
      camera.rotation.z = Math.sin(day * Math.PI) * 0.02 + pointer.x * 0.01

      hemi.intensity = 0.35 + sunVis * 0.35
      rim.intensity = 0.2 + sunVis * 0.55
      dust.rotation.y = t * 0.02
      dustMat.opacity = 0.15 + sunVis * 0.25

      // Plates: bring the chapter-matched plate into focus
      plates.forEach((item, i) => {
        const mat = item.mesh.material as THREE.MeshStandardMaterial
        const focus = i === chapter % Math.max(1, plates.length)
        const want = focus ? 0.95 : 0.18
        mat.opacity += (want - mat.opacity) * 0.05
        const pull = focus ? 1.6 : 0
        const targetZ = item.base.z + pull + day * -1.2
        item.mesh.position.z += (targetZ - item.mesh.position.z) * 0.05
        item.mesh.position.y =
          item.base.y + Math.sin(t * 0.4 + i) * 0.08
        item.mesh.rotation.y = item.rotY + Math.sin(t * 0.15 + i) * 0.03
        item.mesh.scale.setScalar(focus ? 1.08 : 0.92)
      })

      ground.position.z = camera.position.z - 18
      mist.position.z = camera.position.z - 10

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      plates.forEach(({ mesh }) => {
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.map?.dispose()
        mat.dispose()
      })
      plateGeo.dispose()
      sky.geometry.dispose()
      ;(sky.material as THREE.Material).dispose()
      ground.geometry.dispose()
      ;(ground.material as THREE.Material).dispose()
      mist.geometry.dispose()
      ;(mist.material as THREE.Material).dispose()
      starGeo.dispose()
      starMat.map?.dispose()
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
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement)
      }
    }
  }, [progressRef, chapterIndexRef])

  return <div ref={wrapRef} className="p26-canvas-wrap" aria-hidden />
}
