export interface Token{
    expiration:string,
    token:string
}

export interface ResponseAccess{
    result: string;
    data: Token;
    message: string;
}