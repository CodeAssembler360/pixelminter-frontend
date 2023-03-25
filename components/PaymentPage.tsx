import React from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import {Modal, Button, Container, Row, Col, Form, Card, ListGroup} from "react-bootstrap";
import teamImage from 'assets/svg/team-building.svg'
import stripCard from 'assets/svg/stripe-card.svg'
import infoIcon from 'assets/svg/info-icon.svg'
import thankyouIcon from "../assets/svg/thankyou-icon.svg";




const PaymentPage = () => {
  return (
      <>
          <Space></Space>
          <Container>
              <Row>
                  <Col lg={6}>
                      <Form className="form-s2 mb-5">
                          <PageTitle className="mb-4 mb-lg-5">Payment Method</PageTitle>
                          <img src={stripCard} alt="" className="mb-4 mb-lg-5" />
                          <Form.Group className="mb-3" controlId="formBasicCreditCard">
                              <Form.Label>Credit Card</Form.Label>
                              <Form.Control type="text" placeholder="1234 5678 9101 1234" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicName">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" placeholder="Type name" />
                          </Form.Group>

                          <Row>
                              <Col>
                                  <Form.Group className="mb-3" controlId="formBasicDate">
                                      <Form.Label>Expiration Date (MM/YYYY)</Form.Label>
                                      <Form.Control type="date" placeholder="Date" />
                                  </Form.Group>
                              </Col>
                              <Col>
                                  <Form.Group className="mb-3" controlId="formBasicCCV">
                                      <Form.Label>CVV</Form.Label>
                                      <Form.Control type="number" />
                                  </Form.Group>
                              </Col>
                          </Row>

                          <Form.Group className="mt-4 mb-3 d-flex gap-3" controlId="formBasicDate">
                              <img src={infoIcon} alt=""/>
                              <p>Credit card payments may take up 24h to be processed</p>
                          </Form.Group>

                          <Form.Group className="mt-4 mt-lg-5 mb-3" controlId="formBasicCheckbox">
                              <Form.Check type="checkbox" label="Save my payment details for future purchases" />
                          </Form.Group>
                      </Form>
                  </Col>
                  <Col lg={{span: 5 , offset: 1}}>
                      <Card className="sidebar mb-5">
                          <Card.Body>
                              <Card.Title>Upfront</Card.Title>
                              <ListGroup>
                                  <ListGroup.Item>Illustrations (x120): <strong>$12.00</strong></ListGroup.Item>
                                  <ListGroup.Item>Service Fee: <strong>$10.00</strong></ListGroup.Item>
                                  <ListGroup.Item className="border-b-1"></ListGroup.Item>
                                  <ListGroup.Item>Total: <h2><strong>$22.00</strong></h2></ListGroup.Item>
                              </ListGroup>
                              <Button className="rounded-pill mt-4">Confirm Payment</Button>
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>
          </Container>
      </>
  );
};
export default PaymentPage;

const PageTitle = styled.h1`
    color: #0E234B;
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 20px;
    @media (max-width: 992px){
       font-size: 30px;
    }
`;

// Modal
const Space = styled.div`
  height: 200px;
  @media (max-width: 992px){
    height: 150px;
  }
`;