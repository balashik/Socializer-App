$(document).ready(function(){

    $("#topLinkR").click(function(){
        var groupName = $("input[name='groupname']").val();
        var frequency = $("input[name='frequency']").val();
        var cf = frequency.charAt(0);
        var mf = frequency.charAt(1);
        var wf = frequency.charAt(2);


        var group={
            name:groupName,
            contacts:[],
            frequency:{calls:cf,sms:mf,whatsapp:wf,type:1},
            lastReset:Date.now()
        }

        var allData = {
            key: "123123",
            pn: "0543191901",
            group: group
        }
        
        var json = JSON.stringify(allData);
        
        var url = "http://socializerapp.herokuapp.com/createGroup";
        
       /* $.post(url, groupJson, function(data) {
            console.log(data);
        }, "jsonp");
        */
        $.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/createGroup",
            data: json,
            dataType: "json",
            success: function(data) {
                console.log(data);
            }
        });

    });
});

