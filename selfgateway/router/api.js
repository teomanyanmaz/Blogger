const axios = require("axios");

const api = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
};

module.exports = api;
