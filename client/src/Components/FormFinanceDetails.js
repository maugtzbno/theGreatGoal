import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormFinanceDetails extends Component {

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
                    <AppBar title="Great! Now lets talk about your budget..." />
                    <TextField
                        hintText="Enter Your Income"
                        floatingLabelText="Monthly Income"
                        onChange={handleChange('income')}
                        defaultValue={values.income}
                    />
                    <br/>
                    <TextField
                        hintText="For example a 30% tax, enter 30"
                        floatingLabelText="Tax"
                        onChange={handleChange('tax')}
                        defaultValue={values.tax}
                    />
                    <br/>
                    <TextField
                        hintText="Enter Your Expense"
                        floatingLabelText="Monthly Expense"
                        onChange={handleChange('expense')}
                        defaultValue={values.expense}
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

export default FormFinanceDetails
