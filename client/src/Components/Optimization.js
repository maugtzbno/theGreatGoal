import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import API from '../utils'
import CanvasJSReact from './canvasjs.react.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Optimization extends Component {

    state = {
        isActive: true,
        yieldSav: .04,
        yieldRet: .03
    }
    

    componentDidMount = () =>{
        API.getData(this.props.values)
            .then(x=>{
                console.log("dentro de component mount did")
                console.log(x)
                this.props.updateCalc(x.data[0])
            })
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
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
        if (this.state.isActive){
            return (
                <MuiThemeProvider>
                    <React.Fragment>
                        <AppBar title="How much a 1% increase affect my investment?" />
                        <br></br>
                        <FormControl className={styles.formControl}>
                            <InputLabel id="demo-simple-select-label">Return</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.handleChange('yieldSav')}
                            >
                            <MenuItem value={.04}>Four Percent</MenuItem>
                            <MenuItem value={.05}>Five Percent</MenuItem>
                            <MenuItem value={.06}>Six Percent</MenuItem>
                            </Select>
                        </FormControl>
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
        justifyContent: "center",
        padding: 100
    },
    graph: {
        width: 500
    },
    container:{
        display: "flex",
        justifyContent: "center"
    },
    formControl: {
        margin: 20,
        minWidth: 120,
    }
}

export default Optimization
