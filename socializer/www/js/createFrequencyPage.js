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