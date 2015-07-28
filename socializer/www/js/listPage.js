
function CleaListPage() {
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
}

function contactBlockClicked(ev) {
    $(this).animate({
            height: "369px"
    }, loadingManager.animationTime /*Comes from loadinPage.js*/, "easeOutQuart", function() {
        var waFreq = (ev.data.group.frequency.whatsapp > 0) ? ev.data.group.frequency.whatsapp : 1;
        var wap = ((ev.data.group.contacts[ev.data.index].communications.whatsapp.count / waFreq) * 100);
        wap = (wap > 100) ? 100 : wap;
        wap = (wap < 0) ? 0 : wap;
        var whatsAppBlock = $(" <div class='statusField WA'> \
                                    <div> \
                                        <h class='WA'>WhatsApp</h> \
                                        <h>" + wap + "% completed</h> \
                                    </div> \
                                    <div> \
                                        <div class='whatsAppIcon'></div> \
                                        <div class='progressBar'></div>\
                                    </div> \
                                </div>");
        whatsAppBlock.find(".progressbar").progressbar({value: wap});
        $(this).append(whatsAppBlock);
        var smsFreq = (ev.data.group.frequency.sms > 0) ? ev.data.group.frequency.sms : 1;
        var smsp = ((ev.data.group.contacts[ev.data.index].communications.sms.count / smsFreq) * 100);
        smsp = (smsp > 100) ? 100 : smsp;
        smsp = (smsp < 0) ? 0 : smsp;
        var smsBlock = $( "<div class='statusField SMS'> \
                                    <div> \
                                        <h>SMS</h> \
                                        <h>" + smsp + "% completed</h> \
                                    </div> \
                                    <div> \
                                        <div class='smsIcon'></div> \
                                        <div class='progressBar'></div> \
                                    </div> \
                                </div>");
        smsBlock.find(".progressbar").progressbar({value: smsp});
        $(this).append(smsBlock);
        var callsFreq = (ev.data.group.frequency.calls > 0) ? ev.data.group.frequency.calls : 1;
        var callsp = ((ev.data.group.contacts[ev.data.index].communications.sms.count / callsFreq) * 100);
        callsp = (callsp > 100) ? 100 : callsp;
        callsp = (callsp < 0) ? 0 : callsp;
        var callsBlock = $( "<div class='statusField Calls'> \
                                    <div> \
                                        <h>Calls</h> \
                                        <h>" + callsp + "% completed</h> \
                                    </div> \
                                    <div> \
                                        <div class='callIcon'></div> \
                                        <div class='progressBar'></div> \
                                    </div> \
                                </div>");
        callsBlock.find(".progressbar").progressbar({value: callsp});
        $(this).append(callsBlock);
        var clearList = [];
        clearList.push(whatsAppBlock);
        clearList.push(smsBlock);
        clearList.push(callsBlock);
        $(this).click({clearList: clearList, prevData: ev.data} , function(ev) {
            while(ev.data.clearList.length > 0) {
                $(ev.data.clearList[0]).remove();
                ev.data.clearList.splice(0, 1);
            }
            $(this).animate({
               height: "68px" 
            }, loadingManager.animationTime /*Comes from loadinPage.js*/, "easeOutQuart", function() {
                $(this).click(ev.data.prevData, contactBlockClicked);
            });
            $(this).unbind("click");
        });
    });
    $(this).unbind("click");
}

function CreateGroupDiv(group, index) {
    $("#wrapper").append("<div id='groupName'>"+group.name+"</div>");
    var groupDiv = $("<div id='listContactDiv"+index+"' class='listContactDiv'></div>");
    $("#wrapper").append(groupDiv);
    var total = group.frequency.calls + group.frequency.whatsapp + group.frequency.sms;
    var type = (group.frequency.frequencyType == 0) ? ("W") : ((group.frequency.frequencyType == 1) ? ("2W") : ("M"));
    for(var j=0;j<group.contacts.length;j++) {
        var statusString = (group.contacts[j].communications.calls.count + group.contacts[j].communications.sms.count + group.contacts[j].communications.whatsapp.count).toString();
        statusString += "/" + total + " " + type;
        var contactBlock = $("<div class='contactBlock'></div>");
        var contactName = $("<div id='" + group.contacts[j].id + "' class='contactName'><h>" + group.contacts[j].displayName+"</h><div class='freqStats'>"+statusString+"</div><div class='removeFromGroup'>Delete</div></div>");
        contactBlock.append(contactName);
        groupDiv.append(contactBlock);
        $(".removeFromGroup").css("display","none");
        contactBlock.click({group: group, index: j}, contactBlockClicked);
        contactName.on("touchstart mousedown", function() {
            console.log($(this).html() + " and here?");
            var index = parseInt($(this).attr('id'));
            console.log(group.contacts[index]);
        });
    }
    groupDiv.append("<div class='clear'></div>");
}

function InitListPage(){
    
    //header
    $("#topLinkR").html("");
    $("#topLinkL").html("");
    $("#logo").html("");
    $("#topLinkR").append("<div class='settings'></div>");
    $("#topLinkL").append("<div id='addGroup'></div>");
    //body
    $("#wrapper").append("<nav id='selectViewNav'></nav>");
    $("#selectViewNav").append("<div id='listView'></div><div id='statsView'></div>");
    $("#listView").append("<div id='listImg'></div>");
    $("#statsView").append("<div id='statsImg'></div>");
    
    //sort title
    $("#wrapper").append("<div id='sortTitle'></div>");

    // All groups should already be ready
    for(var i=0;i < allGroups.length;i++){
        if(allGroups[i].frequency.frequencyType==0){
            CreateGroupDiv(allGroups[i], i);
        }
    }
    for(var i=0;i<allGroups.length;i++){
        if(allGroups[i].frequency.frequencyType==1){
            CreateGroupDiv(allGroups[i], i);
        }
    }
    for(var i=0;i<allGroups.length;i++){
        if(allGroups[i].frequency.frequencyType==2){
            CreateGroupDiv(allGroups[i], i);
        }
    }

    var contactDivs = $(".contactName");
    for(var i = 0; i < contactDivs.length; ++i) {
        // contactDivs.on("touchstart", function() {
        //     console.log($(this).html() + " and here?");
        // });
        // var hammerHelper = new Hammer(contactDivs[i]);
        // hammerHelper.on("touch", function(ev) {
        //     console.log("HERE");
        //     console.log(JSON.stringify(ev));
        // });
        // swipeLeftEvent.on("swipeleft",function(ev) {
        //     console.log("swipe created");
        //     if($(ev.target).width()==530){
        //         $(ev.target).width(402);
        //     }else{
        //         $(ev.target).width(530)
        //     }
        //     $(ev.target).next(".removeFromGroup").toggle();
        // });
    }
    
    $("#statsView").click(function(){
        $("div").remove("#sortTitle");
        $("div").remove("#groupName");
        $("div").remove(".listContactDiv");
        InitStatsPage();
        return;
    });
    $(".settings").unbind("click");
    $(".settings").click(function(){
        console.log("clicked");
        $("#settingsWindow").toggle("slide",{direction:"right",easing :"easeOutQuart"},800);
    });
    $("#addGroup").click(function(){
        //clearing this page
        //$("div").remove("#settings");
        //$("div").remove("#addGroup");
        $("nav").remove("#selectViewNav");
        $("div").remove("#sortTitle");
        $("div").remove("#groupName");
        $("div").remove(".listContactDiv");
        LoadPage(function() {
            CleaListPage();
            InitContactsPage();
        });
    });
    PageLoaded();
}