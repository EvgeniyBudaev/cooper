import { createApi } from "../domain";
import { ServerSession } from "./ServerSession";

const sessionStorage = ServerSession.storage;

export const { fetchApi, setApiLanguage } = createApi({
    basePath: "http://localhost:5000",
    sessionStorage: sessionStorage,
    timeout: 30000,
    retry: 1,
  });
  