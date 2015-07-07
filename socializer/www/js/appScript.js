$(document).ready(function(){

// temp user data, this data need to be taken from user phone
var userData = {
    key: "123123",
    pn: "0543191901"
}
var json=JSON.stringify(userData);
var selectedContacts=[];
    
        $.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/login",
            data: json,
            dataType: "json",
            success: function(data) {
                console.log(data);
         
       
                if(data.data.result>0){
                    
                    $scope.pageLogo ="Your Contacts";
                    $scope.topRightButton="Choose";

            
                    var contactsLetters=[];

                    $.getJSON("./js/contacts.json", function(data){
                        contactsLetters = setLetters(data);

                        for(var i=0;i<contactsLetters.length;i++){
                            $("#contacts").append("<div id='letterTitles'>"+contactsLetters[i]+"</div>");
                            for(var j=0;j<data.contactList.length;j++){
                                 if(contactsLetters[i]==data.contactList[j].name.charAt(0).toUpperCase()){
                                    $("#contacts").append("<div class='contactDiv'>"+data.contactList[j].name+"</div>");
                                 }
                            }
                        }

                        $(".contactDiv").click(function(){


                            for(var i=0;i<selectedContacts.length;i++){
                                if(selectedContacts[i].phoneNumber==data.contactList[($(this).index()-1)].phoneNumber){
                                    console.log("found");
                                    selectedContacts.splice(i,1);
                                    $(this).css("background", "#33394c");
                                    return;

                                }
                            }
                            console.log("not found");
                            selectedContacts.push(data.contactList[($(this).index()-1)]);
                            $(this).css("background", "#2a2e3e");



                        });


                    });
                }
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


