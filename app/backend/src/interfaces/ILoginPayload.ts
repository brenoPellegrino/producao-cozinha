/* eslint-disable max-lines */

export default interface Payload {
  userId: number,
  email: string,
  accType: 'admin' | 'user',
  accStatus: 'active' | 'inactive'
};