var contentWidth = document.body.scrollWidth, 
    windowWidth = window.innerWidth, 
    newScale = windowWidth / contentWidth;
    document.body.style.zoom = newScale;
var ww = ($(window).width() < window.screen.width) ?
    $(window).width() : window.screen.width;
    
// min width of site
var mw = 1020;
//calculate ratio
var ratio =  ww / mw;
if (ww < mw) {
    $('meta[type="viewport"]').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
} else {
    $('meta[type="viewport"]').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
}

var internalLogger = $("<div>");
$("body").prepend(internalLogger);

var newGroup={  
    name:"",
    phoneNumber:"",
    contacts:[],
    frequency:{
        frequencyType:0,
        calls:0,
        whatsapp:0,
        sms:0, 
    },
    lastReset:Date.now()
};
var selectedContacts=[];

function onReady() {
    
    internalLogger.html(logger.level());
    
    // temp user data, this data need to be taken from user phone
    var userData = {
        key: "123123",
        pn: "0543191901"
    }

        //login request
        $.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/login",
            contentType: "application/x-www-form-urlencoded",
            data: userData,
            dataType: "json",
            success: function(data) {
                if(data.result>0){
                    initListPage();
                    //initContactsPage();    
                }
            }
        });

}

if(window._cordovaNative) {
    document.addEventListener("deviceready", onReady);
    console.log("On cordova");
} else {
    $(document).ready(onReady);
    console.log("Not on cordova");
}


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
                //console.log(element);
                console.log($(element[0]).html());
                var swipeLeftEvent= new Hammer(element[0]);
                swipeLeftEvent.on("swipeleft",function(){
                    if($(element[0]).width()==530){
                        $(element[0]).width(402);
                        console.log("1");
                    }else{
                        console.log("2");
                        $(element[0]).width(530)
                    }
                   
                    $(element[0]).next(".removeFromGroup").toggle();
                    
                 
                });
//                $(".contactName").on("swipeleft",function(){
//                    if($(this).width()==530){
//                        $(this).width(402);
//                        console.log("1");
//                    }else{
//                        console.log("2");
//                        $(this).width(530)
//                    }
//                   
//                    $(this).next(".removeFromGroup").toggle();
//                    
//                }); 
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

function initStatsPage(){
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
    $("#statsView").unbind("click");
    $("#listView").unbind("click");
    //body
    
    $("#statsView").css("background-color","#33394c");
    $("#listView").css("background-color","#252a3d");
    $("#statsImg").css("background-image","url(./css/images/stats.png)");
    $("#listImg").css("background-image","url(./css/images/list.png)");
    $(".wrapper").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li><a>Weekly</a></li><li><a>Biweekly</a></li><li><a>Monthly</a></li></ul>");
    
    $("#listView").click(function(){
        $("div").remove("#listView");
        $("div").remove("#statsView");
        $("nav").remove("#selectViewNav");
        $("nav").remove("#newFrequencyNav");
        initListPage();
        return;
    });
    
    
}

function initCreateFrequencyPage(){
    var total=0;
    var wf,smsf,cf=0;
    var newFrequency = {
        frequencyType:0,
        calls:0,
        whatsapp:0,
        sms:0,
    }
    
    $("#topLinkL").unbind("click");
    $("#topLinkR").unbind("click");
     
    //header
    $("#topLinkR").html("Done");
    $("#logo").html("Frequency");
    
    //body
   $(".wrapper").append("<nav id='newFrequencyNav'></nav>");
    $("#newFrequencyNav").append("<ul><li><a>Weekly</a></li><li><a>Biweekly</a></li><li><a>Monthly</a></li></ul>");
    $(".wrapper").append("<div id='frequencySelect'></div>");
    $("#frequencySelect").append("<input type='range'min='0' max='700' step='10' value='0' name='frequency' class='whatsAppSlide' onChange='changeWAValue(this.value)'></input>");
    $("#frequencySelect").append("<input type='range'min='0' max='700' step='10' value='0' name='frequency' class='SMSSlide' onChange='changeSMSValue(this.value)'></input>");
    $("#frequencySelect").append("<input type='range'min='0' max='700' step='10' value='0' name='frequency' class='CallsSlide' onChange='changeCValue(this.value)'></input>");
    $("#frequencySelect").append("<input type='range'min='0' max='700' step='10' value='0' name='frequency' class='totalSlide' onChange='changeTOTALValue(this.value)'></input>");
    $(".whatsAppSlide , .SMSSlide , .CallsSlide , .totalSlide").css("width","540px");
    $(".whatsAppSlide , .SMSSlide , .CallsSlide , .totalSlide").css("margin-top","100px");
    $(".whatsAppSlide , .SMSSlide , .CallsSlide , .totalSlide").css("margin-left","50px");
    $(".wrapper").append("<div id='frequencySummery'></div>");
    $("#frequencySummery").append("<h>Frequency summery</h>");
    $("#frequencySummery").append("<div id='device' class='w'><div id='whatsAppIcon'></div><div id='deviceName'>WhatsApp</div><div id='frequencyResult'></div></div>");
    $("#frequencySummery").append("<div id='device' class='s'><div id='smsIcon'></div><div id='deviceName'>SMS</div><div id='frequencyResult'>  X Times</div></div>");
    $("#frequencySummery").append("<div id='device' class='c'><div id='callIcon'></div><div id='deviceName'>Calls</div><div id='frequencyResult'>X Times</div></div>");
    $("#frequencySummery").append("<div id='frequencyResult' class='t'></div>");
    total=wf+smsf+cf;
    console.log(parseInt(cf));
    $(".t").html(""+total);
    changeWAValue = function (val){
        $(".w #frequencyResult").html(val+" Times");
        wf=parseInt(val);
        
        
    }
    
    changeSMSValue = function (val){
        $(".s #frequencyResult").html(val+" Times");
        smsf=parseInt(val);
        
    }
    changeCValue = function (val){
        $(".c #frequencyResult").html(val+" Times");
        cf=parseInt(val);
       // $().html(total);
    }
    
    $("a").click(function(){
        if($(this).text()=='Weekly'){
            $("a").css("border-bottom","0px solid");
            $(this).css("border-bottom","1px solid");
            newFrequency.frequencyType=0;
            return;
        }
        if($(this).text()=='Biweekly'){
            $("a").css("border-bottom","0px solid");
            $(this).css("border-bottom","1px solid");
            newFrequency.frequencyType=1;
            return;
        }
        if($(this).text()=='Monthly'){
            $("a").css("border-bottom","0px solid");
            $(this).css("border-bottom","1px solid");
            newFrequency.frequencyType=2;
            return;
        }
                                            
    });
    
    //pressed Done frequency saved
    $("#topLinkR").click(function(){
        newGroup.frequency = newFrequency;
        //moving back to createGroup Page
        clearFrequencyPage();
        initCreateGroupPage();
        return;
    });
}

function clearFrequencyPage(){
    $("nav").remove("#newFrequencyNav");
    $("div").remove("#frequencySelect");
    $("div").remove("#frequencySummery");

}

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
    /*$.getJSON("./js/contacts.json", function(data){
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
        
        
        
    });*/
    
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
