import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import API from '../utils'
import CanvasJSReact from './canvasjs.react.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Success extends Component {

    state = {
        isActive: true
    }

    componentDidMount = () =>{
        console.log("justo despues del did mount")
        console.log(this.props.values)
        API.getData(this.props.values)
            .then(x=>{
                console.log("dentro de component mount did")
                console.log(x)
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
        API.sendNot()
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
        //
        console.log("props")
        console.log(values)
        if (values.scenSavings.length > 0) {
			var dataAhorro = []
			var dataGasto = []
			for (var i=0; i<values.scenSavings.length;i++){
				dataAhorro.push({
					x:i,
					y:values.scenSavings[i]
				})
			}

			for (var j=0; j<values.scenRetire.length;j++){
				dataGasto.push({
					x:j,
					y:values.scenRetire[j]
				})
			}

		}

		const optionsA = {
            theme: "light2",
			animationEnabled: true,
			title:{
				text: "Savings Period"
			},
			axisX: {
				valueFormatString: "###"
			},
			axisY: {
				title: "Investment",
				prefix: "$",
				includeZero: false
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "###",
				type: "area",
				dataPoints: dataAhorro
			}]
		}

		const optionsG = {
            theme: "light2",
			animationEnabled: true,
			title:{
				text: "Retirement Period"
			},
			axisX: {
				valueFormatString: "###"
			},
			axisY: {
				title: "Investment",
				prefix: "$",
				includeZero: false
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "###",
				type: "area",
				dataPoints: dataGasto
			}]
		}
        //
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
                        <AppBar title="Are you saving enough?" />
                        <p style={styles.par}>{msg}</p>
                        <br></br>
                        <div style={styles.container}>
                            <div style={styles.graph}>
                                <CanvasJSChart 
                                options={optionsA}
                                />
                            </div>
                            <div style={styles.graph}>
                                <CanvasJSChart 
                                options={optionsG}
                                />
                            </div>
                        </div>
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
    },
    par: {
        justifyContent: "center"
    },
    graph: {
        width: 500
    },
    container:{
        display: "flex",
        justifyContent: "center"
    }
}

export default Success
