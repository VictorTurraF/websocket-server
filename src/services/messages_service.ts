export interface Message {
  id?: number,
  room_name: string,
  author_nickname: string,
  description: string,
  created_at: Date,
}

export class MessageService {
  private messages: Message[] = []

  public create (data: Message) {
    const newMessage = { id: this.getNextId(), ...data };
    this.messages.push(newMessage);
    return newMessage;
  }

  findByRoomName (room_name: string) {
    return this.messages.filter(message => message.room_name === room_name)
  }

  private getNextId() {
    return this.messages.length + 1;
  }
}