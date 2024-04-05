import React, { useEffect, useState } from "react";
import TableDisp from "./TableDisp";
import Footer from "./Footer";
import PopUp from "./PopUp";

export default function Pagination(props) {
  // Destructure the props
  const { data, setData, pageNum, setPageNum, setEditing } = props;

  // State variables
  const [currentPagedata, setCurrentPageData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [editItemId, setEditItemId] = useState(0);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const popUpInit = { name: "", email: "", role: "" };
  const [popUpData, setPopUpData] = useState(popUpInit);

  // Effect for updating the current page data when data or pageNum changes
  useEffect(() => {
    pageDataGenerator();
  }, [data, pageNum]);

  // Effect for handling selection changes
  useEffect(() => {
    selectionHandler();
  }, [selectAllRows]);

  // Handler for updating the selection status of all rows
  function selectionHandler() {
    const updatedData = currentPagedata.map((ele) => ({
      ...ele,
      check: selectAllRows ? 1 : 0,
    }));
    setCurrentPageData(updatedData);
  }

  // Renders the table component
  function tableDisplayer() {
    return (
      <TableDisp
        data={currentPagedata}
        setOverAllData={setData}
        overAllData={data}
        setCurrentPageData={setCurrentPageData}
        currentPagedata={currentPagedata}
        setEditing={setEditing}
        setEditItemId={setEditItemId}
        editItemId={editItemId}
        setPopUpData={setPopUpData}
        pageNum={pageNum}
        setSelectAllRows={setSelectAllRows}
      />
    );
  }

  // Generates the current page data based on the current pageNum
  function pageDataGenerator() {
    const totalPage = Math.floor(data.length / 10);
    setTotalPages(totalPage);

    const start = pageNum * 10;
    const end = (pageNum + 1) * 10;
    let pageData = [];

    if (end <= data.length) {
      pageData = data.slice(start, end);
    } else if (end > data.length) {
      pageData = data.slice(start);
    }
    setCurrentPageData(pageData);
  }

  return (
    <>
      {/* Render the table */}
      {tableDisplayer()}

      {/* Render the footer */}
      <Footer
        totalPages={totalPages}
        currentPage={pageNum}
        setPageNum={setPageNum}
        currentPagedata={currentPagedata}
        setOverAllData={setData}
        data={data}
      />

      {/* Render the popup if editing is enabled */}
      {props.editing && (
        <PopUp
          data={data}
          setEditing={setEditing}
          setData={setData}
          editItemId={editItemId}
          setPopUpData={setPopUpData}
          popUpData={popUpData}
        />
      )}
    </>
  );
}
