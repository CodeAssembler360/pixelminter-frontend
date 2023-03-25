import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const free = ["Uploading Images", "Generating Nft", "Creating zip file"];

const upfront = [
  "Payment",
  "Uploading Images",
  "Generating Nft",
  "Creating zip file",
];
const minting = [
  "Payment",
  "Uploading Images",
  "Generating Nft",
  "Creating zip file",
  "Pinata",
  "Creating Cid",
];
const CustomisedConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: "50px",
  },
}));
export default function VerticalStepper({ pricing, step }) {
  return (
    <Box
      className=" h-100 w-100  row  justify-content-center align-items-center"
      style={{
        flexDirection: "row",
        background: "#ECF2FD",
      }}
    >
      <div className="d-flex text-center justify-content-center align-items-center col-6 flex-column">
        <h2
          style={{
            color: "#0E234B",
            fontWeight: "bold",
            padding: "10px 0px",
            fontSize: "30px",
          }}
        >
          Generating Artwork
        </h2>

        <Stepper
          activeStep={step}
          connector={<CustomisedConnector />}
          orientation="vertical"
        >
          {pricing == "free" &&
            free.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h7">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          {pricing == "upfront" &&
            upfront.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h7">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          {pricing == "minting-fee" &&
            minting.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h7">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
        </Stepper>
      </div>
      <img
        className="col-6 col-hidden"
        src="/images/loading.gif"
        style={{
          objectFit: "fill",
          zIndex: 0,
        }}
      />
    </Box>
  );
}
