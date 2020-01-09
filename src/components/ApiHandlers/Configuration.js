import {
  GetCookie,
  SetCookie,
  JsonParser,
  JsonToString
} from "../CookieHandler/CookieHandler";
import axios from "axios";
var Configuration = {
  BASE_URL_CASEER:
    process.env.REACT_APP_GATEWAY || "https://adminapi.reqter.com/",
  BASE_URL_REQTER:
    process.env.REACT_APP_BASE_URL_REQTER || "https://requester.reqter.com/",
  BASE_URL_UPLOAD:
    process.env.REACT_APP_BASE_URL_UPLOAD || "https://assets.reqter.com/",
  CLIENT_ID:
    process.env.REACT_APP_CLIENT_ID || "1d42c55e-0f44-4613-adba-a5bbbca878e1",
  SPACE_ID: process.env.REACT_APP_SPACE_ID || "5cf3883dcce4de00174d48cf",
  Auth: CheckAuthToken,
  URLs: {
    get_contenttype_by_id: "ctypes/getbyid",
    submit_form: "api/v1/requests/submit",
    filter_contents: "api/v1/lists",
    filter_contents_get_fullquery: "api/v1/lists/get/fullquery",
    upload: "asset/upload",
    download: "asset/download/",
    login: "api/v1/customers/requestcode",
    verify_code: "api/v1/customers/verifycode",
    partner_login: "api/v1/partners/requestcode",
    partner_verify_code: "api/v1/partners/verifycode",
    all_requests: "api/v1/requests/all",
    all_offers: "api/v1/requests/offers/all",
    get_initial_token: "api/v1/auth/token",
    accept_offer: "api/v1/quotes/accept/",
    reject_offer: "api/v1/quotes/reject/",
    add_content: "contents/add",
    get_partner_info: "api/v1/lists/get/fullquery",
    partnerpanel_reject_request: "api/v1/requests/reject/",
    partnerpanel_open_request: "api/v1/requests/open/",
    get_partnerpanel_all_requests: "api/v1/requests/allnew",
    get_partnerpanel_open_requests: "api/v1/requests/opened",
    query_content: "api/v1/lists/get/query",
    issue_offer: "api/v1/quotes/issueoffer",
    partner_panel_add_product: "api/v1/products/add",
    partner_panel_delete_product: "api/v1/products/remove",
    partner_panel_edit_product: "api/v1/products/edit",
    get_partner_all_offers: "api/v1/quotes/alloffers",
    get_partner_accepted_offers: "api/v1/quotes/acceptedoffers",
    get_partner_lost_offers: "api/v1/quotes/lostoffers",
    cancel_issued_offer: "api/v1/quotes/cancel/",
    partner_panel_update_setting: "api/v1/partners/updateprofile"
  },
  CONTENT_TYPE_ID: {
    partnership: "5d358ebc8e6e9a0017c28fc9",
    coworking: "5cfc95472606810017dca194",
    dedicated_office: "5cf7e7449916860017805408",
    session_room: "5cf7e7289916860017805407",
    partnership_working_fields: "5d4169c642afbf00179b0569",
    coworking_working_field: "5d3af3a1a9602900177a5056",
    list_of_countries: "5d35e6e68e6e9a0017c28fcd",
    list_of_cities: "5d35e6fa8e6e9a0017c28fce",
    amenities: "5d8878da643f8400177a4862",
    sessionroom_equipments: "5d5bcb6eed9a82001737c751",
    contact_us: "5d3e97363a65540017a90f11",
    request_stages: "5d6b5d205b60dc0017c95118",
    get_offer: "5d35adc68e6e9a0017c28fcb",
    select_offer_stage: "5d791a0a1a2cda0017099c63",
    get_partner_info: "5d358ebc8e6e9a0017c28fc9",
    get_partner_products: "5d36a6418e6e9a0017c28fd5",
    get_partnerpanel_requests: "5d58df5a74c64b0017fb45d8",
    product_type: "5d36a7d18e6e9a0017c28fd6",
    issue_offer: "5d35adc68e6e9a0017c28fcb",
    get_partner_all_offers: "5d35adc68e6e9a0017c28fcb",
    partnerpanel_reject_reasonlist: "5de64305b90b250017221703"
  },
  PRODUCT_TYPE_ID: {
    private_desk: "5d36a9d78e6e9a0017c28fd9",
    shared_desk: "5d5027842039ce674338a500",
    session_room: "5d36a9eb8e6e9a0017c28fdb",
    dedicated_office: "5d36aa018e6e9a0017c28fdd"
  }
};
function CheckAuthToken() {
  return new Promise((resolve, reject) => {
    if (GetCookie("SSUSERAUTH")) {
      resolve(JsonParser(GetCookie("SSUSERAUTH")).TOKEN);
    } else if (GetCookie("SSGUESTAUTH")) {
      resolve(JsonParser(GetCookie("SSGUESTAUTH")).TOKEN);
    } else {
      GetInitialToken(token => {
        if (token) {
          resolve(token);
        } else {
          reject("Error happened!");
        }
      });
    }
  });
}
function GetInitialToken(callback) {
  return axios({
    url: Configuration.BASE_URL_REQTER + Configuration.URLs.get_initial_token,
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
          JsonToString({
            ROLE: "guest",
            TOKEN: res.data.access_token,
            ID: ""
          }),
          res.data.expiresIn / (1000 * 60 * 60 * 24)
        );
        if (typeof callback === "function") callback(res.data.access_token);
      }
    })
    .catch(err => {
      if (typeof callback === "function") callback("");
      console.error("get initial token error: ", err);
    });
}
export default Configuration;
export { GetInitialToken };
