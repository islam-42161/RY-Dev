import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccountEmail({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method to handle (if needed)
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async createAccountPhone({ phone }) {
    try {
      const userAccount = await this.account.createPhoneSession(ID.unique(),phone);
      if (userAccount) {
        // call another method to handle (if needed)
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginEmail({email,password}){
    try {
        return await this.account.createEmailSession(email,password)
    } catch (error) {
        throw error;
    }
  }
  loginGoogle({navigation}){
    try {
        this.account.createOAuth2Session('google',()=>{
          navigation.navigation('home')
        })
    } catch (error) {
        throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
