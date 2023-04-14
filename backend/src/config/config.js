const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "password",
      database: "eventmanager",
    },
    listPerPage: 10,
  };
  const apiServerPort= 4000
  module.exports = {config, apiServerPort};