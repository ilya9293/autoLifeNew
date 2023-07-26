function start() {
  var marqueeElements = document.getElementsByClassName("marquee");
  for (var i = 0; i < marqueeElements.length; i++) {
    var direction = i % 2 === 0 ? "left" : "right";
    new mq(marqueeElements[i], direction);
    mqRotate(mqr);
  }
}

//  window.onload = start;

function objWidth(obj) {
  if (obj.offsetWidth) return obj.offsetWidth;
  if (obj.clip) return obj.clip.width;
  return 0;
}

var mqr = [];

function mq(element, direction) {
  this.mqo = element;
  var spanElement = this.mqo.getElementsByTagName("span")[0];
  var wid = objWidth(spanElement) + 5;
  var fulwid = objWidth(this.mqo);
  var txt = spanElement.innerHTML;
  this.mqo.innerHTML = "";
  var heit = this.mqo.style.height;
  this.mqo.onmouseout = function () {
    mqRotate(mqr);
  };
  this.mqo.onmouseover = function () {
    clearTimeout(mqr[0].TO);
  };
  this.mqo.ary = [];
  var maxw = Math.ceil(fulwid / wid) + 1;
  var totalElements = direction === "left" ? maxw * 2 : maxw;
  for (var i = 0; i < totalElements; i++) {
    var index = i % maxw;
    this.mqo.ary[i] = document.createElement("div");
    this.mqo.ary[i].innerHTML = txt;
    this.mqo.ary[i].style.position = "absolute";
    this.mqo.ary[i].style.left = wid * index + "px";
    this.mqo.ary[i].style.width = wid + "px";
    this.mqo.ary[i].style.height = heit;
    this.mqo.appendChild(this.mqo.ary[i]);
  }
  mqr.push(this.mqo);

  // Устанавливаем направление анимации в зависимости от четности индекса
  if (direction === "left") {
    this.mqo.direction = -1;
  } else {
    this.mqo.direction = 1;
  }
}

function mqRotate(mqr) {
  if (!mqr) return;
  for (var j = mqr.length - 1; j > -1; j--) {
    var maxa = mqr[j].ary.length;
    for (var i = 0; i < maxa; i++) {
      var x = mqr[j].ary[i].style;
      x.left = parseInt(x.left, 10) + mqr[j].direction + "px";
    }
    var firstElement = mqr[j].ary[0];
    var lastElement = mqr[j].ary[maxa - 1];
    if (
      mqr[j].direction === -1 &&
      parseInt(firstElement.style.left, 10) +
        parseInt(firstElement.style.width, 10) <
        0
    ) {
      var z = mqr[j].ary.shift();
      z.style.left =
        parseInt(lastElement.style.left) +
        parseInt(lastElement.style.width) +
        "px";
      mqr[j].ary.push(z);
    } else if (
      mqr[j].direction === 1 &&
      parseInt(lastElement.style.left, 10) > parseInt(window.innerWidth)
    ) {
      var z = mqr[j].ary.pop();
      z.style.left =
        parseInt(firstElement.style.left) -
        parseInt(firstElement.style.width) +
        "px";
      mqr[j].ary.unshift(z);
    }
  }
  mqr[0].TO = setTimeout("mqRotate(mqr)", 45);
}
