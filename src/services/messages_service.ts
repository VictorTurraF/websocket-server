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

  private getNextId() {
    return this.messages.length + 1;
  }
}