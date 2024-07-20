export const paginate = (arr, currentPage, pagesize) => {
    let startIndex = currentPage * pagesize;
    let endIndex = startIndex + pagesize;
    return arr?.slice(startIndex, endIndex)
}