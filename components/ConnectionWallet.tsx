import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ConnectionWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const dipatch = useDispatch();
  return <details
   open={isOpen}>ConnectionWallet
   </details>;
}

export default ConnectionWallet;
