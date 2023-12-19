import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Query,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/userDetail')
  async getUserDetail(@Query('phone') phone: string) {
    const openId = await this.appService.getUserOpenId(+phone);
    if (!openId) {
      throw new NotFoundException('用户不存在');
    }
    const userDetail = await this.appService.getUserDetail(openId);
    return userDetail;
  }

  @Post('/sendMessage')
  async sendMessage(
    @Body('openid') openid: string,
    @Body('content') content: string,
    @Body('msgType') msgType = 'text',
  ) {
    const res = await this.appService.sendMessage(openid, msgType, content);
    return res;
  }
}
