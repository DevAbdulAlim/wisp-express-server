import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  // Joining a room
  socket.on("join room", (room: string) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Leaving a room
  socket.on("leave room", (room: string) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  // Sending a message to a specific room
  socket.on(
    "chat message",
    ({ room, message }: { room: string; message: string }) => {
      io.to(room).emit("chat message", message);
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
