var currentkey=ligObject.OutputCounts+2;
var input_flag=true;//true当前的设置为正确的参数


var change_flag=true;//true表示没有输入
var Timeoutonoffbuttonid=[0,1,2,3,4,5,6,7];
var DefTimeOutValue=[900,900,900,900,900,900,900,900,900];
ligObject.timeoutcurrentselect=ligObject.OutputCounts;
var onoffstatus=[0,0,0,0,0,0,0,0];
var opentimeoutDiv=function()
{
    change_flag=true;
    currentkey=ligObject.OutputCounts+2;
    input_flag=true;
    timeout_init_sync_queries();
    var str = "<div id='propertiesBox'>";
    str += "<div id='contentBox' style='min-width: 970px;min-height: 581px'>";
    str += "<div class='txtTitle'>Timeout Settings</div>";
    str += "<div>";
    str += "<table width='100%'><tr>";
    str += "<td style='width:200px'>"+"</td>";
    str += "</tr></table>";
    str += "</div>";
    str += "</tr>";

    str += "<tr>";
    str += "<td>";
    str += "<div id= 'RoutingDiv' class= 'contentBoxFilAFV'>";

    str+=TimeOut();
    str += "</div>";
    str += "</td>";
    str += "<td style='vertical-align:top'>";
    str += "</td>";
    str += "		</tr>";
    str += "	</div>";
    str += "</div>";

    $("#contentDiv").html(str);
    for(var i=0;i<ligObject.OutputCounts;i++)
    {
        Timeoutonoffbuttonid[i]=new onoffButton("onoffId_timeputcheckbox_"+i);
        Timeoutonoffbuttonid[i].onName ="ON";
        Timeoutonoffbuttonid[i].offName = "OFF";
        Timeoutonoffbuttonid[i].isOn =true;
        Timeoutonoffbuttonid[i].funcToRun="Support_audio";
        Timeoutonoffbuttonid[i].create("timeputcheckbox_"+i);
    }
    timedraw();
    setTimeout("showLoading(false);", 1500);
};
var TimeOut=function()
{
    var str="",i= 0,data="";
    str +="<table>";
    str +="<tr>";
    str +="<td style='min-width: 200px;padding: 10px'>Timeout period before disabling 5V output after no input is detected</td>";
    str +="<td style='min-width: 30px;padding: 10px'>Never</td>";
    str +="<td style='min-width: 30px;padding: 10px'></td>";
    str +="<td style='min-width: 30px;padding: 10px'></td>";
    str +="<td style='min-width: 20px;padding: 10px'></td>";
    str +="<td style='min-width: 30px;padding: 10px'>Support audio only</td>";
    str +="</tr>";
    for(i;i<ligObject.OutputCounts;i++)
    {
        data="Output "+(i+1);
        str +="<tr>";
        str +="<td style='min-width: 200px;padding: 10px'></td>";
        str +="<td style='min-width: 30px;padding: 10px'><input type='checkbox' id='Timeoutcheckbox"+i+"' onclick='TimeoutCheckbox("+i+")'></td>";
        str +="<td style='min-width: 30px;padding: 10px'>"+data+"</td>";
        str +="<td style='min-width: 30px;padding: 10px'><div class='tooltip' data-title='1~999'><input type='number' min='1' max='999'  onkeydown='return Timeout_keydown("+i+",event)' id='timeouttext_"+i+"' onkeyup='Timeout_keyup("+i+")' onchange='TimeOut_Setting("+ i +")' onblur='TimeoutFocus("+i+")'  value=''></div></td>";
        str +="<td style='min-width: 20px;padding: 10px'>seconds</td>";
        str +="<td><div style='padding-left: 20px' id='timeputcheckbox_"+i+"'></div></td>";
        str +="</tr>";
    }
    str +="<tr><td colspan='6'><div><canvas id='timeoutcanvas' height='24px' width='940px'></canvas></div></td></tr>";
    str +="<tr>";
    str +="<td style='min-width: 200px;padding: 10px'>Video signal lost timer</td>";
    str +="<td style='min-width: 30px;padding: 10px'></td>";
    str +="<td style='min-width: 30px;padding: 10px'></td>";
    str +="<td style='min-width: 30px;padding: 10px'><div class='tooltip' data-title='0~999'><input type='number' min='0' max='999' id='timeouttext_"+parseInt(ligObject.OutputCounts)+"'   onkeydown='return Timeout_keydown("+parseInt(ligObject.OutputCounts)+",event)' onkeyup='Timeout_keyup("+i+")' onchange='TimeOut_Setting("+ parseInt(ligObject.OutputCounts) +")' onblur='TimeoutFocus("+parseInt(ligObject.OutputCounts)+")' value=''></div></td>";
    str +="<td style='min-width: 20px;padding: 10px'>seconds</td>";
    str +="<td style='min-width: 30px;padding: 10px'></td>";
    str +="</tr>";
    return str;
};
var TimeOut_Setting=function(i)
{
    console.log("start setting "+i);
    currentkey=ligObject.OutputCounts+2;
    if(input_flag==true)
    {
        var id="timeouttext_"+i;
        var str;
        var val=document.getElementById(id).value;
        i=parseInt(i)+1;
        DefTimeOutValue[i-1]=parseInt(val);
        if(i<=ligObject.OutputCounts)
        {
            
            str="EXT-AV-SW-TIMEOUT 1,"+i+",4,"+val;
        }
        else if(i==(ligObject.OutputCounts+1))
        {
            str="EXT-AV-SW-TIMEOUT 0,"+i+",0,"+val;
        }
        sendAndWaitCommand(str);
    }
    else
    {
        console.log("errror because input error");
    }
    input_flag=true;
    change_flag=true;
    //console.log("this have change change flag "+i);
    
};
var Timeout_keydown=function(i,e)
{
    var val;
    change_flag=false;
    currentkey=parseInt(i)+1;
    var evt = e || window.event;
    var keyCode = evt.keyCode || evt.which || evt.charCode;
    //console.log("val1:"+val);
    //console.log("keyCode1:"+keyCode);
    //小键盘的数字                       退格         回车               大键盘数字键                   方向键                    插入键


    if((keyCode>=48&&keyCode<=57)||keyCode==8||keyCode==13||(keyCode>=96&&keyCode<=105)||(keyCode>=37&&keyCode<=40)||(keyCode==46)||(keyCode==9))
    {
        return true;
    }
    else
    {
        return false;
    }
};
var Timeout_keyup=function(i)
{
    var val;
    input_flag=false;
    var id="timeouttext_"+parseInt(i);
    val=parseInt(document.getElementById(id).value);
    if(i<ligObject.OutputCounts)
    {
        if(val<1000&&val>0)
        {
            input_flag=true;
        }

    }
    else if(i==ligObject.OutputCounts)
    {
        if(val<1000&&val>=0)
        {
            input_flag=true;
        }
    }
    else
    {
        console.log("key up have error "+i+" error data "+val);
    }
};
var Support_audio=function(value)
{
    //console.log(ligObject.timeoutcurrentselect);
    var str;
    if(value==onoffstatus[ligObject.timeoutcurrentselect])
    {

    }
    else
    {
        str="EXT-OUT-A-EN "+(parseInt(ligObject.timeoutcurrentselect)+1)+","+value;
        sendAndWaitCommand(str);
    }
};
var timeout_init_sync_queries=function()
{
    var i;
    httpComm.setCommunicationEnabled(false);
    httpComm.Settings.NumberOfCommandsSendInGroup =ligObject.OutputCounts+3;//<24
    httpComm.addHandler("EXT-AV-SW-TIMEOUT", timeoutsettimeHandler);
    httpComm.addHandler("EXT-OUT-A-EN", timeoutsetaudioHandler);
    httpComm.addHandler("SECUR",AllLockModeHander);
    httpComm.SyncQueriesList.Init();
    for(i=0;i<ligObject.OutputCounts;i++)
    {
        httpComm.SyncQueriesList.Add("EXT-AV-SW-TIMEOUT? 1,"+parseInt(i+1)+",4");
    }
    httpComm.SyncQueriesList.Add("EXT-OUT-A-EN? *");
    httpComm.SyncQueriesList.Add("EXT-AV-SW-TIMEOUT? 0,"+parseInt(ligObject.OutputCounts+1)+",0");
    httpComm.SyncQueriesList.Add("SECUR?");//AFV模式
    httpComm.setCommunicationEnabled(true);
    refreshCommands();
};
var timeoutsettimeHandler=function(reply)
{
    var outputid = $.trim(reply.parameters.split(',')[1]);
    var timevalue = $.trim(reply.parameters.split(',')[3]);
    var val=document.getElementById("timeouttext_"+(parseInt(outputid)-1));
    var aim=document.getElementById("Timeoutcheckbox"+(parseInt(outputid)-1));
    var Atext=document.getElementById("timeouttext_"+(parseInt(outputid)-1));
    console.log("The current key is "+currentkey);
    if(val!=null)
    {
        if(change_flag==true)
        {
            if(currentkey!=outputid)
            {
                if(outputid<=ligObject.OutputCounts)
                {
                    if(timevalue!=0)
                    {
                        aim.checked=false;
                        Atext.disabled=false;
                        val.value=timevalue;
                        DefTimeOutValue[parseInt(outputid)-1]=parseInt(timevalue);
                    }
                    else
                    {
                        val.value=DefTimeOutValue[parseInt(outputid)-1];
                        aim.checked=true;
                        Atext.disabled=true;
                    }
                }
                else
                {
                    val.value=timevalue;
                }
            }
            else
            {
                if(outputid<=ligObject.OutputCounts)
                {
                    if(parseInt(timevalue)==DefTimeOutValue[parseInt(outputid)-1])
                    {
                        console.log("no change is equal 1~8");
                    }
                    else
                    {
                        if(timevalue!=0)
                        {
                            console.log("no change but not equal not zero");
                            aim.checked=false;
                            Atext.disabled=false;
                            val.value=timevalue;
                            DefTimeOutValue[parseInt(outputid)-1]=parseInt(timevalue);
                        }
                        else
                        {
                            console.log("no change but not equal is zero");
                            val.value=DefTimeOutValue[parseInt(outputid)-1];
                            aim.checked=true;
                            Atext.disabled=true;
                        }
                    }
                }
                else
                {
                    if(parseInt(timevalue)==DefTimeOutValue[parseInt(outputid)-1])
                    {
                        console.log("no change is equal 9");
                    }
                    else
                    {
                        val.value=timevalue;
                    }
                }
            }
        }
        else
        {
            console.log("have change");
            if(currentkey!=outputid)
            {
                if(outputid<=ligObject.OutputCounts)
                {
                    if(timevalue!=0)
                    {
                        aim.checked=false;
                        Atext.disabled=false;
                        val.value=timevalue;
                        DefTimeOutValue[parseInt(outputid)-1]=parseInt(timevalue);
                    }
                    else
                    {
                        val.value=DefTimeOutValue[parseInt(outputid)-1];
                        aim.checked=true;
                        Atext.disabled=true;
                    }
                }
                else
                {
                    val.value=timevalue;
                }
            }
            else
            {

            }
        }
    }
};

var timeoutsetaudioHandler=function(reply)
{
    var rep = reply.parameters.split(',');
    if (rep.length == ligObject.OutputCounts)
    {
        for (var i = 0; i < rep.length; i++)
        {
            onoffstatus[parseInt(i)]=parseInt(rep[i]);
            if(rep[i]==0)
            {
                Timeoutonoffbuttonid[parseInt(i)].isOn=false;
                Timeoutonoffbuttonid[parseInt(i)].refresh();
            }
            else
            {
                Timeoutonoffbuttonid[parseInt(i)].isOn=true;
                Timeoutonoffbuttonid[parseInt(i)].refresh();
            }
        }
    } 
};

var TimeoutCheckbox=function (value)
{
    var aim=document.getElementById("Timeoutcheckbox"+value);
    var Atext=document.getElementById("timeouttext_"+value);
    var str;
    value=parseInt(value)+1;
    if(aim.checked==false)
    {
        aim.checked=false;
        Atext.disabled=false;
        str="EXT-AV-SW-TIMEOUT 1,"+value+",4,"+DefTimeOutValue[value-1];
    }
    else
    {
        aim.checked=true;
        Atext.disabled=true;
        str="EXT-AV-SW-TIMEOUT 1,"+value+",4,"+0;
    }
    sendAndWaitCommand(str);
};
var timedraw=function () {
    var draw=document.getElementById("timeoutcanvas");
    var ctx=draw.getContext("2d");
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,940,5);
};

var TimeoutFocus=function (i) {
    console.log("now have lose "+i);
    i=parseInt(i);
    var val=document.getElementById("timeouttext_"+i).value;
    //console.log("now the value is "+val);
    //console.log("Change flag is "+change_flag);
    //console.log("input flag is "+input_flag);
    if((i+1)==currentkey&&DefTimeOutValue[i]!=val&&!change_flag&&input_flag)
    {
        i=i+1;
        console.log("onchange no set");
        DefTimeOutValue[i-1]=parseInt(val);
        if(i<=ligObject.OutputCounts)
        {
            str="EXT-AV-SW-TIMEOUT 1,"+i+",4,"+val;
        }
        else if(i==(ligObject.OutputCounts+1))
        {
            str="EXT-AV-SW-TIMEOUT 0,"+i+",0,"+val;
        }
        sendAndWaitCommand(str);
    }
    input_flag=true;
    change_flag=true;
    //currentkey=parseInt(i)+1;
};