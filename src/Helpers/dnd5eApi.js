import * as axios from "axios";

export default class Dnd5eApi {
  constructor() {
    this.client = null;
    this.api_url = "https://www.dnd5eapi.co/api/";
  }

  init = () => {
    let headers = {
      Accept: "application/json",
    };
    this.client = axios.create({
      baseURL: this.api_url,
      headers: headers,
    });

    return this.client;
  };
}
