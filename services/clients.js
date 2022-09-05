const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const table = 'clients';
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM ${table} LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

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
    FROM ${table} where ${key} ='${value}'`
  );
  const data = rows[0];
  console.log(data);

  return data;
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

  let message = "Error in creating ";

  if (result.affectedRows) {
    message = " created successfully";
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

  let message = "Error in updating ";

  if (result.affectedRows) {
    message = " updated successfully";
  }

  return { message };
}

async function remove(r) {
  let id = r.params.id
  const result = await db.query(
    `DELETE FROM ${table} WHERE id=${id}`
  );

  let message = "Error in deleting ";

  if (result.affectedRows) {
    message = " deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getAll,
  get
};
