export interface UserDataType {
  id: string;
  userName: string;
  email: string;
  userProgress: string[],
};

export interface IUser {
  userEmail: string;
  userPassword: string;
  userName?: string;
  userProgress?: string[],
}