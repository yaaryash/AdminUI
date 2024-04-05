import React from "react";
import "./PopUp.css";

export default function PopUp(data) {
  // Function to handle input changes in the form fields
  function handleInput(l, value) {
    if (l === "name") {
      data.setPopUpData({
        name: value,
        email: data.popUpData.email,
        role: data.popUpData.role,
      });
    } else if (l === "email") {
      data.setPopUpData({
        name: data.popUpData.name,
        email: value,
        role: data.popUpData.role,
      });
    } else if (l === "role") {
      data.setPopUpData({
        name: data.popUpData.name,
        role: value,
        email: data.popUpData.email,
      });
    }
  }

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    let tempData = data.data;
    for (let i = 0; i < data.data.length; i++) {
      if (tempData[i].id === data.editItemId) {
        tempData[i].name = data.popUpData.name;
        tempData[i].email = data.popUpData.email;
        tempData[i].role = data.popUpData.role;
      }
    }
    data.setEditing(false);
  }

  return (
    <div className="pop-up-container">
      <div className="pop-up">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              className="form-input"
              value={data.popUpData.name}
              onChange={(e) => handleInput("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-input"
              value={data.popUpData.email}
              onChange={(e) => handleInput("email", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={data.popUpData.role === "admin"}
                  onChange={(e) => handleInput("role", e.target.value)}
                  className="radio-input"
                />
                Admin
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="member"
                  checked={data.popUpData.role === "member"}
                  onChange={(e) => handleInput("role", e.target.value)}
                  className="radio-input"
                />
                Member
              </label>
            </div>
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
