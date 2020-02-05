import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import API from '../utils'

export class Success extends Component {

    componentDidMount = () =>{
        API.getData(this.props.values)
            .then(x=>{
                this.props.updateCalc(x.data[0])
            })
    }

    continue = e =>{
        e.preventDefault();
        // Process Form (API) //
        this.props.nextStep()
    }

    back = e =>{
        e.preventDefault();
        this.props.prevStep()
    }
    
    render() {
        const { values } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Sucess!!!" />
                    <h1>Thank For Your Submission</h1>
                    <p>{values.forecastedSavings},{values.forecastedRetire}</p>
                    <p>You will get an email with your analysis!!!</p>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default Success
