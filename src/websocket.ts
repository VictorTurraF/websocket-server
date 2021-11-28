import { io } from "./http";
import { RoomService } from "./services/room_service";

const roomService = new RoomService();

io.on("connection", (socket) => {
  console.log("socket connected: ", socket.id);

  socket.on("select_room", (data) => {
    const room_name = `${data.user.nickname}_${data.contact.nickname}`;
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
  });
});
