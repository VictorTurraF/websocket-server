import { io } from "./http";
import { MessageService } from "./services/messages_service";
import { RoomService } from "./services/room_service";

const roomService = new RoomService();
const messagesService = new MessageService();

io.on("connection", (socket) => {
  console.log("socket connected: ", socket.id);

  socket.on("select_room", (data, callback) => {
    const { room_name } = data
    socket.join(room_name);

    const userInRoom = roomService.findWhere({
      user_id: data.user.id,
      contact_id: data.contact.id,
    });

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      roomService.create({
        user_id: data.user.id,
        contact_id: data.contact.id,
        type: data.type,
        room_name,
        socket_id: socket.id,
      });
    }

    const messages = messagesService.findByRoomName(room_name)

    console.log(messages)

    callback({ messages, room_name })
  });

  socket.on("message", (data) => {
    console.log(data)
    const message = {
      room_name: data.room_name,
      author_nickname: data.author_nickname,
      author_name: data.autor_name,
      description: data.description,
      created_at: new Date(),
    };

    messagesService.create(message);

    io.to(data.room_name).emit("message", message);
  });
});
