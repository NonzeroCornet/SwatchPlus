if (location.protocol != "https:") {
  location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);
}
var input = document.getElementsByTagName("textarea")[0];
var nums = document.getElementsByTagName("p")[0];
var output = document.getElementsByTagName("p")[1];
var code = input.value;
var mobileBtnHandler = document.getElementById("mobileBtnHandler");

const ua = navigator.userAgent;
if (
  /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    ua
  )
) {
  mobileBtnHandler.style.display = "block";
} else {
  mobileBtnHandler.style.display = "none";
}

function updateCode() {
  var inSplit = input.value.split("");
  for (let i = 0; i < inSplit.length; i++) {
    if (
      inSplit[i] != "+" &&
      inSplit[i] != "x" &&
      inSplit[i] != "t" &&
      inSplit[i] != "o" &&
      inSplit[i] != "u" &&
      inSplit[i] != " " &&
      inSplit[i] != "\n"
    ) {
      inSplit[i] = "";
    }
  }
  code = inSplit.join("");
}

input.addEventListener("keydown", function (event) {
  var code = event.keyCode || event.which;
  if (code === 9) {
    event.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    this.value =
      this.value.substring(0, start) + "    " + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 4;
  }
});

document.addEventListener("keydown", function (event) {
  var code = event.keyCode || event.which;
  if (code === 69) {
    toggleHide();
  } else if (code === 82) {
    run();
  } else if (code === 67) {
    output.innerHTML = "";
  }
});

function toggleHide() {
  if (input.style.visibility == "hidden") {
    input.style.visibility = "visible";
  } else {
    input.style.visibility = "hidden";
  }
}

var functions = [];
var bigNum = 0;
var codeFuncs = [];
var codes = [];
var smolNum = 0;
var inNum = 0;
var hasPrinted = false;

function run() {
  hasPrinted = false;
  smolNum = 0;
  bigNum = 0;
  inNum = 0;
  functions = [];
  codes = code.split("");
  for (let i = 0; i < codes.length; i++) {
    if (
      codes[i] != "+" &&
      codes[i] != "x" &&
      codes[i] != "t" &&
      codes[i] != "o" &&
      codes[i] != "u"
    ) {
      codes[i] = "";
    }
  }
  codeFuncs = codes.join("").split("o");
  for (let i = 0; i < codeFuncs.length - 1; i++) {
    functions.push(codeFuncs[i].split(""));
  }
  var index = 0;
  for (var i = 0; i < codeFuncs[codeFuncs.length - 1].length; i++) {
    if (codeFuncs[codeFuncs.length - 1].split("")[i] == "+") {
      smolNum == 9 ? (smolNum = -9) : smolNum++;
    } else if (codeFuncs[codeFuncs.length - 1].split("")[i] == "x") {
      if (smolNum >= 0) {
        execute(smolNum);
      } else {
        i++;
      }
    } else if (codeFuncs[codeFuncs.length - 1].split("")[i] == "t") {
      bigNum += smolNum;
    } else if (codeFuncs[codeFuncs.length - 1].split("")[i] == "u") {
      if (bigNum === 13) {
        output.innerHTML += "<br>";
      } else if (bigNum === 32) {
        output.innerHTML += "&nbsp;";
      } else if (bigNum === 8) {
        let tempOut = output.innerHTML.split("");
        tempOut.pop();
        output.innerHTML = tempOut.join("");
      } else {
        output.innerHTML += String.fromCharCode(bigNum);
      }
      hasPrinted = true;
    }
  }
  if (hasPrinted) {
    output.innerHTML += "<br>";
  }
  nums.innerHTML = smolNum + ":" + bigNum + ":" + inNum;
}

var reExecutions = 0;

function execute(functionIndex) {
  for (var i = 0; i < functions[functionIndex].length; i++) {
    if (functions[functionIndex][i] == "+") {
      bigNum++;
    } else if (functions[functionIndex][i] == "t") {
      bigNum += inNum;
    } else if (functions[functionIndex][i] == "u") {
      inNum = prompt(
        "Taking Input... (Will only take in first character)"
      ).charCodeAt(0);
    } else if (functions[functionIndex][i] == "x") {
      execute(bigNum);
      reExecutions++;
      if (reExecutions == 5000) {
        alert("CALL STACK SIZE EXCEEDED! ABORTING!!!");
        reExecutions = 0;
        return;
      }
    }
  }
}
