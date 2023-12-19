import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  fetchUserOpenidByPhone,
  fetchTenantAccessToken,
  fetchUserDetailByUserOpenid,
  fetchSendMsg,
} from './common/apis';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  private appId = 'cli_a48565c3097c900d';
  private appSecret = '7MmUz614jZzusG67RcM6tcPFpQBUzhdQ';
  private tenantAccessToken = '';
  constructor() {
    this.getTenantAccessToken();
  }

  getTenantAccessToken = async () => {
    const res = await fetchTenantAccessToken(
      this.tenantAccessToken,
      this.appId,
      this.appSecret,
    );
    const { data } = res;
    if (data?.code === 0 && data?.tenant_access_token) {
      this.tenantAccessToken = data.tenant_access_token;
    }
    console.log(data);
    setTimeout(
      () => {
        this.getTenantAccessToken();
      },
      // 如果请求失败，30s 后进行重试，防止被认为是 dos 被拉黑
      data?.expire ? (data?.expire - 60) * 1000 : 30 * 1000,
    );
  };

  getHello(): string {
    return '欢迎使用 raina 飞书 api';
  }

  getUserOpenId = async (phone: number) => {
    const res = await fetchUserOpenidByPhone(this.tenantAccessToken, phone);
    const { data } = res;
    if (
      data?.code === 0 &&
      data?.data &&
      Array.isArray(data?.data?.user_list) &&
      data?.data?.user_list.length
    ) {
      return data.data.user_list[0].user_id;
    } else {
      throw new NotFoundException(data?.msg);
    }
  };

  getUserDetail = async (openid: string) => {
    const res = await fetchUserDetailByUserOpenid(
      this.tenantAccessToken,
      openid,
    );
    const { data } = res;
    if (data?.code === 0 && data?.data?.user) {
      return data.data.user;
    } else {
      throw new NotFoundException(data?.msg);
    }
  };

  sendMessage = async (openid: string, msgType: string, content: string) => {
    const res = await fetchSendMsg(
      this.tenantAccessToken,
      openid,
      msgType,
      content,
    );
    const { data } = res;
    if (data?.code === 0) {
      return '发送成功!';
    } else {
      throw new HttpException(data?.msg || '发送失败', 500);
    }
  };
}
