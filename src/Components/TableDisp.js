import React from "react";
import "./TableDisp.css";

export default function TableDisp(props) {
  // Destructure the props
  const {
    data,
    setEditItemId,
    setPopUpData,
    setEditing,
    setCurrentPageData,
    setOverAllData,
    setSelectAllRows,
    pageNum,
    overAllData,
    currentPagedata,
  } = props;

  // Handler for edit and delete actions
  function actionHandler(type, value) {
    if (type === "edit") {
      // Set the edit item ID
      setEditItemId(value);

      // Set the popup data with the selected item's details
      setPopUpData({
        name: data[value - 1 - pageNum * 10].name,
        email: data[value - 1 - pageNum * 10].email,
        role: data[value - 1 - pageNum * 10].role,
      });

      // Enable editing mode
      setEditing(true);
    } else if (type === "delete") {

      // Update the data arrays after deleting the selected item
      const temp = overAllData;
      const updatedData = data.filter((element) => element.id !== value);
      const overAllUpdatedData = temp.filter((element) => element.id !== value);
      setCurrentPageData(updatedData);
      setOverAllData(overAllUpdatedData);
    }
  }

  // Handler for selecting/deselecting all rows
  function handleSelectAll(e) {
    setSelectAllRows(e);
  }

  // Handler for selecting/deselecting individual rows
  function handleRowSelection(e) {
    const updatedData = data.map((element) => {
      if (element.id === e) {
        return {
          ...element,
          check: !element.check, // Toggle the check value
        };
      }
      return element;
    });
    setCurrentPageData(updatedData);
  }
  return (
    <>
      <div className="body">
        <table className="table ">
          <thead className="table-heads-wrapper">
            <tr>
              <th className="expand-check-box">
                <input
                  type="checkbox"
                  id="selector"
                  onChange={(e) => {
                    handleSelectAll(e.target.checked);
                  }}
                ></input>
              </th>
              <th className="expand-name">NAME</th>
              <th className="expand-email">EMAIL</th>
              <th className="expand-role">ROLE</th>
              <th className="expand-action">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr
                  key={element.id}
                  className={element.check === 1 ? "selected" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      id="selector"
                      checked={element.check}
                      onChange={() => handleRowSelection(element.id)}
                    ></input>
                  </td>

                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.role}</td>
                  <td className="action-buttons">
                    <span
                      className="action-btn"
                      onClick={(e) => {
                        actionHandler("edit", element.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="edit"
                        key={element.id}
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M19 13.66V19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.34"></path>
                          <path d="m17 1 4 4-10 10H7v-4z"></path>
                        </g>
                      </svg>
                    </span>
                    &nbsp;
                    <span
                      className="action-btn"
                      onClick={(e) => {
                        actionHandler("delete", element.id);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" id="trash">
                        <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path>
                      </svg>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
