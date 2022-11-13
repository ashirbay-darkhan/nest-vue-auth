import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthenticatedGuard} from "./auth/authenticated.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

//  POST /login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req):any {
    return this.authService.login(req.user)  // return JWT access token
  }


//  GET /protected
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string { // require an Bearer token, validate token
    return req.user
  }

}
