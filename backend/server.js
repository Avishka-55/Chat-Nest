import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js"
import userRouter from "./routes/userRoutes.js"
import messageRouter from "./routes/messageRoute.js"
import {Server} from "socket.io"


const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)




// start socket io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

// Store online users

export const userSocketMap = {}

// connection handler

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId
  console.log("User Connected:", userId)

  if (userId) userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})



app.use(express.json({limit: "4mb"}))
app.use(cors());
app.use("/api/status", (req, res)=>{
    res.send("server is running")
})
app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter)

await connectDB()

server.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    
})