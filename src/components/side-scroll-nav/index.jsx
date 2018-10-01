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

  let blockNavUntil
  const blockNavTimeout = id => {
    blockNavUntil = true
    window.setTimeout(() => {
      blockNavUntil = id
      scrollNav(id, true)
    }, 0)
  }

  function navSelector (selector) {
    return document.querySelector(`#${props.wrapperId} ${selector}`)
  }

  function scrollNav (id, force) {
    if (blockNavUntil === id || typeof blockNavUntil === 'undefined' || force) {
      if (!force) {
        blockNavUntil = undefined
      }

      scrollToWithDefaults({
        element: navSelector(`.${containerClassName}[data-scroller]`),
        left:
          navSelector(`[data-id="${id}"]`).offsetLeft -
          navSelector(`[data-id]`).offsetLeft
      })
    }
  }

  function scrollContent (id) {
    scrollToWithDefaults({
      top: document.querySelector(`#${id}`).offsetTop + scrollTopOffset
    })
  }

  function scrollTo (id) {
    blockNavTimeout(id)
    scrollNav(id)
    scrollContent(id)
  }

  props.store.setScrollEventCallback(scrollNav)

  return <ElmWrapper src={Main} listeners={{ scrollTo }} props={props} />
}

// store factory

export function storeFactory (contentsInit) {
  const contents = contentsInit.map((element, index) => {
    return {
      ...element,
      index
    }
  })
  let position = [...contents]
  let scrollEventCallback

  function handleWaypoint (id) {
    return function eventHandler (event) {
      const item = contents.find(element => id === element.id)
      const positionIndex = position.findIndex(element => id === element.id)

      if (positionIndex === -1 && event.currentPosition === 'inside') {
        position.push(item)
      } else if (
        positionIndex !== -1 &&
        (event.currentPosition === 'below' || event.currentPosition === 'above')
      ) {
        position.splice(positionIndex, 1)
      }

      if (position.length) {
        position.sort((a, b) => a.index - b.index)
      } else {
        // position.push(contents[contents.length - 1])
      }

      if (position.length && scrollEventCallback) {
        scrollEventCallback(position[0].id)
      }
    }
  }

  return {
    handleWaypoint,
    setScrollEventCallback: func => {
      scrollEventCallback = func
    }
  }
}
