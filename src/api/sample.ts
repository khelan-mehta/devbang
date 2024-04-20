import requests from "@/utils/requests";
import { AxiosError } from "axios";

export async function GET() {
    try {
        const result = await requests.get("/hello");
        return Response.json(result);
    } catch (err: any) {
        if(!(err instanceof AxiosError)) return Response.json(err.message);

        // if its an error in axios api call lifecycle then pass it as is.
        return Response.json(err.toJSON());
    }
}