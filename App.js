class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
      width: 0,
      height: 0,
      imageFocus: false,
      wordAfterImage: '',
    }
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    fetch('./wordBehindImage.txt')
      .then(r => r.text())
      .then(text => {
        this.setState({ wordAfterImage: text })
      })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }
  onMain = () => {
    this.setState({ pageIndex: 0 })
  }
  onStage = () => {
    this.setState({ pageIndex: 1 })
  }
  onPlan = () => {
    this.setState({ pageIndex: 2 })
  }
  onAbout = () => {
    this.setState({ pageIndex: 3 })
  }
  focusImage = () => {
    this.setState({ imageFocus: true })
  }
  blurImage = () => {
    this.setState({ imageFocus: false })
  }
  applyRatioHeight(por) {
    const { height } = this.state
    return height * por / 100
  }
  applyRatioWidth(por) {
    const { width } = this.state
    return width * por / 100
  }
  renderScreen = (index) => {
    switch (index) {
      case 0:
        return this.renderScreen0()
      case 1:
        return this.renderScreen1()
      case 2:
        return this.renderScreen2()
      case 3:
        return this.renderScreen3()
      default:
        return null
    }
  }
  renderScreen0 = () => {
    return (
      <div
        style={{
          width: this.applyRatioWidth(90),
          height: this.applyRatioHeight(70),
          borderRadius: this.applyRatioHeight(2),
          border: '1px solid grey',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: this.applyRatioWidth(30),
            height: this.applyRatioHeight(33),
            borderRadius: this.applyRatioHeight(1),
          }}
        >
          <img
            src='./robot.jpg'
            style={{
              width: this.applyRatioWidth(30),
              height: this.applyRatioHeight(33),
              borderRadius: this.applyRatioHeight(1),
              opacity: this.state.imageFocus ? 0.2 : 1,
              transition: 'opacity 500ms 0ms',
            }}
            onMouseEnter={() => this.focusImage()}
            onMouseOut={() => this.blurImage()}
          />
          <p onMouseEnter={() => this.focusImage()}
            onMouseOut={() => this.blurImage()}
            style={{
              width: this.applyRatioWidth(50),
              fontSize: Math.min(
                this.applyRatioWidth(2),
                this.applyRatioHeight(4)
              ),
              borderRadius: this.applyRatioHeight(1),
              fontFamily: 'Times New Roman',
              textAlign: 'justify',
              opacity: this.state.imageFocus ? 1 : 0,
              transition: 'opacity 500ms 0ms',
              marginTop: this.applyRatioHeight(-31),
              marginLeft: this.applyRatioWidth(-12),
              padding: Math.min(
                this.applyRatioWidth(2),
                this.applyRatioHeight(4)
              ),
              border: '1px solid grey',
            }}>{this.state.wordAfterImage}</p>
        </div>
        <p style={{
          fontSize: Math.min(
            this.applyRatioWidth(3),
            this.applyRatioHeight(6)
          ),
          fontFamily: 'Times New Roman'
        }}>AI Chess With Robotic Arm & Without Screen</p>
        <p style={{
          fontSize: Math.min(
            this.applyRatioWidth(1),
            this.applyRatioHeight(2)
          ),
          fontFamily: 'Times New Roman'
        }}>Supervisor: Dr. Vincent Lau</p>
        <p style={{
          fontSize: Math.min(
            this.applyRatioWidth(1),
            this.applyRatioHeight(2)
          ),
          fontFamily: 'Times New Roman'
        }}
        >Student: Wang Zehao</p>
      </div>
    )
  }
  renderScreen1 = () => {
    return <h1>page1</h1>
  }
  renderScreen2 = () => {
    return <h1>page2</h1>
  }
  renderScreen3 = () => {
    return <h1>page3</h1>
  }
  render() {
    const { pageIndex } = this.state
    let buttonStyle = {
      width: this.applyRatioWidth(10),
      height: this.applyRatioHeight(5),
      borderRadius: this.applyRatioHeight(2),
      fontSize: Math.min(
        this.applyRatioWidth(1),
        this.applyRatioHeight(2)
      ),
      fontFamily: 'Times New Roman',
      color: 'white',
      backgroundColor: 'black',
      fontWeight: '800',
      borderColor: 'transparent',
    }
    return (
      <div style={{
        width: this.applyRatioWidth(100),
        height: this.applyRatioHeight(100),
        WebkitTransition: 'all',
        msTransition: 'all',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: this.applyRatioWidth(100),
          height: this.applyRatioHeight(10),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
          <button onClick={this.onMain} style={buttonStyle}>Main Page</button>
          <button onClick={this.onStage} style={buttonStyle}>Stages</button>
          <button onClick={this.onPlan} style={buttonStyle}>Project Plan</button>
          <button onClick={this.onAbout} style={buttonStyle}>About</button>
        </div>
        <div style={{
          height: this.applyRatioHeight(1.5),
          width: this.applyRatioWidth(100),
          backgroundColor: 'black'
        }} />
        <div style={{
          height: this.applyRatioHeight(2),
          width: this.applyRatioWidth(100)
        }} />
        <div style={{
          height: this.applyRatioHeight(1.5),
          width: this.applyRatioWidth(100),
          backgroundColor: 'black'
        }} />
        <div style={{
          height: this.applyRatioHeight(5),
          width: this.applyRatioWidth(100)
        }} />
        <div>{this.renderScreen(pageIndex)}</div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
