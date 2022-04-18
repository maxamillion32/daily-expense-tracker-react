import React from "react";
import Input from "../../../../common/components/Input/Input";


export const Title = ({header, title, onChange, classes}) => (
  <div className={classes.Type}>
    <p className={classes.Label}>
      {`Name of ${header === "Categories" ? "category" : "account"}`}
    </p>
    <Input
      type="text"
      name="title"
      placeholder={`Type the new name for the ${header === "Categories" ? "category" : "account"}`}
      value={title}
      onChange={onChange}
    />
  </div>
);
