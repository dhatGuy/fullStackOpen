import { Button } from "@chakra-ui/button";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={{ display: visible ? "none" : "" }}>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        {children}
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
