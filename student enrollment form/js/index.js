var japdbBaseURL = "http://api.login2explore.com:5577"
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "SCHOOL-DB";
var empRelationName = "STUDENT-TABLE";
var connToken = "90932783|-31949278490940472|90948518"

$("#studid").focus();

function SAVERECNO(jsonObj) {
    var inData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", inData.rec_no);
}

function getEmpIdAsJsonObj() {
    var studid = $("#studid").val();
    var jsonstr = {
        id: studid
    };
    return JSON.stringify(jsonstr);
}


function fillData(jsonObj) {
    SAVERECNO(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#studname").val(record.name);

}

function resetForm() {
    $("#studid").val("")
    $("#studname").val("");
    $("#studclass").val("");
    $("#studbirth").val("");
    $("#studaddress").val("");
    $("#studenroll").val("");

    $("#studid").prop("disabled", false);
    $("#save").prop("disabled", false);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#studid").focus();

}

function validateData() {
    var empIdVar = $("#studid").val();

    if (empIdVar === "") {
        alert("Student ID Required Value");
        $("#studid").focus();
        return "";
    }
    var empNameVar = $("#studname").val();
    if (empNameVar === "") {
        alert("Student Name is Required Value");
        $("#studname").focus();
        return "";
    }
    var empClassVar = $("#studclass").val();
    if (empClassVar === "") {
        alert("Student Class is Required Value");
        $("#studclass").focus();
        return "";
    }
    var empBirthVar = $("#studbirth").val();
    if (empClassVar === "") {
        alert("Student Birth Date is Required Value");
        $("#studbirth").focus();
        return "";
    }
    var empAddressVar = $("#studaddress").val();
    if (empAddressVar === "") {
        alert("Student Adress is Required Value");
        $("#studaddress").focus();
        return "";
    }
    var empEnrollVar = $("#studenroll").val();
    if (empEnrollVar === "") {
        alert("Student Enroll is Required Value");
        $("#studenroll").focus();
        return "";
    }
    var jsonStrObj = {
        id: empIdVar,
        name: empNameVar,
        class:empClassVar,
        birth:empBirthVar,
        address:empAddressVar,
        enroll:empEnrollVar
    };
    return JSON.stringify(jsonStrObj);
}


function getStud() {

    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, japdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: false });

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        
        $("#studname").focus();

    }
    else if (resJsonObj.status === 200) {
        $("#studid").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studname").focus();


    }

}

function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return "";
    }
    var putReqStr = createPUTRequest(connToken,jsonStr, empDBName,empRelationName);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,connToken, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#studid").focus();

}


function changeData() {
    $("#change").prop("disabled", true);
    var jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg, empDBName, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(updateRequest,japdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#studid").focus();
}

