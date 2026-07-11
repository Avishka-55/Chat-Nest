import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js"
import userRouter from "./routes/userRoutes.js"
import messageRouter from "./routes/messageRoute.js"
import { Server } from "socket.io"
import { register, httpRequestDuration, connectedUsers } from "./metrics.js"


const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)




// start socket io server
export const io = new Server(server, {
    cors: { origin: true, credentials: true }

})

// Store online users

export const userSocketMap = {}

// connection handler

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId
  console.log("User Connected:", userId)

  if (userId) userSocketMap[userId] = socket.id

  connectedUsers.set(Object.keys(userSocketMap).length)
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId)
    delete userSocketMap[userId]
    connectedUsers.set(Object.keys(userSocketMap).length)
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})



app.use(express.json({limit: "4mb"}))
app.use(cors())

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer()
  res.on("finish", () => {
    end({ method: req.method, route: req.route?.path || req.path, status: res.statusCode })
  })
  next()
})

app.get("/api/status", (req, res) => {
    res.status(200).json({ status: "ok" })
})
app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter)

await connectDB()

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`)
})

const metricsPort = process.env.METRICS_PORT || 9091
const metricsApp = express()
metricsApp.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType)
  res.end(await register.metrics())
})
metricsApp.listen(metricsPort, "0.0.0.0", () => {
  console.log(`Metrics server started on port ${metricsPort}`)
})
