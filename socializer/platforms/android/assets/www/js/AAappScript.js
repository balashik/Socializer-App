var app = angular.module('Socializer-App',[]);
 
// temp user data, this data need to be taken from user phone
var userData = {
    key: "123123",
    pn: "0543191901"
}

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available

function onDeviceReady() {
    // find all contacts with 'Bob' in any name field
    var fields = ["displayName"];
    console.log("HERE");
    navigator.contacts.find(fields, function (contacts) {

        var contactsLetters = setLettersAndroid(contacts);
        console.log("And HERE");
        for(var i = 0; i < contactsLetters.length; ++i) {
            $("#contacts").append("<div id='letterTitles'>" + contactsLetters[i] + "</div>");
            for(var j = 0; j < contacts.length; ++j) {
                if(contacts[j].displayName != null) {
                    if(contactsLetters[i] == contacts[j].displayName.charAt(0).toUpperCase()){
                        $("#contacts").append("<div id='contactDiv'>" + contacts[j].displayName + "</div>");
                    }
                }
            }
        }

    }, function (err) {
        alert("Error on contacts.find: " + err);
    });

}


app.controller('bodyController',function($scope,$http){

	$scope.pageLogo ="Your Contacts";
    $scope.topRightButton="Choose";

    $http.post("http://socializerapp.herokuapp.com/login",JSON.stringify(userData)).then(function(data){
        
        if(data.data.result>0){
            
            
           
            
            // $.getJSON("./js/contacts.json", function(data){
            //     var contactsLetters= setLetters(data);
                
            //     for(var i=0;i<contactsLetters.length;i++){
            //         $("#contacts").append("<div id='letterTitles'>"+contactsLetters[i]+"</div>");
            //         for(var j=0;j<data.contactList.length;j++){
            //              if(contactsLetters[i]==data.contactList[j].name.charAt(0).toUpperCase()){
            //                 $("#contacts").append("<div id='contactDiv'>"+data.contactList[j].name+"</div>");
            //              }
            //         }
            //     }
                
            
            // });
        }
    });
    
    
    
});
             
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

function setLettersAndroid(contacts) {

    var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var myABC = [];
    for(var i = 0; i < abc.length; ++i){
        for(var j = 0; j < contacts.length; ++j){
            if(contacts[j].displayName != null) {
                if(abc[i] == contacts[j].displayName.charAt(0).toUpperCase()){
                    myABC.push(abc[i]);
                    abc.splice(i,1);                    
                }
            }
        }
    }

    return myABC;

}


/*

$( document ).ready(function() {
	var selectedContacts=[];
    var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	if(selectedContacts.length==0) {
		$("#topLinkR").append("Choose");
	}
	else {
		$("#topLinkR").append("Next");
	}
	


    $.getJSON("./includes/contacts.json", function(JSON){
        
        abc.forEach(function(l){
            var lDiv = $("<div id='letterTitles' ><\div>");
            lDiv.html(l);
            $("#contacts").append(lDiv);
            for(i=0;i< JSON.contactList.length ;i++){
                if(l==JSON.contactList[i].name.charAt(0).toUpperCase()){
                    var div = $("<div id='contactDiv' ><\div>");
                    div.html(JSON.contactList[i].name);
                    $("#contacts").append(div);
                }
			
		      }
        });
        


    });
});


*/