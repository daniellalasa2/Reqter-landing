// import axios from "axios";
// const configUpdater = () => {
//   axios({
//     url:"https://app-ipanel.herokuapp.com/auth/token",
//   });
// };
import React from "react";
import axios from "axios";
// export default class Config {
//   constructor(){
//     getInitialToken();
//   };
//   getInitialToken = function() {
//     axios
//       .get(config.BASE_URL_CONTENT + "/api/v1/auth/token", {
//         headers: {
//           clientid: "1d42c55e-0f44-4613-adba-a5bbbca878e1",
//           "Content-type": "application/json"
//         }
//       })
//       .then(res => {
//         console.log(res.data);
//       });
//   };

var config = {
  BASE_URL_CONTENT: "https://app-ipanel.herokuapp.com/",
  BASE_URL_UPLOAD: "https://app-spanel.herokuapp.com/",
  CLIENT_ID: "1d42c55e-0f44-4613-adba-a5bbbca878e1",
  CONTENT_TYPE_ID: {
    accelerator: "5cfce5561772c0001748d1a7",
    partnership: "5d358ebc8e6e9a0017c28fc9",
    coworking: "5cfc95472606810017dca194",
    dedicated_office: "5cf7e7449916860017805408",
    session_room: "5cf7e7289916860017805407",
    private_desk: "5cfc95472606810017dca194",
    shared_desk: "5cfc95472606810017dca194",
    partnership_working_fields: "5d4169c642afbf00179b0569",
    coworking_working_field: "5d3af3a1a9602900177a5056",
    list_of_countries: "5d35e6e68e6e9a0017c28fcd",
    list_of_cities: "5d35e6fa8e6e9a0017c28fce",
    sessionroom_equipments: "5d5bcb6eed9a82001737c751",
    contact_us: "5d3e97363a65540017a90f11"
  },
  AUTH:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjFkNDJjNTVlLTBmNDQtNDYxMy1hZGJhLWE1YmJiY2E4NzhlMSIsInNjb3BlIjoidmVyaWZ5IiwiYXV0aGVudGljYXRlZCI6ZmFsc2UsImlhdCI6MTU2NjcxOTM5MiwiZXhwIjoxNTk4MjU1MzkyfQ.pp_2-3UaSp874g47yAl2v3ERXKHjitzCFrz11pYSKw8",
  SPACEID: "5cf3883dcce4de00174d48cf",
  URLS: {
    submit_form: "contents/add",
    filter_contents: "contents/filter",
    upload: "asset/upload"
  }
};
// };

export default config;
