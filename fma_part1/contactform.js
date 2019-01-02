function init() {
    checkForm();
    setHintForAllFields();
    setFocus();
    qToolTip();
}

function checkForm() {
    document.getElementById("contactForm").onsubmit = function () {
        var allowsubmit = false;
        if (checkFields()) {
            validation("firstName", "lastName", "con", "email", "telephoneNumber");
        }
        return allowsubmit;
    };
}
/***********************************************************************************

 == function for when the textfield is in focus do this and when on blur to do this 
 
 ***********************************************************************************/
function defaultHint(txtElem, defaultText) {
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.onfocus = function () {
        if (this.value === defaultText) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
    }
    txtElem.onblur = function () {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#A8A8A8";
        }
    }
}

/***********************************************************

 == this function will set default text for the Id's in (" ")
 
 ************************************************************/

function setHintForAllFields() {
    defaultHint(document.getElementById("firstName"), "Enter your first name");
    defaultHint(document.getElementById("lastName"), "Enter your last name");
    defaultHint(document.getElementById("con"), "e.g. ZHA346783");
    defaultHint(document.getElementById("email"), "Enter your email");

}

/*************************************************

 == function to set focus on the firstname Id
 
 *************************************************/
function setFocus() {
    document.getElementById("firstName").focus();
}


/*********************************************************************************

  == Make sure all fields are completed and if else show error of and empty field  
  
 **********************************************************************************/
function checkFields() {
    var allowsubmit = true;
    var errorCollection = [];

    if (document.getElementById("firstName").value === "" || document.getElementById("firstName").value === "Enter your first name") {
        errorCollection.push("firstName");
        allowsubmit = false;
    } else clearError("firstName");

    if (document.getElementById("lastName").value === "" || document.getElementById("lastName").value === "Enter your last name") {
        errorCollection.push("lastName");
        allowsubmit = false;
    } else clearError("lastName");
    if (document.getElementById("title").value === "select a title") {
        errorCollection.push("title");
        allowsubmit = false;
    } else clearError("title");
    if (document.getElementById("con").value === "" || document.getElementById("con").value === "e.g. ZHA346783") {
        errorCollection.push("con");
        allowsubmit = false;
    } else clearError("con");

    if (document.getElementById("email").value === "" || document.getElementById("email").value === "Enter your email") {
        errorCollection.push("email");
        allowsubmit = false;

    } else clearError("email");
    if (!allowsubmit) {
        for (var i = 0; i < errorCollection.length; i++) {
            showError(errorCollection[i]);
        }

    }

    return (allowsubmit);
}

/***********************************************************************

  == this is the validation of firstName, lastName, con and email fields
  == so allow submit if all fields are true but error message if false 
 
 ************************************************************************/

function validation(firstName, lastName, con, email, telephoneNumber) {
    var allowsubmit = true;
    var firstName = document.getElementById(firstName).value;
    var lastName = document.getElementById(lastName).value;
    var con = document.getElementById(con).value;
    var email = document.getElementById(email).value;
    var firstNameRegex = /^[A-Za-z]{2,}$/.test(firstName);
    var lastNameRegex = /^[A-Za-z\-]{2,}$/.test(lastName);
    var conRegex = /ZHA\d{6}$/.test(con);
    var emailRegex = /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/.test(email);



    var messeges = {
        firstNameValidationError: "First name can't contain 0-9 or non alphabetic characters.    Also must contain more than one character.",
        firstNameValidationErrorMinimumLength: "first name must contain more than one character.",
        lastNameValidationError: "Last name can't contain 0-9 or other non alphabetic characters.   A hyphen may be used (e.g Whittaker-Jones). Also must contain more than one character.",
        conValidationError: "number not valid it should be in the form of (e.g ZHA346783)",
        emailValidationError: "Invalid Email",

    }
    if (!firstNameRegex) {
        document.getElementById("firstNameValidationError").innerHTML = messeges.firstNameValidationError;
        allowsubmit = false;
    } else document.getElementById("firstNameValidationError").innerHTML = '';
    if (!lastNameRegex) {
        document.getElementById("lastNameValidationError").innerHTML = messeges.lastNameValidationError;
        allowsubmit = false;
    } else document.getElementById("lastNameValidationError").innerHTML = '';
    if (!conRegex) {
        document.getElementById("conValidationError").innerHTML = messeges.conValidationError;
        allowsubmit = false;
    } else document.getElementById("conValidationError").innerHTML = '';
    if (!emailRegex) {
        document.getElementById("emailValidationError").innerHTML = messeges.emailValidationError;
        allowsubmit = false;
    } else document.getElementById("emailValidationError").innerHTML = '';


    return allowsubmit;

}

function showError(errorId) {
    var er = errorId + "Error";
    document.getElementById(er).style.display = "inline";
}

function clearError(errorId) {
    var er = errorId + "Error";
    document.getElementById(er).style.display = "none";
}
/***********************************************************************************

== on mouseover display tip information from the ID and on mouseout display none
== somehing we went over on the course 

*************************************************************************************/
function qToolTip() {
    document.getElementById('question-mark').onmouseover = function () {
        var toolTip = document.getElementById('qmarktip');
        toolTip.style.display = 'block';
    }
    document.getElementById('question-mark').onmouseout = function () {
        var toolTip = document.getElementById('qmarktip');
        toolTip.style.display = 'none';
    }
}
window.onload = init;


