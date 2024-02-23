import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationWidget = ({ pagination }) => {
  if (!pagination) return;

  const { currentPage, totalPages, totalItems } = pagination;

  let active = currentPage;
  let items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-between">
      <div>หน้า {active} จาก {totalPages} (ทั้งหมด {totalItems} ข้อมูล)</div>
      <Pagination>{items}</Pagination>
      <div></div>
    </div>
  );
};

export default PaginationWidget;
