import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import API from '../utils'

export class Success extends Component {

    state = {
        isActive: true
    }

    componentDidMount = () =>{
        API.getData(this.props.values)
            .then(x=>{
                this.props.updateCalc(x.data[0])
            })
    }

    currSty(num) {
        return (new Intl.NumberFormat('en-GB').format(num))
    }

    continue = e =>{
        e.preventDefault();
        // Process Form (API) //
        API.sendCont(this.props.values)
        this.setState({
            isActive: false
        })
    }

    back = e =>{
        e.preventDefault();
        this.props.prevStep()
    }
    
    render() {
        const { values } = this.props;
        var msg = ""
        if (values.forecastedRetire>0){
            msg = "Congratulations! If you mantain your current savings habits you are expected to have saved the total amount of " + this.currSty(values.forecastedSavings) + " which will be enough to keep your current expense and have the total amount of " + this.currSty(values.forecastedRetire) +" at your expected life"
        }
        else{
            msg = "Unfortunately! If you mantain your current savings habits you are expected to have saved the total amount of " + this.currSty(values.forecastedSavings) + " which will not be enough to keep your current expense and hence leave a total debt of " + this.currSty(values.forecastedRetire) +" at your expected life"
        }
        if (this.state.isActive){
            return (
                <MuiThemeProvider>
                    <React.Fragment>
                        <AppBar title="How well did you?" />
                        <p>{msg}</p>
                        <br></br>
                        <RaisedButton
                            label="Click if you wish to be contacted"
                            primary={true}
                            style={styles.button}
                            onClick={this.continue}
                        />
                        <RaisedButton
                            label="Back"
                            primary={false}
                            style={styles.button}
                            onClick={this.back}
                        />
                    </React.Fragment>
                </MuiThemeProvider>
            )
        }
        else{
            return(
                <MuiThemeProvider>
                    <React.Fragment>
                        <AppBar title="Great!!! We will be in touch" />
                        <p>You will be receiving an email with further instructions.</p>
                    </React.Fragment>
                </MuiThemeProvider>
            )
        }
        
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default Success
