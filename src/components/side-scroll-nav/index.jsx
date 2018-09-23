import React, { Component } from 'react'

import { Main } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

function scrollToWithDefaults ({ element = window, top = 0, left = 0 }) {
  element.scrollTo({
    top,
    left,
    behavior: 'smooth'
  })
}

export function SideScrollNav (props) {
  const { scrollTopOffset, containerClassName } = props

  const navSelector = selector =>
    document.querySelector(`#${props.wrapperId} ${selector}`)

  return (
    <ElmWrapper
      src={Main}
      listeners={{
        scrollTo: id => {
          // scroll content
          scrollToWithDefaults({
            top: document.querySelector(`#${id}`).offsetTop + scrollTopOffset
          })

          const left =
            navSelector(`[data-id="${id}"]`).offsetLeft -
            navSelector(`[data-id]`).offsetLeft

          // scroll nav
          scrollToWithDefaults({
            element: navSelector(`.${containerClassName}[data-scroller]`),
            left
          })
        }
      }}
      props={props}
    />
  )
}

export function createStore () {
  function handleWaypoint (id) {
    return function eventHandler (event) {
      // console.log(id, 123, event)
    }
  }

  return {
    handleWaypoint
  }
}

// let initScrollY

// // timeout needed to move to callstack bottom otherwise it will be zero
// setTimeout(() => {
//   initScrollY = window.scrollY
// }, 0)

// // register according to page flow
// let lastRegisteredPosition

// return {
//   create: id => {
//     let initTop

//     const handleWaypoint = event => {
//       if (!initTop) {
//         // 1) the page might be scrolled
//         // waypoints are measured based on current scroll position
//         // this math resets the waypoint top to the page top
//         // 2) if elements grow/shrink, these wont be accurate
//         initTop = event.waypointTop + initScrollY

//         console.log(lastRegisteredPosition, event.currentPosition)

//         if (
//           lastRegisteredPosition === 'above' &&
//           event.currentPosition === 'below'
//         ) {
//           console.log('zzz', id, 'is current')
//         }
//       }

//       console.log(event)
//       if (event.currentPosition === 'inside') {
//         console.log(id, 'is current')
//       }

//       lastRegisteredPosition = event.currentPosition
//     }

//     return {
//       handleWaypoint,
//       getTop: () => initTop
//     }
//   }
// }
