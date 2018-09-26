import PropTypes from 'prop-types'
import React from 'react'

import { Main } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

// component

SideScrollNav.propTypes = {
  containerClassName: PropTypes.string,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  scrollTopOffset: PropTypes.number,
  store: PropTypes.object.isRequired,
  wrapperId: PropTypes.string
}

SideScrollNav.defaultProps = {
  scrollTopOffset: 0,
  wrapperId: 'side-scroll-nav'
}

function scrollToWithDefaults ({ element = window, top = 0, left = 0 }) {
  element.scrollTo({
    top,
    left,
    behavior: 'smooth'
  })
}

export function SideScrollNav (props) {
  const { scrollTopOffset, containerClassName } = props

  function navSelector (selector) {
    return document.querySelector(`#${props.wrapperId} ${selector}`)
  }

  function scrollTo (id) {
    // scroll content
    scrollToWithDefaults({
      top: document.querySelector(`#${id}`).offsetTop + scrollTopOffset
    })

    // scroll nav
    scrollToWithDefaults({
      element: navSelector(`.${containerClassName}[data-scroller]`),
      left:
        navSelector(`[data-id="${id}"]`).offsetLeft -
        navSelector(`[data-id]`).offsetLeft
    })
  }

  return <ElmWrapper src={Main} listeners={{ scrollTo }} props={props} />
}

// store factory

export function storeFactory () {
  let active = 3

  function handleWaypoint (id) {
    return function eventHandler (event) {
      // console.log(id, 123, event)
    }
  }

  return {
    handleWaypoint,
    getActive: () => active
  }
}
