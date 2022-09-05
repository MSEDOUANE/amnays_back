const config = {
  // db: {
  //   /* don't expose password or any sensitive info, done only for demo */
  //   host: "localhost",
  // user: "amnays",
  // password: "TLS/@2021",
  // database: "amnays",
  // },
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "db-mysql-lon1-84758-do-user-12377163-0.b.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_sc_G6AQgj0JsXPxQ2f4",
    database: "defaultdb",
    port:"25060"
  },
  listPerPage: 8,
};

module.exports = config;
