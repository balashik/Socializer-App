function InitStatsPage(){
    
    var topBarVal=0;
    
    $("#addGroup").unbind("click");
    $("#statsView").unbind("click");
    $("#listView").unbind("click");
    //body
    $("#statsView").addClass("deepBlueBackground");
    $("#listView").css("background-color","#252a3d");
    $("#statsImg").css("background-image","url(./css/images/stats.png)");
    $("#listImg").css("background-image","url(./css/images/list.png)");
    $("#wrapper").append("<div id='topStats'></div>");
    $("#topStats").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li><a>Weekly</a></li><li><a>Biweekly</a></li><li><a>Monthly</a></li></ul>");
    $("#topStats").append("<div class='fTotal'><h>Urgency</h><div id='result' class='totalResult'></div><div id='frequencyResult' class='topSumStats'>High</div><div class='prograssBar'></div></div>");
    $("#wrapper").append("<nav class='centerStatsNav'><ul><li><a>High</a></li><li><a>Medium</a></li><li><a>Low</a></li></ul></nav>");
    
    $("#newFrequencyNav > ul > li > a").click(function() {
        $("#newFrequencyNav > ul > li > a").removeClass("selectedUnderline");
        $(this).addClass("selectedUnderline");
        if($(this).text()=="Weekly") {
            $(".totalResult").html("30"+"% completed")
            $(".prograssBar").progressbar("value",30);
        }
        if($(this).text()=="Biweekly") {
            $(".totalResult").html("40"+"% completed")
            $(".prograssBar").progressbar("value",40);
        }
        if($(this).text()=="Monthly") {
            $(".totalResult").html("50"+"% completed")
            $(".prograssBar").progressbar("value",50);
        }
    });

    $(".centerStatsNav > ul > li").click(function() {
        $(".centerStatsNav > ul >li").removeClass("selectedStatsVal");
        $(this).addClass("selectedStatsVal");
        $("div").remove("#wrapper > .fTotal");
        if($(this).text()=="High"){
            for(var i=0;i<10;i++){
                $("#wrapper").append("<div class='fTotal'><div id='contactStats' class='contact"+i+"'></div><div class='prograssBar contactBar' id='pBar"+i+"'></div></div>");
                $(".contact"+i).append("<h id='name'>dadNew</h><div id='rightStats'><div id='contactResult'>45%</div><h>completed</h><div>")
                $("#pBar"+i).progressbar({
                    value:10
                });
            }
        }
        if($(this).text()=="Medium") {
        
        }
        if($(this).text()=="Low") {
        
        }
    });
    
    $("#listView").click(function() {
        ClearStatsPage();
        InitListPage();
        return;
    });
    PageLoaded();
    $("#addGroup").click(function(){
        LoadPage(function(){
            ClearStatsPage();
            InitContactsPage();
        });
    });
    
}


function ClearStatsPage(){
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    $("div").remove("#listView");
    $("div").remove("#statsView");
    $("nav").remove("#selectViewNav");
    $("nav").remove("#newFrequencyNav");
    $("div").remove("#topStats");
    $("nav").remove(".centerStatsNav");
    $("div").remove(".fTotal");
    
    

}