import React from "react";
import { GetCookie, SetCookie } from "../CookieHandler/CookieHandler";
import axios from "axios";

var Configuration = {
  BASE_URL_CONTENT: "https://app-rpanel.herokuapp.com/",
  BASE_URL_PANEL: "https://app-rpanel.herokuapp.com/",
  BASE_URL_UPLOAD: "https://app-spanel.herokuapp.com/",
  CLIENT_ID: "1d42c55e-0f44-4613-adba-a5bbbca878e1",
  SPACE_ID: "5cf3883dcce4de00174d48cf",
  Auth: CheckAuthToken,
  URLs: {
    submit_form: "api/v1/requests/submit",
    filter_contents: "api/v1/lists",
    upload: "asset/upload",
    login: "api/v1/customers/requestcode",
    verify_code: "api/v1/customers/verifycode",
    my_requests: "api/v1/requests/myrequests",
    get_initial_token: "api/v1/auth/token"
  },
  CONTENT_TYPE_ID: {
    partnership: "5d358ebc8e6e9a0017c28fc9",
    coworking: "5cfc95472606810017dca194",
    dedicated_office: "5cf7e7449916860017805408",
    session_room: "5cf7e7289916860017805407",
    private_desk: "5d36a9d78e6e9a0017c28fd9",
    shared_desk: "5d5027842039ce674338a500",
    partnership_working_fields: "5d4169c642afbf00179b0569",
    coworking_working_field: "5d3af3a1a9602900177a5056",
    list_of_countries: "5d35e6e68e6e9a0017c28fcd",
    list_of_cities: "5d35e6fa8e6e9a0017c28fce",
    sessionroom_equipments: "5d5bcb6eed9a82001737c751",
    contact_us: "5d3e97363a65540017a90f11",
    requests_list: "5d26e7e9375e9b001745e84e",
    request_stages: "5d6b5d205b60dc0017c95118"
  }
};
function CheckAuthToken() {
  return new Promise((resolve, reject) => {
    if (GetCookie("SSUSERAUTH")) {
      resolve(GetCookie("SSUSERAUTH").TOKEN);
    } else if (GetCookie("SSGUESTAUTH")) {
      resolve(GetCookie("SSGUESTAUTH"));
    } else {
      GetInitialToken(token => {
        if (token) {
          resolve(token);
        } else {
          reject("Error Occured!");
        }
      });
    }
  });
}
function GetInitialToken(callback) {
  return axios({
    url: Configuration.BASE_URL_PANEL + Configuration.URLs.get_initial_token,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientid: Configuration.CLIENT_ID
    }
  })
    .then(res => {
      if (res.data.success) {
        SetCookie(
          "SSGUESTAUTH",
          res.data.access_token,
          res.data.expiresIn / (1000 * 60 * 60 * 24)
        );
        callback(res.data.access_token);
      }
    })
    .catch(err => {
      callback("");
      console.error("get initial token error: ", err);
    });
}

export default Configuration;
