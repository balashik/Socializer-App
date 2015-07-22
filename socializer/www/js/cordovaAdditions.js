var contentWidth = document.body.scrollWidth, 
    windowWidth = window.innerWidth, 
    newScale = windowWidth / contentWidth;
    document.body.style.zoom = newScale;
var ww = ($(window).width() < window.screen.width) ?
    $(window).width() : window.screen.width;
    
// min width of site
var mw = 1020;
//calculate ratio
var ratio =  ww / mw;
if (ww < mw) {
    $('meta[type="viewport"]').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
} else {
    $('meta[type="viewport"]').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
}

var logger= $("<div>");
$("body").prepend(logger);