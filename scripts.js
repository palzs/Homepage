// 搜索功能
window.onload = function defaultsearch()
    {engine = "https://www.baidu.com/s?wd=";
    document.querySelector('.baidu-icon').style.filter = "drop-shadow(0 0 1.5px #bbbbbb) brightness(90%)";
    }
$(".s-icon").click(function(){
    var key = $(".keyword").val();
    window.open(engine+key);
});
$(".keyword").bind('keypress',function(event){
if (event.keyCode == 13){
    var key = $(".keyword").val();
    window.open(engine+key);
    }
})
// 引擎切换
$(".google-icon").click(function(){
    engine = "https://www.google.com/search?q=";
    document.querySelector('.google-icon').style.filter = "drop-shadow(0 0 1.5px #bbbbbb) brightness(90%)";
    document.querySelector('.baidu-icon').style.filter = "";
    document.querySelector('.bing-icon').style.filter = "";
    });
$(".baidu-icon").click(function(){
    engine = "https://www.baidu.com/s?wd=";
    document.querySelector('.google-icon').style.filter = "";
    document.querySelector('.baidu-icon').style.filter = "drop-shadow(0 0 1.5px #bbbbbb) brightness(90%)";
    document.querySelector('.bing-icon').style.filter = "";
    });
$(".bing-icon").click(function(){
    engine = "https://www.bing.com/search?q=";
    document.querySelector('.google-icon').style.filter = "";
    document.querySelector('.baidu-icon').style.filter = "";
    document.querySelector('.bing-icon').style.filter = "drop-shadow(0 0 1.5px #bbbbbb) brightness(90%)";
    });
// 随机句子
var a = Math.random() + ""
var rand1 = a.charAt(5)
    quotes = new Array
    quotes[1] = "All those moments will be lost in time,like tears in rain."
    quotes[2] = "Der Gott ist tot."
    quotes[3] = "Veni Vidi Vici."
    quotes[4] = "Cogito, ergo sum."
    quotes[5] = "Je pense, donc je suis."
    quotes[6] = "C'est la vie."
    quotes[7] = "L'enfer, c'est les autres."
    quotes[8] = "Was macht mich nicht umbringt,macht mich stärker."
    quotes[9] = "God's in his heaven, all's right with the world."
    quotes[0] = "Wenn du lange in einen Abgrund blickst,blickt der Abgrund auch in dich hinein."
var quote = quotes[rand1]
$(".end").html(quote);