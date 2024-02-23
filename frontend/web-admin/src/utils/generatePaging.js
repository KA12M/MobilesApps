export function generatePagination(currentPage  , totalPages  ) {
  const pagination = [];
  const pagesToShow = 7; // จำนวนของหน้าที่จะแสดงใน pagination bar
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagination.push(i);
  }

  return pagination;
}
