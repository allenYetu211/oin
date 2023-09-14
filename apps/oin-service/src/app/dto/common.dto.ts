export class ResponseSucceedDTO {
  constructor(
    public statusCode: number,
    public message: string,
    public data: any
  ) {}
}

export class ResponseErrorDTO {
  constructor(public statusCode: number, public message: string) {}
}
