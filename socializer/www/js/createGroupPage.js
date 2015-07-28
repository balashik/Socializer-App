function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function InitCreateGroupPage(){
    
    globalController.setBackButtonListener(function() {
        LoadPage(function() {
            ClearCreateGroupPage();
            InitContactsPage();
        });
    });

    //header
    $("#topLinkR").html("<div>Next</div>");
    $("#topLinkL").html("<div>Back</div>");
    $("#logo").html("New Group");
    $("#logo").css("color","white");
    $("#topLinkL").css("color","white");
    $("#topLinkR").css("color","white");
    
    //body
    // $("#wrapper").removeClass("blueBackground");
    // $("#wrapper").addClass("deepBlueBackground");
    var groupName = $("<input type='text' name='groupname' placeholder='Group Name' id='createGroup' class='groupName'></input>");
    if(!isBlank(newGroup.name)) {
        groupName.val(newGroup.name);
    }
    groupName.change(function (e) {
        newGroup.name = $(this).val();
    });
    $("#wrapper").append(groupName);
    $("#wrapper").append("<div id='createFrequency'>frequency</div>");
    $("#wrapper").append(" <div id='createGroup' class='notifyMe'>⊕Add a Reminder</div>");
    $("#wrapper").append(" <h1 id='createGroup'>Friends</h1>");
    $("#wrapper").append(" <div id='friendsList'></div>");
    $("#wrapper").append(" <div id='createGroup' class='snoozer'>Missed call snoozer <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch' ><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label></div></div>");
    
    for(var i=0;i<newGroup.contacts.length;i++){
        var div = $("<div class='createGroupfriends' id='contact"+i+"'></div>");
        $("#friendsList").append(div);
        var removeDiv = $("<div class='cancelImage'></div>");
        div.append(removeDiv);
        removeDiv.click({div: div, contact: newGroup.contacts[i]}, function (ev){
            for(var j = 0; j < newGroup.contacts.length; ++j) {
                // if(ev.data.contact.id.localeCompare(newGroup.contacts[j].id) == 0) {
                if(ev.data.contact == newGroup.contacts[j]) {
                    var spliced = newGroup.contacts.splice(j, 1);
                    console.log(spliced);
                    break;
                }
            }
            ev.data.div.remove();
        });
        div.append("<h>"+newGroup.contacts[i].displayName+"</h>");
    }
    var clearList = [];
    function ClearSearchBox() {
        while(clearList.length > 0) {
            clearList[0].remove();
            clearList.splice(0, 1);
        }
    }
    function BuildSearchBox(searchTerm) {

        ClearSearchBox();
        if((searchTerm == null) || (searchTerm.localeCompare("") == 0)) {
            resultBox.css("display", "none");
            return;
        }
        var actualContacts = [];
        for(var i = 0; i < contacts.length; ++i) {
            var check = false;
            for(var j = 0; j < allGroups.length; ++j) {
                // console.log(allGroups[j]);
                for(var k = 0; k < allGroups[j].contacts.length; ++k) {
                    // console.log(allGroups[j].contacts[k].id + " Compare " + data[i].id + " = " + data[i].id.localeCompare(allGroups[j].contacts[k].id));
                    if(contacts[i].id.localeCompare(allGroups[j].contacts[k].id) == 0) {
                        check = true;
                    }
                }
            }
            if(!check) {
                for(var j = 0; j < newGroup.contacts.length; ++j) {
                    if(contacts[i].id.localeCompare(newGroup.contacts[j].id) == 0) {
                        check = true;
                    }
                }
            }
            if(!check) {
                if(contacts[i].displayName.indexOf(searchTerm)>-1) {
                    actualContacts.push(contacts[i]);
                }
            }
        }
        if(actualContacts.length == 0) {
            resultBox.css("display", "none");
            return;
        }
        var contactDiv;
        for(var i = 0; i < actualContacts.length; ++i) {
            contactDiv = $("<div class='searchContact'></div>");
            contactDiv.append("<h>" + actualContacts[i].displayName + "</h>");
            contactDiv.data("contact", actualContacts[i]);
            // console.log(contactDiv.data("contact"));
            contactDiv.click(actualContacts[i], function(ev) {
                searchBox.remove();
                var newContact = ev.data;
                newGroup.contacts.push(newContact);
                var div = $("<div class='createGroupfriends' id='contact"+(newGroup.contacts.length-1)+"'></div>");
                $("#friendsList").append(div);
                var removeDiv = $("<div class='cancelImage'></div>");
                removeDiv.click({div: div, contact: newContact}, function (ev) {
                    for(var j = 0; j < newGroup.contacts.length; ++j) {
                        // if(ev.data.contact.id.localeCompare(newGroup.contacts[j].id) == 0) {
                        if(ev.data.contact == newGroup.contacts[j]) {
                            var spliced = newGroup.contacts.splice(j, 1);
                            console.log(spliced);
                            break;
                        }
                    }
                    ev.data.div.remove();
                });
                div.append(removeDiv);
                div.append("<h>"+newContact.displayName+"</h>");
                $("#friendsList").append(searchBox);
                searchField.val("");
                BuildSearchBox();
                searchField.bind("input", function() {
                    BuildSearchBox(searchField.val());
                });
            });
            resultBox.append(contactDiv);
            clearList.push(contactDiv);
        }
        if(actualContacts.length < 4) {
            resultBox.css({
                height: (contactDiv.height() * actualContacts.length) + "px"
            });
        } else {
            resultBox.css({
                height: "122px"
            });
        }
        var checker = {
            display: "block",
            bottom: (parseFloat(resultBox.css("height")) + parseFloat(searchField.css("height")) + 5) + "px"
        }
        console.log(checker);
        resultBox.css(checker);
    }
    var searchBox = $("<div id='searchBox'><input type='search' id='searchField'><div id='searchResult'></div></div>");
    var searchField = searchBox.children("#searchField");
    var resultBox = searchBox.children("#searchResult");
    $("#friendsList").append(searchBox);
    searchField.bind("input", function() {
        BuildSearchBox(searchField.val());
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
            ClearCreateGroupPage();                                
            InitCreateFrequencyPage();
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
        LoadPage(function() {
            newGroup.missedCallSnoozer = !($("#myonoffswitch").is(":checked"));
            console.log(newGroup.missedCallSnoozer);
            newGroup.lastReset = Date.now();

            for(var i = 0; i < newGroup.contacts.length; ++i) {
                var numbersArray = [];
                console.log(JSON.stringify(newGroup.contacts[i]));
                for(var j = 0; j < newGroup.contacts[i].phoneNumbers.length; ++j) {
                    numbersArray.push(newGroup.contacts[i].phoneNumbers[j].value);
                }
                newGroup.contacts[i].phoneNumbers = numbersArray;
            }
            
            // var jsonGroup = JSON.stringify(newGroup);
            
            console.log(network);
            network.createGroup(newGroup, function(data) {
                console.log(data);
                //move to groups list page  
                ClearCreateGroupPage();
                InitListPage();
            });
        });                           
    });
    
    //moving back to contacts page
    $("#topLinkL").click(function(){
        LoadPage(function() {
            ClearCreateGroupPage();
            InitContactsPage();
        });
    });
    PageLoaded();
}

function ClearCreateGroupPage(){
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    $("input").remove("#createGroup");
    $("div").remove("#createFrequency");
    $("div").remove("#createGroup");
    $("h1").remove("#createGroup");
    $("div").remove("#friendsList");
    globalController.setBackButtonListener(null);
}
