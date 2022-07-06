import React from "react";
import Button from "../../../../common/components/Button/Button";

const FormButtons = ({getIsEditing, update, remove, create, isStateEqual, state}) => {
  return (getIsEditing ? <>
        <Button
          title="Update"
          onClick={update}
          disabled={isStateEqual}
        />

        <Button
          title="Delete"
          onClick={remove}
          disabled={!isStateEqual}
        />
      </>
      : <Button
        title="Create"
        onClick={create}
        disabled={!state.isFormValid}
      />
  );
};

export default FormButtons;
