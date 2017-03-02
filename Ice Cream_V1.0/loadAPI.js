function loadLondon() { // Loads London JSON data
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22London%2C%20London%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    weatherLoaded);
    drips.splice(0,1000)
    setTimeout(resetSketch, timeout)
}
  
function loadNewyork() { // Loads New York JSON data
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22New%20York%2C%20New%20York%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    weatherLoaded);
    drips.splice(0,1000)
    setTimeout(resetSketch, timeout)
}
  
function loadTokyo() { // Loads Tokyo JSON data
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Tokyo%2C%20Tokyo%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    weatherLoaded);
    drips.splice(0,1000)
    setTimeout(resetSketch, timeout)
}
  
function loadPaulo() { // Loads Sao Paulo JSON data
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22S%C3%A3o%20Paulo%2C%20S%C3%A3o%20Paulo%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    weatherLoaded);
    drips.splice(0,1000)
    setTimeout(resetSketch, timeout)
}
  
function loadMelbourne() { // Loads Melbourne JSON data    
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Melbourne%2C%20Melbourne%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    weatherLoaded);
    drips.splice(0,1000)
    setTimeout(resetSketch, timeout)
}

function loadJuneau() { // Loads Juneau JSON data 
    loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Juneau%2C%20alaska%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    weatherLoaded);
    drips.splice(0,1000)
    setTimeout(resetSketch, timeout)
}