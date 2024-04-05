import React from "react";
import "./Footer.css";
export default function Footer(data) {
  function handlePageChange(value) {
    data.setPageNum(value);
  }
  function dispPageNum() {
    const pageNums = [];
    for (let i = 0; i < data.totalPages; i++) {
      pageNums.push(
        <button
          key={i}
          onClick={() => {
            handlePageChange(i);
          }}
          className={data.pageNums === i ? "active" : ""}
        >
          {i + 1}
        </button>
      );
    }
    return pageNums;
  }
  function handleFirstPage() {
    handlePageChange(0);
  }
  function handLastPage() {
    handlePageChange(data.totalPages - 1);
  }
  function handleDeleteSelected() {
    const selectedRowIds = data.currentPagedata
      .filter((element) => {
        return element.check;
      })
      .map((element) => {
        return element.id;
      });
    const updatedData = data.data.filter(
      (element) => !selectedRowIds.includes(element.id)
    );
    data.setOverAllData(updatedData);
  }
  return (
    <>
      <div className="footer-wrapper">
        <div className="footer">
          <button onClick={handleDeleteSelected}>Delete SeLected</button>
          <button onClick={handleFirstPage}>{" <<< "}</button>
          {dispPageNum()}
          <button onClick={handLastPage}>{">>>"}</button>
        </div>
      </div>
    </>
  );
}
