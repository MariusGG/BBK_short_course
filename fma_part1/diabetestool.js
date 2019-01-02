function init() {
    checkForm();
}

function checkForm() {
    document.getElementById("risk-assessment").onsubmit = function() {
        var allowsubmit = false;
        if (document.getElementById("submit").value === "Calculation") {
            var inputElement = document.getElementsByTagName("input");
            riskLevel = determineRiskLevel(myTotalScore(inputElement));
        }
        displayMessage(riskLevel);
        return false;
    };
}

/*****************************************************************************
 ==  collect the input fields and determine riskfactors for the message board 
 == inputs which are selected and if value is >= 10   
 *******************************************************************************/
function mainRiskFactors(inputElement) {
    var index = 0;
    var riskFactors = [];
    for (index in inputElement) {
        if (inputElement[index].checked) {
            //check if the value is >= 10 
            selectedValue = Number(inputElement[index].attributes.value.value);
            if (selectedValue >= 10) {
                riskFactors.push(inputElement[index].attributes.name.value);
            }
        }
    }
    return riskFactors;
}

/*******************************************************************************************************
 == function to calculating the value of the user risk from the value choosen from the checked inputs

********************************************************************************************************/
function myTotalScore(inputElement) {
    var index = 0;
    var totalScore = 0;
    for (index in inputElement) {
        if (inputElement[index].checked) {
            selectedValue = Number(inputElement[index].attributes.value.value);
            totalScore += selectedValue;
        }
    }
    return totalScore;
}
/********************************************************
 == this is a determination of the risk level  
 == return a risk based on the users total value
 *********************************************************/
function determineRiskLevel(totalScore) {
    if (totalScore <= 15) {
        risk = "lowRisk";
    }
    if (totalScore > 15 && totalScore <= 25) {
        risk = "mediumRisk";
    }
    if (totalScore > 25) {
        risk = "highRisk";
    }
    return risk;
}
/*********************************
 == header for the message board 

 *****************************************/
function messageHeadingH2() {
    var heading = document.createElement("h2");
    var headingText = document.createTextNode("Your Result");
    heading.appendChild(headingText);
    document.getElementById("display-message").appendChild(heading);
}
/*****************************************************************************************************************
== function to concatenate the user risk facters like bmi and family....etc and return on the displayed message
==
 ******************************************************************************************************************/
function createMainRiskFactorMessage() {
    var mainRiskFactorMessage;
    var inputElement = document.getElementsByTagName("input");
    var mainRiskFactor = mainRiskFactors(inputElement);
    if (mainRiskFactor.length === 1) {
        return mainRiskFactorMessage = "your main risk factor is your   " + mainRiskFactor + ".";
    } else {
        var lastMainRIskFactor = mainRiskFactor.pop();
        mainRiskFactorMessage = "your main risk factors are your  " + mainRiskFactor + " and " + lastMainRIskFactor + ".";
        return mainRiskFactorMessage;
    }
}
/*****************************************************************************************
 == Display one of the messages below on the ID display-message 
 == if riskLevel is low display this message else display either of the other riskLevels 
 == the concatenation is also added on the displayed message (highRisk)
 ****************************************************************************************/
function displayMessage(riskLevel) {
    clearMessege();
    var messages = {
        lowRisk: "Your results show that you currently have a low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.",
        mediumRisk: "Your results show that you currently have a medium risk of developing diabetes. For more information on your risk factors, and what to do about them, please visit our diabetes advice website at ",
        highRisk: "Your results show that you currently have a HIGH risk of developing diabetes." + createMainRiskFactorMessage() + "We advise that you contact the Health Authority to discuss your risk factors as soon as you can.Please fill in our ",
        extraInfo: " and a member of the Health Authority Diabetes team will be in contact with you."
    }

    var message = document.createElement("p");
    var contactFormLink = document.createElement("a");
    var extraInfoText = document.createElement("p");
    if (riskLevel === "lowRisk") {
        messageText = document.createTextNode(messages.lowRisk);
        matchMessageBoardColorTo("lowRisk");
    }
    if (riskLevel === "mediumRisk") {
        messageText = document.createTextNode(messages.mediumRisk);
        contactFormLink.href = "http://www.zha.org.zd.";
        contactFormLink.innerHTML = "http://www.zha.org.zd.";
        matchMessageBoardColorTo("mediumRisk");
    }
    if (riskLevel === "highRisk") {
        messageText = document.createTextNode(messages.highRisk);
        extraInfoText = document.createTextNode(messages.extraInfo);
        contactFormLink.href = "contactform.html";
        contactFormLink.innerHTML = "Contact form";
        matchMessageBoardColorTo("highRisk");

    }

    message.appendChild(messageText);
    message.appendChild(contactFormLink);
    message.appendChild(extraInfoText);

    messageHeadingH2();
    document.getElementById("display-message").appendChild(message);
    document.getElementById("display-message").style.display = "block";

}
/****************************************************************************
 == function to change message board colour to match one of the riskLevels

 ****************************************************************************/
function matchMessageBoardColorTo(riskLevel) {
    if (riskLevel === "lowRisk") {
        document.getElementById("display-message").style.backgroundColor = '#62b1f5';
    }
    if (riskLevel === "mediumRisk") {
        document.getElementById("display-message").style.backgroundColor = '#ffff82';
    }
    if (riskLevel === "highRisk") {
        document.getElementById("display-message").style.backgroundColor = '#f56262';
    }

}

function clearMessege() {
    var x = document.getElementById("display-message");
    while (x.hasChildNodes()) {
        x.removeChild(x.firstChild);
    }
}
window.onload = init;
