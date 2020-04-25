import React, { Component } from 'react';
import { Form, Col, Container, Row, Button, Image } from 'react-bootstrap';
import './App.css';
import { backendUrl } from './utils';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        postcode: "XXXXX",
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handleSubmitClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch(backendUrl,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);  

        this.setState({
          result: response,
          isLoading: false
        });
      })
      .catch(error => {  
        console.log('Request failure: ', error);  
      });
  }

  handleClearClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    var sepalLengths = []
    for (var i = 4; i <= 7; i = +(i + 0.1).toFixed(1)) {
      sepalLengths.push(<option key = {i} value = {i}>{i}</option>);
    }
    var sepalWidths = []
    for (let i = 2; i <= 4; i = +(i + 0.1).toFixed(1)) {
      sepalWidths.push(<option key = {i} value = {i}>{i}</option>);
    }
    var petalLengths = []
    for (let i = 1; i <= 6; i = +(i + 0.1).toFixed(1)){
      petalLengths.push(<option key = {i} value = {i}>{i}</option>);
    }
    var petalWidths = []
    for (let i = 0.1; i <= 3; i = +(i + 0.1).toFixed(1)) {
      petalWidths.push(<option key = {i} value = {i}>{i}</option>);
    }
    return (
      <Container>
        <div>
          <h1 className="title">Backoffice - Find a slot</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Country</Form.Label>
                <Form.Control name="country" placeholder="ES" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Postal codes</Form.Label>
                <Form.Control name="postal_codes" placeholder="28003,28045" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Postcode</Form.Label>
                <Form.Control name="postal_code" placeholder="N11 M22" />
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleSubmitClick : null}>
                  {isLoading ? 'Submiting...' : 'Submit'}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleClearClick}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
          <Row>
            <Image src="holder.js/100px250" fluid />
          </Row>
          }
        </div>
      </Container>
    );
  }
}

export default App;