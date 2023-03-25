import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import VerticalStepper from './VerticalStepper'
import Button from "@mui/material/Button";

export default function SimpleBackdrop({open,setOpen,pricing,step}) {
  const handleClose = () => {
    // setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div >
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 ,display:'flex' }}
        open={open}
        onClick={handleClose}
      >
        <VerticalStepper step={step} pricing={pricing}/>
      </Backdrop>
    </div>
  );
}
