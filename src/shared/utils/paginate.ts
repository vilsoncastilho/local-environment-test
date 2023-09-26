interface IPaginateRequest {
  array: any[];
  page_size: number;
  page_number: number;
}

export const paginate = ({ array, page_size, page_number }: IPaginateRequest) => {
  const total_pages = Math.ceil(array.length / page_size);
  const data = array.slice((page_number - 1) * page_size, page_number * page_size);

  const paginatedData = {
    page_size,
    page_number,
    total_pages,
    data,
  };

  return paginatedData;
}
