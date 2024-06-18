import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Input, Button, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/search', { query });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container className="app-container d-flex flex-column align-items-center justify-content-center mx-auto">
      <h1 className="my-4">Search Application</h1>
      <Form onSubmit={handleSearch} className="d-flex justify-content-center search-form w-100">
        <FormGroup className="flex-grow-1 mr-2 mb-0 me-3">
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
          />
        </FormGroup>
        <Button type="submit" color="primary" className="btn btn-custom btn-md">Search</Button>
      </Form>

      {/* Display results in cards */}
      <Row className="mt-4 w-100">
        {results.map((item) => (
          <Col sm="12" md="6" lg="4" className="mb-4" key={item._id}>
            <Card className="h-100">
              <CardBody>
                <CardTitle tag="h5">{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
                <CardText>
                  <small className="text-muted">Habitat: {item.habitat}</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
