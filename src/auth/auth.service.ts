import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, passport: string): Promise<any> {
    const user = await this.usersService.findOne(email)

    //  validation
    if (user && user.password === passport) {
      // const {password, username, ...rest} = user
      // return rest
      return user
    }

    return null
  }


  async login(user: any) {
    const payload = { name: user.name, sub: user.id, email: user.email}

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
