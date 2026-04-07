import { APIRequestContext } from "@playwright/test";
import apiPathData from "../data/api-data/api-path-data.json";
import CommonUtil from "./CommonUtil";
import process from "process";
export default class CommonApiUtils {
    private request: APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    public async createToken() {
        const commonUtilObj = new CommonUtil()
        const apiUserName = commonUtilObj.decryptData(process.env.API_USER_NAME!);
        const apiPassword = commonUtilObj.decryptData(process.env.API_PASSWORD!);
        console.log("Decrypted API User Name: ", apiUserName);
        console.log("Decrypted API Password: ", apiPassword);
        const createTokenResponse = await this.request.post(apiPathData.auth_path, {
            data : {username : apiUserName, password : apiPassword}
        })
        const createTokenJsonResp= await createTokenResponse.json();
        return createTokenJsonResp.token;
    }
}