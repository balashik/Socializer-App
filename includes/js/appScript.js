var app= angular.module('Socializer-App',[]);
var myJSON; //contacts json
// temp user data, this data need to be taken from user phone
var userData = {
    key: "123123",
    pn: "0543191901"
}
app.controller('bodyController',function($scope,$http){
    $http.post("http://socializerapp.herokuapp.com/login",JSON.stringify(userData)).then(function(data){
        if(data.data.result>0){
            $scope.pageLogo ="Your Contacts";
            $scope.topRightButton="Choose";
            var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var contactsLetters=[];

            $.getJSON("./includes/js/contacts.json", function(data){
                
                for(var i=0;i<abc.length;i++){
                    for(var j=0;j<data.contactList.length;j++){
                        if(abc[i]==data.contactList[j].name.charAt(0).toUpperCase()){
                            contactsLetters.push(abc[i]);
                            abc.splice(i,1);
                            
                            
                        }
                    }
                } 
                for(var i=0;i<contactsLetters.length;i++){
                    $("#contacts").append("<div id='letterTitles'>"+contactsLetters[i]+"</div>");
                    for(var j=0;j<data.contactList.length;j++){
                         if(contactsLetters[i]==data.contactList[j].name.charAt(0).toUpperCase()){
                            $("#contacts").append("<div id='contactDiv'>"+data.contactList[j].name+"</div>");
                         }
                    }
                }
                
            
            });
        }
    });
    
    
    
});
             



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