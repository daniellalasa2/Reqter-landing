// import axios from "axios";
// const configUpdater = () => {
//   axios({
//     url:"https://app-ipanel.herokuapp.com/auth/token",
//   });
// };

var config = {
  BASE_URL_CONTENT: "https://app-ipanel.herokuapp.com/",
  CONTENT_TYPE_ID: {
    accelerator: "5cfce5561772c0001748d1a7",
    partnership: "5d358ebc8e6e9a0017c28fc9",
    coworking: "5cfc95472606810017dca194",
    private_office: "5cf7e7449916860017805408",
    partnership_working_fields: "5d4169c642afbf00179b0569",
    list_of_countries: "5d35e6e68e6e9a0017c28fcd",
    list_of_cities: "5d35e6fa8e6e9a0017c28fce"
  },
  AUTH:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjM4ODNkYWZkMGI5MDAxNzA4YjI3ZSIsImFjY291bnRfdHlwZSI6ImZyZWUiLCJpYXQiOjE1NjQwMzc0NTEsImV4cCI6MTU2NjYyOTQ1MX0.JHhdy93fv0IkOhRYhTi4kmRS2ZnPrEA4uItLguGNUDU",
  SPACEID: "5cf3883dcce4de00174d48cf",
  URLS: {
    submit_form: "contents/add",
    filter_contents: "contents/filter"
  }
};

export default config;
