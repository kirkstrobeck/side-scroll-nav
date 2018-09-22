import React from 'react'

import { Main } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

export function SideScrollNav ({ scrollTopOffset, ...restProps }) {
  return (
    <ElmWrapper
      src={Main}
      listeners={{
        scrollTo: value => {
          const {
            nav: { getTop }
          } = restProps.contents.find(({ anchor }) => anchor === value)
          console.log(
            'anchor',
            restProps.contents.find(({ anchor }) => anchor === value),
            getTop() + scrollTopOffset
          )
          window.scrollTo({
            top: getTop() + scrollTopOffset,
            left: 0,
            behavior: 'smooth'
          })
        }
      }}
      props={restProps}
    />
  )
}

export function createFactory () {
  let initScrollY

  // needs timeout to move to bottom of the callstack otherwise it will be zero
  setTimeout(() => {
    initScrollY = window.scrollY
  }, 0)

  return {
    create: id => {
      let initTop

      const handleWaypoint = event => {
        if (!initTop) {
          // the page might be scrolled
          // waypoints are measured based on current scroll position
          // this math resets the waypoint top to the page top
          initTop = event.waypointTop + initScrollY
        }
      }

      return {
        handleWaypoint,
        getTop: () => initTop
      }
    }
  }
}
