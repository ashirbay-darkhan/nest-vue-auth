import {PassportStrategy} from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Валидирует и декодирует jwt
      ignoreExpiration: false,
      secretOrKey: 'SECRET' // != to env
    });
  }

  async validate(payload: any) {
    // const user = await this.userService.getById(payload.sub)
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      // ...user
    }
  }
}