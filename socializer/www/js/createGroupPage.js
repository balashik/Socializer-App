function initCreateGroupPage(){
    
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    //header
    $("#topLinkL").html("Back");
    $("#logo").html("New Group");
    $("#logo").css("color","white");
    $("#topLinkL").css("color","white");
    $("#topLinkR").css("color","white");
    
    //body
    $(".wrapper").removeClass("blueBackground");
    $(".wrapper").addClass("deepBlueBackground");
    $(".wrapper").append("<input type='text' name='groupname' placeholder='Group Name' id='createGroup' class='groupName'></input>");
    $(".wrapper").append("<div id='createFrequency'>frequency</div>");
    $(".wrapper").append(" <div id='createGroup' class='notifyMe'>⊕Add a Reminder</div>");
    $(".wrapper").append(" <h1 id='createGroup'>Friends</h1>");
    $(".wrapper").append(" <div id='friendsList'></div>");
    $(".wrapper").append(" <div id='createGroup' class='snoozer'>Missed call snoozer <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch' ><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label></div></div>");
    
    for(var i=0;i<newGroup.contacts.length;i++){
        var div = $("<div class='createGroupfriends' id='contact"+i+"'></div>");
        $("#friendsList").append(div);
        div.append("<div class='cancelImage'></div>");
        div.append("<h>"+newGroup.contacts[i].displayName+"</h>");
        
    }
    
    //removing a contact from grouplist
    $(".cancelImage").click(function(){
        newGroup.contacts.splice($(this).index(),1);
        $(this).parent().remove();
        return;
    });
    
    //add a reminder
    $(".notifyMe").click(function(){
        if(newGroup.reminder==false){
            newGroup.reminder=true;
            $(this).css("color","#feb5a8");
        }else{
            newGroup.reminder=false;
            $(this).css("color","rgba(254, 181, 168, 0.35)");
        }
        
        
    });
    
    //frequency page
    $("#createFrequency").click(function(){
        //go to creating frequency page
        LoadPage(function() {
            clearCreateGroupPage();                                
            initCreateFrequencyPage();
        });
        return;
    });
    $(".snoozer").click(function(){
        if($("#myonoffswitch").is(":checked")){
            $("#myonoffswitch").prop("checked",false);
            $(".snoozer").css("color","#feb5a8");
        }else{
            $("#myonoffswitch").prop("checked",true);
            $(".snoozer").css("color","rgba(254, 181, 168, 0.35)");
        }
    });
    //pressed next group create finished, send data to server 
    $("#topLinkR").click(function(){
        newGroup.missedCallSnoozer = !($("#myonoffswitch").is(":checked"));
        console.log(newGroup.missedCallSnoozer);
        newGroup.name=$(".groupName").val();
        newGroup.lastReset = Date.now();
        
        var jsonGroup = JSON.stringify(newGroup);
        var group = {group:newGroup};
        
        //createGroup
        $.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/createGroup",
            data: group,
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(data) {
                console.log(data);
                //move to groups list page  
                LoadPage(function() {
                    clearCreateGroupPage();
                    initListPage();
                }); 
            }
        });
        
        return;
                                    
    });
    
    //moving back to contacts page
    $("#topLinkL").click(function(){
        clearCreateGroupPage();
        initContactsPage();
        return;
    });

    PageLoaded();

}




function clearCreateGroupPage(){
    $("input").remove("#createGroup");
    $("div").remove("#createFrequency");
    $("div").remove("#createGroup");
    $("h1").remove("#createGroup");
    $("div").remove("#friendsList");
}
