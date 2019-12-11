var scriptLoader = function(id, pranetTagName, url, callback) {
  var scriptDOM = document.createElement("script");
  scriptDOM.type = "text/javascript";
  if (id) scriptDOM.id = id;
  var parentDOM = document.getElementsByTagName(pranetTagName)[0];
  this.wrapperDOM = parentDOM;
  this.id = id;
  if (scriptDOM.readyState) {
    //IE
    scriptDOM.onreadystatechange = function() {
      if (
        scriptDOM.readyState === "loaded" ||
        scriptDOM.readyState === "complete"
      ) {
        scriptDOM.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //Others
    scriptDOM.onload = function() {
      callback();
    };
  }
  if (url) {
    scriptDOM.src = url;
  }
  parentDOM.appendChild(scriptDOM);
};
scriptLoader.prototype.remove = function() {
  var targetedDOM = document.getElementById(this.id);
  this.wrapperDOM.removeChild(targetedDOM);
};
scriptLoader.prototype.write = function(script) {
  var targetedDOM = document.getElementById(this.id);
  targetedDOM.text = script;
  this.wrapperDOM.appentChild(targetedDOM);
};
export default scriptLoader;
