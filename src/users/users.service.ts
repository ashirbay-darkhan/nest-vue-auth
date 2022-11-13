import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid'
import {User} from "./users.model";


@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: "1",
      name: 'John',
      phone: "123123123",
      address: "Lorem, st. Ipsum, 123",
      email: "john@asd",
      info: "info",
      password: 'root',
    },
    {
      id: "2",
      name: 'Doe',
      phone: "123123132",
      address: "Lorem, st. Ipsum, 123",
      email: "john@asd2",
      info: "info",
      password: 'root2'
    }
  ]

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  async getUsers() {
    return [...this.users]
  }

  async getUser(id: string) {
    return this.getUserById(id)[0]
  }

  private getUserById(id: string): [User, number] {
    const index = this.users.findIndex(u => u.id === id)
    return [this.users[index], index]
  }

  async insertUser( email: string, password: string) {
    const id = uuidv4()
    const newUser: User = {id, email, password}
    this.users.push(newUser)
    return {
      newUser,
      msg: "User successfully registered"
    }
  }

  async updateUser(
    id: string,
    name: string,
    phone: string,
    address: string,
    info: string,
    email: string,
    password: string,
  ) {
    const [targetUser, index] = this.getUserById(id)
    const newUser: User = {...targetUser, name, phone, address, email, info, password}
    this.users[index] = newUser
    return {
      newUser,
      msg: "User updated"
    }
  }

  async deleteUser(id: string) {
    const [_, index] = this.getUserById(id)
    this.users.splice(index, 1)
    return {
      msg: 'User successfully deleted'
    };
  }
}