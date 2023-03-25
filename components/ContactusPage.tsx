import React from "react";
import styled from "styled-components";
import {Modal, Button, Container, Row, Col} from "react-bootstrap";
import teamImage from 'assets/svg/team-building.svg'
import thankyouIcon from "../assets/svg/thankyou-icon.svg";



import dynamic from 'next/dynamic';
import PageHeader from "./PageHeader";
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
        ],
        ['code-block','link', 'blockquote'],
    ],
    clipboard: {
        matchVisual: false,
    },
};
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

function SuccessModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ModalIcon src={thankyouIcon} alt=""/>
                <ModalTitle className="mb-3">Thank You!</ModalTitle>
                <ModalText>Your request has been submitted, we'll get back to you within 24 hours.</ModalText>
                <Button href="/" className="rounded-pill mt-4">Back to Homepage</Button>
            </Modal.Body>
        </Modal>
    );
}

const ContactUsPage = () => {
    const [modalShow, setModalShow] = React.useState(false);
  return (
      <>
          <SuccessModal
              show={modalShow}
              onHide={() => setModalShow(false)}
          />
          <PageHeader title="Contact Us" />
          <Container>
              <Row>
                  <Col lg={6}>
                      <img className="mx-auto my-5" src={teamImage} alt=""/>
                  </Col>
                  <Col lg={6}>
                      <Form action="">

                          <FormTitle>Send Us a Message</FormTitle>

                          <Formgroup>
                              <LabelArea>
                                  <label htmlFor="full-name">Full Name (Required)</label>
                              </LabelArea>
                              <Input id="full-name" type="text" placeholder="Enter Your Name" required/>
                          </Formgroup>

                          <Formgroup>
                              <LabelArea>
                                  <label htmlFor="email">Email Address (Required)</label>
                              </LabelArea>
                              <Input id="email" type="email" placeholder="Enter Your Email Address (where we can reach you)" required/>
                          </Formgroup>

                          <Formgroup>
                              <LabelArea>
                                  <label htmlFor="sub">Subject</label>
                              </LabelArea>
                              <Input id="sub" type="text" placeholder="What Can we do for you?"/>
                          </Formgroup>

                          <Formgroup>
                              <LabelArea>
                                  <label htmlFor="des">Description</label>
                              </LabelArea>
                              <QuillNoSSRWrapper  modules={modules} formats={formats} />
                              <InputNote>In order to best help, please enter as many details as you can. This should include troubleshooting steps you've already taken, as well a screenshots of any error messages.</InputNote>
                          </Formgroup>

                          <Formgroup>
                              <LabelArea>
                                  <label htmlFor="attachment">Attachments (optional)</label>
                              </LabelArea>
                              <InputFile id="attachment" type="file"/>
                          </Formgroup>

                          <Button type="button" onClick={() => setModalShow(true)} className="rounded-pill w-100">Submit</Button>

                      </Form>
                  </Col>
              </Row>
          </Container>
      </>
  );
};
export default ContactUsPage;





const Form = styled.form`
    background-color: #ECF2FD;
    border-radius: 12px;
    padding: 40px 46px;
  margin-bottom: 20px;
  position: relative;
`;
const FormTitle = styled.h1`
    color: #0E234B;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  margin-bottom: 20px;
`;
const Formgroup = styled.div`
  margin-bottom: 20px;
  position: relative;
  @media (max-width: 1600px) {
   margin-bottom: 10px;
  }
`;
const LabelArea = styled.div`
  position: relative;
  color: #7377A9;
  font-size: 16px;
  margin-bottom: 10px;
  @media (max-width: 1600px) {
    font-size: 16px;
    padding-left: 25px;
  }
`;
const Input = styled.input`
  outline: none;
  border: 1px solid #EAECEE;
  border-radius: 5px;
  display: block;
  width: 100%;
  font-size: 16px;
  padding: 10px 16px;
  background-color: #EAECEE;
  &:hover,
  &:focus {
    border-color: #B8C3D6;
    box-shadow: 0 2px 8px #C9DCFF;
  }
  &::placeholder {
    color: #CBCBCB;
    opacity: 1;
  }
  &::-ms-input-placeholder {
    color: #CBCBCB;
  }
  &::-ms-input-placeholder {
    color: #CBCBCB;
  }
  @media (max-width: 1600px) {
    padding: 8px 16px;
    font-size: 16px;
  }
`;
const InputFile = styled.input`
  text-align: center;
  outline: none;
  border: none;
  background-color: #fff;
  border-radius: 5px;
  display: block;
  width: 100%;
  font-size: 16px;
  padding: 20px 16px;
`;
const InputNote = styled.p`
  color: #6D6D72;
  font-size: 16px;
  margin: 10px 0;
`;


// Modal
const ModalIcon = styled.img`
  margin: 0 auto 20px;
`;
const ModalTitle = styled.h1`
  color: #FD576C;
  font-size: 50px;
  font-weight: bold;
`;
const ModalText = styled.h1`
  color: #6D6D72;
  font-size: 16px;
`;