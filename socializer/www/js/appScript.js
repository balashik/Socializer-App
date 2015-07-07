console.log("PADDING");
console.log("PADDING");
console.log("PADDING");
console.log("PADDING");

console.log("Outside");

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    console.log("Inside");
    
 	var selectedContacts = [];
    var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 	if(selectedContacts.length == 0) {
 		$("#topLinkR").append("Choose");
 	} else {
 		$("#topLinkR").append("Next");
 	}

     // $.getJSON("./includes/contacts.json", function(JSON){
        
     //     abc.forEach(function(l){
     //         var lDiv = $("<div id='letterTitles' ><\div>");
     //         lDiv.html(l);
     //         $("#contacts").append(lDiv);
     //         for(i=0;i< JSON.contactList.length ;i++){
     //             if(l==JSON.contactList[i].name.charAt(0).toUpperCase()){
     //                 var div = $("<div id='contactDiv' ><\div>");
     //                 div.html(JSON.contactList[i].name);
     //                 $("#contacts").append(div);
     //             }
			
 		  //     }
     //     });
        
     // });

     // find all contacts
     var fieldFilter = ["displayName"];
     
     navigator.contacts.find(fieldFilter, function (contacts) {

         console.log("contacts count " + contacts.length);
         
          abc.forEach(function (l) {
              
              var lDiv = $("<div id='letterTitles' ><\div>");
              lDiv.html(l);
              $("#contacts").append(lDiv);
              
              for(i = 0; i < contacts.length; ++i){
                  if(contacts[i].displayName != null) {
                      if(l == contacts[i].displayName.charAt(0).toUpperCase()){
                          var div = $("<div id='contactDiv' ><\div>");
                          div.html(contacts[i].displayName);
                          $("#contacts").append(div);
                      }
                  }
              }
              
          });

     }, function (err) {
         console.log('Error on contants.find with params: filter -- ' + fieldFilter + " -- options -- " + JSON.stringify(options));
     });

};

