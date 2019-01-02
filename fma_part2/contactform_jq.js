/*******************************************************************************************************************

 == Below i have used the jQuery plugin from (http://jqueryvalidation.org)  to make a simple form validation 
 possible 

 ******************************************************************************************************************
 */

/***************************************************************
 == start up the document firstly focus on the firstName input
 == also adding default text to the different inputs with the function addDefaultText
*****************************************************************/
$(document).ready(function() {
    $("#firstName").focus();
    ToolTip();
    addDefaultText("#lastName", "Enter last name");
    addDefaultText("#hint", "e.g. ZHA346783");
    addDefaultText("#email", "Enter email");
    addDefaultText("#telephoneNumber", "Enter telephone number (optional)");

/******************************************************************************************
 == The .validate method is used for the rules object to validate  the five inputs Id's
 == it's also used for the messages object
    
******************************************************************************************/
    
    $('#contactForm').validate({
        rules: {
            firstName: {
                required: true,
                minlength: 3,
            },
            lastName: {
                required: true,
                minlength: 3,
            },
            title: 'required',
            email: {
                required: true,
                email: true
            },
            
        },
        messages: {
            firstName: {
                required: "*first name is required. Please enter your first name.",
                minlength: "your first name must constist of at least 3 characters",
            },
            lastName: {
                required: "*last name is required. Please enter your last name.",
                minlength: "your last name must constist of at least 3 characters",
            },
            title: {
                required: "*Title is required,please select a title."

            },
            email: {
                required: "email is required, please enter your email."
            }
        }
    });
});


/* *********************************************************************

== function for when .mouseover  and .mouseout  for tooltip 

***************************************************************************/
function ToolTip() {
    $("#qmark").mouseover(function() {
        $("#qmarktip").show();
    }).mouseout(function() {
        $("#qmarktip").hide();
    });
}

/********************************************************************************************

 == creating a function to add a placeholder on an input and once focused on remove it 
 
 ********************************************************************************************/
function addDefaultText(inputname, text) {
    $(inputname).focusin(function() {
        $(this).attr("placeholder", "");
    });
    $(inputname).focusout(function() {
        $(this).attr("placeholder", text);
    }).focusout();
}
