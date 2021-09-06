import React from "react";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PaymentForm.css";
import "react-credit-cards/es/styles-compiled.css";
import validateInfo from './validateInfo';
import { useState } from 'react'
import pic from '../../images/cards.png';
import { TextField,Typography, Paper } from '@material-ui/core';
import { createCard } from "../../actions/payment"
import { useDispatch, useSelector } from 'react-redux';
const PaymentForm = () => {
  const [values, setValues] = useState({
    cardname: '',
    cardnumber: '',
    cardtype: '',
    expirydate: '',
    cardsecuritycode: '',
   
})

const [errors, setErrors] = useState({})
const dispatch = useDispatch();

const handleChange = e => {
  const { name, value } = e.target
  setValues({
      ...values,
      [name]: value
  })
}
var user=JSON.parse(localStorage.getItem('profile')).user._id
const handleSubmit = e => {
  e.preventDefault()
  setErrors(validateInfo(values))
  console.log(errors.variant=="success")
  console.log(values)
  dispatch(createCard(user, values));

};

  return (
    <div>
      <div className="container">
        <div className="box justify-content-center align-items-center">
          <div className="formDiv">
          <div className="creditCard">
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Typography> Add Card details</Typography>
            <img height='40px' width="200px" marginLeft="2px" src={pic} align="center" align="left"></img>
              <Form.Control style={{margin:"10px"}}
                type="text"
                id="cardname"
                name="cardname"
                placeholder="Cardholder Name"
                value={values.cardname}
                onChange={handleChange}
                isValid={errors.cname}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control style={{margin:"10px"}}
                type="Number"
                id="cardnumber"
                name="cardnumber"
                placeholder="Card Number"
                value={values.cardnumber}
                onChange={handleChange}
                isValid={errors.cnumber}
              />
            </Form.Group>
            <Row>
                <Form.Group>
                  <Form.Control style={{margin:"10px"}}
                    type="text"
                    name="cardtype"
                    id="cardtype"
                    placeholder="Card Type"
                    value={values.cardtype}
                    onChange={handleChange}
                    isValid={errors.ctype}
                  />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                <Form.Control style={{margin:"10px"}}
                    type="text"
                    id="expirydate"
                    name="expirydate"
                    placeholder="Expiration Date"
                    value={values.expirydate}
                    onChange={handleChange}
                    isValid={errors.cexp}
                  />
                </Form.Group>
            </Row>
            <Button
              size={"block"}
              id="validateButton"
              type="submit"
            >
              Submit
            </Button>
          </Form>
          </div>
          <Alert
            id="alertMessage"
          >
            {errors.message}
          </Alert>{" "}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
