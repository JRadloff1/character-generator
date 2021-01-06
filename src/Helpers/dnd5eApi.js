import * as axios from "axios";

export default class Dnd5eApi {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = 'https://www.dnd5eapi.co/api/';
  }

  init = () => {

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };



}
