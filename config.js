module.exports = {
    port: process.env.PORT || 3000,
    mongoConnectionString: process.env.MONGO_URL || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  };
  