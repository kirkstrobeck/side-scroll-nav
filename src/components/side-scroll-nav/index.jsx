import React from 'react'

import { Main } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

export const SideScrollNav = props => <ElmWrapper src={Main} props={props} />

export function createFactory () {
  return {
    create: id => {
      let init

      const handleWaypoint = foo => {
        if (!init) {
          init = foo
        }
        console.log(id, foo)
      }

      return {
        handleWaypoint,
        top: init && init.waypointTop
      }
    }
  }
}
