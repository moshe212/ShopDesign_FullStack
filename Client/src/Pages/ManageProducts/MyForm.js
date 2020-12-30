import React from "react";

const MyForm = () => {
  const Submit = (event) => {
    // event.preventDefault();

    const Image = document.querySelector(".Form #Image");
  };
  return (
    <div>
      <div className="Form">
        <input type="file" id="Image" name="Image"></input>
        <br></br>

        <button onClick={Submit}>Add Item</button>
      </div>
    </div>
  );
};

export default MyForm;
