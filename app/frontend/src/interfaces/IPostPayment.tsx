export default interface IPostPayment {
  body: {
    value: number;
  };
  headers: {
    authorization: string;
  };
}