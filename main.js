function App(props) {
    return <Game venue='Appropriate Name Stadium' />
}

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.handleShot = this.handleShot.bind(this)
    }

    handleShot() {
        const shootAttempt = new Audio("media/audio/woodbat.mp3")
        const scorePoint = new Audio("media/audio/Ball+Hit+Cheer.mp3")
        let score = this.props.score
        let shots = this.props.shots

        if ((Math.random() * 10) > 6) {
            score++
            shots++
            scorePoint.play()
        }
        else {
            shots++
            shootAttempt.play()
        }
        this.props.handleGame(score, shots)
    }

    render() {
        const ratio = (this.props.score / this.props.shots) || 0
        return (
            <div className={this.props.teamOrigin}>
                <Scoreboard
                    score={this.props.score}
                    team={this.props.teamOrigin}
                />
                <h2>Team {this.props.name}</h2>
                <img src={this.props.logo} />
                <p>Score: {this.props.score}</p>
                <p>Shots Taken: {this.props.shots}</p>
                <p style={{ visibility: this.props.visibility }}>Shot Ratio: {(ratio * 100).toFixed(3) + '%'}</p>
                <button onClick={this.handleShot}>Shoot!</button>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homeScore: 0,
            homeShots: 0,
            homeVis: "hidden",

            visitScore: 0,
            visitShots: 0,
            visitVis: "hidden"
        }
        this.handleHome = this.handleHome.bind(this)
        this.handleVisit = this.handleVisit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleHome(score, shots) {
        this.setState({ homeScore: score, homeShots: shots, homeVis: "visible" })
    }

    handleVisit(score, shots) {
        this.setState({ visitScore: score, visitShots: shots, visitVis: "visible" })
    }

    handleReset() {
        if(this.state.homeShots !== 0 || this.state.visitShots !== 0)
            {alert("Game reset!")}
        this.setState({
            homeScore: 0, homeShots: 0, homeVis: "hidden",
            visitScore: 0, visitShots: 0, visitVis: "hidden"
        })
    }

    render() {
        return (
            <>
                <button onClick={this.handleReset}>Reset Game</button>
                <br />
                <h2>Welcome to {this.props.venue}!</h2>
                <div id="container">
                    <Team
                        teamOrigin="Home"
                        name="Boston Red Sox"
                        log="https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/RedSoxPrimary_HangingSocks.svg/1200px-RedSoxPrimary_HangingSocks.svg.png"
                        handleGame={this.handleVisit}
                        score={this.state.visitScore}
                        shots={this.state.visitShots}
                        visibility={this.state.visitVis}
                    />
                    <Team
                        teamOrigin="Visiting"
                        name="NY Yankees"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/NewYorkYankees_caplogo.svg/800px-NewYorkYankees_caplogo.svg.png"
                        handleGame={this.handleHome}
                        score={this.state.homeScore}
                        shots={this.state.homeShots}
                        visibility={this.state.homeVis}
                    />
                </div>
            </>
        )
    }
}

const Scoreboard = (props) => {
    return (
        <>
            <h2>{props.team} Score</h2>
            <h2>{props.score}</h2>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)