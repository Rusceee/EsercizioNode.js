require("dotenv").config();

module.exports = {
    client_secret: process.env.client_secret,
    client_id: process.env.client_id,
    port: process.env.port || 3001
};