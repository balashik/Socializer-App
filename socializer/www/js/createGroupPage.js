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
    $(".wrapper").css("background","#2a2e3e"); 
    $(".wrapper").append("<input type='text' name='groupname' placeholder='Group Name' id='createGroup' class='groupName'></input>");
    $(".wrapper").append("<div id='createFrequency'>frequency</div>");
    $(".wrapper").append(" <div id='createGroup' class='notifyMe'>⊕Add a Reminder</div>");
    $(".wrapper").append(" <h1 id='createGroup'>Friends</h1>");
    $(".wrapper").append(" <div id='friendsList'></div>");
    $(".wrapper").append(" <div id='createGroup'>Missed call snoozer <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch'><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label></div></div>");
    
    for(var i=0;i<newGroup.contacts.length;i++){
        $("#friendsList").append("<div class='createGroupfriends' id='contact"+i+"'></div>");
        $("#contact"+i).append("<div class='cancelImage'></div>");
        $("#contact"+i).html("<h>"+newGroup.contacts[i].name+"</h>");
        
    }
    
    //removing a contact from grouplist
    $(".cancelImage").click(function(){
        newGroup.contacts.splice($(this).index(),1);
        $(this).parent().remove();
        return;
    });
    
    //add a reminder
    $(".notifyMe").click(function(){
        $(this).css("color","#feb5a8");
        return;
    });
    
    //frequency page
    $("#createFrequency").click(function(){
        //go to creating frequency page
        clearCreateGroupPage();                                
        initCreateFrequencyPage();
        return;
    });
    
    //pressed next group create finished, send data to server 
    $("#topLinkR").click(function(){
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
                clearCreateGroupPage();
                initListPage();
        
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

}




function clearCreateGroupPage(){
    $("input").remove("#createGroup");
    $("div").remove("#createFrequency");
    $("div").remove("#createGroup");
    $("h1").remove("#createGroup");
    $("div").remove("#friendsList");
}
