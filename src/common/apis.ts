import axios from 'axios';

const httpClient = axios.create();
httpClient.interceptors.response.use(
  (v) => {
    return v;
  },
  (rej) => {
    if (rej?.response?.data?.code) {
      return rej?.response;
    } else {
      throw rej;
    }
  },
);

export const fetchUserOpenidByPhone = async (token: string, phone: number) => {
  const res = await httpClient.post(
    'https://open.feishu.cn/open-apis/contact/v3/users/batch_get_id?user_id_type=open_id',
    {
      mobiles: [phone.toString()],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const fetchTenantAccessToken = async (
  token: string,
  appId: string,
  appSecret: string,
) => {
  const res = await httpClient.post(
    'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    {
      app_id: appId,
      app_secret: appSecret,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const fetchUserDetailByUserOpenid = async (
  token: string,
  openid: string,
) => {
  const res = await httpClient.get(
    `https://open.feishu.cn/open-apis/contact/v3/users/${openid}?department_id_type=open_department_id&user_id_type=open_id`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const fetchSendMsg = async (
  token: string,
  openid: string,
  msgType: string,
  content: string,
) => {
  const res = await httpClient.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id',
    {
      receive_id: openid,
      msg_type: msgType,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};
