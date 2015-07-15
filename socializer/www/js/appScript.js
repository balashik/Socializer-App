var selectedContacts=[];
var pageNum=0;
$(document).ready(function(){

    
    // temp user data, this data need to be taken from user phone
    var userData = {
        key: "123123",
        pn: "0543191901"
    }
    var json=JSON.stringify(userData);


        $.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/login",
            data: userData,
            dataType: "json",
            success: function(data) {
            
                if(data.result>0){
                    
                    $("#logo").html("Your Contacts");
                    $("#topLinkR").html("Choose");

                    $(".wrapper").append("<div id='search'><input type='text' name='search' placeholder='Search'></input></div>");
                    var contactsLetters=[];

                    $.getJSON("./js/contacts.json", function(data){
                        contactsLetters = setLetters(data);

                        for(var i=0;i<contactsLetters.length;i++){
                            $(".wrapper").append("<div class='letterTitles'>"+contactsLetters[i]+"</div>");
                            for(var j=0;j<data.contactList.length;j++){
                                 if(contactsLetters[i]==data.contactList[j].name.charAt(0).toUpperCase()){
                                    $(".wrapper").append("<div class='contactDiv' id='"+j+"'>"+data.contactList[j].name+"</div>");
                                 }
                            }
                        }

                        //click on contact name
                        $(".contactDiv").click(function(){


                            for(var i=0;i<selectedContacts.length;i++){
                                if(selectedContacts[i].phoneNumber==data.contactList[($(this).attr("id"))].phoneNumber){
                                    selectedContacts.splice(i,1);
                                    if(selectedContacts.length==0){
                                        $("#topLinkR").html("Choose");
                                    }
                                    $(this).css("background", "#33394c");
                                    return;

                                }
                            }
                            selectedContacts.push(data.contactList[($(this).attr("id"))]);
                            $("#topLinkR").html("Next");
                            $(this).css("background", "#2a2e3e");     
                         });
                        
                        $("#topLinkR").click(function(){
                                
                                console.log("Next"+pageNum);
                                if(pageNum==0){
                                    //clearing page
                                    
                                    $("div").remove("#search");
                                    $(".letterTitles").css("display","none");
                                    $(".contactDiv").css("display","none");

                                    //initializing page
                                    initCreateGroupPage();
                                    $("#cancelImage").click(function(){
                                        selectedContacts.splice($(this).index(),1);
                                        $(this).parent().remove();
                                        console.log("canceled " + selectedContacts);
                                    });
                                    $("#createFrequency").click(function(){
                                        $("input").remove("#createGroup");
                                        $("div").remove("#createFrequency");
                                        $("div").remove("#createGroup");
                                        $("h1").remove("#createGroup");
                                        $("div").remove("#friendsList");
                                        
                                        initCreateFrequencyPage();
                                    });
                                    return;
                                }
                                if(pageNum==1){
                        
                                    //clearing page
                                    $("input").remove("#createGroup");
                                    $("div").remove("#createFrequency");
                                    $("div").remove("#createGroup");
                                    $("h1").remove("#createGroup");
                                    $("div").remove("#friendsList");
                                    
                                    
                                    return; 
                                }
                                
                            
                            
                        });
                        //back button
                        $("#topLinkL").click(function(){
                            if(pageNum==1){
                                $("input").remove("#createGroup");
                                $("div").remove("#createGroup");
                                $("h1").remove("#createGroup");
                                $("div").remove("#friendsList");
                                initContactsPage();
                                pageNum--;
                                return;
                            }
                                
                        });

                        


                    });
                   
                }
            }
        });
});

function initCreateFrequencyPage(){
    //header
    $("#topLinkR").html("Done");
    //body
   $(".wrapper").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li>Weekly</li><li>Biweekly</li><li>Monthly</li></ul>");
    $(".wrapper").append("<div id='slider'></div>");
    
    
    
    
    
}
function initContactsPage(){
    console.log("sadasdasdsadaddads");
    //header
    $("#topLinkL").html("");
    $("#logo").css("color","#feb5a8");
    $("#topLinkL").css("color","#feb5a8");
    $("#topLinkR").css("color","#feb5a8");

}
function initCreateGroupPage(){
    console.log("entered here");
    //header
    $("#topLinkL").html("Back");
    $("#logo").html("New Group");
    $("#logo").css("color","white");
    $("#topLinkL").css("color","white");
    $("#topLinkR").css("color","white");
    
    //body
    $(".wrapper").css("background","#2a2e3e"); 
    $(".wrapper").append("<input type='text' name='groupname' placeholder='Group Name' id='createGroup'></input>");
    //$(".wrapper").append("<input type='text' name='frequency' placeholder='Frequency' id='createGroup'></input>");
    $(".wrapper").append("<div id='createFrequency'>frequency</div>");
    $(".wrapper").append(" <div id='createGroup'>⊕Add a Reminder</div>");
    $(".wrapper").append(" <h1 id='createGroup'>Friends</h1>");
    $(".wrapper").append(" <div id='friendsList'></div>");
    $(".wrapper").append(" <div id='createGroup'>Missed call snoozer <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch'><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label></div></div>");
    
    for(var i=0;i<selectedContacts.length;i++){
        console.log(selectedContacts[i].name);
        $("#friendsList").append("<div id='createGroupfriends'></div>");
        // $("#createGroupfriends").append("<h>"+selectedContacts[i].name+"</h>");
        $("#createGroupfriends").append("<div id='cancelImage'></div>");
    }

    pageNum++;
}


             
function setLetters(data){
    var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var myABC=[];
    for(var i=0;i<abc.length;i++){
        for(var j=0;j<data.contactList.length;j++){
            if(abc[i]==data.contactList[j].name.charAt(0).toUpperCase()){
                myABC.push(abc[i]);
                abc.splice(i,1);                    
            }
        }
    } 
    return myABC;
}


