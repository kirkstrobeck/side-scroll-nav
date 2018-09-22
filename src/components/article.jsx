import React, { Fragment } from 'react'
import Waypoint from 'react-waypoint'

export default ({ id, title, nav }) => (
  <Fragment>
    <Waypoint onPositionChange={nav.handleWaypoint} />
    <div id={id}>
      <h1>{title}</h1>
      <div style={{ height: 300, background: 'red', margin: '20px 0' }} />
      <h2>Parturient Fringilla Consectetur Vulputate</h2>
      <p>
        Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non
        mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit sit amet non magna. Donec ullamcorper nulla non metus auctor
        fringilla. Donec ullamcorper nulla non metus auctor fringilla. Maecenas
        faucibus mollis interdum. Fusce dapibus, tellus ac cursus commodo,
        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
      </p>
      <h2>Vulputate Lorem Tortor</h2>
      <p>
        Donec id elit non mi porta gravida at eget metus. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus
        mollis interdum. Cras mattis consectetur purus sit amet fermentum.
      </p>
      <h2>Pellentesque Vestibulum Ridiculus Dapibus</h2>
      <p>
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta
        sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius
        blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet
        rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor
        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam
        id dolor id nibh ultricies vehicula ut id elit.
      </p>
      <h2>Pellentesque Condimentum</h2>
      <p>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula
        porta felis euismod semper. Donec sed odio dui.
      </p>
    </div>
  </Fragment>
)
