import React, { Component } from 'react';

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

//import images from local
import img1 from './200.jpg'
import img2 from './201.jpg'
import img3 from './202.jpg'
import img4 from './203.jpg'

const imageList = [img1, img2, img3, img4]

class Captcha extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
    this.onPick = this.onPick.bind(this)
  }

  onPick(image) {
    this.setState({image})
  }

  render() {
    return (
      <div>
        <p>Wähle alle Bilder mit KIBA.</p>
        <ImagePicker
          images={imageList.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPick}
          multiple={true}
        />
        <button type="button" onClick={() => this.props.onComplete(true)}>OK</button>
      </div>
    )
  }
}

export default Captcha;