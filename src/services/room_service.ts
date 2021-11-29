import { userService } from "./users_service";

export interface Room {
  id?: number;
  type: "contact" | "group";
  user_id: number;
  contact_id: number;
  room_name: string;
  socket_id: string;
}

export interface Where {
  user_id: number;
  contact_id: number;
}

export class RoomService {
  private rooms: Room[] = [
    {
      id: 1,
      user_id: 1,
      contact_id: 2,
      type: "contact",
      room_name: "VictorTurraF_AmandaTF",
      socket_id: "pCa4ETzD4WUzzEffAAAD",
    },
    {
      id: 2,
      user_id: 1,
      contact_id: 3,
      type: "contact",
      room_name: "VictorTurraF_GABf",
      socket_id: "pCa4ETzD4WUzzEffAAAD",
    },
    {
      id: 3,
      user_id: 2,
      contact_id: 1,
      type: "contact",
      room_name: "VictorTurraF_AmandaTF",
      socket_id: "pCa4ETzD4WUzzEffAAAD",
    },
    {
      id: 4,
      user_id: 2,
      contact_id: 3,
      type: "contact",
      room_name: "AmandaTF_GABf",
      socket_id: "pCa4ETzD4WUzzEffAAAD",
    },
  ];

  public create(data: Room) {
    const newRoom = { id: this.getNextId(), ...data };
    this.rooms.push(newRoom);
    return newRoom;
  }

  public findWhere(condition: Where) {
    return this.rooms.find((room) => {
      return (
        room.contact_id === condition.contact_id &&
        room.user_id === condition.user_id
      );
    });
  }

  public findByUserId(user_id: number) {
    const foundRooms = this.rooms.filter(
      (room) => room.user_id === user_id
    );

    return foundRooms.map((room) => ({
      ...room,
      user: userService.findById(room.contact_id),
    }));
  }

  private getNextId() {
    return this.rooms.length + 1;
  }
}

export const roomService = new RoomService();
