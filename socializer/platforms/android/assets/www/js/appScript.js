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

if(console) {
    logger.html("Console is available");
} else {
    logger.html("Console is not available");
}

function onReady() {

    cordova.logger.useConsole(true);

    cordova.logger.level("LOG");
    cordova.logger.log("onReady called");
    logger.html(cordova.logger.level() + " " + cordova.logger.useConsole());

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