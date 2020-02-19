import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import FormFinanceDetails from './FormFinanceDetails';
import FormSavingDetails from './FormSavingDetails';
import Confirm from './Confirm'
import Success from './Success'
import Optimization from './Optimization'

export class UserForm extends Component {
    state = {
        step: 1,
        // User Details
        firstName: "",
        lastName: "",
        email: "",
        // Demographic Details
        age: "",
        retire: "",
        expected: "",
        // Finance Details
        income: "",
        tax: "",
        expense: "",
        // Saving Details
        savings: "",
        // Yield Details
        rateSavings: 0.04,
        rateRetire: 0.03,
        //Calculated Values from API
        forecastedSavings: "",
        forecastedRetire: "",
        scenSavings: [],
        scenRetire: []
    }

    // Proceed to next step
    nextStep = () =>{
        const { step } = this.state;
        this.setState({
            step: step +1
        });
    }

    // Go back to prev step
    prevStep = () =>{
        const { step } = this.state;
        this.setState({
            step: step -1
        });
    }

    // Handle field change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    //Update calculated fields
    updateCalc = input => {
        this.setState({
            forecastedSavings: input.data.ops[0].pronosticoAhorro,
            forecastedRetire: input.data.ops[0].pronosticoHerencia,
            scenSavings: input.data.ops[0].escenarioAhorro,
            scenRetire: input.data.ops[0].escenarioHerencia
        })
    }

    //Update rates
    updateRates = input => {
        var delta = 0;
        if (input == "addYield"){
            delta = .01    
        }
        else {
            delta = -.01
        }
        this.setState({
            rateSavings: this.state.rateSavings + delta,
            rateRetire: this.state.rateRetire + delta

        })
    }

    //Update scenario fields
    updateScen = input => {
        this.setState({
            scenSavings: input.data.ahorroScen,
            scenRetire: input.data.gastoScen
        })
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, 
            age, retire, expected, 
            income, tax, expense,
            savings, rateSavings, rateRetire,
            forecastedSavings, forecastedRetire,
            scenSavings, scenRetire } = this.state;
        const values = { firstName, lastName, email, 
            age, retire, expected, 
            income, tax, expense,
            savings, rateSavings, rateRetire,
            forecastedSavings, forecastedRetire,
            scenSavings, scenRetire };
        switch(step) {
            case 1:
                return(
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return(
                    <FormPersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 3:
                return(
                    <FormFinanceDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 4:
                return(
                    <FormSavingDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 5:
                return(
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        updateCalc={this.updateCalc}
                        values={values}
                    />
                )
            case 6:
                return(
                    <Success
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                )
            case 7:
                return(
                    <Optimization
                        prevStep={this.prevStep}
                        updateRates={this.updateRates}
                        updateScen={this.updateScen}
                        values={values}
                    />
                )
        }
    }
}

export default UserForm
