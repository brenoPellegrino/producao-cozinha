/* eslint-disable max-lines */
export default interface IUsers {
  userId: number,
  name: string,
  email: string,
  password?: string,
  accType: "admin" | "user",
  accStatus: "active" | "inactive"
}
