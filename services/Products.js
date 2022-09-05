const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const table = 'produits';
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const results = await getAll();
  let numRows = results.data.length;
  let numPages = Math.ceil(numRows / config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM ${table} LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, numPages };

  return {
    data,
    meta,
  };
}
async function getAll() {
  const rows = await db.query(
    `SELECT * 
    FROM ${table}`
  );
  const data = rows;

  return {
    data,
  };
}

async function get(key, value) {
  const rows = await db.query(
    `SELECT * 
    FROM ${table} where ${key} =${value}`
  );
  const data = rows[0];

  return data;
}


async function search(r) {
  const offset = helper.getOffset(r.paging.page, config.listPerPage);
  let categories = r.category;
  if (Array.isArray(categories)) {
    categories = categories.join(",");
  }
  let query =
    `SELECT *
FROM ${table} where ('${r.category || 0}' = '0' or  categorie IN('${categories || 0}'))
AND (${r.prixMin || 0} = 0 or  prix >=${r.prixMin || 0}) 
AND (${r.prixMax || 0} = 0 or  prix <=${r.prixMax || 0}) 
AND ('${r.bestSellings || 0}' = '0' or  meilleurV ='${r.bestSellings || 0}') 
AND ('${r.displayCarousel || 0}' = '0' or  DisplayCarousel ='${r.displayCarousel || 0}') 
`
  const results = await db.query(query);

  let numRows = results.length;
  let numPages = Math.ceil(numRows / config.listPerPage);
  const rows = await db.query(
    `${query} LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page: r.paging.page, numPages };
  console.log(`${query} LIMIT ${offset},${config.listPerPage}`);
  return {
    data,
    meta,
  };
}



async function create(r) {
  let keys = '', values = '';
  Object.keys(r).forEach((v, i) => {

    keys = keys + (i === 0 ? `(${v},` : (i === Object.keys(r).length - 1) ? `${v})` : `${v},`)
    values = values + (i === 0 ? `("${r[v]}",` : (i === Object.keys(r).length - 1) ? `"${r[v]}")` : `"${r[v]}",`)

  });

  const result = await db.query(
    `INSERT INTO ${table} 
    ${keys}
    VALUES 
    ${values}`
  );
  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "product created successfully";
  }

  return { message };
}

async function update(r) {
  let s = '';
  Object.keys(r.body).forEach((v, i) => {
    s = s + ((i !== Object.keys(r.body).length - 1) ? `${v}='${r.body[v]}',` : `${v}='${r.body[v]}'`)
  });
  const result = await db.query(
    `UPDATE ${table} 
    SET '${s}'
    WHERE id=${r.params.id}`
  );

  let message = "Error in updating product";

  if (result.affectedRows) {
    message = "product updated successfully";
  }

  return { message };
}

async function remove(r) {
  let id = r.params.id
  const result = await db.query(
    `DELETE FROM ${table} WHERE id=${id}`
  );

  let message = "Error in deleting product";

  if (result.affectedRows) {
    message = "product deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getAll,
  get,
  search
};
