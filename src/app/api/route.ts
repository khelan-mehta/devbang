import requests from "@/utils/requests";
import { AxiosError } from "axios";
import db from "@/utils/Database";


export async function GET() {
    try {
        const result = await requests.get("/1");
        return Response.json(result);
    } catch (err: any) {
        if(!(err instanceof AxiosError)) return Response.json(err.message);

        // if its an error in axios api call lifecycle then pass it as is.
        return Response.json(err.toJSON());
    }
}