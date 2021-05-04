
  
  window.onload(){
    document.getElementById("chatOpen").addEventListener("click", chatWindowSetup);
  }
 
  function chatWindowSetup() {
    if(document.getElementById("user-name").value != ""){     
    document.getElementById("error-log").innerHTML = "";
    var myUrl = "https://localhost:44329?b=" + passURL();
    chrome.windows.create({
      alwaysOnTop: true,
      focused: true,
      height: 350,
      width: 320,
      left: tab.innerWidth - width,
      top: tab.innerHeight - height,
      url: myUrl,
    type:"popup",
    });
  }
  else{
    document.getElementById("error-log").innerHTML = "Enter a name before using the Chat";
  }
  }

  function passURL() {// gets url to send to database
    return parseURL(window.location.href);
}

function parseURL(loc) {//removes the https://pintrest.nz part of the url
    loc = loc.replace("https", "");//covers both http and https
    loc = loc.replace("http", "");
    loc = loc.replace("://pintrest", "");//removes name so .com or .nz is at the front
    loc = loc.replace(".com", ".nz");//makes sure ending had two letters, so other countries ending can be chopped. i.e. .tv, .dk, etc
    var n = loc.indexOf("?");
    if (n >= 0) {
        loc.slice(0, n);//cuts any items with ?= on the end.
    }
    loc = loc.slice(3);//leaves just "/boardname/number" -- possibly hash
    return loc;
}