import React, { Component } from 'react';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import TimeRange from 'react-time-range';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import './App.css';
import { backendUrl } from './utils';

class DayTimePicker extends React.Component {
  render() {
    return (
      <Col>
        <DayPicker/>
        <TimeRange/>
      </Col>
    );
  }
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      country: 'ES',
      postal_codes: "28023, 28004",
      formData: {},
      result: "",
      slots: [],
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
    this.setState({ slots: [] });
  }

  handleAddNewScheduleClick = (event) => {
    var joined = this.state.slots.concat('');
    this.setState({ slots: joined })
  }

  render() {
    const {isLoading, formData, result, slots} = this.state

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
                <Form.Row>
                  <Button variant="primary" onClick={this.handleAddNewScheduleClick}>New slot</Button>
                </Form.Row>
                <Row>
                  {slots.map(() => <DayTimePicker/>)}
                </Row>
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
          </Row>
          }
        </div>
      </Container>
    );
  }
}

export default App;