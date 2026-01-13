import { createContext, useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [authUser, setAuthUser] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socket, setSocket] = useState(null)

  // ================= CHECK AUTH =================
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check")
      if (data.success) {
        setAuthUser(data.user)
        connectSocket(data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ================= LOGIN / SIGNUP =================
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials)

      if (data.success) {
        setAuthUser(data.userData)
        setToken(data.token)

        // ⭐ Correct JWT header
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
        localStorage.setItem("token", data.token)

        connectSocket(data.userData)
        toast.success(data.message || "Success")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setAuthUser(null)
    setOnlineUsers([])

    delete axios.defaults.headers.common["Authorization"]

    socket?.disconnect()
    setSocket(null)
    toast.success("Logged out successfully")
  }

  // ================= UPDATE PROFILE =================
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body)
      if (data.success) {
        setAuthUser(data.user)
        toast.success("Profile updated successfully")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // ================= SOCKET CONNECT =================
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
      transports: ["websocket"]
    })

    newSocket.connect()

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds)
    })

    setSocket(newSocket)
  }

  // ================= INIT =================
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      checkAuth()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      authUser,
      onlineUsers,
      socket,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}
