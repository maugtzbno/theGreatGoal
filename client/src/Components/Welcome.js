import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import API from '../utils'

export class Welcome extends Component {

    state = {
        giphyUrl: ""
    }

    componentDidMount = () =>{
        API.getGiphy()
            .then(x=>{
                this.setState({
                    giphyUrl: x.data.data[Math.floor(Math.random()*(9-0+1)+0)].images.fixed_height.url
                })
                console.log(x)
                console.log(this.state.giphyUrl)
            })
    }

    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Hi, I am your Robo Financial Advisor..."/>
                        <h2>Have you ever heard people talking about inflation?</h2>
                        <p>Inflation is the rate at which prices increment and this will affect your savings...</p>
                        <p>Lets say that for the past ten years we had an average inflation of 3%</p>
                        <p>then a concert ticket that ten years ago cost 10 dollars today will be...</p>
                        <p>13.43</p>
                        <p>Why? I am telling you this, because in order for your savings to at least keep up with inflation they have to be invested!</p>
                        <br></br>
                        <img src={this.state.giphyUrl}></img>
                        <br></br>
                        <RaisedButton
                            label="Got it! But how much I have to save?"
                            primary={true}
                            style={styles.button}
                            href={"/advance"}
                        />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default Welcome
