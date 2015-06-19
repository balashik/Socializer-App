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


