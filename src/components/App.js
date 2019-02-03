import React, { Component } from 'react';
import '../css/App.css';
import { Grid, Row, Col, Form} from 'react-bootstrap';
import SliderAmount from './SliderAmount';
import SliderDuration from './SliderDuration';
import RightSide from './RightSide';

class LoanCalculator extends Component {

    constructor(props) {
        super(props);

        let MPR = this.props.APR1 / 100 / 12;
        let amount = this.props.valueA;
        let duration = this.props.valueD;
        let totalAmountToRepay = amount+((amount*MPR)*duration) ;
        let monthly = totalAmountToRepay / duration;

        this.state = {

            valueAmount: this.props.valueA,
            stepAmount: this.props.stepA,
            maxAmount: this.props.maxA,
            minAmount: this.props.minA,

            valueDuration: this.props.valueD,
            stepDuration: this.props.stepD,
            maxDuration: this.props.maxD,
            minDuration: this.props.minD,

            APR: this.props.APR1,
            amountToRepay:  Math.round(totalAmountToRepay).toFixed(),
            monthlyInst: Math.round(monthly).toFixed(),

        };
    }
   

    update( e ){
       
        let changedID = e.target.id;
        let value = e.target.value;
        if (changedID === 'sliderAmount') {
            this.setState({valueAmount: e.target.value});
            console.log('EVENT TIME: ' + this.getNewDate());
            console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+this.props.currancy + e.target.value);
        }
        if (changedID === 'sliderDuration'){
            this.setState({valueDuration: e.target.value});
            console.log('EVENT TIME: ' + this.getNewDate());
            console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+ e.target.value+' months');
        }

        switch (changedID) {

            case "Excellent":
                this.setState({APR: this.props.APR1});
                console.log('EVENT TIME: ' + this.getNewDate());
                console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been clicked. New APR value is: '+ this.props.APR1+'%');
                break;

            case "Good":
                this.setState({APR: this.props.APR2});
                console.log('EVENT TIME: ' + this.getNewDate());
                console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been clicked. New APR value is: '+ this.props.APR2+'%');
                break;

            case "Fair":
                this.setState({APR: this.props.APR3});
                console.log('EVENT TIME: ' + this.getNewDate());
                console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been clicked. New APR value is: '+ this.props.APR3+'%');
                break;

            default:
                break;
        }

        this.calculate(changedID, value);
    }

    getNewDate() {

        let newDate = new Date();
        let h,m,s;
        h = newDate.getHours();
        m = "0"+newDate.getMinutes();
        s = "0"+newDate.getSeconds();
        m = m.slice(-2);
        s = s.slice(-2);

        let event_date = h +":"+m+":"+s;
        return event_date;
    };


    calculate(id, value){

        let amount, duration;
        let MPR = this.state.APR / 100 / 12; 
        let aprNew;
       
        if (id === 'sliderDuration') {
            duration = parseFloat(value);
            amount = parseFloat(this.state.valueAmount);
        }
       
        else if (id === 'sliderAmount'){
            amount = parseFloat(value);
            duration = parseFloat(this.state.valueDuration);
        }
        
        else {
            amount = parseFloat(this.state.valueAmount);
            duration = parseFloat(this.state.valueDuration);
            switch (id) {

                case "Excellent":
                    aprNew =  this.props.APR1;
                    MPR = aprNew / 100 / 12;  
                    break;

                case "Good":
                    aprNew =  this.props.APR2;
                    MPR = aprNew / 100 / 12; 
                    break;

                case "Fair":
                    aprNew =  this.props.APR3;
                    MPR = aprNew / 100 / 12;  
                    break;

                default:
                    break;
            }

        }
      
        let totalAmountToRepay = amount+((amount*MPR)*duration) ;
        let monthly = totalAmountToRepay / duration;

        
        totalAmountToRepay =  Math.round(totalAmountToRepay).toFixed();
        monthly = Math.round(monthly).toFixed();

        
        this.setState({amountToRepay: totalAmountToRepay});
        this.setState({monthlyInst: monthly});


    }

    render()
    {
        return(
            <Grid className="show-grid mainContainer">
                <Row>
                    <Col className="leftSide" xs={12} md={6}>
                        <Form horizontal>

                            <SliderAmount
                                value={this.state.valueAmount}
                                min={this.state.minAmount}
                                max={this.state.maxAmount}
                                onChange={this.update.bind(this)}
                                step={this.state.stepAmount}
                                currancy={this.props.currancy}
                            />
                            <SliderDuration
                                value={this.state.valueDuration}
                                min={this.state.minDuration}
                                max={this.state.maxDuration}
                                onChange={this.update.bind(this)}
                                step={this.state.stepDuration}
                            />
                        </Form>
                        <Col className="logo" sm={12}>
                            LOAN   ESTIMATOR<ion-icon name="globe"></ion-icon>
                        </Col>
                    </Col>

                    <RightSide
                        currancy={this.props.currancy}
                        amount={this.state.amountToRepay}
                        monthly={this.state.monthlyInst}
                        APR={this.state.APR}
                        btnOnClick={this.update.bind(this)}
                    />
               </Row>
            </Grid>
        );
    }
}


LoanCalculator.defaultProps = {
    valueD: 24,
    stepD: 2,
    maxD: 24,
    minD: 6,

    valueA : 2000,
    stepA : 500,
    maxA : 5000,
    minA : 500,

    APR1: 7.5,
    APR2: 9.0,
    APR3: 12.5,

    currancy: '$',
};

export default LoanCalculator;

