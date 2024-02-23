export function axiosParams(paramsValue, predicate) {
  const params = new URLSearchParams();
  params.append("currentPage", paramsValue.currentPage);
  params.append("pageSize", paramsValue.pageSize);

  // loop object for append to params
  if (predicate)
    predicate.forEach((value, key) => {
      if (value) params.append(key, value);
    });
  return params;
}
