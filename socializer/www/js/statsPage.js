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
    $(".wrapper").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li><a>Weekly</a></li><li><a>Biweekly</a></li><li><a>Monthly</a></li></ul>");
    
    $("#listView").click(function(){
        $("div").remove("#listView");
        $("div").remove("#statsView");
        $("nav").remove("#selectViewNav");
        $("nav").remove("#newFrequencyNav");
        initListPage();
        return;
    });
}