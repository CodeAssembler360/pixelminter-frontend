import React from "react";
import { Accordion } from "react-bootstrap";

const list = [
  {
    q: "How long does it take to finish generating a collection?",
    a: "This depends on the size of the collection and how busy the software is at the time of your request. We are doing our best to ensure that collections are created quickly but sometimes if demand is extremely high, this can take some time to complete.",
  },
  {
    q: "How long does it take before I can access the NFTs (Collection) I generated?",
    a: "This depends on the size of the collection and how busy the software is at the time of your request. We are doing our best to ensure that collections are created quickly but sometimes if demand is extremely high, this can take some time to complete.",
  },
  {
    q: "How many NFTs can I generate in one collection?",
    a: "This depends on the size of the collection and how busy the software is at the time of your request. We are doing our best to ensure that collections are created quickly but sometimes if demand is extremely high, this can take some time to complete.",
  },
  {
    q: "How much would it cost me to generate and mint my NFTs on PixelMinter?",
    a: "This depends on the size of the collection and how busy the software is at the time of your request. We are doing our best to ensure that collections are created quickly but sometimes if demand is extremely high, this can take some time to complete.",
  },
  {
    q: "Im generating a collection and the NFTs generated look the same, what can I do to fix this?",
    a: "This depends on the size of the collection and how busy the software is at the time of your request. We are doing our best to ensure that collections are created quickly but sometimes if demand is extremely high, this can take some time to complete.",
  },
];

function FAQ() {
  return (
    <Accordion className="accordionV2" defaultActiveKey="0">
      {list.map((item, index) => (
        <Accordion.Item key={index} eventKey={`${index}`}>
          <Accordion.Header>{item.q}</Accordion.Header>
          <Accordion.Body>{item.a}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FAQ;
