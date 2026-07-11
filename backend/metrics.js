import client from "prom-client"

const register = new client.Registry()
register.setDefaultLabels({ app: "chatnest-backend" })
client.collectDefaultMetrics({ register })

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
})

const connectedUsers = new client.Gauge({
  name: "chat_connected_users",
  help: "Number of currently connected Socket.IO users",
})

export { register, httpRequestDuration, connectedUsers }
