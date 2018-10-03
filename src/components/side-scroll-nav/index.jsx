import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { ElmComponent } from './component.elm'
import { ElmStoreFactory } from './store-factory.elm'
import ElmWrapper from '../helpers/elm-wrapper'

const ports = ElmStoreFactory.worker().ports

ports.render.subscribe(console.log)

ports.increment.send(1)
ports.increment.send(54)
ports.increment.send(1)

// (node, this.props.flags);

// 		if (typeof this.props.ports !== 'undefined') {
// 			this.props.ports(app.ports);
// 		}

// component

function scrollToWithDefaults ({ element = window, top = 0, left = 0 }) {
  element.scrollTo({
    top,
    left,
    behavior: 'smooth'
  })
}

export class SideScrollNav extends Component {
  static propTypes = {
    containerClassName: PropTypes.string.isRequired,
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

  static defaultProps = {
    containerClassName: '',
    scrollTopOffset: 0,
    wrapperId: 'side-scroll-nav'
  }

  state = {
    active: ''
  }

  componentDidMount () {
    this.props.store.setScrollEventCallback(this.scrollNav)
  }

  navSelector = selector => {
    return document.querySelector(`#${this.props.wrapperId} ${selector}`)
  }

  scrollNav = (id, force) => {
    const { containerClassName } = this.props
    const { blockNavUntil } = this.state

    if (blockNavUntil === id || typeof blockNavUntil === 'undefined' || force) {
      if (!force) {
        this.setState({ blockNavUntil: undefined })
      }

      this.setState({ active: id })

      scrollToWithDefaults({
        element: this.navSelector(
          `${containerClassName ? `.${containerClassName}` : ``}[data-scroller]`
        ),
        left:
          this.navSelector(`[data-id="${id}"]`).offsetLeft -
          this.navSelector(`[data-id]`).offsetLeft
      })
    }
  }

  scrollContent = id => {
    const { scrollTopOffset } = this.props

    scrollToWithDefaults({
      top: document.querySelector(`#${id}`).offsetTop + scrollTopOffset
    })
  }

  blockNavTimeout = id => {
    this.setState({ blockNavUntil: '' })
    window.setTimeout(() => {
      this.setState({ blockNavUntil: id })
      this.scrollNav(id, true)
    }, 0)
  }

  scrollTo = id => {
    this.blockNavTimeout(id)
    this.scrollNav(id)
    this.scrollContent(id)
  }

  render () {
    const { active } = this.state

    return (
      <ElmWrapper
        src={ElmComponent}
        listeners={{ scrollTo: this.scrollTo }}
        props={{ ...this.props, active }}
      />
    )
  }
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
