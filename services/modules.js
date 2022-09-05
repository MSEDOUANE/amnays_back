const db = require("./db");


async function getAllModules() {
    const rowsFooter = await db.query(
        `SELECT * 
        FROM footer`
    );
    const rowsModules = await db.query(
        `SELECT * 
        FROM module`
    );
    const footer = rowsFooter[0];
    const modules = rowsModules[0];

    return {
        footer,
        modules
    };
}

module.exports = {
    getAllModules        ,
  };