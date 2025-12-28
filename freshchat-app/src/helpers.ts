export interface UserConfig {
  userId: string;
  name: string;
  restoreId?: string;
  enabled: boolean;
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const setCookie = (name: any, value: any, days: any) => {
  // this is for testing purpose
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
};

export class UserAPIRest {
  static users: UserConfig[] = [
    {
      userId: "email1@gmail.com",
      name: "email1@gmail.com",
      restoreId: "57daff9f-4caa-401c-b63c-42af6e7171c8",
      enabled: true,
    },
    {
      userId: "email2@gmail.com",
      name: "email2@gmail.com (chat not available)",
      restoreId: "8c526ed0-d384-4af7-a8ba-d2df1a0fc4e8",
      enabled: true,
    },

    {
      userId: "email3@gmail.com",
      name: "email3@gmail.com (usuario nuevo)",
      enabled: true,
    },
    {
      userId: "email4@gmail.com",
      name: "email4@gmail.com (chat not available)",
      restoreId: "8c526ed0-d384-4af7-a8ba-d2df1a0fc4e8",
      enabled: false,
    },
  ];
  static async getUserInfo(userId: string) {
    await delay(100);
    const userFinded = this.users.find((user) => user.userId == userId);
    if (!userFinded) {
      throw new Error("user not founded");
    }
    return userFinded;
  }
  static getUsers = async () => {
    await delay(2 * 1000);
    return this.users;
  };
}
