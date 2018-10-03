import { css } from 'emotion'
import React, { Fragment } from 'react'

import Article from './article'
import { SideScrollNav, storeFactory } from './side-scroll-nav'

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

const navStore = storeFactory(contents)
const { handleWaypoint } = navStore

export default function App () {
  return (
    <Fragment>
      <SideScrollNav
        store={navStore}
        contents={contents}
        scrollTopOffset={-65}
        containerClassName={css`
          padding: 0 calc(8.3335% + 0.4rem);
        `}
      />
      <div style={{ marginTop: 65 }} className='container'>
        <div className='columns'>
          <div className='column col-10 col-mx-auto'>
            {contents.map(({ title, id }) => (
              <Article
                key={title}
                id={id}
                title={title}
                handleWaypoint={handleWaypoint(id)}
              />
            ))}
            <Article title='Extra content' />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
