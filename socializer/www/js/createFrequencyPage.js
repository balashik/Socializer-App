function initCreateFrequencyPage(){
    var total=0;
    var wf=0;
    var smsf=0;
    var cf=0;
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
    var whatsAppSlider = $("<div class='fWhatsApp'><input type='range'min='0' max='700' step='10' value='0' name='frequency' class='whatsAppSlide'></input></div>");
    var smsSlider = $("<div class='fSMS'><input type='range'min='0' max='700' step='10' value='0' name='frequency' class='SMSSlide'></input></div>");
    var callsSlider = $("<div class='fCalls'><input type='range'min='0' max='700' step='10' value='0' name='frequency' class='CallsSlide' onChange='changeCValue(this.value)'></input></div>");
    whatsAppSlider.mousemove(function(e) {
        changeWAValue(this.value);
    });
    smsSlider.mousemove(function(e) {
        changeSMSValue(this.value);
    });
    callsSlider.mousemove(function(e) {
        changeCValue(this.value);
    });
    
    $("#frequencySelect").append("<div class='fTotal'><input type='range'min='0' max='21' step='1' value='0' name='frequency' class='totalSlide' disabled='disabled'></input></div>");
    $(".fTotal").append("<div id='frequencyResult' class='t'></div>");
    $("#frequencySelect").append(whatsAppSlider);
    $("#frequencySelect").append(smsSlider);
    $("#frequencySelect").append(callsSlider);
        
    $(".whatsAppSlide , .SMSSlide , .CallsSlide , .totalSlide").css("margin-top","100px");
    //$(".whatsAppSlide , .SMSSlide , .CallsSlide , .totalSlide").css("margin-left","50px");
    $(".wrapper").append("<div id='frequencySummery'></div>");
    $("#frequencySummery").append("<h>Frequency summery</h>");
    $("#frequencySummery").append("<div id='device' class='w'><div id='whatsAppIcon'></div><div id='deviceName'>WhatsApp</div><div id='frequencyResult'>0 Times</div></div>");
    $("#frequencySummery").append("<div id='device' class='s'><div id='smsIcon'></div><div id='deviceName'>SMS</div><div id='frequencyResult'>  0 Times</div></div>");
    $("#frequencySummery").append("<div id='device' class='c'><div id='callIcon'></div><div id='deviceName'>Calls</div><div id='frequencyResult'>0 Times</div></div>");
//    $("#frequencySummery").append("<div id='frequencyResult' class='t'></div>");
   
    $(".t").html("Total:0");
    changeWAValue = function (val){
        wf=parseInt(parseInt(val)/100);
         total=wf+smsf+cf;
        $(".w #frequencyResult").html(wf+" Times");
        $(".t").html("Total:"+total);
        $(".totalSlide").val(total);
        
        
    }
    
    changeSMSValue = function (val){
        smsf=parseInt(parseInt(val)/100);
         total=wf+smsf+cf;
        $(".s #frequencyResult").html(smsf+" Times");
        $(".t").html("Total:"+total);
        $(".totalSlide").val(total);
        
    }
    changeCValue = function (val){
        cf=parseInt(parseInt(val)/100);
         total=wf+smsf+cf;
        $(".c #frequencyResult").html(cf+" Times");
        $(".t").html("Total:"+total);
        $(".totalSlide").val(total);
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
        newFrequency.whatsapp = wf;
        newFrequency.calls = cf;
        newFrequency.sms = smsf;
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