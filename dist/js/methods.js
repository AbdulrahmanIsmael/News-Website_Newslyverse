/* Filtering uncompleted data */
export function filterData(arr) {
  return arr.filter(
    data => data.image && data.title && data.source.name && data.description
  );
}
