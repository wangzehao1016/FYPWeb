class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
      width: 0,
      height: 0,
    }
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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
    return <h1>page0</h1>
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
      fontSize: Math.min(
        this.applyRatioWidth(1),
        this.applyRatioHeight(2)
      ),
      fontFamily: 'Times New Roman',
      color: 'white',
      backgroundColor: 'black',
      fontWeight: '800'
    }
    return (
      <div style={{ width: this.applyRatioWidth(100), height: this.applyRatioWidth(100), WebkitTransition: 'all', msTransition: 'all', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ height: this.applyRatioHeight(10), width: this.applyRatioWidth(100), display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <button onClick={this.onMain} style={buttonStyle}>Main Page</button>
          <button onClick={this.onStage} style={buttonStyle}>Stages</button>
          <button onClick={this.onPlan} style={buttonStyle}>Project Plan</button>
          <button onClick={this.onAbout} style={buttonStyle}>About</button>
        </div>
        <div>{this.renderScreen(pageIndex)}</div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
