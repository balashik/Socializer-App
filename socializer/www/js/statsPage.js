function initStatsPage(){
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    $("#statsView").unbind("click");
    $("#listView").unbind("click");
    //body
    
    $("#statsView").css("background-color","#33394c");
    $("#listView").css("background-color","#252a3d");
    $("#statsImg").css("background-image","url(./css/images/stats.png)");
    $("#listImg").css("background-image","url(./css/images/list.png)");
    $(".wrapper").append("<div id='topStats'></div>");
    $("#topStats").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li><a>Weekly</a></li><li><a>Biweekly</a></li><li><a>Monthly</a></li></ul>");
    $("#topStats").append("<div id='topStatsPrograssBar'></div>");
    $("#topStatsPrograssBar").progressbar({
        value:65
    });
    
    $("#listView").click(function(){
        $("div").remove("#listView");
        $("div").remove("#statsView");
        $("nav").remove("#selectViewNav");
        $("nav").remove("#newFrequencyNav");
        LoadPage(function() {
            initListPage();
        });
        return;
    });
    PageLoaded();
}