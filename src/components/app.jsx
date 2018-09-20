import React, { Component, Fragment } from 'react'

import Article from './article'
import { SideScrollNav, createFactory } from './side-scroll-nav'

const navFactory = createFactory()
const { create } = navFactory

const contents = [
  {
    title: 'Subject One',
    anchor: 'subjectOne'
    // nav: create('subjectOne')
  },
  {
    title: 'Subject Two',
    anchor: 'subjectTwo'
    // nav: create('subjectTwo')
  },
  {
    title: 'Subject Three',
    anchor: 'subjectThree'
    // nav: create('subjectThree')
  },
  {
    title: 'Subject Four',
    anchor: 'subjectFour'
    // nav: create('subjectFour')
  },
  {
    title: 'Subject Five',
    anchor: 'subjectFive'
    // nav: create('subjectFive')
  },
  {
    title: 'Subject Six',
    anchor: 'subjectSix'
    // nav: create('subjectSix')
  },
  {
    title: 'Subject Seven',
    anchor: 'subjectSeven'
    // nav: create('subjectSeven')
  },
  {
    title: 'Subject Eight',
    anchor: 'subjectEight'
    // nav: create('subjectEight')
  },
  {
    title: 'Subject Nine',
    anchor: 'subjectNine'
    // nav: create('subjectNine')
  },
  {
    title: 'Subject Ten',
    anchor: 'subjectTen'
    // nav: create('subjectTen')
  }
]

export default class App extends Component {
  // state = {
  //   title: 'Start!',
  //   seconds: 0
  // }

  // componentDidMount () {
  //   window.setInterval(() => {
  //     this.setState(({ title, seconds }) => ({
  //       title: title === 'Hello' ? 'Goodbye' : 'Hello',
  //       seconds: seconds + 1
  //     }))
  //   }, 1000)
  // }

  render () {
    return (
      <Fragment>
        <SideScrollNav contents={contents} />
        <div className="container">
          <div className="columns">
            <div className="column col-10 col-mx-auto">
              {contents.map(content => (
                <Article key={content.title} {...content} />
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
