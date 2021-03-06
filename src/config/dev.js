const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 9000
  },
  database: {
    url: `mongodb://${host}/the-db`,
  },
  key:  
      {privateKey : '37LvDSm4XvjYOh9Y',
       tokenExpireInMinutes: 1440},
  registration : {maxRetries : 3},

};
