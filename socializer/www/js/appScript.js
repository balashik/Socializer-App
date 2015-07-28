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
    lastReset:Date.now(),
    reminder:false,
    missedCallSnoozer:false
    
};

var selectedContacts=[];

var allGroups = [];

var globalController;

function onReady() {

    globalController = new GlobalController();

    // temp user data, this data need to be taken from user phone
    var userData = {
        key: "123123",
        pn: "0543191901"
    }

    //login request
    network.login("0543191901", "123123", function(data) {
        if(data.result>0){
            network.retrieveAll(function(data) {
                if(data.result > 0) {
                    InitListPage();
                }
            });   
        }
    });

    // $.ajax({
    //     method: "POST",
    //     url: "http://socializerapp.herokuapp.com/login",
    //     contentType: "application/x-www-form-urlencoded",
    //     data: userData,
    //     dataType: "json",
    //     success: function(data) {
    //         if(data.result>0){
    //             InitListPage();
    //             //initContactsPage();    
    //         }
    //     }
    // });

}

if(window._cordovaNative) {
    // document.addEventListener("deviceready", onReady);
    console.log("On cordova");
} else {
    $(document).ready(onReady);
    console.log("Not on cordova");
}