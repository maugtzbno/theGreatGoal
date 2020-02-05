import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormPersonalDetails extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep()
    }

    back = e =>{
        e.preventDefault();
        this.props.prevStep()
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Lets find out how much time you have to save for your retire!" />
                    <TextField
                        hintText="Enter Your Age"
                        floatingLabelText="Age"
                        onChange={handleChange('age')}
                        defaultValue={values.age}
                    />
                    <br/>
                    <TextField
                        hintText="Enter Your Desired Retirement Age"
                        floatingLabelText="Retirement Age"
                        onChange={handleChange('retire')}
                        defaultValue={values.retire}
                    />
                    <br/>
                    <TextField
                        hintText="Enter Your Life Expectancy"
                        floatingLabelText="Life Expectancy"
                        onChange={handleChange('expected')}
                        defaultValue={values.expected}
                    />
                    <br/>
                    <RaisedButton
                        label="Continue"
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
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPersonalDetails
