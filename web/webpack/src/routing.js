var _routing_actualOutput = 0;
var _routing_actualInput = 0;
var jifukui_hdcp_echo_mode = 0;
ligObject.AFVForbidFlag = InitStatus(false,ligObject.OutputCounts);
var AbaOutSelect = null;
var OutputLabelName =InitLabelName("Output",ligObject.OutputCounts);
var InputLabelName = InitLabelName("Input",ligObject.InputCounts);
var OutputSpeedValue = InitNum(0,ligObject.OutputCounts);
var OutputHDCPAbility=InitNum(0,ligObject.OutputCounts);
var InputHDCPAbility=InitNum(0,ligObject.InputCounts);
var jifukui_HDMI_Audio_statue = false;
var jifukui_inputselect = 0;
var jifukui_outputselect = 0;
var jifukui_hdcp_select = 0;
var jiufkui_pattern_name = ["iconPatternColour", "iconPatternBlack","iconPatternWhite",  "iconPatternRed", "iconPatternGreen", "iconPatternBlue"];
var jifukuiListstatues = false;
var RoutingAfvStatues = InitNum(1,ligObject.OutputCounts);;
var VolumeForbinCurrent = ligObject.OutputCounts + 1;
var BalanceForbinCurrent = ligObject.OutputCounts + 1;
ligObject.InputARCStatus = InitStatus(false,ligObject.InputCounts);
ligObject.InputARCSwitchStatus = InitNum(1,ligObject.InputCounts);;
var patternCount = jiufkui_pattern_name.length;
var volumeArr = [];
var blanceArr = [];

//AFV模式按钮
var html_table_afvMode = function () {
    var str = "<table width='100%' ><tr>";
    str += "<td Style='width:75px; float: left' ><div id='routingAFVButton' class='setButton mousePointer' onclick='openAFVDiv();'>AFV</div></td>";
    str += "<td Style='width: 150px; float: left'><div id='routingABAButton' class='DisSetButton mousePointer' onclick='openAbaMode();'>Audio break away</div></td>";
    str += " </tr>";
    str += "<tr>";
    str += "<td id='afvoraudiobreakawaymode'></td>";
    str += "</tr>";
    str += "<tr>";
    str += "<td>";
    str += "<div id= 'RoutingDiv' class= 'contentBoxFilAFV'>";
    str += AFV_Mode();
    str += "</div>";
    str += "</td>";
    str += "<td style='vertical-align:top'>";
    str += "</td>";
    str += "		</tr>";
    str += "</table>";
    return str;
};

//Audio Break Away 模式按钮
var html_table_AbaMode = function () {
    var str = "<table width='100%'><tr>";
    str += "<td Style='width:75px; float: left' ><div id='routingAFVButton' class='setButtonDisable mousePointer' onclick='openAFVDiv();'>AFV</div></td>";
    str += "<td Style='width: 150px; float: left'><div id='routingABAButton' class='SetButton mousePointer' onclick='openAbaMode();'>Audio break away</div></td></tr>";
    str += "<tr>";
    str += "<table width='100%'>";
    str += "<tr>";
    str += "<td style='width: 280px' align='center' id='abaaduiooutputs' valign='top'>Audio Outputs";
    str += AbaAudioOutputs();
    str += "</td>";
    if (ligObject.Haveaudio) {
        str += "<td style='min-width: 362px' align='center' id='abaanalogoutputs' valign='top'>Analog Outputs";
        str += AbaAnalogOutputs();
        str += "</td>";
    }
    str += "<td><div style='width: 24px; height: 356px'><canvas id='abacanvasspan' style='width: 24px;height: 356px'></canvas></td>";
    str += "<td style='min-width: 125px' align='center' id='abainputs' valign='top'>Inputs";
    str += AbaInputs();
    str += "</td>";
    str += "</tr>";
    str += "<tr><input style='display: none' type='checkbox'></tr>";
    str += "</table>";
    str += "</table>";
    return str;
};

var AbaAudioOutputs = function () {
    var str = "<table><tr>";
    str += "<td style='min-width: 100px'>Label</td>";
    str += "<td style='width: 30px ' align='center'>ARC</td>";
    str += "<td style='width: 60px' align='center'>HDMI</td>";
    if (ligObject.Haveaudio) {
        str += "<td style='width: 80px' align='center'>Analog</td>";
    }
    str += "</tr>";
    var i = 0, data = "";
    for (i; i < ligObject.OutputCounts; i++) {
        str += "<tr style='height:37px'>";
        //Label
        data = OutputLabelName[i];
        str += "<td style='min-width: 100px' id='ABA_Label" + i + "'>" + data + "</td>";
        str += "<td style='width: 30px;height: 32px'><input  type='checkbox' id='arc_checkbox_" + i + "' onclick='Aba_Arc_checkbox(\"" + i + "\")'></td>";
        //HDMI
        str += "<td style='width: 60px;height: 32px'><input style='width: 50px ' type='button' id='Output_Digital" + i + "' onclick='Output_Digital_Button(\"" + i + "\")'/></td>";
        //Analog
        if (ligObject.Haveaudio) {
            str += "<td style='width: 80px;height: 32px'><input style='width: 70px ' type='button' id='Output_Analog" + i + "' onclick='Output_Analog_Button(\"" + i + "\")'/></td>";
        }
        str += "</tr>";
    }
    str += "</tr></table>";
    return str;
};

var AbaAnalogOutputs = function () {
    var str = "<table><tr>";
    str += "<td style='min-width: 130px' align='center'>Volume</td>";
    str += "<td style='min-width: 30px' align='center'>dB</td>";
    str += "<td style='min-width: 30px' align='center'>Mute</td>";
    str += "<td style='min-width: 130px' align='center'>Balance</td>";
    str += "<td style='min-width: 30px' align='center'></td>";
    str += "</tr>";
    var i = 0;
    for (i; i < ligObject.OutputCounts; i++) {
        str += "<tr style='height:37px'>";
        //Volume
        str += "<td style='min-width: 130px;height: 32px''><input style='width: 100px' type='range' min='0' max='100' step='1'  id='Output_Volume" + i + "' onchange='Output_Volume_Range(\"" + i + "\")' onmousedown='Output_Volume_Range_mousedown(\"" + i + "\")' onmouseup='Output_Volume_Range_mouseup(\"" + i + "\")' ontouchstart='CloseSilder()'/></td>";
        str += "<td style='min-width: 30px;height: 32px''><input type='test' onkeydown='return vHoldBack(\"" + i + "\",event)' oninput='volumeText(\"" + i + "\")' onblur='sendVolumeData(\"" + i + "\")' style='width: 30px' value='0' id='" + "OutputVolumeValue" + i + "' ></td>";
        //Mute('iconSwitchVideo', 'iconMuteVideo');
        str += "<td style='min-width: 30px;height: 32px' align-items: center'><div style='align-items: center ' class='tooltip iconSwitchAudio iconMuteAudio mousePointer' id='Output_Mute" + i + "' onclick='Output_Mute(\"" + i + "\")'/></td>";
        //Balance
        str += "<td style='min-width: 130px;height: 32px''><input  style='width: 100px' type='range' min='0' max='100' step='1'  id='Output_Balance" + i + "' onchange='Output_Balance_Range(\"" + i + "\")' onmousedown='Output_Balance_Range_mousedown(\"" + i + "\")' onmouseup='Output_Balance_Range_mouseup(\"" + i + "\")'ontouchstart='CloseSilder()' /></td>";
        str += "<td style='min-width: 30px;height: 32px''></div><div><input type='text' onkeydown='return bHoldBack(\"" + i + "\",event)' oninput='blanceText(\"" + i + "\")' onblur='sendBlanceData(\"" + i + "\")' style='width: 30px' value='30' id='OutputBalanceValue" + i + "' ></td>";
        str += "</tr>";
    }
    str += "</tr></table>";
    return str;
};

var AbaInputs = function () {
    var str = "<table><tr>";
    str += "<td style='min-width: 60px' align='center'>Digital</td>";
    if (ligObject.Haveaudio) {
        str += "<td style='min-width: 60px' align='center'>Analog</td>";
        str += "<td style='min-width: 60px' align='center'>ARC</td>";
    }

    str += "</tr>";
    var i = 0, num = "";
    if (ligObject.InputCounts >= ligObject.OutputCounts) {
        for (i; i < ligObject.InputCounts; i++) {
            num = parseInt(i) + 1;
            str += "<tr style='height:37px'>";
            //Input Digital
            str += "<td style='min-width: 30px'><input style='width: 50px;height: 32px' type='button' value='" + num + "' id='Input_Digital" + i + "' onclick='Input_Digital_Button(\"" + i + "\")'/></td>";

            if (ligObject.Haveaudio) {
                //Input Analog
                str += "<td style='min-width: 30px'><input style='width: 50px;height: 32px' type='button' value='" + num + "' id='Input_Analog" + i + "' onclick='Input_Analog_Button(\"" + i + "\")'/></td>";
                //Input ARC
                if (i < ligObject.OutputCounts) {
                    str += "<td style='min-width: 30px'><input style='width: 50px;height: 32px' type='button' value='" + num + "' id='Input_ARC" + i + "' onclick='Input_ARC_Button(\"" + i + "\")'/></td>";
                }
            }

            str += "</tr>";
        }
    }
    else {
        for (i; i < ligObject.OutputCounts; i++) {
            num = parseInt(i) + 1;
            str += "<tr style='height:37px'>";
            //Input Digital
            if (i < ligObject.InputCounts) {
                str += "<td style='min-width: 30px'><input style='width: 50px;height: 32px' type='button' value='" + num + "' id='Input_Digital" + i + "' onclick='Input_Digital_Button(\"" + i + "\")'/></td>";
            }
            else {
                str += "<td style='min-width: 30px'></td>";
            }
            if (ligObject.Haveaudio) {
                //Input Analog
                if (i < ligObject.InputCounts) {
                    str += "<td style='min-width: 30px'><input style='width: 50px;height: 32px' type='button' value='" + num + "' id='Input_Analog" + i + "' onclick='Input_Analog_Button(\"" + i + "\")'/></td>";
                }
                else {
                    str += "<td style='min-width: 30px'></td>";
                }
                //Input ARC
                str += "<td style='min-width: 30px'><input style='width: 50px;height: 32px' type='button' value='" + num + "' id='Input_ARC" + i + "' onclick='Input_ARC_Button(\"" + i + "\")'/></td>";

            }

            str += "</tr>";
        }
    }
    str += "</tr></table>";
    return str;
};

//Input Patten 模式切换
var html_table_inoutpattenMode = function () {
    var str = "<table width='100%'><tr>";
    str += "		<td Style='width:75px; float: left'><div id='inputTitle' class=' setButton mousePointer' onclick='AFV_InputPatternMode(0);'>Inputs</div></td>";
    str += "		<td Style='width: 75px; float: left'><div id='patternTitle' class='setButtonDisable mousePointer' onclick='AFV_InputPatternMode(1);'>Patterns</div></td>";
    str += "</tr></table>";
    return str;
};

var AFV_InputPatternMode = function (selected) {
    if (selected == 0) 	// Inputs
    {
        $("#patterns").hide();
        $("#inputs").show();
        $("#inputs_set").show();
        $("#patternTitle").removeClass("setButton");
        $("#patternTitle").addClass("setButtonDisable");
        $("#inputTitle").removeClass("setButtonDisable");
        $("#inputTitle").addClass("setButton");
    } 
    else 
    { 			// Patterns
        $("#patterns").show();
        $("#inputs").hide();
        $("#inputs_set").hide();
        $("#patternTitle").removeClass("setButtonDisable");
        $("#patternTitle").addClass("setButton");
        $("#inputTitle").addClass("setButtonDisable");
        $("#inputTitle").removeClass("setButton");
    }
};

var Aba_Arc_checkbox = function (id) {

    var str = "EXT-OUT-ARC " + (parseInt(id) + 1) + ",";
    var num = "arc_checkbox_" + id, value;
    value = document.getElementById(num).checked;//=$(num).checked;
    str += value ? 1 : 0;
    sendAndWaitCommand(str);
};
//输出口的数字

var Output_Digital_Button = function (id) {
    var i;
    if (ligObject.AFVForbidFlag[id]) 
    {
        $('#kDialogBtnCancel').hide();
        $('#kDialogBtnOk').show();
        showDialogBox(true, true, "Warning", "Breakout is not allowed.", "hideDialogBox");
    }
    else 
    {
        jifukui_HDMI_Audio_statue = true;
        var btn1;
        var btn2;
        var btn3;
        for (i = 0; i < ligObject.OutputCounts; i++) 
        {
            btn1 = "#Output_Digital" + i;
            btn2 = "#Output_Analog" + i;
            btn3 = "#Input_ARC" + i;
            if (btn1 != null) 
            {
                if ($(btn1).hasClass("jifukui_setbutton")) 
                {
                    $(btn1).removeClass("jifukui_setbutton");
                }
            }
            if (btn2 != null) 
            {
                if ($(btn2).hasClass("jifukui_setbutton")) 
                {
                    $(btn2).removeClass("jifukui_setbutton");
                }
            }
            if (btn3 != null) 
            {
                if ($(btn3).hasClass("jifukui_setbutton")) 
                {
                    $(btn3).removeClass("jifukui_setbutton");
                }
                $(btn3).addClass("jifukui_disablebutton");
            }
        }
        btn1 = "#Output_Digital" + id;
        if (btn1 != null) 
        {
            $(btn1).addClass("jifukui_setbutton");
        }
        AbaOutSelect = parseInt(id) + 1;
    }
};
//输出口模拟




var Output_Analog_Button = function (id) {
    jifukui_HDMI_Audio_statue = false;
    var btn1;
    var btn2;
    for (var i = 0; i < ligObject.OutputCounts; i++) 
    {
        btn1 = "#Output_Analog" + i;
        btn2 = "#Output_Digital" + i;
        if (btn1 != null) 
        {
            if ($(btn1).hasClass("jifukui_setbutton")) 
            {
                $(btn1).removeClass("jifukui_setbutton");
            }
        }
        if (btn2 != null) 
        {
            if ($(btn2).hasClass("jifukui_setbutton")) 
            {
                $(btn2).removeClass("jifukui_setbutton");
            }
        }
    }
    btn1 = "#Output_Analog" + id;
    if (btn1 != null) 
    {
        $(btn1).addClass("jifukui_setbutton");
    }
    AbaOutSelect = parseInt(id) + 1;
};

var Output_Volume_Range = function (id) {
    var val1, val2, data, str;
    id = parseInt(id);

    val1 = "Output_Volume" + id;
    val2 = "OutputVolumeValue" + id;
    val1 = document.getElementById(val1);
    data = val1.value;
    document.getElementById(val2).value = Volume_DBValue(data);
    str = "VOLUME " + (parseInt(id) + 1) + "," + data;
    OpenSilder();
    sendAndWaitCommand(str);
};
var vHoldBack = function (id, event) {
    var key = event.keyCode;
    if (key == 13 || key == 108) 
    {
        id = parseInt(id);
        var testVal = document.getElementById("OutputVolumeValue" + id).value;
        if (testVal && parseFloat(testVal) <= 25 && parseFloat(testVal) >= -50) 
        {
            testVal = parseFloat(testVal);
            testVal = (testVal >= 0 ? testVal * 2 : testVal) + 50;
            var str = "VOLUME " + (id + 1) + "," + testVal;
            sendAndWaitCommand(str);
        } 
        else 
        {
            if (parseFloat(testVal) > 0) 
            {
                document.getElementById("Output_Volume" + id).value = (parseFloat(volumeArr[id]) - 50) / 2;
                document.getElementById("OutputVolumeValue" + id).value = (parseFloat(volumeArr[id]) - 50) / 2;
            } 
            else 
            {
                document.getElementById("Output_Volume" + id).value = (parseFloat(volumeArr[id]) - 50);
                document.getElementById("OutputVolumeValue" + id).value = (parseFloat(volumeArr[id]) - 50);
            }
            var str = "VOLUME " + (id + 1) + "," + volumeArr[id];
            sendAndWaitCommand(str);
        }


        VolumeForbinCurrent = null;
    }
}
var bHoldBack = function (id, event) 
{
    var key = event.keyCode;
    if (key == 13 || key == 108) 
    {
        id = parseInt(id);
        var testVal = document.getElementById("OutputBalanceValue" + id).value;

        if (testVal && parseInt(testVal) <= 100 && parseInt(testVal) >= 0) 
        {
            var str = "BALANCE " + (id + 1) + "," + testVal;
            sendAndWaitCommand(str);
        } 
        else 
        {
            document.getElementById("OutputBalanceValue" + id).value = blanceArr[id];
            document.getElementById("Output_Balance" + id).value = blanceArr[id];
            var str = "BALANCE " + (id + 1) + "," + blanceArr[id];
            sendAndWaitCommand(str);
        }
        BalanceForbinCurrent = null;
    }
}

var volumeText = function (id) {
    id = parseInt(id);
    var testVal = document.getElementById("OutputVolumeValue" + id).value;

    VolumeForbinCurrent = id;
    console.log(testVal.indexOf(".") == -1);
    console.log(testVal.indexOf(".") != -1)
    console.log(parseFloat(testVal) % 0.5 == 0)
    console.log(parseFloat(testVal) < 0)
    console.log(testVal.indexOf(".") == -1)
    if (testVal.indexOf(".") == -1 || testVal.indexOf(".") != -1 && parseFloat(testVal) % 0.5 == 0 && parseFloat(testVal) >= 0 || parseFloat(testVal) <= 0 && testVal.indexOf(".") == -1) 
    {
        testVal = parseFloat(testVal);
        if (testVal >= -50 && testVal <= 25) 
        {
            testVal = (testVal >= 0 ? testVal * 2 : testVal) + 50;

            document.getElementById("Output_Volume" + id).value = testVal;

        } 
        else 
        {
            document.getElementById("Output_Volume" + id).value = (parseInt(volumeArr[id]) - 50) / 2;
        }
    } 
    else 
    {
        document.getElementById("OutputVolumeValue" + id).value = parseFloat(testVal.substring(0, testVal.length - 1));
        console.log(testVal.substring(0, testVal.length - 1));
    }

}
var sendVolumeData = function (id) {
    id = parseInt(id);
    var testVal = document.getElementById("OutputVolumeValue" + id).value;
    if (testVal && parseFloat(testVal) <= 25 && parseFloat(testVal) >= -50) 
    {
        testVal = parseFloat(testVal);
        testVal = (testVal >= 0 ? testVal * 2 : testVal) + 50;
        console.log(testVal);
        var str = "VOLUME " + (id + 1) + "," + testVal;
        sendAndWaitCommand(str);
        console.log(sendAndWaitCommand(str));
    } 
    else 
    {
        if (parseFloat(testVal) > 0) {
            document.getElementById("Output_Volume" + id).value = (parseFloat(volumeArr[id]) - 50) / 2;
            document.getElementById("OutputVolumeValue" + id).value = (parseFloat(volumeArr[id]) - 50) / 2;
        } else {
            document.getElementById("Output_Volume" + id).value = (parseFloat(volumeArr[id]) - 50);
            document.getElementById("OutputVolumeValue" + id).value = (parseFloat(volumeArr[id]) - 50);
        }
        var str = "VOLUME " + (id + 1) + "," + volumeArr[id];
        sendAndWaitCommand(str);
    }


    VolumeForbinCurrent = null;
}

var blanceText = function (id) {

    id = parseInt(id);
    BalanceForbinCurrent = id;
    var testVal = document.getElementById("OutputBalanceValue" + id).value;
    document.getElementById("Output_Balance" + id).value = testVal;

}

var sendBlanceData = function (id) {
    id = parseInt(id);
    var testVal = document.getElementById("OutputBalanceValue" + id).value;

    if (testVal && parseInt(testVal) <= 100 && parseInt(testVal) >= 0) 
    {
        var str = "BALANCE " + (id + 1) + "," + testVal;
        sendAndWaitCommand(str);
    } 
    else 
    {
        document.getElementById("OutputBalanceValue" + id).value = blanceArr[id];
        document.getElementById("Output_Balance" + id).value = blanceArr[id];
        var str = "BALANCE " + (id + 1) + "," + blanceArr[id];
        sendAndWaitCommand(str);
    }
    BalanceForbinCurrent = null;
}

var Output_Mute = function (id) {
    var name = "#Output_Mute" + id;
    var volstr = "Output_Volume" + id;
    var voltx="OutputVolumeValue"+id;
    var balstr = "Output_Balance" + id;
    var baltx="OutputBalanceValue"+id;
    id = parseInt(id) + 1;
    var str = "";
    if ($(name).hasClass("iconMuteAudio")) 
    {
        $(name).removeClass("iconMuteAudio");
        $(name).addClass("iconSwitchAudio");
        document.getElementById(volstr).disabled=false;
        document.getElementById(voltx).disabled=false;
        document.getElementById(balstr).disabled=false;
        document.getElementById(baltx).disabled=false;
        str = "MUTE " + id + "," + 0;
    }
    else 
    {
        $(name).removeClass("iconSwitchAudio");
        $(name).addClass("iconMuteAudio");
        document.getElementById(volstr).disabled = true;
        document.getElementById(voltx).disabled=true;
        document.getElementById(balstr).disabled = true;
        document.getElementById(baltx).disabled=true;
        str = "MUTE " + id + "," + 1;
    }
    sendAndWaitCommand(str);
};
//Balance
var Output_Balance_Range = function (id) {
    var val1, val2, data, str;
    id = parseInt(id);
    val1 = "Output_Balance" + id;
    val2 = "OutputBalanceValue" + id;
    val1 = document.getElementById(val1);
    data = val1.value;
    document.getElementById(val2).value = data;
    str = "BALANCE " + (parseInt(id) + 1) + "," + data;
    OpenSilder();
    sendAndWaitCommand(str);
};
//输入口的数字
var Input_Digital_Button = function (id) {
    if (AbaOutSelect == null) 
    {

        $('#kDialogBtnCancel').hide();
        $('#kDialogBtnOk').show();
        showDialogBox(true, true, "Warning", "Please select HDMI Output or Analog Output.", "hideDialogBox");
    }
    else 
    {
        var btn1;
        var btn2;
        var btn3;
        for (var i = 0; i < ligObject.InputCounts; i++) {
            btn1 = "#Input_Digital" + i;
            btn2 = "#Input_Analog" + i;
            if ($(btn1).hasClass("jifukui_setbutton")) {
                $(btn1).removeClass("jifukui_setbutton")
            }
            if ($(btn2).hasClass("jifukui_setbutton")) {
                $(btn2).removeClass("jifukui_setbutton")
            }
            if (i < ligObject.OutputCounts) {
                btn3 = "#Input_ARC" + i;
                if ($(btn3).hasClass("jifukui_setbutton")) {
                    $(btn3).removeClass("jifukui_setbutton")
                }
            }
        }
        btn1 = "#Input_Digital" + id;
        if (btn1 != null) {
            $(btn1).addClass("jifukui_setbutton");
        }
        var OutOriginal = jifukui_HDMI_Audio_statue ? 1 : 0;
        id = parseInt(id) + 1;
        var str = "";
        str = "EXT-AUD " + OutOriginal + "," + AbaOutSelect + ",1," + id;
        sendAndWaitCommand(str);
    }
};
//输入口模拟
var Input_Analog_Button = function (id) {
    if (AbaOutSelect == null) {
        $('#kDialogBtnCancel').hide();
        $('#kDialogBtnOk').show();
        showDialogBox(true, true, "Warning", "Please select HDMI Output or Analog Output.", "hideDialogBox");
    }
    else {
        var btn1;
        var btn2;
        var btn3;
        for (var i = 0; i < ligObject.InputCounts; i++) 
        {
            btn1 = "#Input_Digital" + i;
            btn2 = "#Input_Analog" + i;
            if (btn1 != null) {
                if ($(btn1).hasClass("jifukui_setbutton")) {
                    $(btn1).removeClass("jifukui_setbutton")
                }
            }
            if (btn2 != null) {
                if ($(btn2).hasClass("jifukui_setbutton")) {
                    $(btn2).removeClass("jifukui_setbutton")
                }
            }
            if (i < ligObject.OutputCounts) {
                btn3 = "#Input_ARC" + i;
                if ($(btn3).hasClass("jifukui_setbutton")) {
                    $(btn3).removeClass("jifukui_setbutton")
                }
            }
        }
        btn1 = "#Input_Analog" + id;
        if (btn1 != null) {
            $(btn1).addClass("jifukui_setbutton");
        }
        var OutOriginal = jifukui_HDMI_Audio_statue ? 1 : 0;
        id = parseInt(id) + 1;
        var str = "";
        str = "EXT-AUD " + OutOriginal + "," + AbaOutSelect + ",0," + id;
        sendAndWaitCommand(str);
    }
};

var Input_ARC_Button = function (id) {
    var btn3 = "#Input_ARC" + id;
    if (AbaOutSelect == null) {
        $('#kDialogBtnCancel').hide();
        $('#kDialogBtnOk').show();
        showDialogBox(true, true, "Warning", "Please select HDMI Output or Analog Output.", "hideDialogBox");
    }
    else 
    {
        if (btn3 != null) 
        {
            if ($(btn3).hasClass("jifukui_disablebutton")) 
            {
            }
            else 
            {
                var btn1;
                var btn2;
                var OutOriginal;
                for (var i = 0; i < ligObject.InputCounts; i++) 
                {
                    btn1 = "#Input_Digital" + i;
                    btn2 = "#Input_Analog" + i;
                    if (btn1 != null) {
                        if ($(btn1).hasClass("jifukui_setbutton")) {
                            $(btn1).removeClass("jifukui_setbutton")
                        }
                    }
                    if (btn2 != null) {
                        if ($(btn2).hasClass("jifukui_setbutton")) {
                            $(btn2).removeClass("jifukui_setbutton")
                        }
                    }
                    if (i < ligObject.OutputCounts) {
                        btn3 = "#Input_ARC" + i;
                        if ($(btn3).hasClass("jifukui_setbutton")) {
                            $(btn3).removeClass("jifukui_setbutton")
                        }
                    }
                }
                btn3 = "#Input_ARC" + id;
                $(btn3).addClass("jifukui_setbutton");
                id = parseInt(id) + 1;
                var OutOriginal = jifukui_HDMI_Audio_statue ? 1 : 0;
                var str = "";
                str = "EXT-AUD " + OutOriginal + "," + AbaOutSelect + ",2," + id;
                sendAndWaitCommand(str);
            }
        }
    }
};

//Audio Break Away模式的内容文件
var Aba_text_html = function () {
    var str = "", i = 0, data = "", num = "";
    for (i; i < ligObject.OutputCounts; i++) {
        num = parseInt(i) + 1;
        str += "<tr>";
        //Label
        data = OutputLabelName[i];
        str += "<td style='min-width: 100px' id='ABA_Label" + i + "'>" + data + "</td>";
        str += "<td style='width: 30px'><input  type='checkbox' id='arc_checkbox_" + i + "' onclick='Aba_Arc_checkbox(\"" + i + "\")'></td>";
        //Analog
        str += "<td style='min-width: 30px'><input style='width: 50px ;height: 30px' type='button' id='Output_Analog" + i + "' onclick='Output_Analog_Button(\"" + i + "\")'/></td>";
        //Volume
        str += "<td  style='min-width: 160px'><input style='width: 100px ;height: 30px' type='range' min='0' max='100' step='1'  id='Output_Volume" + i + "' onchange='Output_Volume_Range(\"" + i + "\")' /><input type='text' readonly style='width: 23px' value='30' id='OutputVolumeValue" + i + "' ></td>";
        //Mute('iconSwitchVideo', 'iconMuteVideo');
        str += "<td style='min-width: 30px;height: 30px align-items: center'><div style='align-items: center ' class='tooltip iconSwitchAudio iconMuteAudio mousePointer' id='Output_Mute" + i + "' onclick='Output_Mute(\"" + i + "\")'/></td>";
        //Balance
        str += "<td style='min-width: 160px'><input  style='width: 100px; height: 30px' type='range' min='0' max='100' step='1'  id='Output_Balance" + i + "' onchange='Output_Balance_Range(\"" + i + "\")'/><input type='text' readonly style='width: 23px' value='30' id='OutputBalanceValue" + i + "' ></td>";
        //Input Digital
        str += "<td style='min-width: 30px'><input style='width: 50px;height: 30px' type='button' value='" + num + "' id='Input_Digital" + i + "' onclick='Input_Digital_Button(\"" + i + "\")'/></td>";
        //Input Analog
        str += "<td style='min-width: 30px'><input style='width: 50px;height: 30px' type='button' value='" + num + "' id='Input_Analog" + i + "' onclick='Input_Analog_Button(\"" + i + "\")'/></td>";
        str += "</tr>";
    }
    return str;
};
var openAbaMode = function () 
{
    if (ligObject.Haveaudio) 
    {
        $("#contentBox").css({"min-width": "905px", "min-height": "482px"});
    }
    else 
    {
        $("#contentBox").css({"min-width": "405px", "min-height": "482px"});
    }
    $("#switchafvmode").hide();
    $("#switchabamode").show();
    centerContent();
    switch_aba_sync_queries();
    switchABALabelHandler(1);
};

var drawflag = function () {
    var draw = document.getElementById("abacanvasspan");
    var draw1 = document.getElementById("afvcanvasspan");
    var ctx = draw.getContext("2d");
    var ctx1 = draw1.getContext("2d");
    ctx.fillStyle = "#555555";
    ctx1.fillStyle = "#555555";
    ctx.fillRect(12, 0, 20, 356);
    if (ligObject.InputCounts == ligObject.OutputCounts == 6) {
        ctx1.fillRect(12, 0, 20, 688);
    }
    else {
        ctx1.fillRect(12, 0, 20, 848);
    }

};
//打开Switch界面时绘制的界面
var openRoutingDiv = function (value) {
    AbaOutSelect = null;
    var str = "<div id='propertiesBox'>";
    var i, id;
    if (ligObject.InputCounts == ligObject.OutputCounts == 6) 
    {
        str += "<div id='contentBox' style='min-height: 949px;min-width: 553px'>";
    }
    else 
    {
        str += "<div id='contentBox' style='min-height: 1049px;min-width: 553px'>";
    }
    str += "<div class='txtTitle'>Switching</div>";
    str += "<div>";
    str += "<table width='100%' style='background-color:#8c608c;padding-left:20px;'><tr>";
    str += "<td id='switchafvmode' style='display: block'>" + html_table_afvMode() + "</td>";
    str += "<td id='switchabamode' style='display: none '>" + html_table_AbaMode() + "</td>";
    str += "</tr></table>";
    str += "</div>";
    str += "	</div>";
    str += "</div>";
    $("#contentDiv").html(str);
    // Add Outputs
    for (i = 0; i < ligObject.OutputCounts; i++) {
        id = "outputs_" + i;
        var fontid = "fontoutputs_" + i;
        var dvc = "";//<table><tr>
        $("#outputs").append("<div id='" + id + "' />");
        var rb = new jifukui_routeButton("rb_outputs" + i);
        rb.index = (i + 1);

        rb.labelInfoList[0] = OutputLabelName[i];
        //rb.actionButtonList[1] = "<td id="+fontid+" style='font-size: 17px;margin: 0px 2px'>?</td>";
        dvc += "<td ><div class='tooltip iconSinkDisableHDCP mousePointer routeControlTd' data-title='Sink not support HDCP'/></td>";//iconOutputAbilityEnableHDCP
        dvc += "<td ><div class='tooltip iconPortDisableHDCP mousePointer routeControlTd' data-title='Follow Input HDCP' style='margin: 0px 2px'  /></td>";
        dvc += "<td id=" + fontid + " style='font-size: 17px;margin: 0px 2px'>?</td>";
        dvc += "<td ><div class='tooltip iconUltrafast mousePointer routeControlTd'  data-title='Switching Speed: Ultrafast' style='margin: 0px 2px' /></td>";//iconLegacy
        dvc += "<td ><div class='tooltip iconGreen mousePointer routeControlTd' data-title='Output connected' style='margin: 0px 2px' /></td>";
        //dvc += "</tr></table>";
        rb.actionButtonList[0] = dvc;
        var afv = "<table><tr>";
        if (ligObject.AFVForbidFlag[i]) 
        {
            afv += "<td ><div class='tooltip iconaudiofolowvideoForbid mousePointer routeControlTd'  onclick='outputActionClick(2," + i + ")'' data-title='Forbid modification AFV status'/></td>";
        }
        else 
        {
            if (RoutingAfvStatues[i] == 1) 
            {
                afv += "<td ><div class='tooltip iconAudioFolowVideo mousePointer routeControlTd'  onclick='outputActionClick(2," + i + ")'' data-title='Click to audio break away video'/></td>";
            }
            else 
            {
                afv += "<td ><div class='tooltip iconAudioBreakAwayVideo mousePointer routeControlTd'  onclick='outputActionClick(2," + i + ")'' data-title='Click to audio follow video'/></td>";
            }
        }
        afv += "<td ><div class='tooltip iconSwitchVideo mousePointer routeControlTd' onclick='outputActionClick(0," + i + ")' data-title='Click to mute video'  /></td>";
        afv += "<td><div class='tooltip iconPen mousePointer routeControlTd'  onclick='outputActionClick(1," + i + ");' id='" + id + "' data-title='Set port label and Output Signal HDCP mode and  speed'></div></td>";
        afv += "</tr></table>";
        rb.indexActionButtonList[0] = afv;
        rb.groupId = "outputs";
        rb.onAction = outputsOnSelection;
        rb.create(id);
    }
    // Add inputs
    for (i = 0; i < ligObject.InputCounts; i++) {
        id = "inputs_" + i;
        $("#inputs").append("<div id='" + id + "' />");
        var rb = new jifukui_routeButton("rb_inputs" + i);
        rb.index = (i + 1);
        rb.labelInfoList[0] = i + 1;
        var dvc = "";
        dvc += "<td ><div class='tooltip iconSourceDisableHDCP mousePointer routeControlTd' data-title='Source not support HDCP'  /></td>";
        dvc += "<td ><div class='tooltip iconPortDisableHDCP mousePointer routeControlTd' data-title='Port not support HDCP' /></td>";
        dvc += "<td ><div class='tooltip iconRed mousePointer routeControlTd' data-title='Signal not detected'  /></td>";
        rb.actionButtonList[0] = dvc;
        var afv = "";
        afv += "<td><div class='tooltip iconPen  mousePointer routeControlTd'  onclick='inputActionClick(0," + i + ")' id='" + id + "' data-title='Set Label and HDCP mode and Input Port HDCP ability'></div></td>";
        rb.indexActionButtonList[0] = afv;

        rb.groupId = "inputs";
        rb.onAction = inputsOnSelection;
        rb.showHandOnOver = true;
        rb.showColorOnOver = false;
        rb.create(id);
    }
    var patternid;
    for (i = 0; i < patternCount; i++) {
        id = "psttens_" + i;
        $("#patterns").append("<div id='" + id + "' />");
        var rb = new jifukui_routeButton("rb_pattens" + i);
        rb.index = (i + 1);

        // Labels
        rb.labelInfoList[0] = i + 1;
        rb.labelInfoList[1] = "Patten" + (i + 1);

        patternid = jiufkui_pattern_name[i];

        var dvc = "";
        dvc += "<td><div class='tooltip  " + patternid + "'  /></td>";
        rb.actionButtonList[0] = dvc;
        rb.groupId = "pattens";
        rb.onAction = pattensOnSelection;
        rb.showHandOnOver = true;
        rb.showColorOnOver = false;
        rb.create(id);
    }
    $("#patterns").hide();

    drawflag();
    //outputsOnSelection("rb_outputs0");
    inputsSelection(0);
    routing_init_sync_queries();
    setTimeout("showLoading(false);", 1500);
};
var openAFVDiv = function () {
    $("#contentBox").css({"min-width": "553px", "min-height": "1049px"});
    $("#switchabamode").hide();
    $("#switchafvmode").show();
    centerContent();
    routing_init_sync_queries();
};

var SwitchOutputAll = function () {
    var ch = $("#Switch_checkbox").attr('checked');
    routeButton.setSelectedAllGroup("outputs", ch);

};
/**/
var AFV_Mode = function () {
    var str = "";
    str += "<table>";
    str += "<tr>";
    str += "		<td style='padding: 0px 8px;'><div><input type='checkbox' id='Switch_checkbox' onclick='SwitchOutputAll()'/>Outputs</div></td>";
    str += "		<td style='padding: 0px 8px;'><div  class='mousePointer'></div></td>";
    str += "		<td style='padding: 0px 8px;'><div  class='mousePointer'></div></td>";
    str += "<td style='width: 180px'>" + html_table_inoutpattenMode() + "</td>";
    str += "		<td style='padding: 0px 8px;'><div  class='mousePointer'></div></td>";
    str += "</tr>";
    str += "<tr>";
    str += "		<td valign='top'><div id='outputs'/></td>";
    str += "		<td valign='top'><div id='outputs_set'/></td>";
    if (ligObject.InputCounts == ligObject.OutputCounts == 6) {
        str += "		<td valign='top'><div id='afvmodespan' style='width: 24px;height: 688px'><canvas id='afvcanvasspan' style='width: 24px;height: 688px'></canvas></td>";
    }
    else {
        str += "		<td valign='top'><div id='afvmodespan' style='width: 24px;height: 848px'><canvas id='afvcanvasspan' style='width: 24px;height: 848px'></canvas></td>";
    }
    str += "		<td valign='top'><div id='inputs'/><div id='patterns'/></td>";
    str += "		<td valign='top'><div id='inputs_set'/></td>";
    str += "</tr>";
    str += "</table>";
    return str;
};

var pattensOnSelection = function (id) {
    var select_outputs = [];
    var n = 0;
    var selectedInputs = routeButton.getAllGroup("outputs");
    if (jifukui_inputselect == 0) {
        routeButton.setSelectedAllGroup("pattens", false);
        routeButton.setSelected(id, true);
        var i = parseInt(id.substring(id.length - 1)) + 1;
        for (var out = 0; out < selectedInputs.length; out++) {
            if (selectedInputs[out].isSelected) {
                select_outputs[n] = parseInt(out) + 1;
                n++;
            }
        }
        if (select_outputs.length == ligObject.OutputCounts) {
            sendAndWaitCommand("AV " + (parseInt(i) + 16) + ">" + "*");
        }
        else {
            for (n = 0; n < select_outputs.length; n++) {
                sendAndWaitCommand("AV " + (parseInt(i) + 16) + ">" + select_outputs[n]);
            }
        }

    }
    $("#Switch_checkbox").attr("checked", false);
    routeButton.setSelectedAllGroup("outputs", false);
    jifukui_inputselect = 0;
};

var routingSetAFVButtons = function (isAfv) {
    var grp = routeButton.getAllGroup("inputs");
    for (var i = 0; i < grp.length; i++) {
        var afv = "<table><tr>";
        var btn = grp[i];
        if (isAfv) {
            afv += "<td><div class='tooltip iconSwitchAudio mousePointer' onclick='routeAudioSwitch(\"" + i + "\");' data-title='Switch audio\r\nto current output'/></td>";
            afv += "<td><div class='tooltip iconSwitchAV mousePointer' onclick='routeAudioVideoSwitch(\"" + i + "\");' data-title='Switch audio and video\r\nto current output'/></td>";
            afv += "<td><div class='tooltip iconSwitchVideo mousePointer' onclick='routeVideoSwitch(\"" + i + "\");' data-title='Switch video\r\nto current output'/></td>";
        } else {
            afv += "<td><div class='tooltip iconAudioFolowVideo mousePointer' onclick='routeAudioVideoSwitch(\"" + i + "\");' data-title='Switch audio and video\r\nto current output'/></td>";
        }
        afv += "</tr></table>";
        btn.actionButtonList[1] = afv;
        btn.refresh();
    }
};

var routeHdcpMode = function (id) {
    var iid = parseInt(id) - 1;
    var actived = $("#inputHDCPConfig" + iid).hasClass("iconHdcpEnabled");
    var a = new Array();
    if (actived) {
        sendAndWaitCommand("HDCP-MOD " + id + ",0");
        a.parameters = id + ",0";
        routingHdcpModeHandler(a);
    }
    else {
        sendAndWaitCommand("HDCP-MOD " + id + ",1");
        a.parameters = id + ",1";
        routingHdcpModeHandler(a);
    }
    jifukui_hdcp_echo_mode = 1;
};

var outputSetVideoMute = function (index, muted) {
    var id = "rb_outputs" + index;
    var btn = routeButton.getObjById(id);
    var act = btn.actionButtonList[0];
    var ract = act.replace('iconSwitchVideo', 'iconMuteVideo');
    if (muted == 0) {
        act = act.replace('iconMuteVideo', 'iconSwitchVideo');
        act = act.replace('unmute', 'mute');
    }
    else {
        act = ract;
        act = act.replace('mute', 'unmute');
    }
    btn.actionButtonList[0] = act;
};

var outputSetAudioMute = function (index, muted) 
{
    var iindex = parseInt(index);
    var id = "rb_outputs" + (iindex - 1);

    var btn = routeButton.getObjById(id);

    var act = btn.actionButtonList[0];
    var ract = act.replace('iconSwitchAudio', 'iconMuteAudio');

    if (muted == 0) 
    {
        act = act.replace('iconMuteAudio', 'iconSwitchAudio');
        act = act.replace('unmute', 'mute');
    } 
    else 
    {
        act = ract;
        act = act.replace('mute', 'unmute');
    }
    btn.actionButtonList[1] = act;
};

var outputActionClick = function (action, index) {

    var id = "rb_outputs" + index;
    var iindex = parseInt(index) + 1;
    if (action == 0) // Video On/Off
    {
        var btn = routeButton.getObjById(id);
        var act = btn.indexActionButtonList[0];
        var str = act.search("iconSwitchVideo");
        if (str != -1)//MUTE  0
        {
            act = act.replace('iconSwitchVideo', 'iconMuteVideo');
            act = act.replace('Click to mute video', 'Click to display video');
            sendAndWaitCommand("VMUTE " + iindex + ",2");

        }
        else {
            act = act.replace('iconMuteVideo', 'iconSwitchVideo');
            act = act.replace('Click to display video', 'Click to mute video');
            sendAndWaitCommand("VMUTE " + iindex + ",1");

        }
        btn.indexActionButtonList[0] = act;
    }
    else if (action == 1) // 设置标题名或者切换模式
    {
        var num = index;
        var content = "";
        content = "<div class='txtProperty'></div>";
        content += "<table><tr>";
        content += "<td>Label</td>";
        content += "<td style='width: 160px'><input style='width: 140px' id='setoutputlabel' type='text' value='" + OutputLabelName[index] + "'></td>";
        content += "<td><div style='height: 25px ;width: 25px ' class='iconSave mousePointer' onclick='SwitchSetLabel(1,\"" + index + "\")'></div></td>";
        content += "</tr>";

        content += "<tr>";
        content += "<td>HDCP</td>";
        content += "<td >" + RoutingPortHDCPAbility(index) + "</td>";
        content += "</tr>";

        content += "<tr>";
        content += "<td>switch speed</td>";
        content += "<td >" + RoutingOutputList(OutputSpeedValue[index]) + "</td>";
        content += "</tr>";
        
        content += "<tr>";
        content += "<td></td>";
        content += "<td>";
        content += "<table  style='display: none;margin-top: -11px' id='defaultMenu' onblur='hiddenlist()'>";
        content += "<tr onclick='RoutingOutputlistclick(\"" + index + "\",0)' class='RoutDialogtrlist'><td class='RoutDialogtextlist' ><div class='iconLegacy' ><div style='padding-left: 20px;color: black' >Normal</div></div></td></tr>";
        content += "<tr onclick='RoutingOutputlistclick(\"" + index + "\",1)' class='RoutDialogtrlist' ><td class='RoutDialogtextlist' ><div class='iconFast' ><div style='padding-left: 20px;color: black'' >Fast</div></div></td></tr>";
        content += "<tr onclick='RoutingOutputlistclick(\"" + index + "\",2)' class='RoutDialogtrlist' ><td class='RoutDialogtextlist' ><div class='iconUltrafast' ><div style='padding-left: 20px;color: black'' >Extra&Fast</div></div></td></tr>";
        content += "</table></td>";
        content += "</tr>";


        content += "</table>";
        content += "</table>";

        $('#kDialogBtnOk').hide();
        $('#kDialogBtnCancel').hide();
        showDialogBox(true, false, "<td style='padding-left: 9px'>" + "Output " + (index + 1) + " settings" + "</td>" + "<td style='padding-left: 90px'><div  class='icon_closewindow' onclick='showDialogBox(false,false)'></td>", content, "SwitchLabelCloseDialog");
        $("#porthdcpability").val(parseInt(OutputHDCPAbility[index]));        
    }
    else if (action == 2) {
        var btn = routeButton.getObjById(id);
        var act = btn.indexActionButtonList[0];
        if (ligObject.AFVForbidFlag[index]) {

        }
        else {

            var str = act.search("iconAudioFolowVideo");
            if (str != -1)//
            {
                act = act.replace('iconAudioFolowVideo', 'iconAudioBreakAwayVideo');
                act = act.replace("Click to audio break away video", "Click to audio follow video");
                RoutingAfvStatues[index] = 0;
            }
            else   //SET AFV
            {
                act = act.replace('iconAudioBreakAwayVideo', 'iconAudioFolowVideo');
                act = act.replace("Click to audio follow video", "Click to audio break away video");
                RoutingAfvStatues[index] = 1;

            }
        }
        btn.indexActionButtonList[0] = act;
    }
    jifukui_outputselect = 1;
};

var SetSwitchMode = function (index, value) {
    var smode = "";
    var str = "EXT-AV-SW-SPEED " + (parseInt(index) + 1) + "," + value;
    sendAndWaitCommand(str);
};

var inputActionClick = function (action, index) {
    onoffButton.ONOFF_CLEAR();
    jifukui_hdcp_select = parseInt(index + 1);
    if (action == 0) // 设置标题名或者切换模式
    {
        var content = "";
        content += "<div class='txtProperty'></div>";
        content += "<table>";
        
        content += "<tr>";
        content += "<table><td style='min-width: 80px'>Label<td>";
        content += "<td style='padding-left: 2px'><input style='width: 118px;height: 25px' type='text' id='setinputlabel' value='" + InputLabelName[index] + "'><td>";
        content += "<td><div style='height: 25px ;width: 25px ' class='iconSave' onclick='SwitchSetLabel(0,\"" + index + "\")'></div><td>";
        content += "</table>";
        content += "</tr>";

        
        content += "<tr>";
        content += "<table><td style='min-width: 80px'>HDCP<td>";
        content += "<td >" + RoutingSignalHDCP(index) + "</td>";
        content += "</tr>";
        

        
        content += "<tr>";
        content += "<table><td style='min-width: 80px'>ARC/Step-In<td>";
        content += "<td><div id='onoffbutton_set_InputARC'><td>";
        content += "<td><div style='height: 25px ;width: 25px ' id='InputARCButton' class='iconSettings' onclick='InputARCSwitch(\"" + index + "\")'></div><td>";
        content += "<table>";
        content += "</tr>";
      
        content += "</table>";
        $('#kDialogBtnOk').hide();
        $('#kDialogBtnCancel').hide();
        showDialogBox(true, false, "<td>" + "Input " + jifukui_hdcp_select + " settings" + "</td>" + "<td style='padding-left: 140px'><div  class='icon_closewindow'  onclick='showDialogBox(false,false)'></td>", content, "SwitchLabelCloseDialog");
        $("#signalhdcp").val(parseInt(InputHDCPAbility[index])); 
        var onoffObject_hdcp = new onoffButton("onoffId_arc_activate");
        onoffObject_hdcp.onName = "ARC";
        onoffObject_hdcp.offName = "Step-In";
        onoffObject_hdcp.isOn = ligObject.InputARCStatus[index];
        onoffObject_hdcp.funcToRun = "InputARCONOFFSetting";
        onoffObject_hdcp.create("onoffbutton_set_InputARC");
        $("#onoffId_arc_activate").attr("style", "margin-right:0px");
        if (ligObject.InputARCStatus[index]) 
        {
            $("#InputARCButton").show();
        }
        else 
        {
            $("#InputARCButton").hide();
        }
        
    }
    jifukui_inputselect = 1;
     
};

var SwitchLabelCloseDialog = function () 
{
    showDialogBox(false, false);
};
var InputARCONOFFSetting = function (value) 
{
    if (value == 0) 
    {
        $("#InputARCButton").hide();
    }
    else if (value == 1) 
    {
        $("#InputARCButton").show();
    }
    var str = "EXT-IN-ARC " + jifukui_hdcp_select + "," + value;
    sendAndWaitCommand(str);
};
var HDCPONOFFSetting = function (value) {
    var str = "HDCP-MOD " + jifukui_hdcp_select + "," + value;
    sendAndWaitCommand(str);
};

//当前 1不允许标签名中纯在逗号
var SwitchSetLabel = function (port, id) {
    var data;
    ligObject.LablePortType = port;
    ligObject.LablePortId = parseInt(id);
    ligObject.LableFlag = 1;
    if (port == 0)//input
    {
        data = document.getElementById("setinputlabel").value;

    }
    else//output
    {
        data = document.getElementById("setoutputlabel").value;
    }
    if (data == "") {
        var testStr = "";
        testStr += "<div class='txtProperty'></div>";
        testStr += "<table><tr>";
        testStr += "<td style='min-width: 200px'>Please type the label name.</td></tr></table>";
        testStr += "<table>";
        testStr += "<tr><td></td><td><input type='button' style='background-color: #975697' onclick='LableNameErrorHandle()' value='OK'></td></tr>";
        testStr += "</table>";
        $('#kDialogBtnCancel').hide();
        $('#kDialogBtnOk').hide();
        showDialogBox(true, true, "Warning", testStr);

    }
    else if (data.match(/^[0-9A-Za-z\s]+$/g) == null || data.match(/^[0-9A-Za-z\s]+$/g)[0].length > 16) {
        var testStr = "";
        testStr += "<div class='txtProperty'></div>";
        testStr += "<table><tr>";
        testStr += "<td style='min-width: 200px'>The label name is up to 16 alpha-numeric characters.</td></tr></table>";
        testStr += "<table>";
        testStr += "<tr><td></td><td><input type='button' style='background-color: #975697' onclick='LableNameErrorHandle()' value='OK'></td></tr>";
        testStr += "</table>";
        $('#kDialogBtnCancel').hide();
        $('#kDialogBtnOk').hide();
        showDialogBox(true, true, "Warning", testStr);

    }
    else 
    {
        id = parseInt(id) + 1;
        sendAndWaitCommand("LABEL " + port + "," + id + ",1," + data);
        GetroutingLabel();
    }
};

var routeAudioSwitch = function (id) {
    var i = parseInt(id) + 1;
    sendAndWaitCommand("ROUTE 2," + _routing_actualOutput + "," + i);
    refreshCommands();
};

var routeVideoSwitch = function (id) {
    var i = parseInt(id) + 1;
    sendAndWaitCommand("VID " + i + ">" + _routing_actualOutput);
    refreshCommands();
};

var routeAudioVideoSwitch = function (id) {
    var i = parseInt(id) + 1;
    sendAndWaitCommand("VID " + i + ">" + _routing_actualOutput);
    refreshCommands();
};
var inputsSelection = function (id) {
    if (id == 0) 
    {
        routeButton.setSelectedAllGroup("inputs", false);
    } 
    else 
    {
        var idt = "rb_inputs" + (id - 1);
        routeButton.setSelectedAllGroup("inputs", false);
        routeButton.setSelected(idt, true);
    }
};

var inputsOnSelection = function (id) {
    var select_outputs = [];
    var n = 0;
    var selectedInputs = routeButton.getAllGroup("outputs");
    var Afvflag;
    if (jifukui_inputselect == 0) 
    {
        routeButton.setSelectedAllGroup("inputs", false);
        routeButton.setSelected(id, true);
        var i = parseInt(id.substring(id.length - 1)) + 1;
        var out;
        for (out = 0; out < selectedInputs.length; out++) 
        {
            if (selectedInputs[out].isSelected) 
            {
                select_outputs[n] = parseInt(out) + 1;
                n++;
            }
        }
        if (select_outputs.length == ligObject.OutputCounts) 
        {
            for (out = 0; out < selectedInputs.length; out++) 
            {
                Afvflag = RoutingAfvStatues[0] ^ RoutingAfvStatues[out];
                if (Afvflag == 0) 
                {
                }
                else 
                {
                    break;
                }
            }
            if (Afvflag == 0) 
            {
                if (RoutingAfvStatues[0] == 1) 
                {
                    sendAndWaitCommand("AV " + i + ">" + "*");
                }
                else 
                {
                    sendAndWaitCommand("VID " + i + ">" + "*");
                }
            }
            else 
            {
                for (n = 0; n < select_outputs.length; n++) 
                {
                    if (RoutingAfvStatues[n] == 1) 
                    {
                        sendAndWaitCommand("AV " + i + ">" + select_outputs[n]);
                    }
                    else 
                    {
                        sendAndWaitCommand("VID " + i + ">" + select_outputs[n]);
                    }
                }
            }
        }
        else 
        {
            for (n = 0; n < select_outputs.length; n++) 
            {
                if (RoutingAfvStatues[select_outputs[n] - 1] == 1) 
                {
                    sendAndWaitCommand("AV " + i + ">" + select_outputs[n]);
                }
                else 
                {
                    sendAndWaitCommand("VID " + i + ">" + select_outputs[n]);
                }
            }
        }
        $("#Switch_checkbox").attr("checked", false);
        routeButton.setSelectedAllGroup("outputs", false);
    }
    jifukui_inputselect = 0;
};

var outputsOnSelection = function (id) 
{
    if (jifukui_outputselect == 0) 
    {
        routeButton.togleSelected(id);
        $("#Switch_checkbox").attr("checked", false);
    }
    routeButton.setSelectedAllGroup("inputs", false);
    routeButton.setSelectedAllGroup("pattens", false);
    jifukui_outputselect = 0;
};

var routing_init_sync_queries = function () {
    httpComm.setCommunicationEnabled(false);
    httpComm.Settings.NumberOfCommandsSendInGroup = 11;//<24
    httpComm.addHandler("VID (\\d+,){" + parseInt(ligObject.OutputCounts - 1) + "}\\d+", routingVideoHandler);
    httpComm.addHandler("DISPLAY", routingDisplayHandler);
    httpComm.addHandler("SIGNAL", routingSignalHandler);
    httpComm.addHandler("EXT-HDCP-STATE", routingHdcpStatHandler);
    httpComm.addHandler("EXT-HDCP-VER", routingHdcpModeHandler);
    //httpComm.addHandler("EXT-LABEL", switchLabelHandler);
    httpComm.addHandler("EXT-AV-SW-SPEED", switchspeedHandler);
    httpComm.addHandler("VMUTE", outputSetVedioMuteHander);
    httpComm.addHandler("MTX-MODE", AFVForbidFlagHander);
    httpComm.addHandler("SECUR", AllLockModeHander);
    httpComm.addHandler("EXT-AUD", switchAUDHandler);
    httpComm.addHandler("EXT-IN-ARC (\\d+,){" + parseInt(ligObject.InputCounts - 1) + "}\\d+", DeviceStepInStatus);
    httpComm.SyncQueriesList.Init();
    httpComm.SyncQueriesList.Add("VID?");
    //httpComm.SyncQueriesList.Add("EXT-LABEL?");
    httpComm.SyncQueriesList.Add("EXT-HDCP-VER? *");
    httpComm.SyncQueriesList.Add("EXT-AV-SW-SPEED? *");
    httpComm.SyncQueriesList.Add("EXT-HDCP-STATE? *");
    httpComm.SyncQueriesList.Add("VMUTE?");
    httpComm.SyncQueriesList.Add("DISPLAY?");
    httpComm.SyncQueriesList.Add("SIGNAL?");
    httpComm.SyncQueriesList.Add("MTX-MODE? *");
    httpComm.SyncQueriesList.Add("SECUR?");
    httpComm.SyncQueriesList.Add("EXT-AUD?");
    httpComm.SyncQueriesList.Add("EXT-IN-ARC? *");
    routing_debug_query_count = 0;
    httpComm.setCommunicationEnabled(true);
    refreshCommands();
    GetroutingLabel();
};
var GetroutingLabel=function()
{
    var label=getGeneralValue(sendAndWaitCommand("EXT-LABEL?"));
    console.log(label);
    label=label.slice(label.indexOf(" ")+1,label.length);
    console.log(label);
    switchLabelHandler(label);
}
var switch_aba_sync_queries = function () {
    httpComm.setCommunicationEnabled(false);
    if(ligObject.Haveaudio)
    {
        httpComm.Settings.NumberOfCommandsSendInGroup = 7;//<24
        //httpComm.addHandler("EXT-LABEL", switchABALabelHandler);
        httpComm.addHandler("EXT-OUT-ARC", switchARCHandler);
        httpComm.addHandler("BALANCE", switchBalanceHandler);
        httpComm.addHandler("VOLUME", switchVolumeHandler);
        httpComm.addHandler("EXT-AUD", switchAUDHandler);
        httpComm.addHandler("MUTE", switchAbaMuteHandler);
        httpComm.addHandler("SECUR", AllLockModeHander);
        httpComm.addHandler("MTX-MODE", ABAForbidFlagHander);
        httpComm.SyncQueriesList.Init();
        //httpComm.SyncQueriesList.Add("EXT-LABEL?");
        httpComm.SyncQueriesList.Add("EXT-OUT-ARC?");
        httpComm.SyncQueriesList.Add("EXT-AUD?");
        httpComm.SyncQueriesList.Add("VOLUME?");
        httpComm.SyncQueriesList.Add("MUTE?");
        httpComm.SyncQueriesList.Add("BALANCE?");
        httpComm.SyncQueriesList.Add("SECUR?");
        httpComm.SyncQueriesList.Add("MTX-MODE? *");
        routing_debug_query_count = 0;
    }
    else
    {
        httpComm.Settings.NumberOfCommandsSendInGroup = 4;//<24
        //httpComm.addHandler("EXT-LABEL", switchABALabelHandler);
        httpComm.addHandler("EXT-OUT-ARC", switchARCHandler);
   
        httpComm.addHandler("EXT-AUD", switchAUDHandler);
    
        httpComm.addHandler("SECUR", AllLockModeHander);
        httpComm.addHandler("MTX-MODE", ABAForbidFlagHander);
        httpComm.SyncQueriesList.Init();
        //httpComm.SyncQueriesList.Add("EXT-LABEL?");
        httpComm.SyncQueriesList.Add("EXT-OUT-ARC?");
        httpComm.SyncQueriesList.Add("EXT-AUD?");
    
        httpComm.SyncQueriesList.Add("SECUR?");
        httpComm.SyncQueriesList.Add("MTX-MODE? *");
        routing_debug_query_count = 0;
    }
    
    httpComm.setCommunicationEnabled(true);
    refreshCommands();
};

/************ P3K HANDLERS ******************/
var switchspeedHandler = function (reply) {
    var rep = reply.parameters.split(' ');
    rep = rep[1].split(',');
    var btnid;
    var Speed = [0, 0, 0];
    var n;
    var iconimage = ["iconLegacy", "iconFast", "iconUltrafast"];
    var strname = ["Switching Speed: Legacy", "Switching Speed: Fast", "Switching Speed: Ultrafast"];
    if (rep.length == ligObject.OutputCounts) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            OutputSpeedValue[i] = rep[i];
            btnid = routeButton.getObjById("rb_outputs" + i);
            if (btnid != null) 
            {
                Speed[0] = btnid.actionButtonList[0].search(iconimage[0]);
                Speed[1] = btnid.actionButtonList[0].search(iconimage[1]);
                Speed[2] = btnid.actionButtonList[0].search(iconimage[2]);
                for (n = 0; n < Speed.length; n++) {
                    if (Speed[n] != -1) {
                        break;
                    }
                }
                if (rep[i] == 0) {
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(iconimage[n], iconimage[0]);
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(strname[n], strname[0]);
                }
                else if (rep[i] == 1) {
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(iconimage[n], iconimage[1]);
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(strname[n], strname[1]);
                }
                else {
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(iconimage[n], iconimage[2]);
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(strname[n], strname[2]);
                }
                btnid.refresh();
            }
        }
    }
};

var switchafvmodeHander = function (reply) {
    var rep = reply.parameters.split(',');
    var btnid;
    var n;
    if (rep.length == ligObject.OutputCounts) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            RoutingAfvStatues[i] = rep[i];
            btnid = routeButton.getObjById("rb_outputs" + i);
            if (btnid != null) 
            {
                n = btnid.indexActionButtonList[0].search("iconAudioFolowVideo");
                if (rep[i] == 0) 
                {
                    if (n != -1) {
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace("iconAudioFolowVideo", "iconAudioBreakAwayVideo");
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace("Click to audio break away video", "Click to audio follow video");

                    }
                    else {
                    }
                }
                else 
                {
                    if (n != -1) {

                    }
                    else {
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace("iconAudioBreakAwayVideo", "iconAudioFolowVideo");
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace("Click to audio follow video", "Click to audio break away video");
                    }
                }
                btnid.refresh();
            }
        }
    }
};

var outputSetVedioMuteHander = function (reply) {
    var rep = reply.parameters.split(',');
    var btnid;
    var n;
    if (rep.length == ligObject.OutputCounts) {
        for (var i = 0; i < rep.length; i++) {
            btnid = routeButton.getObjById("rb_outputs" + i);
            if (btnid != null) {
                n = btnid.indexActionButtonList[0].search("iconMuteVideo");
                if (rep[i] !=1)//mute
                {
                    if (n != -1) {

                    }
                    else {
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace("iconSwitchVideo", "iconMuteVideo");
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace('Click to mute video', 'Click to display video');
                    }
                }
                else 
                {
                    if (n != -1) {
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace("iconMuteVideo", "iconSwitchVideo");
                        btnid.indexActionButtonList[0] = btnid.indexActionButtonList[0].replace('Click to display video', 'Click to mute video');
                    }
                    else {

                    }
                }
                btnid.refresh();
            }
        }
    }
};

var AFVForbidFlagHander = function (reply) {
    var rep = reply.parameters.split(',');
    if (rep.length == ligObject.OutputCounts) 
    {
        var i = 0;
        for (i = 0; i < ligObject.OutputCounts; i++) 
        {
            var btn = routeButton.getObjById("rb_outputs" + i);
            if (btn == null) 
            {
                continue;
            }
            else 
            {
                var act = btn.indexActionButtonList[0];
                var str1 = act.search("iconaudiofolowvideoForbid");
                var str2 = act.search("iconAudioFolowVideo");
            }
            ligObject.AFVForbidFlag[i] = rep[i] > 0;
            if (ligObject.AFVForbidFlag[i]) 
            {
                RoutingAfvStatues[i] = 1;
                if (str1 != -1)//yes
                {

                }
                else {
                    if (str2 != -1)//
                    {
                        act = act.replace('iconAudioFolowVideo', 'iconaudiofolowvideoForbid');
                        act = act.replace("Click to audio break away video", "Forbid modification AFV status");

                    }
                    else {
                        act = act.replace('iconAudioBreakAwayVideo', 'iconaudiofolowvideoForbid');
                        act = act.replace("Click to audio follow video", "Forbid modification AFV status");
                    }
                }
            }
            else 
            {
                if (str1 != -1)//yes
                {
                    if (RoutingAfvStatues[i] == 1) {
                        act = act.replace('iconaudiofolowvideoForbid', 'iconAudioFolowVideo');
                        act = act.replace("Forbid modification AFV status", "Click to audio break away video");
                    }
                }
                else {
                    if (RoutingAfvStatues[i] == 1) {
                        if (str2 != -1) {

                        }
                        else {
                            act = act.replace('iconAudioBreakAwayVideo', 'iconAudioFolowVideo');
                            act = act.replace("Click to audio follow video", "Click to audio break away video");
                        }

                    }
                }
            }
            btn.indexActionButtonList[0] = act;
            btn.refresh();
        }
    }
};

var ABAForbidFlagHander = function (reply) {
    var rep = reply.parameters.split(',');
    if (rep.length == ligObject.OutputCounts) {
        var btn;
        for (var i = 0; i < rep.length; i++) {
            btn = "#Output_Digital" + i;
            ligObject.AFVForbidFlag[i] = rep[i] > 0;
            if (ligObject.AFVForbidFlag[i]) {
                if ($(btn).hasClass("jifukui_disablebutton")) {

                }
                else {
                    $(btn).addClass("jifukui_disablebutton");
                }
            }
            else {
                if ($(btn).hasClass("jifukui_disablebutton")) {
                    $(btn).removeClass("jifukui_disablebutton");
                }
                else {

                }
            }
        }
    }
};

var switchLabelHandler = function (reply) {
    //var rep = reply.parameters.split(',');
    var rep = reply.split(',');
    var btnid;
    if (rep.length == (ligObject.InputCounts + ligObject.OutputCounts)) {
        for (var i = 0; i < rep.length; i++) {
            if (i < ligObject.InputCounts) {
                btnid = "rb_inputs" + i;
                InputLabelName[i] = rep[i];
            }
            else {
                btnid = "rb_outputs" + (parseInt(i) - ligObject.InputCounts);
                OutputLabelName[i - ligObject.InputCounts] = rep[i];
            }
            btnid = routeButton.getObjById(btnid);
            if (btnid != null) {
                btnid.labelInfoList[0] = rep[i];
                btnid.refresh();
            }
        }
    }
};

var switchABALabelHandler = function (reply) {
    for (var i = 0; i < ligObject.OutputCounts; i++) 
    {
        btnid = "ABA_Label" + (parseInt(i));
        document.getElementById(btnid).innerHTML = OutputLabelName[i];
    }
};

var routingMuteAudioHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var id = parseInt(parseInt($.trim(rep[0])));
    var muted = parseInt(parseInt($.trim(rep[1])));
    outputSetAudioMute(id, muted);
};

var routingMuteVideoHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var id = parseInt(parseInt($.trim(rep[0]))) - 1;
    var muted = parseInt(parseInt($.trim(rep[1])));
    outputSetVideoMute(id, muted);
};
/**jifukui 2018/11/30 
 * HDMI2.0版本添加必须要支持，注意修改*/
var routingHdcpModeHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var btnid;
    var PortHDCPAbilityIcon=["iconPortDisableHDCP","iconPortSupportHDCP1","iconPortSupportHDCP2"];
    var PortHDCPAbilityStr=["Port not support HDCP","Port Support HDCP 1.4","Port Support HDCP 2.2"];
    var HDCPSupport = [0, 0, 0];
    var index;
    if (rep.length == (ligObject.InputCounts+ligObject.OutputCounts)) 
    {
        var i=0;
        for (i = 0,index=0; index<rep.length; i++,index++) 
        {
            if(index<ligObject.InputCounts)
            {
                btnid = routeButton.getObjById("rb_inputs" + i);
                //PortHDCPAbilityStr[0]="NOT HDCP";
                InputHDCPAbility[i]=rep[i];
            }
            else
            {
                i=index-ligObject.InputCounts;
                OutputHDCPAbility[i]=rep[index];
                PortHDCPAbilityStr[0]="Follow Input HDCP";
                btnid =routeButton.getObjById("rb_outputs" + i);
            }
            if (btnid != null) 
            {
                HDCPSupport[0] = btnid.actionButtonList[0].search(PortHDCPAbilityIcon[0]);
                HDCPSupport[1] = btnid.actionButtonList[0].search(PortHDCPAbilityIcon[1]);
                HDCPSupport[2] = btnid.actionButtonList[0].search(PortHDCPAbilityIcon[2]);
                for (n = 0; n < HDCPSupport.length; n++) 
                {
                    if (HDCPSupport[n] != -1) 
                    {
                        break;
                    }
                }
                if (rep[index] == 2) 
                {
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(PortHDCPAbilityIcon[n], PortHDCPAbilityIcon[2]);
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(PortHDCPAbilityStr[n], PortHDCPAbilityStr[2]);
                }
                else if (rep[index] == 1) 
                {
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(PortHDCPAbilityIcon[n], PortHDCPAbilityIcon[1]);
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(PortHDCPAbilityStr[n], PortHDCPAbilityStr[1]);
                }
                else 
                {
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(PortHDCPAbilityIcon[n], PortHDCPAbilityIcon[0]);
                    btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(PortHDCPAbilityStr[n], PortHDCPAbilityStr[0]);
                }
                btnid.refresh();
            }

        }
    }
};
/*HDMI2.0版本添加注意修改 */
var routingHdcpStatHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var btnid;
    var SinkHDCPAbilityIcon=["iconSinkDisableHDCP","iconSinkSupportHDCP1","iconSinkSupportHDCP2"];
    var SinkHDCPAbilityStr=["Sink not support HDCP","Sink Support HDCP 1.4","Sink Support HDCP 2.2"];
    var SourceHDCPAbilityIcon=["iconSourceDisableHDCP","iconSourceSupportHDCP1","iconSourceSupportHDCP2"];
    var SourceHDCPAbilityStr=["Source not support HDCP","Source Support HDCP 1.4","Source Support HDCP 2.2"];
    var HDCPSupport = [0, 0, 0];
    if (rep.length == (ligObject.InputCounts + ligObject.OutputCounts)) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            if (i < ligObject.InputCounts) 
            {
                btnid = routeButton.getObjById("rb_inputs" + i);
                if (btnid != null) 
                {
                    HDCPSupport[0] = btnid.actionButtonList[0].search(SourceHDCPAbilityIcon[0]);
                    HDCPSupport[1] = btnid.actionButtonList[0].search(SourceHDCPAbilityIcon[1]);
                    HDCPSupport[2] = btnid.actionButtonList[0].search(SourceHDCPAbilityIcon[2]);
                    for (n = 0; n < HDCPSupport.length; n++) 
                    {
                        if (HDCPSupport[n] != -1) 
                        {
                            break;
                        }
                    }
                    if (rep[i] == 2) 
                    {
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace( SourceHDCPAbilityIcon[n],SourceHDCPAbilityIcon[2]);
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SourceHDCPAbilityStr[n], SourceHDCPAbilityStr[2]);
                    }
                    else if (rep[i] == 1) 
                    {
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace( SourceHDCPAbilityIcon[n],SourceHDCPAbilityIcon[1]);
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SourceHDCPAbilityStr[n], SourceHDCPAbilityStr[1]);
                    }
                    else 
                    {
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace( SourceHDCPAbilityIcon[n],SourceHDCPAbilityIcon[0]);
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SourceHDCPAbilityStr[n], SourceHDCPAbilityStr[0]);
                    }
                    btnid.refresh();
                   
                }
            }
            else 
            {
                btnid = routeButton.getObjById("rb_outputs" + (parseInt(i) - ligObject.InputCounts));
                if (btnid != null) 
                {
                    HDCPSupport[0] = btnid.actionButtonList[0].search(SinkHDCPAbilityIcon[0]);
                    HDCPSupport[1] = btnid.actionButtonList[0].search(SinkHDCPAbilityIcon[1]);
                    HDCPSupport[2] = btnid.actionButtonList[0].search(SinkHDCPAbilityIcon[2]);
                    for (n = 0; n < HDCPSupport.length; n++) 
                    {
                        if (HDCPSupport[n] != -1) 
                        {
                            break;
                        }
                    }
                    if (rep[i] == 2) {
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SinkHDCPAbilityIcon[n],SinkHDCPAbilityIcon[2]);
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SinkHDCPAbilityStr[n], SinkHDCPAbilityStr[2]);
                    }
                    else if (rep[i] == 1) {
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace( SinkHDCPAbilityIcon[n],SinkHDCPAbilityIcon[1]);
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SinkHDCPAbilityStr[n], SinkHDCPAbilityStr[1]);
                    }
                    else {
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace( SinkHDCPAbilityIcon[n],SinkHDCPAbilityIcon[0]);
                        btnid.actionButtonList[0] = btnid.actionButtonList[0].replace(SinkHDCPAbilityStr[n], SinkHDCPAbilityStr[0]);
                    }
                    btnid.refresh();
                }
            }
        }
    }
};

var routingSignalHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var btn;
    if (rep.length == ligObject.InputCounts) {
        for (var i = 0; i < rep.length; i++) {
            btn = routeButton.getObjById("rb_inputs" + i);
            if (btn != null) {
                if (rep[i] == 0) {
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("iconGreen", "iconRed");
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("Signal detected", "Signal not detected");

                } else {
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("iconRed", "iconGreen");
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("Signal not detected", "Signal detected");
                }
                btn.refresh();
            }
        }
    }
};

var routingDisplayHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var btn;
    if (rep.length == ligObject.OutputCounts) {
        for (var i = 0; i < rep.length; i++) {
            btn = routeButton.getObjById("rb_outputs" + i);
            if (btn != null) {
                if (rep[i] == 0) {
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("iconGreen", "iconRed");
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("Output connected", "Output not connected");

                } else {
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("iconRed", "iconGreen");
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace("Output not connected", "Output connected");
                }

                btn.refresh();
            }
        }
    }
};

var routingAFVHandler = function (reply) {
    var rep = $.trim(reply.parameters);

    if (rep == "1") 
    {
        routingSetAFVButtons(true);
        routingAFVButtonValue("OFF");
    } 
    else {
        routingSetAFVButtons(false);
        routingAFVButtonValue("ON");
    }
};

var routingVideoHandler = function (reply) {
    var rep = reply.parameters.split(',');
    var btn;
    var Strdat = "";
    var Strold = "";
    if (rep.length == ligObject.OutputCounts) {
        for (var i = 0; i < rep.length; i++) {
            btn = routeButton.getObjById("rb_outputs" + i);
            if (btn != null) {
                Strdat = btn.actionButtonList[0];
                Strdat = Strdat.split("</td>");
                Strold = Strdat[2] + "</td>";
                if (rep[i] == 0) {
                    Strdat[2] = Strdat[2].split(">")[0] + ">0</td>";
                    btn.actionButtonList[0] = btn.actionButtonList[0].replace(Strold, Strdat[2]);
                }
                else {

                    if (rep[i] >= 17) {
                        Strdat[2] = Strdat[2].split(">")[0] + ">P" + (parseInt(rep[i] - 16)) + "</td>";
                        btn.actionButtonList[0] = btn.actionButtonList[0].replace(Strold, Strdat[2]);
                    }
                    else {
                        Strdat[2] = Strdat[2].split(">")[0] + ">" + rep[i] + "</td>";
                        btn.actionButtonList[0] = btn.actionButtonList[0].replace(Strold, Strdat[2]);
                    }
                }
                btn.refresh();
            }
        }

    }
};

/********* USER EVENTS *************/
var routeCloseDialog = function () {
    showDialogBox(false);
    routing_init_sync_queries();
};

var routingCreatePresetTableColumn = function (cols, indexStart, funcId) {
    var content = "<tr>";
    for (var i = 0; i < cols; i++) {
        var id = (i) + indexStart;
        content += "<td id='routingPresetBtn" + id + "' class='routingDeviceSwitcTableIcon routingDeviceSwitcTableIconSelected' onclick='" + funcId + "(" + id + ");'>" + id + "</td>";
    }
    content += "</tr>";
    return content;
};

var routingRecallPreset = function () {
    var content = "<table>";
    content += routingCreatePresetTableColumn(3, 1, "routingRecallPreserClick");
    content += routingCreatePresetTableColumn(3, 4, "routingRecallPreserClick");
    content += "</table>";
    $('#kDialogBtnCancel').show();
    $('#kDialogBtnOk').hide();
    showDialogBox(true, "Recall Preset", content, "routeCloseDialog");
};

var routingSetPreset = function () {
    var content = "<table>";
    content += routingCreatePresetTableColumn(3, 1, "routingSetPreserClick");
    content += routingCreatePresetTableColumn(3, 4, "routingSetPreserClick");
    content += "</table>";
    $('#kDialogBtnCancel').show();
    $('#kDialogBtnOk').hide();
    showDialogBox(true, "Set Preset", content, "routeCloseDialog");
};

var routingRecallPreserClick = function (id) {
    sendAndWaitCommand("PRST-RCL " + id);
    refreshCommands();
    routeCloseDialog();
};

var routingSetPreserClick = function (id) {
    sendAndWaitCommand("PRST-STO " + id);
    refreshCommands();
    routeCloseDialog();
};

var routingAFVSet = function () {
    var value = $('#routingAFVButton').html();

    if (value == "ON") {
        //console.log(" AFV OFF");
        sendAndWaitCommand("AFV 1");
    }
    else {
        //console.log(" AFV ON");
        sendAndWaitCommand("AFV 0");
    }
    refreshCommands();
};

var routingAFVButtonValue = function (value) {
    $('#routingAFVButton').html(value);
};
/*设置优先级按钮的程序*/

var switchVolumeHandler = function (reply) {
    reply = reply.parameters.replace(/^\s+|\s+$/gm, '');
    var rep = reply.split(',');
    volumeArr = rep;
    var val2;
    var val;
    if (rep.length == ligObject.OutputCounts) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            if (i != VolumeForbinCurrent) 
            {
                val = document.getElementById("Output_Volume" + i);
                if (val != null) {
                    val.value = parseInt(rep[i]);
                }
                val2 = document.getElementById("OutputVolumeValue" + i);
                if (val2 != null) {
                    val2.value = Volume_DBValue(parseInt(rep[i]));
                }
            }
        }
    }
};

var switchBalanceHandler = function (reply) 
{
    reply = reply.parameters.replace(/^\s+|\s+$/gm, '');
    var rep = reply.split(',');
    blanceArr = rep;
    var val2;
    var val;
    if (ligObject.OutputCounts == rep.length) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            if (i != BalanceForbinCurrent) 
            {
                val = document.getElementById("Output_Balance" + i);
                if (val != null) 
                {
                    val.value = parseInt(rep[i]);
                }
                val2 = document.getElementById("OutputBalanceValue" + i);
                if (val2 != null) 
                {
                    val2.value = parseInt(rep[i]);
                }
            }

        }

    }
};

var switchAUDHandler = function (reply) 
{
    var rep = reply.parameters.split(',');
    var str;
    if (ligObject.Haveaudio) {
        if (rep.length == 2 * ligObject.OutputCounts + ligObject.InputCounts) 
        {
            for (var i = 0; i < rep.length; i++) 
            {
                if (i < ligObject.OutputCounts) 
                {
                    str = "Output_Digital" + i;
                }
                else if (i < 2 * ligObject.OutputCounts) 
                {
                    str = "Output_Analog" + parseInt(i - ligObject.OutputCounts);
                }
                else 
                {
                    InputARCSwitchStatus(i - (2 * ligObject.OutputCounts), rep[i]);
                }
                if (i < (2 * ligObject.OutputCounts)) 
                {
                    str = document.getElementById(str);
                    if (str != null) 
                    {
                        if (rep[i] > ligObject.InputCounts && rep[i] <= 2 * ligObject.InputCounts) 
                        {
                            str.value = "A" + (parseInt(rep[i]) - ligObject.InputCounts);
                        }
                        else if (rep[i] <= ligObject.InputCounts && rep[i] > 0) 
                        {
                            str.value = "D" + (parseInt(rep[i]));
                        }
                        else if (rep[i] > 2 * ligObject.InputCounts && rep[i] <= (2 * ligObject.InputCounts + ligObject.OutputCounts)) 
                        {
                            str.value = "ARC" + (parseInt(rep[i]) - 2 * ligObject.InputCounts);
                        }
                        else 
                        {
                            str.value = "";
                        }
                    }
                }
            }
        }
    }
    else 
    {
        if (rep.length == 2*ligObject.OutputCounts + ligObject.InputCounts) 
        {
            for (var i = 0; i < rep.length; i++) 
            {
                if (i < ligObject.OutputCounts) 
                {
                    str = "Output_Digital" + i;
                }
                else if(i >=2* ligObject.OutputCounts)
                {
                    InputARCSwitchStatus(i - 2*ligObject.OutputCounts, rep[i]);
                }
                if (i < ligObject.OutputCounts) 
                {
                    str = document.getElementById(str);
                    if (str != null) 
                    {
                        if (rep[i] > ligObject.InputCounts && rep[i] <= 2 * ligObject.InputCounts) 
                        {
                            str.value = "A" + (parseInt(rep[i]) - ligObject.InputCounts);
                        }
                        else if (rep[i] <= ligObject.InputCounts && rep[i] > 0) 
                        {
                            str.value = "D" + (parseInt(rep[i]));
                        }
                        else if (rep[i] > 2 * ligObject.InputCounts && rep[i] <= (2 * ligObject.InputCounts + ligObject.OutputCounts)) 
                        {
                            str.value = "ARC" + (parseInt(rep[i]) - 2 * ligObject.InputCounts);
                        }
                        else 
                        {
                            str.value = "";
                        }
                    }
                }
            }
        }
    }
};

var switchAbaMuteHandler = function (reply) 
{
    var rep = reply.parameters.split(',');
    var str;
    var volstr;
    var voltx;
    var balstr;
    var baltx;
    if (rep.length == ligObject.OutputCounts) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            str = "#Output_Mute" + i;
            volstr = "Output_Volume" + i;
            voltx="OutputVolumeValue"+i;
            balstr = "Output_Balance" + i;
            baltx="OutputBalanceValue"+i;
            $(str).removeClass("iconSwitchAudio");
            $(str).removeClass("iconMuteAudio");
            if (rep[i] == 1) 
            {
                $(str).addClass("iconMuteAudio");
                document.getElementById(volstr).disabled = true;
                document.getElementById(voltx).disabled=true;
                document.getElementById(balstr).disabled = true;
                document.getElementById(baltx).disabled=true;
            }
            else 
            {
                $(str).addClass("iconSwitchAudio");
                document.getElementById(volstr).disabled=false;
                document.getElementById(voltx).disabled=false;
                document.getElementById(balstr).disabled=false;
                document.getElementById(baltx).disabled=false;
            }
        }
    }
};

var switchARCHandler = function (reply) 
{
    var rep = reply.parameters.split(',');
    var str;
    var arc_btn;
    if (rep.length == ligObject.OutputCounts) 
    {
        for (var i = 0; i < rep.length; i++) 
        {
            str = "arc_checkbox_" + i;
            arc_btn = "#Input_ARC" + i;
            str = document.getElementById(str);
            if (str != null) 
            {
                if (rep[i] == 0) 
                {
                    str.checked = false;
                    if ($(arc_btn) != null) {
                        if ($(arc_btn).hasClass("jifukui_setbutton")) 
                        {
                            $(arc_btn).removeClass("jifukui_setbutton");
                            $(arc_btn).addClass("jifukui_disablebutton");
                        }
                        if ($(arc_btn).hasClass("jifukui_disablebutton")) 
                        {
                        }
                        else 
                        {
                            $(arc_btn).addClass("jifukui_disablebutton");
                        }
                    }
                }
                else {
                    str.checked = true;
                    if ($(arc_btn) != null) 
                    {
                        if (!jifukui_HDMI_Audio_statue) 
                        {
                            if ($(arc_btn).hasClass("jifukui_disablebutton")) 
                            {
                                $(arc_btn).removeClass("jifukui_disablebutton");
                            }
                        }
                    }
                }
            }
        }
    }
};

var AllLockModeHander = function (reply) {
    var rep = $.trim(reply.parameters);
    
    if (rep==0) 
    {
        $("#lock-fp").removeClass("iconLock");
        $("#lock-fp").addClass("iconUnlock");
    }
    else 
    {
        $("#lock-fp").removeClass("iconUnlock");
        $("#lock-fp").addClass("iconLock");
    }
    
    if (httpCommFrame.privilege == 0) {
        $("#mainuser").text("Admin");
    }
    else if (httpCommFrame.privilege == 1) {
        $("#mainuser").text("");
    }
    else if (httpCommFrame.privilege == 2) {
        $("#mainuser").text("User");
    }
};

var RoutingOutputshowlist = function () {
    document.getElementById('defaultMenu').style.display = "block";
};

var RoutingOutputlistclick = function (index, value) {
    var smode = "";
    if (value === 2) {
        smode += "<tr style='width: 120px;'><td><div class='iconUltrafast'></div></td><td style='width: 80px'>Extra&Fast</td><td onclick='RoutingOutputshowlist()'><div id='jifukuilist' class='iconlistdown'></div></td></tr>";
    }
    else if (value === 1) {
        smode += "<tr style='width: 120px;'><td><div class='iconFast'></div></td><td style='width: 80px'>Fast</td><td onclick='RoutingOutputshowlist()'><div id='jifukuilist' class='iconlistdown'></div></td></tr>";
    }
    else {
        smode += "<tr style='width: 120px;'><td><div class='iconLegacy'></div></td><td style='width: 80px'>Normal</td><td onclick='RoutingOutputshowlist()'><div id='jifukuilist' class='iconlistdown'></div></td></tr>";
    }
    $("#database").html(smode);
    var str = "EXT-AV-SW-SPEED " + (parseInt(index) + 1) + "," + value;
    sendAndWaitCommand(str);
    hiddenlist();
};

var hiddenlist = function () {
    var mode = document.getElementById('defaultMenu');
    if (mode != null) {
        mode.style.display = "none";
    }
    jifukuiListstatues = false;
};

var RoutingOutputList = function (i) {
    var str = "";
    str += "<table id='database'><tr style='width: 120px;'>";
    if (i == 2) {
        str += "<td><div class='iconUltrafast'></div></td><td style='width: 80px'>Extra&Fast</td><td onclick='RoutingOutputshowlist()'><div id='jifukuilist' class='iconlistdown'></div></td>";
    }
    else if (i == 1) {
        str += "<td><div class='iconFast'></div></td><td style='width: 80px'>Fast</td><td onclick='RoutingOutputshowlist()'><div id='jifukuilist' class='iconlistdown'></td>";
    }
    else if (i == 0) {
        str += "<td><div class='iconLegacy'></div></td><td style='width: 80px'>Normal</td><td  onclick='RoutingOutputshowlist()'><div id='jifukuilist' class='iconlistdown'></td>";
    }
    str += "</tr></table>";
    return str;
};
var RoutingPortHDCPAbility = function (i) {
    i=parseInt(i) + 1;
    var str = "";
    str += "<select id='porthdcpability' class='listControl txtList' onchange='SetOutputSignalHDCP("+i+",value)'>";
    
    str += "<option style='width: 80px' value='0'>Follow Input HDCP</option>";
   
    str += "<option style='width: 80px' value='1'>Support HDCP 1.4</option>";
   
    str += "<option style='width: 80px' value='2'>Support HDCP 2.2</option>";
    
    str += "</select>";
    return str;
};
var SetOutputSignalHDCP=function(i,value)
{
    console.log("i is "+i);
    console.log("value is "+value);
    sendAndWaitCommand("EXT-HDCP-VER 1," + i +","+ value);
};
var RoutingSignalHDCP = function (i) {
    i=parseInt(i) + 1;
    var str = "";
    str += "<select id='signalhdcp' class='listControl txtList' onchange='SetInputPortHDCP("+i+",value)'>";
    
    str += "<option style='width: 80px' value='0'>No HDCP</option>";
   
    str += "<option style='width: 80px' value='1'>HDCP 1.4</option>";
    
    str += "<option style='width: 80px' value='2'>HDCP 2.2</option>";
   
    str += "</select>";
    return str;
};
var SetInputPortHDCP=function(i,value)
{
    console.log("i is "+i);
    console.log("value is "+value);
    sendAndWaitCommand("EXT-HDCP-VER 0," + i +","+value);
}
$(document).ready(function () {
    $("body").click(function (event) {
        var value = $(event.target);
        if (value.context.id == "jifukuilist") {
            jifukuiListstatues = !jifukuiListstatues;
            if (jifukuiListstatues) {

            }
            else {
                hiddenlist();
            }
        }
        else {
            hiddenlist();
        }
    })
});

var Output_Volume_Range_mousedown = function (i) {
    VolumeForbinCurrent = i;
};

var Output_Volume_Range_mouseup = function (i) {
    VolumeForbinCurrent = ligObject.OutputCounts + 1;
};

var Output_Balance_Range_mousedown = function (i) {
    BalanceForbinCurrent = i;
};
var Output_Balance_Range_mouseup = function (i) {
    BalanceForbinCurrent = ligObject.OutputCounts + 1;
};
var Volume_DBValue = function (value) {
    value -= 50;
    value = value >= 0 ? value * 0.5 : value;
    return value;
};

var LableNameErrorHandle = function () {
    if (ligObject.LablePortType == 0) {
        inputActionClick(0, ligObject.LablePortId);
    }
    else {
        outputActionClick(1, ligObject.LablePortId);
    }
    ligObject.LableFlag++;
};
var DeviceStepInStatus = function (reply) {
    var rep = reply.parameters.split(',');
    var i;
    for (i = 0; i < ligObject.InputCounts; i++) {
        ligObject.InputARCStatus[i] = rep[i] == 1 ? true : false;
    }
};
var InputARCSwitchStatus = function (index, value) {
    ligObject.InputARCSwitchStatus[index] = value;
};
var InputARCSwitch = function (index) {
    var content = "";
    var Inputport = parseInt(index) + 1;
    var btnstr = "#InputARCSwitch_";
    var i;
    var iindex = 0, value;
    content += "<div class='txtProperty'></div>";
    content += "<table><tr>";
    if (ligObject.Haveaudio) {
        content += "<table><tr><td >Analog<td></tr>";
        content += "<tr><table>";
        for (i = 0; i < ligObject.InputCounts; i++) {
            iindex = parseInt(i + ligObject.OutputCounts + 1);
            value = parseInt(i + 1);
            if (i % 4 == 0) {
                content += "<tr>";
            }
            content += "<td><input type='button' id='InputARCSwitch_" + iindex + "'  value='" + value + "' onclick='InputARCSwitchSelected(0," + value + "," + Inputport + ")'></td>";
            if (i % 4 == 3) {
                content += "</tr>";
            }
        }
        if (i % 4 != 0) {
            content += "</tr>";
        }
        content += "</table></tr></table>";
        content += "</table></tr>";
    }

    content += "<table><tr><td >ARC Source from HDMI output No:</td></tr>";
    content += "<tr><table>";
    for (i = 0; i < ligObject.OutputCounts; i++) {
        if (i % 4 == 0) {
            content += "<tr>";
        }
        iindex = parseInt(i + 2*ligObject.OutputCounts+1);
        value = parseInt(i + 1);
        content += "<td><input type='button' id='InputARCSwitch_" + iindex + "'  value='" + value + "' onclick='InputARCSwitchSelected(2," + value + "," + Inputport + ")'></td>";
        if (i % 4 == 3) {
            content += "</tr>";
        }
    }
    if (i % 4 != 0) {
        content += "</tr>";
    }
    content += "</table></tr></table>";
    content += "</table></tr>";

    content += "<table><tr><td><input type='button' value='Back' style='margin-left: 80px' onclick='inputActionClick(0," + index + ")'><td></tr>";
    content += "</table>";
    $('#kDialogBtnOk').hide();
    $('#kDialogBtnCancel').hide();
    showDialogBox(true, false, "<td>" + "Input " + Inputport + " ARC settings" + "</td>" + "<td style='padding-left: 100px'><div  class='icon_closewindow'  onclick='showDialogBox(false,false)'></td>", content, "SwitchARCCloseDialog");
    $(btnstr + ligObject.InputARCSwitchStatus[index]).addClass("jifukui_setbutton");
};
var InputARCSwitchSelected = function (type, value, inid) {
    var val;
    val = type == 2 ? 2 : 1;
    var btnstr = "#InputARCSwitch_";
    var i;
    for (i = ligObject.InputCounts+1; i <= 2*ligObject.InputCounts + ligObject.OutputCounts; i++) {
        $(btnstr + i).removeClass("jifukui_setbutton");
    }
    var data = val * ligObject.InputCounts + value;
    $(btnstr + data).addClass("jifukui_setbutton");
    sendMessageNoWait("EXT-AUD 2," + inid + "," + type + "," + value);
};
var SwitchARCCloseDialog = function () {
    console.log("a  hahahhah");
};
var CloseSilder=function()
{
    console.log("close");
    if(myscroll)
    {
        console.log("close");
        myscroll.disable();
    }
}
var OpenSilder=function()
{
    console.log("open");
    if(myscroll)
    {
        console.log("open")
        myscroll.enable();
    }
}
//@ sourceURL=routing.js