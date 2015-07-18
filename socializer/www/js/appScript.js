
var selectedContacts=[];
var pageNum=0;
$(document).ready(function(){

    
    // temp user data, this data need to be taken from user phone
    var userData = {
        key: "123123",
        pn: "0543191901"
    }
    var json=JSON.stringify(userData);

        //login request
        $.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/login",
            data: userData,
            dataType: "json",
            success: function(data) {
            
                if(data.result>0){
                    
                    initContactsPage();
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
                            console.log("devdvdvd");


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
                                
                                console.log("pageNum" + pageNum);
                                if(pageNum==0){
                                    
                                    clearContactPage();
                                    //initializing page
                                    initCreateGroupPage();
                                    var newGroup={  
                                                    name:"",
                                                    frequency:{
                                                        type:0,
                                                        whatsApp:0,
                                                        sms:0,
                                                        call:0
                                                    },
                                                    contacts:[]
                                    };
                                    
                                    $(".cancelImage").click(function(){
                                        selectedContacts.splice($(this).index(),1);
                                        $(this).parent().remove();
                                    });
                                    
                                    //add a reminder
                                    $(".notifyMe").click(function(){
                                        $(this).css("color","#feb5a8");
                                    });
                                    $("#createFrequency").click(function(){
                                        clearCreateGroupPage();
                                        
                                        initCreateFrequencyPage();
                                        var newFrequency = {
                                                            type:0,
                                                            whatsApp:0,
                                                            SMS:0,
                                                            call:0
                                                            }
                                        $("a").click(function(){
                                            if($(this).text()=='Weekly'){
                                                $("a").css("border-bottom","0px solid");
                                                $(this).css("border-bottom","1px solid");
                                                newFrequency.type=0;
                                            }
                                            if($(this).text()=='Biweekly'){
                                                $("a").css("border-bottom","0px solid");
                                                $(this).css("border-bottom","1px solid");
                                                newFrequency.type=1;
                                            }
                                            if($(this).text()=='Monthly'){
                                                $("a").css("border-bottom","0px solid");
                                                $(this).css("border-bottom","1px solid");
                                                newFrequency.type=2;
                                            }
                                            
                                        });
                                        //pressed Done 
                                        $("#topLinkR").click(function(){
                                            newGroup.frequency = newFrequency;
                                            clearFrequencyPage();
                                            console.log(newGroup.frequency);
                                            
                                        });
                                 
                                    });
                                    return;
                                }
                                if(pageNum==1){
                        
                                    //pressed done
                                    
                                    //need to send group data to the server
                                    clearCreateGroupPage();
                                    initListPage();
                                    
                                    
                                    
                                    return; 
                                }
                                
                            
                            
                        });
                        //back button
                        $("#topLinkL").click(function(){
                            if(pageNum==1){
                              clearCreateGroupPage();
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

function initListPage(){
    $("#topLinkR").html("");
    $("#topLinkL").html("");
    $("#logo").html("");
    $("#topLinkR").append("<div id='addGroup'></div>");
    $("#topLinkL").append("<div id='settings'></div>");
    $(".wrapper").append("<nav id='selectViewNav'></nav>");
    $("#selectViewNav").append("<div id='listView'></div><div id='statsView'></div>");
    $("#listView").append("<div id='listImg'></div>");
    $("#statsView").append("<div id='statsImg'></div>");
    /*<div id='listImg'></div>
    <div id='statsImg'></div>*/
    


}
function initCreateFrequencyPage(){
    //header
    $("#topLinkR").html("Done");
    $("#logo").html("Frequency");
    
    //body
   $(".wrapper").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li><a>Weekly</a></li><li><a>Biweekly</a></li><li><a>Monthly</a></li></ul>");
    $(".wrapper").append("<div id='frequencySelect'></div>");
    $("#frequencySelect").append("<div class='whatsAppSlider'></div>");
    $(".whatsAppSlider").slider({
        max:50,
        min:25,
        orientation:'vertical'
        
    });
    $(".wrapper").append("<div id='frequencySummery'></div>");
    $("#frequencySummery").append("<h>Frequency summery</h>");
    $("#frequencySummery").append("<div id='device' class='w'><div id='whatsAppIcon'></div><div id='deviceName'>WhatsApp</div><div id='frequencyResult'>X Times</div></div>");
    $("#frequencySummery").append("<div id='device' class='s'><div id='smsIcon'></div><div id='deviceName'>SMS</div><div id='frequencyResult'>X Times</div></div>");
    $("#frequencySummery").append("<div id='device' class='c'><div id='callIcon'></div><div id='deviceName'>Calls</div><div id='frequencyResult'>X Times</div></div>");

    $("#frequencySummery").append("<div id='frequencyResult' class='t'>Total:X</div>"); 
}

function clearFrequencyPage(){
    $("nav").remove("#newFrequencyNav");
    $("div").remove("#frequencySelect");
    $("div").remove("#frequencySummery");

}

function initContactsPage(){
    
    //header
    $(".wrapper").append("<header></header");
    $("header").append("<div id='logo'></div>");
    $("header").append("<ul><li><a id = 'topLinkL'></a></li></ul>");
    $("header").append("<ul><li><a id = 'topLinkR'></a></li></ul>");
    
    $("#logo").html("Your Contacts");
    $("#topLinkR").html("Choose");
    $("#topLinkL").html("");
    $("#logo").css("color","#feb5a8");
    $("#topLinkL").css("color","#feb5a8");
    $("#topLinkR").css("color","#feb5a8");
    
    //body
    $(".wrapper").append("<div id='search'><input type='text' name='search' placeholder='Search'></input></div>");
    

    
    

}
function clearContactPage(){
    $("div").remove("#search");
    $(".letterTitles").css("display","none");
    $(".contactDiv").css("display","none");




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
    $(".wrapper").append("<input type='text' name='groupname' placeholder='Group Name' id='createGroup' class='groupName'></input>");
    //$(".wrapper").append("<input type='text' name='frequency' placeholder='Frequency' id='createGroup'></input>");
    $(".wrapper").append("<div id='createFrequency'>frequency</div>");
    $(".wrapper").append(" <div id='createGroup' class='notifyMe'>⊕Add a Reminder</div>");
    $(".wrapper").append(" <h1 id='createGroup'>Friends</h1>");
    $(".wrapper").append(" <div id='friendsList'></div>");
    $(".wrapper").append(" <div id='createGroup'>Missed call snoozer <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch'><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label></div></div>");
    
    for(var i=0;i<selectedContacts.length;i++){
        console.log(selectedContacts[i].name);
        $("#friendsList").append("<div class='createGroupfriends' id='contact"+i+"'></div>");
        // $("#createGroupfriends").append("<h>"+selectedContacts[i].name+"</h>");
        $("#contact"+i).append("<div class='cancelImage'></div>");
    }

    pageNum++;
}
function clearCreateGroupPage(){
    $("input").remove("#createGroup");
    $("div").remove("#createFrequency");
    $("div").remove("#createGroup");
    $("h1").remove("#createGroup");
    $("div").remove("#friendsList");
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


