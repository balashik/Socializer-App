
function initContactsPage(){
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    
    //header
    //$(".wrapper").append("<header></header");
    $("header").append("<div id='logo'></div>");
    //$("header").append("<ul><li><a id = 'topLinkL'></a></li></ul>");
    //$("header").append("<ul><li><a id = 'topLinkR'></a></li></ul>");
    
    
    $("#logo").html("Your Contacts");
    $("#topLinkR").html("Choose");
    $("#topLinkL").html("");
    $("#logo").css("color","#feb5a8");
    $("#topLinkL").css("color","#feb5a8");
    $("#topLinkR").css("color","#feb5a8");
    
    //body
    $(".wrapper").append("<div id='search'><input type='text' name='search' placeholder='Search'></input></div>");
    
    
    var contactsLetters=[];
    
    $.ajax({
    	dataType: "json",
    	url: "./js/contacts.json",
    	success: function(data) {
    		buildPage(data);
    	},
    	error: function(err) {
    		buildPage(JSON.parse(err.responseText));
    	}
    });
}

function clearContactPage(){
    $("div").remove("#search");
    $(".letterTitles").css("display","none");
    $(".contactDiv").css("display","none");
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

var buildPage = function(data) {
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
    
    //moving to create group page
    $("#topLinkR").click(function(){
        //moving all contacts selected into new group contacts
        newGroup.contacts = selectedContacts;
        
        //moving into createGroupPage
        clearContactPage();
        //initializing createGroupPage
        initCreateGroupPage();
        
        return;
    });
}