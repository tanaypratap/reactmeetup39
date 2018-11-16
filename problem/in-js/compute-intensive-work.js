function doComputeIntensive() {
    let someNumber = 0;
   logProgress("Going to sleep for 3 seconds");
   setTimeout(() => sleep(6000), 0);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
    logProgress("Out of sleep");
  }

function logProgress(msg) {
    document.getElementById("compute-intensive-progress").innerHTML = msg;
}