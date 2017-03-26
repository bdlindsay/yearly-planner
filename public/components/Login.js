import React from 'react'
import { Row, Col, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'



export default ({ handleChange, attemptSignIn, hasFailedSignIn }) => {
    const loginErrorText = () => {
        return hasFailedSignIn ? <Col style={{color: "red"}} smOffset={2} sm={10} >Invalid email or password.</Col> : <Row></Row>
    }
    return (
        <div className="center-vertically container">
            {loginErrorText()}
            <Form horizontal>
              <FormGroup controlId="formEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" onChange={handleChange.bind(this, "email")} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" onChange={handleChange.bind(this, "password")}/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button bsClass="add btn" bsSize="large" onClick={attemptSignIn} >
                    Sign in
                  </Button>
                </Col>
              </FormGroup>
            </Form>
        </div>
    )
}
/*
<FormGroup>
  <Col smOffset={2} sm={10}>
    <Checkbox>Remember me</Checkbox>
  </Col>
</FormGroup>
*/
