import * as THREE from 'three'
import * as audio from '../audio'

import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { Vector3 } from 'three'
import { addEffect } from 'react-three-fiber'
import create from 'zustand'

let guid = 1

var isPaused = true
if (process.env.NODE_ENV === 'production') {
  isPaused = false
}

const [useStore, api] = create((set, get) => {
  const spline = new Curves.GrannyKnot()
  const track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
  let cancelLaserTO
  let cancelExplosionTO
  const box = new THREE.Box3()

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
    enemies: randomData(10, track, 20, 15, 1),

    mutation: {
      t: 0,
      acceleration: 0,
      rotation: 0,
      postionIncrementDistance: 10,
      position: new THREE.Vector3(),
      startTime: Date.now(),

      track,
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
      init (camera) {
        const { mutation, actions } = get()

        set({ camera })
        mutation.clock.start()
        actions.toggleSound(get().sound)

        document.body.addEventListener('keydown', function (ev) {
          console.log('ev.keyCode', ev.keyCode)
          if (ev.keyCode === 38 || ev.keyCode === 87 || ev.keyCode === 104) { // W or Up Arrow or 8 keypad
            mutation.acceleration += 1
          } else if (ev.keyCode === 40 || ev.keyCode === 83 || ev.keyCode === 98) { // S or Down Arrow or 2 keypad
            mutation.acceleration -= 1
          } else if (ev.keyCode === 39 || ev.keyCode === 68 || ev.keyCode === 102) { // D or Right Arrow or 6 keypad
            mutation.rotation += 1
          } else if (ev.keyCode === 37 || ev.keyCode === 65 || ev.keyCode === 100) { // A or Left Arrow or 4 keypad
            mutation.rotation -= 1
          }
        }, false)

        addEffect(() => {
          const { rocks, enemies } = get()
          const time = Date.now()
          const t = (mutation.t = ((time - mutation.startTime) % mutation.looptime) / mutation.looptime)
          if (mutation.acceleration !== 0 || mutation.rotation !== 0) {
            // This should not do this... it should add to the current vector direction.
            const incrementX = mutation.postionIncrementDistance * mutation.rotation * mutation.scale
            const incrementY = 0 // mutation.postionIncrementDistance * mutation.acceleration * mutation.scale
            const incrementZ = mutation.postionIncrementDistance * -mutation.acceleration * mutation.scale
            mutation.position = mutation.position.add(new Vector3(incrementX, incrementY, incrementZ)) // track.parameters.path.getPointAt(t)
            mutation.acceleration = 0
            mutation.rotation = 0
            console.log('Adjust position', mutation.position)
          }

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
          const e = enemies.filter(actions.test)
          const a = r.concat(e)
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
        get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2)
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
