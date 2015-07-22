function initListPage(){
    
    $("#statsView").unbind("click");
    $("#listView").unbind("click");
    
    //header
    $("#topLinkR").html("");
    $("#topLinkL").html("");
    $("#logo").html("");
    $("#topLinkR").append("<div id='settings'></div>");
    $("#topLinkL").append("<div id='addGroup'></div>");
    //body
    $(".wrapper").append("<nav id='selectViewNav'></nav>");
    $("#selectViewNav").append("<div id='listView'></div><div id='statsView'></div>");
    $("#listView").append("<div id='listImg'></div>");
    $("#statsView").append("<div id='statsImg'></div>");
    
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
    
                                $("#listContactDiv"+i).append("<div id='"+data.data[i].contacts[j].name+"' class='contactName'>"+data.data[i].contacts[j].name+"<div id='freqStats'>"+"0/7 W"+"</div><div class='removeFromGroup'>Delete</div></div>");
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
    
                                $("#listContactDiv"+i).append("<div id='"+data.data[i].contacts[j].name+"' class='contactName'>"+data.data[i].contacts[j].name+"<div id='freqStats'>"+"0/7 2W"+"</div></div><div class='removeFromGroup'>Delete</div>");
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
    
                                $("#listContactDiv"+i).append("<div id='"+data.data[i].contacts[j].name+"' class='contactName'>"+data.data[i].contacts[j].name+"<div id='freqStats'>"+"0/7 M"+"</div><div class='removeFromGroup'>Delete</div></div>");
                                $(".removeFromGroup").css("display","none");
                            }
                            $("#listContactDiv"+i).append("<div class='clear'></div>");
                        }
                    }
                }
                var element = document.getElementsByClassName('contactName');
                var swipeLeftEvent= new Hammer(element[0]);
                swipeLeftEvent.on("swipeleft",function(){
                    if($(element[0]).width()==530){
                        $(element[0]).width(402);
                    }else{
                        $(element[0]).width(530)
                    }
                   
                    $(element[0]).next(".removeFromGroup").toggle();
                    
                 
                });
                $(".contactName").click(function(){
                    
                    
                    $(this).animate({
                            
                            height: "369px"
                    }, 1000, function() {
                        $(this).click(function(){
                            $(this).animate({
                               height: "25px" 
                            },1000,function(){
                            
                            });
                        });
                    });
                });
            }
        
        });
    
    
    $("#statsView").click(function(){
        $("div").remove("#sortTitle");
        $("div").remove("#groupName");
        $("div").remove(".listContactDiv");
        
        initStatsPage();
        return;
    });
    
    
    $("#addGroup").click(function(){
        //clearing this page
        $("div").remove("#settings");
        $("div").remove("#addGroup");
        $("nav").remove("#selectViewNav");
        $("div").remove("#sortTitle");
        $("div").remove("#groupName");
        $("div").remove(".listContactDiv");
        //initContactsPage
        initContactsPage();
    
    
    })
        


}
