export default interface IUserDB {
  accStatus: 'active' | 'inactive',
  accType: 'admin' | 'user',
  email: string,
  name: string,
  userId: number,
}