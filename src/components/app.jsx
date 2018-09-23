import { css } from 'emotion'
import React, { Component, Fragment } from 'react'

import Article from './article'
import { SideScrollNav, createStore } from './side-scroll-nav'

const navStore = createStore()
const { handleWaypoint } = navStore

const contents = [
  {
    title: 'Subject One',
    id: 'subjectOne'
  },
  {
    title: 'Subject Two',
    id: 'subjectTwo'
  },
  {
    title: 'Subject Three',
    id: 'subjectThree'
  },
  {
    title: 'Subject Four',
    id: 'subjectFour'
  },
  {
    title: 'Subject Five',
    id: 'subjectFive'
  },
  {
    title: 'Subject Six',
    id: 'subjectSix'
  },
  {
    title: 'Subject Seven',
    id: 'subjectSeven'
  },
  {
    title: 'Subject Eight',
    id: 'subjectEight'
  },
  {
    title: 'Subject Nine',
    id: 'subjectNine'
  },
  {
    title: 'Subject Ten',
    id: 'subjectTen'
  }
]

export default class App extends Component {
  // state = {
  //   title: 'Start!',
  //   seconds: 0
  // }

  // componentDidMount () {
  //   window.setInterval(() => {
  //     contents[0].title =
  //       contents[0].title === 'Subject One' ? 'Subject 1' : 'Subject One'
  //     this.setState({ contents })
  //   }, 1000)
  // }

  render () {
    return (
      <Fragment>
        <SideScrollNav
          handleWaypoint={handleWaypoint}
          contents={contents}
          scrollTopOffset={-65}
          wrapperId={'side-scroll-nav'}
          containerClassName={css`
            padding: 0 calc(8.3335% + 0.4rem);
          `}
        />
        <div style={{ marginTop: 65 }} className="container">
          <div className="columns">
            <div className="column col-10 col-mx-auto">
              {contents.map(({ title, id }) => (
                <Article
                  key={title}
                  id={id}
                  title={title}
                  handleWaypoint={handleWaypoint(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
