(function(){
const ef = acode.require("fileEditor")
const sa = acode.require("sidebarApps")
const id = "reywiro.webdav.interface";

function protocol(method, url, user, password, headers = {}) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

            console.log("Status:", this.status);
            console.log("Ready State:", this.readyState);
            console.log("Response Text:", xhr.responseXML);
            console.log("Request Method:", method);
        }
    };
    xhr.onerror = function (e) {
        console.log("Request Error", xhr.status);
    };

    xhr.onloadstart = function () {
        console.log("Request Started");
    };

    xhr.onloadend = function () {
        console.log("Request Ended");
    };

    xhr.open(method, url, true);
    for (const h in headers) {
        xhr.setRequestHeader(h, headers[h]);
    }
    xhr.setRequestHeader(
        "Authorization",
        "Basic " + btoa(user + ":" + password)
    );

    xhr.send();
}

function findProp(url, user, pw) {
  protocol("PROPFIND",url,user,pw, {
    Depth: 1
  }, updateView)
}
console.log(id)
// initialization
acode.setPluginInit(id, (baseUrl, $page, cache) => {
    const { commands } = editorManager.editor;
    acode.addIcon('wdv','https://localhost/__cdvfile_files-external__/plugins/reywiro.webdav.interface/webdav.png')
    sa.add("wdv", id, "webdav",(app) => {
      app.innerHTML = tag("link", {rel: "stylesheet", href: plugins.baseUrl+"/app.css"})+tag("h3",{textContent: "Hello world"})
    })
})
})()
