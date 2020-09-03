import * as THREE from 'three'
import * as audio from '../audio'

import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { FlyControls } from 'drei'
import { addEffect } from 'react-three-fiber'
import create from 'zustand'

// import { Vector3 } from 'three'

let guid = 1

var isPaused = true
if (process.env.NODE_ENV === 'production') {
  isPaused = false
}

function EllipseCurve (xRadius, yRadius, scale) {
  THREE.Curve.call(this)

  this.scale = (scale === undefined) ? 5 : scale
  // add the desired properties
  this.xRadius = xRadius
  this.yRadius = yRadius
}

EllipseCurve.prototype = Object.create(THREE.Curve.prototype)
EllipseCurve.prototype.constructor = EllipseCurve

EllipseCurve.prototype.getPoint = function (t, optionalTarget) {
  var point = optionalTarget || new THREE.Vector3()

  var radians = 2 * Math.PI * t

  var x = this.xRadius * Math.cos(radians)
  var y = this.yRadius * Math.sin(radians)
  var z = 0

  return point.set(x, y, z).multiplyScalar(this.scale)
}

const [useStore, api] = create((set, get) => {
  const spline = new Curves.GrannyKnot()
  const track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)

  const ellipse = new EllipseCurve(50, 50, 1)
  const satelliteTrack = new THREE.TubeBufferGeometry(ellipse, 250, 0.2, 10, true)

  let cancelLaserTO
  let cancelExplosionTO
  const box = new THREE.Box3()
  var controls = null

  return {
    isPaused, /* Pause at start in development */
    togglePause: () => set({ isPaused: !get().isPaused }),
    getPaused: () => { return get().isPaused },
    sound: false,
    camera: undefined,
    points: 0,
    health: 100,
    lasers: [],
    explosions: [],
    rocks: randomData(100, track, 150, 8, () => 1 + Math.random() * 2.5),
    satellites: randomData(500, satelliteTrack, 150, 8, () => 1 + Math.random() * 2.5),
    enemies: randomData(10, track, 20, 15, 1),

    mutation: {
      t: 0,
      acceleration: 0,
      rotation: 0,
      postionIncrementDistance: 10,
      position: new THREE.Vector3(),
      startTime: Date.now(),

      track,
      satelliteTrack,
      scale: 15,
      fov: 70,
      hits: false,
      rings: randomRings(30, track),
      particles: randomData(1500, track, 100, 1, () => 0.5 + Math.random() * 0.8),
      looptime: 80 * 1000,
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
      mouse: new THREE.Vector2(-250, 50),

      // Re-usable objects
      dummy: new THREE.Object3D(),
      ray: new THREE.Ray(),
      box: new THREE.Box3(),

      // Test
      tPositionStatic: new THREE.Vector3(),
      tLookAt: new THREE.Vector3()
    },

    actions: {
      init (gl, camera) {
        const { mutation, actions } = get()

        set({ camera })
        mutation.clock.start()
        actions.toggleSound(get().sound)

        /*
        controls = new FlyControls(camera, gl.domElement)
        controls.movementSpeed = 1000
        controls.domElement = gl.domElement
        controls.rollSpeed = Math.PI / 24
        controls.autoForward = false
        controls.dragToLook = false
        */

        addEffect(() => {
          // https://threejs.org/examples/?q=fly#misc_controls_fly
          // https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_fly.html
          const { rocks, satellites, enemies } = get()
          const time = Date.now()
          const t = (mutation.t = ((time - mutation.startTime) % mutation.looptime) / mutation.looptime)

          var delta = mutation.clock.getDelta()
          // controls.update(delta)

          // test for wormhole/warp
          let warping = false
          if (t > 0.3 && t < 0.4) {
            if (!warping) {
              warping = true
              playAudio(audio.warp)
            }
          } else if (t > 0.5) warping = false

          // test for hits
          const r = rocks.filter(actions.test)
          const s = satellites.filter(actions.test)
          const e = enemies.filter(actions.test)
          const a = r.concat(e).concat(s)
          const previous = mutation.hits
          mutation.hits = a.length
          if (previous === 0 && mutation.hits) playAudio(audio.click)
          const lasers = get().lasers
          if (mutation.hits && lasers.length && time - lasers[lasers.length - 1] < 100) {
            const updates = a.map(data => ({ time: Date.now(), ...data }))
            set(state => ({ explosions: [...state.explosions, ...updates] }))
            clearTimeout(cancelExplosionTO)
            cancelExplosionTO = setTimeout(() => set(state => ({ explosions: state.explosions.filter(({ time }) => Date.now() - time <= 1000) })), 1000)
            set(state => ({
              points: state.points + r.length * 100 + e.length * 200,
              rocks: state.rocks.filter(rock => !r.find(r => r.guid === rock.guid)),
              satellites: state.satellites.filter(satellite => !s.find(s => s.guid === satellite.guid)),
              enemies: state.enemies.filter(enemy => !e.find(e => e.guid === enemy.guid))
            }))
          }
          if (a.some(data => data.distance < 15)) set(state => ({ health: state.health - 1 }))
        })
      },
      shoot () {
        set(state => ({ lasers: [...state.lasers, Date.now()] }))
        clearTimeout(cancelLaserTO)
        cancelLaserTO = setTimeout(() => set(state => ({ lasers: state.lasers.filter(t => Date.now() - t <= 1000) })), 1000)
        playAudio(audio.zap, 0.5)
      },
      toggleSound (sound = !get().sound) {
        set({ sound })
        playAudio(audio.engine, 1, true)
        playAudio(audio.engine2, 0.3, true)
        playAudio(audio.bg, 1, true)
      },
      updateMouse ({ clientX: x, clientY: y }) {
        // get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2)
      },
      test (data) {
        box.min.copy(data.offset)
        box.max.copy(data.offset)
        box.expandByScalar(data.size * data.scale)
        data.hit.set(10000, 10000, 10000)
        const result = get().mutation.ray.intersectBox(box, data.hit)
        data.distance = get().mutation.ray.origin.distanceTo(data.hit)
        return result
      }
    }
  }
})

function randomData (count, track, radius, size, scale) {
  return new Array(count).fill().map(() => {
    const t = Math.random()
    const pos = track.parameters.path.getPointAt(t)
    pos.multiplyScalar(15)
    const offset = pos
      .clone()
      .add(new THREE.Vector3(-radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2))
    const speed = 0.1 + Math.random()
    return { guid: guid++, scale: typeof scale === 'function' ? scale() : scale, size, offset, pos, speed, radius, t, hit: new THREE.Vector3(), distance: 1000 }
  })
}

function randomRings (count, track) {
  const temp = []
  let t = 0.4
  for (let i = 0; i < count; i++) {
    t += 0.003
    const pos = track.parameters.path.getPointAt(t)
    pos.multiplyScalar(15)
    const segments = track.tangents.length
    const pickt = t * segments
    const pick = Math.floor(pickt)
    const lookAt = track.parameters.path.getPointAt((t + 1 / track.parameters.path.getLength()) % 1).multiplyScalar(15)
    const matrix = new THREE.Matrix4().lookAt(pos, lookAt, track.binormals[pick])
    temp.push([pos.toArray(), matrix])
  }
  return temp
}

function playAudio (audio, volume = 1, loop = false) {
  if (api.getState().sound) {
    audio.currentTime = 0
    audio.volume = volume
    audio.loop = loop
    audio.play()
  } else audio.pause()
}

export default useStore
export { audio, playAudio }
