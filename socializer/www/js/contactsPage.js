
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
    
    if(window._cordovaNative) {
        function onSuccess(contacts) {
            alert('Found ' + contacts.length + ' contacts.');
        };

        function onError(contactError) {
            alert('onError!');
        };

        // find all contacts with 'Bob' in any name field
        var options      = new ContactFindOptions();
        options.multiple = true;
        var fields       = ["displayName", "name"];
        navigator.contacts.find(fields, function(contacts) {
            for(var i = 0; i < contacts.length; ++i) {
                if(contacts[i].displayName == null) {
                    contacts.splice(i, 1);
                    --i;
                }
            }
            buildPage(contacts);
        }, function(err) {
            console.log("Error aquiring contacts: " + err);
        }, options);

    } else {

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
        for(var j = 0; j < data.length; ++j){
            if(abc[i]==data[j].displayName.charAt(0).toUpperCase()){
                myABC.push(abc[i]);
                abc.splice(i,1);                    
            }
        }
    } 
    return myABC;
}

var buildPage = function(data) {
    contactsLetters = setLetters(data);
    for(var i = 0; i < contactsLetters.length; ++i){
        $(".wrapper").append("<div class='letterTitles'>"+contactsLetters[i]+"</div>");
        for(var j = 0; j < data.length; ++j){
            if(contactsLetters[i] == data[j].displayName.charAt(0).toUpperCase()){
                $(".wrapper").append("<div class='contactDiv' id='"+j+"'>"+data[j].displayName+"</div>");
            }
        }
    }
    
    //click on contact name
    $(".contactDiv").click(function(){

        for(var i=0;i<selectedContacts.length;i++){
            if(selectedContacts[i].id==data[($(this).attr("id"))].id){
                selectedContacts.splice(i,1);
                if(selectedContacts.length==0){
                    $("#topLinkR").html("Choose");
                }
                $(this).css("background", "#33394c");
                return;

            }
        }
        selectedContacts.push(data[($(this).attr("id"))]);
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