import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import FormFinanceDetails from './FormFinanceDetails';
import FormSavingDetails from './FormSavingDetails';
import Confirm from './Confirm'
import Success from './Success'
//import Optimization from './Optimization'

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

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, 
            age, retire, expected, 
            income, tax, expense,
            savings, 
            forecastedSavings, forecastedRetire,
            scenSavings, scenRetire } = this.state;
        const values = { firstName, lastName, email, 
            age, retire, expected, 
            income, tax, expense,
            savings, 
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
            // case 7:
            //     return(
            //         <Optimization
            //             prevStep={this.prevStep}
            //             updateCalc={this.updateCalc}
            //             values={values}
            //         />
            //     )
        }
    }
}

export default UserForm
