import * as CryptoJS from "crypto-js"
import { environment } from "src/environments/environment.development"

export const encrypt = (data: string) => CryptoJS.AES.encrypt(data, environment.KEY).toString();

export const decrypt = (value: string) => CryptoJS.AES.decrypt(value, environment.KEY).toString(CryptoJS.enc.Utf8);