import { AxiosHeaders } from "axios";
import Client, { requestFetcher } from "./Client";

const headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
});

// console.log("Checking if loading env vars properly! ", process.env.BASE_URL+process.env.API_LOCAL_ADMIN);

const requests: requestFetcher = new Client({
    baseURL: process.env?.NEXT_PUBLIC_BASE_URL+process.env?.NEXT_PUBLIC_API_PROD,
    timeout: 0,
    headers: headers
}, null, false, true);

export default requests;
