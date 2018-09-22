import { css } from 'emotion'
import React, { Component, Fragment } from 'react'

import Article from './article'
import { SideScrollNav, createFactory } from './side-scroll-nav'

const navFactory = createFactory()
const { create } = navFactory

const contents = [
  {
    title: 'Subject One',
    anchor: 'subjectOne',
    nav: create('subjectOne')
  },
  {
    title: 'Subject Two',
    anchor: 'subjectTwo',
    nav: create('subjectTwo')
  },
  {
    title: 'Subject Three',
    anchor: 'subjectThree',
    nav: create('subjectThree')
  },
  {
    title: 'Subject Four',
    anchor: 'subjectFour',
    nav: create('subjectFour')
  },
  {
    title: 'Subject Five',
    anchor: 'subjectFive',
    nav: create('subjectFive')
  },
  {
    title: 'Subject Six',
    anchor: 'subjectSix',
    nav: create('subjectSix')
  },
  {
    title: 'Subject Seven',
    anchor: 'subjectSeven',
    nav: create('subjectSeven')
  },
  {
    title: 'Subject Eight',
    anchor: 'subjectEight',
    nav: create('subjectEight')
  },
  {
    title: 'Subject Nine',
    anchor: 'subjectNine',
    nav: create('subjectNine')
  },
  {
    title: 'Subject Ten',
    anchor: 'subjectTen',
    nav: create('subjectTen')
  }
]

const foo = css`
  padding: 0 calc(8.3335% + 0.4rem);
`

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
          wrapperClassNames={foo}
          contents={contents}
          scrollTopOffset={-65}
        />
        <div style={{ marginTop: 65 }} className="container">
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
