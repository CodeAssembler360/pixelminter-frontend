import React from "react";
import { Table } from "react-bootstrap";

const table = [{}];

function GuidePagePlans() {
  return (
    <Table className="table-s2" striped bordered responsive>
      <thead>
        <tr>
          <th></th>
          <th>Free</th>
          <th>Pay Up-Front</th>
          <th>Minting</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of NFTs</td>
          <td>Generate up to 100</td>
          <td>Generate large volume collection up to 10,000</td>
          <td>Generate large volume collection up to 10,000</td>
        </tr>
        <tr>
          <td>Services Included</td>
          <td>
            Lets the user experience the convenience of using Pixel Minter to
            generate collections.
          </td>
          <td>
            Users can generate a large volume of unique characters and download
            them.
          </td>
          <td>After generating a collection users can mint their NFTs. </td>
        </tr>
        <tr>
          <td>Payment</td>
          <td>None</td>
          <td>$0.10 for each illustration</td>
          <td>7.5% commission on the sale of the original NFT. </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default GuidePagePlans;
