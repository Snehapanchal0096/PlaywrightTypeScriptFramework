import cryptoJs from 'crypto-js';

export default class CommonUtil {
    private secretKey: string;

    /**
     * Initialize secretkey from environment variable and throw error if not defined.
    */
    constructor(secretKey: string) {
      //this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
        
      if(process.env.SECRET_KEY){
            this.secretKey = process.env.SECRET_KEY;
        } else {
            throw new Error("SECRET_KEY is not defined in environment variables.");
        }
    }

    /**
     * Parameterized method to encrypt data using AES encryption with a secret key.
     * @param data 
     * @returns encrypted data as a string.
     */
    public encryptData(data: string): string {
        const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
        console.log("Encrypted Data: ", encryptedData);
        return encryptedData;
    }

    /**
     * Decrypts the given encrypted data using AES decryption with the same secret key.
     * @param data 
     * @returns Decrypted data as a string.
     */

    public decryptData(encdata: string): string {
        const decryptedData = cryptoJs.AES.decrypt(encdata, this.secretKey).toString(cryptoJs.enc.Utf8);
        console.log("Decrypted Data: ", decryptedData);     
        return decryptedData;
    }

}