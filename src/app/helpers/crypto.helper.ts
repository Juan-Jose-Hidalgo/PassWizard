import * as CryptoJS from "crypto-js"
import { environment } from "src/environments/environment.development"

/**
 * Encrypts a string using the AES algorithm and a given key.
 * @param data - The string to be encrypted.
 * @returns The encrypted string.
 */
export const encrypt = (data: string) => CryptoJS.AES.encrypt(data, environment.KEY).toString();

/**
 * Decrypts a string using the AES algorithm and a given key.
 * @param value - The encrypted string to be decrypted.
 * @returns The decrypted string.
 */
export const decrypt = (value: string) => CryptoJS.AES.decrypt(value, environment.KEY).toString(CryptoJS.enc.Utf8);