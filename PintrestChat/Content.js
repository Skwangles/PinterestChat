document.addEventListener('DOMContentLoaded', function () {
  
  //eventlistener setup'
  
  document.getElementById('chat-open').addEventListener('click', chatWindowSetup);
  
  

  document.getElementById('user-name').addEventListener('change', function()
  {
    chrome.storage.sync.set({"name":document.getElementById("user-name").value});
  });
//not working?

chrome.runtime.onInstalled.addListener(function(details){
  chrome.storage.sync.set({"name":"anonymous"});
}) 

  //sets up the username
  if(document.getElementById("user-name").value == ""){
    chrome.storage.sync.get(["name"], function(result){
      if(result.value != "undefined"){
        document.getElementById("user-name").value = result.name; 
      }
      else{
        document.getElementById("user-name").value = "";
      }
   });
  }    
});

//defines item in storage

    function chatWindowSetup() {
      //
      //
      //CHANGE HEIGHT AND WIDTH HERE----------------------------
      //
      //
      let w = 320;
      let h = 350;
        console.log(window.innerHeight);
        console.log(window.innerWidth);
      console.log("Works");
      var myUrl = "https://youtube.com?b=" + passURL()+"?n="+document.getElementById("user-name").value;
      console.log("CreateWindow");
      console.log(chrome.windows);
      chrome.windows.create({
        focused: true,
        height: h,
        width: w,
        left: 20,
        top: 20,
        url: [myUrl],
      type:"panel"
      });
      

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