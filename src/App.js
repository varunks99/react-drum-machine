import React from 'react';
import './App.css';


const drumPads = [{
  id: 'Heater-1',
  key: 'Q',
  code: 81,
  color: 'red',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  id: 'Heater-2',
  key: 'W',
  code: 87,
  color: 'yellow',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  id: 'Heater-3',
  key: 'E',
  code: 69,
  color: 'blue',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  id: 'Heater-4',
  key: 'A',
  code: 65,
  color: '#2299ef',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  id: 'Open-HH',
  key: 'S',
  code: 83,
  color: '#45F20D',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  id: 'Kick-n\'-Hat',
  key: 'D',
  code: 68,
  color: '#BA0DF2',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  id: 'Kick',
  key: 'Z',
  code: 90,
  color: '#da70d6',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  id: 'Claps',
  key: 'X',
  code: 88,
  color: 'orange',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  id: 'Closed-HH',
  key: 'C',
  code: 67,
  color: 'cyan',
  audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}]


class DrumMachine extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        display: 'Let\'s hit the beat!',
        partyMode: false
      }
      this.setDisplay = this.setDisplay.bind(this)
      this.toggleMode = this.toggleMode.bind(this)
      this.setShadow = this.setShadow.bind(this)
      this.mainBackground = this.mainBackground.bind(this)
    }

    componentDidMount() {
      this.setState({
        display: 'Welcome to Drum Machine!'
      })
      document.getElementById('display').style.fontSize = '16px'

      setTimeout(() => {
        this.setState({
          display: 'Let\'s hit the beat!'
        })
        document.getElementById('display').style.fontSize = '25px'
      }, 3000)
    }

    setDisplay(name, state, color) {
      this.setState({
        display: name
      })

      if (this.state.partyMode) {
        document.getElementById('display').style.color = color
      } else {
        document.getElementById('display').style.color = 'red'
      }

      if (!this.state.partyMode) {
        setTimeout(() => document.getElementById('display').style.color = 'white', 200)
      }

    }

    toggleMode() {
      if (this.state.partyMode) {
        document.getElementById('circle').style.float = "left"
        document.getElementById('party-button').style.background = "black"
        document.getElementById('display').style.border = `0.4px solid red`
        document.getElementById('display').style.color = 'white'

        this.setState({
          display: 'Party\'s over!',
          partyMode: false
        })

        setTimeout(() => this.setState({
          display: ''
        }), 2000)

      } else {
        document.getElementById('circle').style.float = "right"
        document.getElementById('party-button').style.background = "blue"

        this.mainBackground()

        this.setState({
          display: 'It\'s party time!',
          partyMode: true,
          shadow: 'white'
        })

        setTimeout(() => this.setState({
          display: ''
        }), 2000)
      }
    }

    mainBackground() {
      document.getElementById('drum-machine').animate([{
        backgroundColor: 'red',
        opacity: 0.9
      }, {
        backgroundColor: 'yellow',
        opacity: 0.9
      }, {
        backgroundColor: 'blue',
        opacity: 0.9
      }, {
        backgroundColor: '#45F20D',
        opacity: 0.9
      }], {
        duration: 700
      });
    }

    setShadow() {
      if (this.state.partyMode) {
        for (var i = 0; i < drumPads.length; i++) {
          document.getElementById(drumPads[i].id).style.boxShadow = `1px 1px 2px 2px ${drumPads[i].color}`

        }
      } else {
        var x = document.getElementsByClassName("drum-pad")

        for (var i = 0; i < x.length; i++) {
          x[i].style.boxShadow = `1px 1px 2px 2px red`
        }
      }
    }

    render() {
      const drumCase = drumPads.map((drum, i, drumPad) => {
          return ( <
            DrumPad keys = {
              drumPad[i].key
            }
            id = {
              drumPad[i].id
            }
            url = {
              drumPad[i].audio
            }
            code = {
              drumPad[i].code
            }
            color = {
              drumPad[i].color
            }
            partyMode = {
              this.state.partyMode
            }
            setDisplay = {
              this.setDisplay
            }
            toggleMode = {
              this.toggleMode
            }
            /> )
          }); this.setShadow()

        return ( < div id = "main" > <
          div id = "drum-machine" >
          <
          div id = "drum-case" > {
            drumCase
          } <
          /div> <
          div id = "controls" >
          <
          div id = "display" > {
            this.state.display
          } < /div> <
          div id = "party-mode" >
          Party Mode <
          div id = "party-button"
          onClick = {
            this.toggleMode
          }
          title = "Press 'P' on your keyboard" >
          <
          div id = "circle" > < /div> < /
          div > <
          /div> < /
          div > <
          /div></div >
        )
      }
    }

    class DrumPad extends React.Component {
      constructor(props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.playAudio = this.playAudio.bind(this)
        this.changeBackground = this.changeBackground.bind(this)
        this.animateBackground = this.animateBackground.bind(this)
      }

      componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress)
      }

      componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress)
      }

      handleKeyPress(event) {
        if ((event.keyCode || event.which) === this.props.code) {
          this.playAudio()
        }

        if (event.keyCode === 80) {
          this.props.toggleMode()
        }
      }

      playAudio() {
        var clip = document.getElementById(this.props.keys)
        clip.play()
        this.props.setDisplay(this.props.id.replace(/-/g, ' '), this.props.partyMode, this.props.color)
        this.changeBackground()
        if (this.props.partyMode) {
          this.animateBackground()
        }
      }

      changeBackground() {
        if (this.props.partyMode) {
          document.getElementById(this.props.id).style.background = this.props.color

          document.getElementById(this.props.id).style.boxShadow = `1px 1px 2px 2px ${this.props.color}`

          setTimeout(() => document.getElementById(this.props.id).style.background = 'black', 100)
        } else {
          document.getElementById(this.props.id).style.background = 'red'

          setTimeout(() => document.getElementById(this.props.id).style.background = 'black', 100)

          document.getElementById(this.props.id).style.boxShadow = `1px 1px 2px 2px red`
        }
      }

      animateBackground() {
        document.getElementById('drum-machine').animate([{
          boxShadow: `0px 0px 120px 60px ${this.props.color}`
        }, {
          boxShadow: `0px 0px 150px 90px ${this.props.color}`
        }, {
          boxShadow: `0px 0px 180px 120px ${this.props.color}`
        }], {
          duration: 200
        });

        document.getElementById('display').style.border = `0.4px solid ${this.props.color}`
      }


      render() {

        return ( < div className = "drum-pad"
          id = {
            this.props.id
          }
          onClick = {
            this.playAudio
          }
          title = "You can also press the corresponding key on your keyboard" > {
            this.props.keys
          } < audio className = "clip"
          id = {
            this.props.keys
          }
          src = {
            this.props.url
          } >
          Your browser does not support the audio element <
          /audio> < /
          div >
        )
      }
    }


    export default DrumMachine;