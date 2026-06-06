import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "./src/config.js";
import authRoutes from "./src/routes/auth.js";
import roomRoutes from "./src/routes/rooms.js";
import initializeSocket from "./socket/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const server = http.createServer(app);
//Сервер
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
//Ссылка на локальный сервер
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

initializeSocket(io);

app.use(errorHandler);
//Порт сервера
const PORT = config.port || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

startServer();
