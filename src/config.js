// const NODE_ENV = "DEV"
const NODE_ENV = "PROD"
const BASE_URL_DEV = "http://localhost:8000/"
const BASE_URL = NODE_ENV==="DEV"?"BASE_URL_DEV":"https://mentor-me-server.vercel.app/"

export {BASE_URL, NODE_ENV}