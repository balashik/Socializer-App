function initListPage(){
    
    $("#statsView").unbind("click");
    $("#listView").unbind("click");
    
    //header
    $("#topLinkR").html("");
    $("#topLinkL").html("");
    $("#logo").html("");
    $("#topLinkR").append("<div class='settings'></div>");
    $("#topLinkL").append("<div id='addGroup'></div>");
    //body
    $(".wrapper").addClass("deepBlueBackground");
    $(".wrapper").append("<nav id='selectViewNav'></nav>");
    $("#selectViewNav").append("<div id='listView'></div><div id='statsView'></div>");
    $("#listView").append("<div id='listImg'></div>");
    $("#statsView").append("<div id='statsImg'></div>");
    //Settings Window
    $(".wrapper").append("<div id='settingsWindow'></div>");
    $("#settingsWindow").append("<div id='settingsTitle'><div class='settings' ></div><h>Settings</h></div>");
    $("#settingsWindow").append("<div id='settingsBtn'><h>Notification & Sound</h></div>");
    $("#settingsWindow").append("<div id='settingsBtn'><h>Frequency</h></div>");
    $("#settingsWindow").append("<div id='settingsBtn'><h>Time Zone: Jerusalem</h></div>");
    $("#settingsWindow").append("<div id='settingsBtn'><h>Week Start: Sunday</h></div>");
    $("#settingsWindow").append("<div id='settingsBtn'><h>Reset Data</h></div>");
    
    //sort title
    $(".wrapper").append("<div id='sortTitle'></div>");
    //get All groups from server
    $.ajax({
        method: "POST",
        url: "http://socializerapp.herokuapp.com/retrieveAll",
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function(data) {
            if(data.result>0){
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].frequency.frequencyType==0){
                        $(".wrapper").append("<div id='groupName'>"+data.data[i].name+"</div>");
                        $(".wrapper").append("<div id='listContactDiv"+i+"' class='listContactDiv'></div>");
                        for(var j=0;j<data.data[i].contacts.length;j++){

                            $("#listContactDiv"+i).append("<div id='"+data.data[i].contacts[j].id+"' class='contactName'>"+data.data[i].contacts[j].displayName+"<div id='freqStats'>"+"0/7 W"+"</div><div class='removeFromGroup'>Delete</div></div>");
                            $(".removeFromGroup").css("display","none");
                            
                        }
                        $("#listContactDiv"+i).append("<div class='clear'></div>");
                       
                    }
                    
                }
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].frequency.frequencyType==1){
                        $(".wrapper").append("<div id='groupName'>"+data.data[i].name+"</div>");
                        $(".wrapper").append("<div id='listContactDiv"+i+"' class='listContactDiv'></div>");
                        for(var j=0;j<data.data[i].contacts.length;j++){

                            $("#listContactDiv"+i).append("<div id='"+data.data[i].contacts[j].displayName+"' class='contactName'>"+data.data[i].contacts[j].displayName+"<div id='freqStats'>"+"0/7 2W"+"</div></div><div class='removeFromGroup'>Delete</div>");
                            $(".removeFromGroup").css("display","none");
                        }
                        $("#listContactDiv"+i).append("<div class='clear'></div>");
                    }
                }
                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].frequency.frequencyType==2){
                        $(".wrapper").append("<div id='groupName'>"+data.data[i].name+"</div>");
                        $(".wrapper").append("<div id='listContactDiv"+i+"' class='listContactDiv'></div>");
                        for(var j=0;j<data.data[i].contacts.length;j++){

                            $("#listContactDiv"+i).append("<div id='"+data.data[i].contacts[j].displayName+"' class='contactName'>"+data.data[i].contacts[j].displayName+"<div id='freqStats'>"+"0/7 M"+"</div><div class='removeFromGroup'>Delete</div></div>");
                            $(".removeFromGroup").css("display","none");
                        }
                        $("#listContactDiv"+i).append("<div class='clear'></div>");
                    }
                }
            }
            var element = document.getElementsByClassName('contactName');
            var swipeLeftEvent= new Hammer(element[0]);
            swipeLeftEvent.on("swipeleft",function(){
                console.log("swipe created");
                if($(element[0]).width()==530){
                    $(element[0]).width(402);
                }else{
                    $(element[0]).width(530)
                }
               
                $(element[0]).next(".removeFromGroup").toggle();
                
             
            });

            var contactClickFunction = function() {
                $(this).animate({
                        height: "369px"
                }, loadingManager.animationTime /*Comes from loadinPage.js*/, "easeOutQuart", function() {
                    $(this).click(function(){
                        $(this).animate({
                           height: "25px" 
                        }, LoadingManager.animationTime /*Comes from loadinPage.js*/, "easeOutQuart", function(){
                        
                        });
                        $(this).unbind("click");
                        $(this).click(contactClickFunction);
                    });
                });
                $(this).unbind("click");
            }

            $(".contactName").click(contactClickFunction);
            PageLoaded();
        }
    });
    
    
    $("#statsView").click(function(){
        $("div").remove("#sortTitle");
        $("div").remove("#groupName");
        $("div").remove(".listContactDiv");
        initStatsPage();
        return;
    });
    
    $(".settings").click(function(){
        console.log("clicked");
        $("#settingsWindow").toggle("slide",{direction:"right",easing :"easeOutQuart"},800,function(){
//            $("#settings").click(function(){
//                //$("#settingsWindow").toggle("slide",{direction:"right",easing :"easeOutQuart"},800);
//                console.log("clicked");
//            });
                
            
        });
    });
    $("#addGroup").click(function(){
        //clearing this page
        //$("div").remove("#settings");
        //$("div").remove("#addGroup");
        $("nav").remove("#selectViewNav");
        $("div").remove("#sortTitle");
        $("div").remove("#groupName");
        $("div").remove(".listContactDiv");
        //initContactsPage
        LoadPage(function() {
            initContactsPage();
        });
    });
}
