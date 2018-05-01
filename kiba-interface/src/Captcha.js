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
      image: null,
      captchaOpen: false
    }
    this.onPick = this.onPick.bind(this)
  }

  onPick(image) {
    this.setState({image})
  }

  onConfirm(onComplete) {
    onComplete(true);
  }

  toggleCaptcha() {
    this.setState({
      captchaOpen: !this.state.captchaOpen
    })
  }

  render() {
    return (
      <div>
        <div style={{width: '360px', margin: '50px auto'}}>
          <label>
            <input type="checkbox" onClick={ () => this.toggleCaptcha()} /> Ich bin kein Roboter
            <span class="checkmark"></span>
          </label>
        </div>

        {this.state.captchaOpen &&
          <div className="captchaBox">
            <p style={{ fontSize: '.8em'}}>Wähle alle Bilder mit <b>KIBA</b> aus.</p>
            <ImagePicker
              images={imageList.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPick}
              multiple={true}
            />
            <button type="button" className="captchaButton" onClick={() => this.onConfirm(this.props.onComplete)}>Bestätigen</button>
          </div>
        }
      </div>
    )
  }
}

export default Captcha;