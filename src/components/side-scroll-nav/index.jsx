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

export class SideScrollNav extends Component {
  componentDidMount () {
    window.setTimeout(() => {
      this.scrollLeftBase = document.querySelector(
        `[data-anchor="${this.props.contents[0].anchor}"]`
      ).offsetLeft
    }, 0)
  }

  render () {
    const { contents, scrollTopOffset, scrollClassName } = this.props
    return (
      <ElmWrapper
        src={Main}
        listeners={{
          scrollTo: value => {
            const {
              anchor,
              nav: { getTop }
            } = contents.find(({ anchor }) => anchor === value)

            scrollToWithDefaults({ top: getTop() + scrollTopOffset })

            scrollToWithDefaults({
              element: document.querySelector(`.${scrollClassName}`),
              left:
                document.querySelector(`[data-anchor="${anchor}"]`).offsetLeft -
                this.scrollLeftBase
            })
          }
        }}
        props={this.props}
      />
    )
  }
}

export function createFactory () {
  let initScrollY

  // timeout needed to move to callstack bottom otherwise it will be zero
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

        if (event.currentPosition === 'inside') {
          console.log(id, 'is current')
        }
      }

      return {
        handleWaypoint,
        getTop: () => initTop
      }
    }
  }
}
