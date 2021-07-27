module.exports = {
  addPagination: async (rows, query) => {
    const full_count = rows[0] ? Number(rows[0].full_count) : 0;
    const current_page = query && query.page ? Number(query.page) : 1;
    const total_pages = full_count > 6 ? Math.ceil(full_count / 6) : 1;
    if (rows[0]) {
      rows = rows.map(rows => {
        delete rows.u_id;
        delete rows.full_count;
        return rows;
      });
    }
    const result = {
      'current_page': current_page,
      'total_pages': total_pages,
      'full_count': full_count,
      'listings': rows
    }
    // console.log({ rows });
    // console.log({ result });
    return result;
  }
}