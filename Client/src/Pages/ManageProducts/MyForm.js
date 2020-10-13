import React from "react";

const MyForm = () => {
  const Submit = (event) => {
    // event.preventDefault();
    console.log("e");
    // const Modal = document.querySelector(".ant-modal");
    // const title = Modal.querySelector("#title").value;
    const Image = document.querySelector(".Form #Image");
    // const quantity = document.getElementById("#quantity").value;
    // const price = document.getElementById("#price").value;
    // console.log(title);
    console.log(Image.files);
  };
  return (
    <div>
      <div className="Form">
        {/* <form onSubmit={Submit} id="form"> */}
        {/* <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title"></input>
      <br></br> */}
        {/* <label htmlFor="Image">Image:</label> */}
        <input type="file" id="Image" name="Image"></input>
        <br></br>
        {/* <label htmlFor="quantity">Quantity:</label>
      <input type="text" id="quantity" name="quantity"></input>
      <br></br>
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price"></input>
      <br></br> */}
        <button onClick={Submit}>Add Item</button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default MyForm;
