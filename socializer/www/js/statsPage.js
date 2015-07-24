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
    $("#topStats").append("<div class='fTotal'><h>Urgency</h><div id='result' class='totalResult'>30% completed</div><div id='frequencyResult' class='topSumStats'>High</div><div class='prograssBar'></div></div>");
    $(".wrapper").append("<nav class='centerStatsNav'><ul><li>High</li><li>Medium</li><li>Low</li></ul></nav>");
    

    $(".prograssBar").progressbar({
        value:65
    });
    
    $(".centerStatsNav > ul > li").click(function(){
        $(this).addClass("selectedStatsVal");
        console.log("sdadsd");
    
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