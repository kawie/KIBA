import React, { Component } from 'react';

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

//import images from local
import sample from './KIBA_sample.jpg'
import img1 from './KIBA_captcha1.jpg'
import img2 from './KIBA_captcha2.jpg'
import img3 from './KIBA_captcha3.jpg'
import img4 from './KIBA_captcha4.jpg'
import img5 from './KIBA_captcha5.jpg'
import img6 from './KIBA_captcha6.jpg'
import img7 from './KIBA_captcha7.jpg'
import img8 from './KIBA_captcha8.jpg'
import img9 from './KIBA_captcha9.jpg'

const imageList = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

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
        <p>Wählen Sie alle Bilder mit KIBA aus.</p>
        <ImagePicker
          images={imageList.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPick}
          multiple={true}
        />
        <button type="button" className="captchaButton" onClick={() => this.props.onComplete(true)}>Bestätigen</button>
      </div>
    )
  }
}

export default Captcha;