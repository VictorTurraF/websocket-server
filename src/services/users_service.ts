export interface User {
  id?: number;
  full_name: string;
  nickname: string;
  password?: string;
}

export class UserService {
  private users: User[] = [
    {
      id: 1,
      full_name: "Victor Turra",
      nickname: "VictorTurraF",
      password: "victor123",
    },
    {
      id: 2,
      full_name: "Amanda Turra",
      nickname: "AmandaTF",
      password: 'amanda123'
    },
    {
      id: 3,
      full_name: "Gabriel Florencio",
      nickname: "GABf",
      password: 'gab123'
    },
  ];

  public findAll () {
    return this.users.map(({ id, full_name, nickname  }) => ({
      id,
      full_name,
      nickname
    }));
  }

  public findByNickName (nickname: string) {
    return this.users.find(user => user.nickname === nickname)
  }

  public findById (id: number) {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      return user
    }

    return {
      id: user.id,
      full_name: user.full_name,
      nickname: user.nickname,
    }
  }
}

export const userService = new UserService()