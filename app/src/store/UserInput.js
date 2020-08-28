import { useEffect } from 'react'
import useStore from './Store'

export default function UserInput () {
  const togglePause = useStore(state => state.togglePause)
  useEffect(() => OnEscapeKey(togglePause), [togglePause])
  return null
}

function OnEscapeKey (togglePause) {
  window.document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ('key' in evt) {
      isEscape = (evt.key === 'Escape' || evt.key === 'Esc')
    } else {
      isEscape = (evt.keyCode === 27)
    }
    if (isEscape) {
      togglePause()
    }
  }
}
