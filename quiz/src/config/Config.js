const dev = {
  BASE_URL: "http://localhost:8080/api/v1"
};

const prod = {
  BASE_URL: "http://localhost:8080/api/v1"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default {
  ...config,
  TIMEOUT: 60000
};
