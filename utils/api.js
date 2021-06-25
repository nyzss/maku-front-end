let dev;
if (process.env.NODE_ENV === "development") {
  dev = true;
} else if (process.env.NODE_ENV === "production") {
  dev = false;
}
const api = dev
  ? "http://localhost:5000"
  : "https://maku-backend.herokuapp.com";

export { api };
