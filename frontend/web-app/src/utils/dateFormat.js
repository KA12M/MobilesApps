export function formatISODateToThaiDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "long", day: "numeric",hour : "numeric", minute :"numeric"};
  const thaiDate = date.toLocaleDateString("th-TH", options);
  return thaiDate;
}
