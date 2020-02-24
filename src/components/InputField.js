import React from "react";
import { Input, FormFeedback } from "reactstrap";

const InputField = ({ id, onChange, error, value }) => {
  return (
    <>
      <Input
        id={id}
        onChange={onChange}
        invalid={error !== undefined}
        value={value}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </>
  );
};

export default InputField;
