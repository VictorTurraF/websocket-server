export interface Room {
  id?: number;
  type: "contact" | "group";
  user_id: string;
  contact_id: string;
  room_name: string;
  socket_id: string;
}

export interface Where {
  user_id: string;
  contact_id: string;
}

export class RoomService {
  private rooms: Room[] = [];

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

  private getNextId() {
    return this.rooms.length + 1;
  }
}
