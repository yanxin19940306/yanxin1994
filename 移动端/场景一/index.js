var main = document.querySelector("#main");
var oLis = document.querySelectorAll(".slide>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH > desW / desH) {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
} else {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
}
//ain.style.webkitTransform = "scale(" + winH / desH + ")";
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
})
function start(e) {
    this.start = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var changePos = moveTouch - this.start;
    var cur = this.index;
    var step = 1 / 2;

    [].forEach.call(oLis, function () {
        if (arguments[1] != cur) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    })
    if (changePos > 0) {
        var pos = -winH + changePos;
        this.prevSIndex = cur == 0 ? oLis.length - 1 : cur - 1;

    } else if (changePos < 0) {
        this.prevSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        var pos = winH + changePos;

    }
    oLis[this.prevSIndex].style.webkitTransform = "translate(0," + pos + "px)";
    oLis[this.prevSIndex].className = 'zIndex';
    oLis[this.prevSIndex].style.display = "block";
    oLis[cur].style.webkitTransform = "scale(" + (1 - Math.abs(changePos) / winH * step) + ") translate(0," + changePos + "px)";
}
function end(e) {
    if (this.flag) {
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.5s";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            var _this = this;
            this.firstElementChild.id = "a" + (_this.index + 1);
            var oList = document.querySelectorAll(".a3>p");
            var oP=document.querySelectorAll(".a4>p");
            var ima=document.querySelector(".j");
            for (var i = 0; i < oList.length; i++) {
                if (this.index + 1 === 3) {
                    oList[i].id = "b" + 3;
                } else {
                    oList[i].id = "";
                }
            }
            for(var j=0;j<oP.length;j++){
                if(this.index+1===4){
                    ima.style.display="none";
                    oP[j].id="b"+4;
                }else{
                    oP[j].id="";
                    ima.style.display="block";
                }
            }
        }, false)
    }
}
window.setInterval(function () {
    oLis["0"].firstElementChild.id = "a1";
}, 1000);



