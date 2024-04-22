import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chat-app-prod-lugb.onrender.com", {
        query: {
          userId: authUser._id
        }
      })

      setSocket(socket);

      // socket.on() is used to listen for events from the server and from other clients
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};