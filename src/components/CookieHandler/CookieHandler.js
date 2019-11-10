function SetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function GetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function SetSession(sname, svalue) {
  if (typeof svalue === "object" && !svalue.length) {
    svalue = JSON.stringify(svalue);
  }
  const extacted = sessionStorage.setItem(sname, svalue);
  return extacted;
}
function GetSession(sname) {
  const extacted = sessionStorage.getItem(sname);
  return extacted;
}
function JsonToString(obj) {
  try {
    return JSON.stringify(obj);
  } catch (err) {
    return '{TOKEN:"",ID:"",ROLE:"newcomer"}';
  }
}
function JsonParser(JSONstring) {
  try {
    return JSON.parse(JSONstring);
  } catch (err) {
    return { TOKEN: "", ROLE: "newcomer", ID: "" };
  }
}

export {
  SetCookie,
  GetCookie,
  SetSession,
  GetSession,
  JsonToString,
  JsonParser
};
