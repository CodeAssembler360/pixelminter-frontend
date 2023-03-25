import React from "react";
import styled from "styled-components";

import {Button, Container, Row, Col, Card, Form, ProgressBar} from "react-bootstrap";
import teamImage from 'assets/svg/team-building.svg'
import transactionConfirmedIcon from "assets/svg/transaction-confirmed-icon.svg";
import PageHeader from "./PageHeader";

import nftImage1 from "assets/svg/nftImage1.svg";
import nftImage2 from "assets/svg/nftImage2.svg";
import nftImage3 from "assets/svg/nftImage3.svg";


const CollectionLivePage = () => {
  // @ts-ignore
    return (
      <>
          <PageHeader title="Collection is Live" />
          <Container>
              <Row>
                  <Col lg={{span: 8, offset: 2}}>
                      <Card className="card-s2 text-center">
                          <Card.Body>
                              <Card.Title className="large">Transaction Confirmed</Card.Title>
                              <Card.Text>Your Collections has been added to the blockchain</Card.Text>
                          </Card.Body>
                          <Card.Img style={{height: '250px'}} variant="top" src={transactionConfirmedIcon} />
                       </Card>
                      <Card className="card-s2">
                          <Card.Body>
                              <Card.Title>Minting Page</Card.Title>
                              <Card.Text>Share this URL so people can mint your NFTs easily.</Card.Text>
                              <Form>
                                  <Form.Group className="my-3" controlId="formBasicUrl">
                                      <Form.Control type="text" placeholder="Enter Url" />
                                  </Form.Group>
                                  <Button className="rounded-pill me-lg-3" variant="light" type="button">Copy</Button>
                                  <Button className="rounded-pill me-lg-3" type="submit">Visit</Button>
                              </Form>
                          </Card.Body>
                      </Card>
                      <Card className="card-s2">
                          <Card.Body>
                              <Card.Title>External Links</Card.Title>
                              <Button className="rounded-pill mt-4" type="button">View on Etherscan</Button>
                          </Card.Body>
                      </Card>
                      <Card className="card-s2">
                          <Card.Body>
                              <Card.Title>File Syncing with IPFS</Card.Title>
                              <Card.Text>Please wait until this is done before sharing your collection</Card.Text>
                              <ProgressBar className="my-4" now={60} />
                          </Card.Body>
                      </Card>
                      <Card className="card-s2">
                          <Card.Body>
                              <Card.Title className="mb-5">All NFT's in Collection</Card.Title>
                              <Row>
                                  <Col lg={4}>
                                      <Card className="card-s2">
                                          <Card.Img src={nftImage1} />
                                          <Card.Body>
                                              <Card.Title>Image 3</Card.Title>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                                  <Col lg={4}>
                                      <Card className="card-s2">
                                          <Card.Img src={nftImage2} />
                                          <Card.Body>
                                              <Card.Title>Image 3</Card.Title>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                                  <Col lg={4}>
                                      <Card className="card-s2">
                                          <Card.Img src={nftImage3} />
                                          <Card.Body>
                                              <Card.Title>Image 3</Card.Title>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                                  <Col lg={4}>
                                      <Card className="card-s2">
                                          <Card.Img src={nftImage3} />
                                          <Card.Body>
                                              <Card.Title>Image 3</Card.Title>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                                  <Col lg={4}>
                                      <Card className="card-s2">
                                          <Card.Img src={nftImage2} />
                                          <Card.Body>
                                              <Card.Title>Image 3</Card.Title>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                                  <Col lg={4}>
                                      <Card className="card-s2">
                                          <Card.Img src={nftImage1} />
                                          <Card.Body>
                                              <Card.Title>Image 3</Card.Title>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                              </Row>
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>
          </Container>
      </>
  );
};
export default CollectionLivePage;