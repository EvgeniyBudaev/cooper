export enum EErrorTypes {
    Abort,
    Server,
  }

  
export type TErrorResponse = {
  type: EErrorTypes;
  response?: Response;
};
