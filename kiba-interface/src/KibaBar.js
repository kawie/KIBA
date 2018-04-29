import React from 'react';

class KibaBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var barStyle = {
      flex: '1',
      height: this.props.ki + '%',
      backgroundColor: '#EEB44B',
      borderRadius: '0 0 20px 20px'
    };

    var glassStyle = {
      height: '400px',
      width: '50px',
      float: 'left',
      border: '3px #EEB44B solid',
      display: 'flex',
      alignItems: 'flex-end',
      borderRadius: '0 0 25px 25px',
      marginRight: '25px'
    }

    return (
      <div className="kiba-glass" style={glassStyle}>
        <div className="kiba-bar" style={barStyle} />
      </div>
    );
  }
}

export default KibaBar;