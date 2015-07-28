
var contacts = [];
var contactsRetrieved = false;

function InitContactsPage(){

    var clearList = [];

    globalController.setBackButtonListener(function() {
        LoadPage(function() {
            ClearContactPage();
            InitListPage();
        });
    });
    
    //header
    $("header").append("<div id='logo'></div>");
    $("#logo").html("Your Contacts");
    //$("#topLinkR").html("Choose");
    if(selectedContacts.length > 0) {
        $("#topLinkR").html("<div>Next</div>");
    } else {
        $("#topLinkR").html("<div>Choose</div>");
    }
    if(!window._cordovaNative) {
        $("#topLinkL").html("<div>Back</div>");
        $("#topLinkL").click(function() {
            LoadPage(function() {
                ClearContactPage();
                InitListPage();
            });
        });
    } else {
        $("#topLinkL").html("");
    }
    
    $("#logo").css("color","#feb5a8");
    $("#topLinkL").css("color","#feb5a8");
    $("#topLinkR").css("color","#feb5a8");

    $("#wrapper").append("<div id='search'><input type='text' name='search' placeholder='Search' ></input></div>");
    
    $("input").keyup(function(){
        var contactsArraySearch = $(".contactDiv");
        var lettersArraySearch=$(".lettersTitle");
        BuildPage(contacts, $(this).val());
    });   
    
    var contactsLetters=[];

    function FindLetters(data){
        var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
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

    function ClearPage() {
        while(clearList.length > 0) {
            clearList[0].remove();
            clearList.splice(0, 1);
        }
    }

    function BuildPage(data, searchTerm) {

        ClearPage();

        var actualContacts = [];
        for(var i = 0; i < data.length; ++i) {
            var check = false;
            for(var j = 0; j < allGroups.length; ++j) {
                // console.log(allGroups[j]);
                for(var k = 0; k < allGroups[j].contacts.length; ++k) {
                    // console.log(allGroups[j].contacts[k].id + " Compare " + data[i].id + " = " + data[i].id.localeCompare(allGroups[j].contacts[k].id));
                    if(data[i].id.localeCompare(allGroups[j].contacts[k].id) == 0) {
                        check = true;
                    }
                }
            }
            if(!check) {
                if(data[i].displayName.indexOf(searchTerm)>-1) {
                    actualContacts.push(data[i]);
                }
            }
        }

        contactsLetters = FindLetters(actualContacts);
        for(var i = 0; i < contactsLetters.length; ++i){
            var letterDiv = $("<div class='letterTitles'>"+contactsLetters[i]+"</div>");
            clearList.push(letterDiv);
            $("#wrapper").append(letterDiv);
            for(var j = 0; j < actualContacts.length; ++j){
                if(contactsLetters[i] == actualContacts[j].displayName.charAt(0).toUpperCase()){
                    var contactDiv = $("<div class='contactDiv' id='"+j+"'>"+actualContacts[j].displayName+"</div>");
                    clearList.push(contactDiv)
                    $("#wrapper").append(contactDiv);
                    for(var k = 0; k < selectedContacts.length; ++k) {
                        if(selectedContacts[k].id == actualContacts[j].id) {
                            contactDiv.css("background-color", "#2a2e3e");
                            break;
                        }
                    }
                }
            }
        }
        
        //click on contact name
        $(".contactDiv").click(function() {
            console.log(selectedContacts);
            for(var i=0;i<selectedContacts.length;i++){
                if(selectedContacts[i].id==actualContacts[($(this).attr("id"))].id){
                    selectedContacts.splice(i,1);
                    if(selectedContacts.length==0){
                        $("#topLinkR").html("<div>Choose</div>");
                    }
                    $(this).css("background-color", "#33394c");
                    console.log("After\n");
                    console.log(selectedContacts);
                    return;
                }
            }
            selectedContacts.push(actualContacts[($(this).attr("id"))]);
            $("#topLinkR").html("<div>Next</div>");
            $(this).css("background-color", "#2a2e3e");
            console.log("After\n");
            console.log(selectedContacts);
        });
    }
    
    if(window._cordovaNative) {
        // find all contacts with 'Bob' in any name field
        if(!contactsRetrieved) {
            var options      = new ContactFindOptions();
            options.multiple = true;
            var fields       = ["displayName", "name"];
            navigator.contacts.find(fields, function(res) {
                contacts = res;
                for(var i = 0; i < contacts.length; ++i) {
                    if( (contacts[i].displayName == null) ||
                        (contacts[i].phoneNumbers == null) || 
                        (contacts[i].phoneNumbers.length == 0) ||
                        (contacts[i].displayName == "Voice Mail")) {
                        contacts.splice(i, 1);
                        --i;
                    }
                }
                BuildPage(contacts, "");
                contactsRetrieved = true;
                PageLoaded();
            }, function(err) {
                console.log("Error aquiring contacts: " + err);
            }, options);
        } else {
            BuildPage(contacts, "");
            PageLoaded();
        }

    } else {

         $.ajax({
            dataType: "json",
            url: "./js/contacts.json",
            success: function(data) {
                contacts = data;
                BuildPage(data, "");
                PageLoaded();
            },
            error: function(err) {
                contacts = JSON.parse(err.responseText);
                BuildPage(JSON.parse(err.responseText), "");
                PageLoaded();
            }
        });

    }

    $("#topLinkR").click(function(){
        if(selectedContacts.length>0){
            //moving all contacts selected into new group contacts
            while(newGroup.contacts.length > 0) {
                newGroup.contacts.splice(0, 1);
            }
            for(var i = 0; i < selectedContacts.length; ++i) {
                newGroup.contacts.push(selectedContacts[i]);
            }
            //moving into createGroupPage
            LoadPage(function() {
                ClearContactPage();
                //initializing createGroupPage
                InitCreateGroupPage();
            });
        }
    });

}

function ClearContactPage(){
    $("div").remove("#search");
    $(".letterTitles").css("display","none");
    $(".contactDiv").css("display","none");
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    globalController.setBackButtonListener(null);
}

         

