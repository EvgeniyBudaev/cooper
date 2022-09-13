import axios from "axios";
import { fetchApi } from "~/shared/api";
import { apiDomainFunction } from "~/shared/domain";

const config = {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
};

// export const getContacts = async (body: any) => {
//     const response = await axios.post("http://localhost:5000/api/v1/users/login", body, config);
//     console.log("response: ", response);
//     return response.data;
// }; 

export const getContacts = apiDomainFunction(
  )((request, data) =>
    fetchApi(request, `/api/v1/users/login`, {
      method: 'POST',
      body: data,
    }),
  );