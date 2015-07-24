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
    var whatsAppSlider = $("<div class='fTotal'><div id='result' class='waResult'></div><div id='frequencyResult' class='WA'>WhatsApp</div><div id='whatsAppIcon'></div><input type='range'min='0' max='700' step='10' value='0' name='frequency' class='whatsAppSlide'></input></div>");
    var smsSlider      = $("<div class='fTotal'><div id='result' class='smsResult'></div><div id='frequencyResult' class='SMS'>SMS</div><div id='smsIcon'></div><input type='range'min='0' max='700' step='10' value='0' name='frequency' class='SMSSlide'></input></div>");
    var callsSlider    = $("<div class='fTotal'><div id='result' class='callResult'></div><div id='frequencyResult' class='Calls'>Calls</div><div id='callIcon'></div><input type='range'min='0' max='700' step='10' value='0' name='frequency' class='CallsSlide' ></input></div>");
    whatsAppSlider.mousemove(function(e) {
        changeWAValue($(this).find("input").val());
    });
    smsSlider.mousemove(function(e) {
        changeSMSValue($(this).find("input").val());
    });
    callsSlider.mousemove(function(e) {
        changeCValue($(this).find("input").val());
    });
    
    $("#frequencySelect").append("<div class='fTotal'><div id='result' class='totalResult'></div><div id='frequencyResult' class='total'>Total</div><input type='range'min='0' max='21' step='1' value='0' name='frequency' class='totalSlide' disabled='disabled'></input></div>");
    $("#frequencySelect").append(whatsAppSlider);
    $("#frequencySelect").append(smsSlider);
    $("#frequencySelect").append(callsSlider);
        
    
   
    $(".totalResult").html("Total:0");
    $(".waResult").html("0 Times");
    $(".smsResult").html("0 Times");
    $(".callResult").html("0 Times");
    changeWAValue = function (val){
        
        wf=parseInt(parseInt(val)/100);
         total=wf+smsf+cf;
        $(".waResult").html(wf+" Times");
        $(".totalResult").html("Total:"+total);
        $(".totalSlide").val(total);
        
        
    }
    
    changeSMSValue = function (val){
        smsf=parseInt(parseInt(val)/100);
         total=wf+smsf+cf;
        $(".smsResult").html(smsf+" Times");
        $(".totalResult").html("Total:"+total);
        $(".totalSlide").val(total);
        
    }
    changeCValue = function (val){
        cf=parseInt(parseInt(val)/100);
         total=wf+smsf+cf;
        $(".callResult").html(cf+" Times");
        $(".totalResult").html("Total:"+total);
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
        LoadPage(function() {
            clearFrequencyPage();
            initCreateGroupPage();
        });
        
        return;
    });
    PageLoaded();
}

function clearFrequencyPage(){
    $("nav").remove("#newFrequencyNav");
    $("div").remove("#frequencySelect");
    $("div").remove("#frequencySummery");

}