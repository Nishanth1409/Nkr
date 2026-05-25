'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

import { MY_DESIGN_CAROUSEL_IMAGES } from '../data/my-designs-images'

type DesignsCarouselCanvasProps = {
  watermark?: string
  images?: string[]
  moreDesignsUrl?: string
}

const debounce = (func: () => void, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout> | undefined

  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, timeout)
  }
}

/** Local files from public/images/designs/ — absolute URL for TextureLoader */
const resolveAssetUrl = (path: string) => {
  if (path.startsWith('http')) return path
  return `${window.location.origin}${path.startsWith('/') ? path : `/${path}`}`
}

const VERTEX_SHADER = `
  float PI = 3.141592653589793;

  uniform vec2 uOffset;

  varying vec2 vUv;


  vec3 deformationCurve(vec3 position, vec2 uv) {
    position.x = position.x - (sin(uv.y * PI) * uOffset.x);

    return position;
  }

  void main() {
    vUv = uv;

    vec3 newPosition = deformationCurve(position, uv);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const FRAGMENT_SHADER = `
  uniform vec2 uOffset;
  uniform sampler2D uTexture;
  uniform float uAlpha;

  varying vec2 vUv;


  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    vec2 rg = texture2D(textureImage, uv).rg;
    float b = texture2D(textureImage, uv + offset).b;

    return vec3(rg, b);
  }

  void main() {
    vec3 color = rgbShift(uTexture, vUv, uOffset);
    gl_FragColor = vec4(color, uAlpha);
  }
`

export function DesignsCarouselCanvas({
  watermark = 'Designs',
  images = MY_DESIGN_CAROUSEL_IMAGES,
  moreDesignsUrl,
}: DesignsCarouselCanvasProps) {
  const watermarkWrapRef = useRef<HTMLDivElement>(null)
  const watermarkTextRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const watermarkWrap = watermarkWrapRef.current
    const watermarkText = watermarkTextRef.current
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!watermarkWrap || !watermarkText || !wrap || !canvas) return
    if (images.length < 2) return

    gsap.registerPlugin(ScrollTrigger)

    const imageUrls = images.map((path) => resolveAssetUrl(path))
    imageUrls.unshift(imageUrls[imageUrls.length - 2], imageUrls[imageUrls.length - 1])
    imageUrls.splice(imageUrls.length - 2, 2)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 1.75
    camera.position.y = 0.3
    camera.rotation.z = 2 * Math.PI * 0.01

    const textureLoader = new THREE.TextureLoader()
    const textures = imageUrls.map((url) => textureLoader.load(url))

    const geometry = new THREE.PlaneGeometry(1, 0.75, 10, 10)
    const uOffset = new THREE.Vector2(0, 0)
    const items: { mesh: THREE.Mesh; index: number }[] = []

    for (let i = 0; i < textures.length; i++) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.ShaderMaterial({
          uniforms: {
            uOffset: { value: uOffset },
            uTexture: { value: textures[i] },
            uAlpha: { value: 1.0 },
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
        })
      )
      items.push({ mesh, index: i })
      scene.add(mesh)
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const resizeCanvas = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const debouncedResize = debounce(resizeCanvas)

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: '+=500%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    })

    const tlWatermark = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: '+=500%',
        scrub: true,
      },
      defaults: { ease: 'none' },
    })

    tlWatermark.fromTo(watermarkText, { x: '20%' }, { x: '-60%' })

    const updateMeshes = () => {
      const width = 1.1
      const wholeWidth = items.length * width

      items.forEach((item) => {
        item.mesh.position.x =
          ((width * item.index - st.progress * 10 + 42069 * wholeWidth) % wholeWidth) -
          2 * width
        item.mesh.rotation.y = 2 * Math.PI * 0.03
      })
    }

    let frameId = 0
    const render = () => {
      if (st.isActive) {
        uOffset.set(st.getVelocity() * 0.00002, 0)
      } else {
        uOffset.set(0, 0)
      }

      updateMeshes()
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(render)
    }

    frameId = requestAnimationFrame(render)
    window.addEventListener('resize', debouncedResize)

    const refreshScroll = () => ScrollTrigger.refresh()
    refreshScroll()
    const refreshTimer = window.setTimeout(refreshScroll, 500)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', debouncedResize)
      window.clearTimeout(refreshTimer)
      tlWatermark.kill()
      st.kill()
      geometry.dispose()
      items.forEach(({ mesh }) => {
        if (mesh.material instanceof THREE.Material) mesh.material.dispose()
      })
      textures.forEach((t) => t.dispose())
      renderer.dispose()
      ScrollTrigger.refresh()
    }
  }, [watermark, images])

  return (
    <div className="designs-animation-root">
      <div ref={wrapRef} id="wrap" className="designs-carousel-wrap">
        <div
          ref={watermarkWrapRef}
          id="watermark-wrap"
          className="designs-watermark-wrap"
          aria-hidden
        >
          <span
            ref={watermarkTextRef}
            id="watermark-text"
            className="designs-watermark-text no-grunge"
          >
            {watermark}
          </span>
        </div>
        <canvas ref={canvasRef} id="canvas" className="designs-canvas" />
        {moreDesignsUrl ? (
          <a
            href={moreDesignsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="designs-more-cta no-grunge"
          >
            Click for more designs
          </a>
        ) : null}
      </div>
    </div>
  )
}
