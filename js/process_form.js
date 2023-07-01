window.addEventListener('load', formsetup, false);
window.addEventListener('load', formClear, false);
window.addEventListener('load', hideSurvey, false);
window.addEventListener('load', hideResults, false);

function formsetup() {
    //for first name
    document.validform.validfname.addEventListener("focus", fnamefocus, false);
    document.validform.validfname.addEventListener("blur", fnameblur, false);
    //for last name
    document.validform.validlname.addEventListener("focus", lnamefocus, false);
    document.validform.validlname.addEventListener("blur", lnameblur, false);
    //for email
    document.validform.validemail.addEventListener("focus", emailfocus, false);
    document.validform.validemail.addEventListener("blur", emailblur, false);
    //for phone number
    document.validform.validphone.addEventListener("focus", phonefocus, false);
    document.validform.validphone.addEventListener("blur", phoneblur, false);
    //for address
    document.validform.validaddress.addEventListener("focus", addressfocus, false);
    document.validform.validaddress.addEventListener("blur", addressblur, false);

    //makes button validate inputs
    var validbutton = document.getElementById("validbutton");
    validbutton.addEventListener("click", validateData, false);

    //makes checkbox skip inputs
    var validcheck = document.getElementById("validcheck");
    validcheck.addEventListener("click", skipCheck, false);

    var surveybutton = document.getElementById("surveybutton");
    surveybutton.addEventListener("click", surveySubmit, false);

    var resetbutton = document.getElementById("resetbutton");
    resetbutton.addEventListener("click", retakeQuiz, false);
}

//clears survey and user info inputs when page is reloaded
function formClear() {
    console.log("formclear is running")

    document.getElementById("validform").reset();
    document.getElementById("surveyform").reset();
}

//Global variables that store whether input for form fields were valid or not
var q1_valid;
var q2_valid;
var q3_valid;
var q4_valid;
var q5_valid;

//global tallies for results
var grieftally = 0;
var angertally = 0;
var pridetally = 0;
var disgusttally = 0;

//Future Chris: See bottom of this doc/lecture 11 for more notes on these.
var nameVerif = /^[a-zA-Z]* ?[a-zA-z'-]*$/;
var emailVerif = /(\w|.)+\.?\w+?@\w+\.(edu|com|net)/;
var phoneVerif = /^\d{3}-?\d{3}-?\d{4}$/;
//var phoneVerif = /^\(\d{3}\) ?\d{3}-\d{4}$/; Old vers
var addressVerif = /(\w|.)+\.?\w+?@\w+\.(edu|com|net)/;
//var addressVerif = /(^http)s?:\/{2}\w+\.(\w+\.+\w+\.+\w+\/)?\~/; Old vers

//array holding images for validation form
var image = new Array(2);
    image[0] = new Image();
    image[0].src = "img/check.png"
    image[1] = new Image();
    image[1].src = "img/x.png"

//array that holds result images
var resultimage = new Array(5);
    resultimage[0] = new Image();
    resultimage[0].src = "img/grief.jpg"
    resultimage[1] = new Image();
    resultimage[1].src = "img/anger.jpg"
    resultimage[2] = new Image();
    resultimage[2].src = "img/pride.jpg"
    resultimage[3] = new Image();
    resultimage[3].src = "img/disgust.jpg"
    resultimage[4] = new Image();
    resultimage[4].src = "img/ultimatebattle.jpg"

//array containing result captions
var capArray = new Array(5);
    capArray[0] = "You cry every time, but hey that's a healthy outlet. FAR better than holding it all inside."
    capArray[1] = "You are fierce and no one can stand in your way... for long."
    capArray[2] = "It doesn't matter how others see you. You stand proud of where you are and who you've become."
    capArray[3] = "You want nothing to do with this. I don't blame you."
    capArray[4] = "Wow, you are quite possible too cool for school! You don't need no test to tell you how sick and epic you are. That or you're just all over the place."

function hideSurvey() {
    document.getElementById('survey').style.display = "none";
}

function hideResults() {
    document.getElementById("results").style.display = "none";
    document.getElementById("footer").style.display = "none";
}

function showSurvey() {
    document.getElementById('survey').style.display = "block";
}

function showResults() {
    document.getElementById('results').style.display = "block";
    document.getElementById("footer").style.display = "block";
}

function disableSubmit() {
    if (surveybutton.disabled == false) {
        document.getElementById('surveybutton').disabled = true;
    } else {
        document.getElementById('surveybutton').disabled = false;
    }
}

//function that skips form validation for user info if anonymous option is checked
function skipCheck() {
    disableInput();
    clearSpans();

    if (surveybutton.disabled == true) {
        retakeQuiz();
    }
}

//stops input for user info form. If...else allows user to check and uncheck anon option. If they do so, the survey shows or hides based on if the boxes are locked.
function disableInput () {
    if (fname.disabled == false || lname.disabled == false || email.disabled == false || phone.disabled == false || address.disabled == false) {
        document.getElementById("fname").disabled = true;
        document.getElementById("lname").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("phone").disabled = true;
        document.getElementById("address").disabled = true;
        document.getElementById("validbutton").disabled = true;

        showSurvey();
    } else {
        document.getElementById("fname").disabled = false;
        document.getElementById("lname").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("phone").disabled = false;
        document.getElementById("address").disabled = false;
        document.getElementById("validbutton").disabled = false;

        hideSurvey();
        hideResults();
    }  
}

//clears spans next to user info inputs
function clearSpans() {
    var q1 = document.getElementById("q1");
    var span1 = q1.getElementsByTagName("span");
    var q2 = document.getElementById("q2");
    var span2 = q2.getElementsByTagName("span");
    var q3 = document.getElementById("q3");
    var span3 = q3.getElementsByTagName("span");
    var q4 = document.getElementById("q4");
    var span4 = q4.getElementsByTagName("span");
    var q5 = document.getElementById("q5");
    var span5 = q5.getElementsByTagName("span");

    while (newImage1.hasChildNodes()) {
        newImage1.removeChild(newImage1.lastChild);
    }

    while (newImage2.hasChildNodes()) {
        newImage2.removeChild(newImage2.lastChild);
    }

    while (newImage3.hasChildNodes()) {
        newImage3.removeChild(newImage3.lastChild);
    }

    while (newImage4.hasChildNodes()) {
        newImage4.removeChild(newImage4.lastChild);
    }

    while (newImage5.hasChildNodes()) {
        newImage5.removeChild(newImage5.lastChild);
    }

    span1[0].firstChild.nodeValue = "";
    span2[0].firstChild.nodeValue = "";
    span3[0].firstChild.nodeValue = "";
    span4[0].firstChild.nodeValue = "";
    span5[0].firstChild.nodeValue = "";
}

//clears all result values, hides results section, and reenables survey submit button
function retakeQuiz() {
    while (picresult.hasChildNodes()) {
        picresult.removeChild(picresult.lastChild);
    }

    while (capresult.hasChildNodes()) {
        capresult.removeChild(capresult.lastChild);
    }

    while (grieftally > 0 || angertally > 0 || pridetally > 0 || disgusttally > 0) {
        grieftally = 0;
        angertally = 0;
        pridetally = 0;
        disgusttally = 0;
    }

    console.log(grieftally);
    console.log(angertally);
    console.log(pridetally);
    console.log(disgusttally);

    clearSpans();
    disableInput();
    disableSubmit();
    hideSurvey();
    hideResults();
    formClear();
}

//function for when clicked onto first name input
function fnamefocus() {
    var q1 = document.getElementById("q1");
    var span1 = q1.getElementsByTagName("span");

    document.validform.validfname.value = "";

    while (newImage1.hasChildNodes()) {
        newImage1.removeChild(newImage1.lastChild);
    }

    if (span1[0].firstChild == null) {
        span1[0].appendChild(document.createTextNode("Enter your first name. No numbers please!"));
    } else {
        span1[0].firstChild.nodeValue = "Enter your first name. No numbers please!";
    }
}

//removes focus text
function fnameblur() {
    var q1 = document.getElementById("q1");
    var span1 = q1.getElementsByTagName("span");

    while (newImage1.hasChildNodes()) {
        newImage1.removeChild(newImage1.lastChild);
    }

    span1[0].firstChild.nodeValue = "";
}

//validate first name input
function fnamevalid() {
    //grabs the  div containing all content changed by this function
    var q1 = document.getElementById("q1");

    //specifies span, as it's where the messages will be displayed.
    var span1 = q1.getElementsByTagName("span");

    //assigns input from form to variables
    var fname = document.validform.validfname.value;

    //assigns section newImage1 to corresponding variable
    var newImage1 = document.getElementById("newImage1");

    //validimage creates img element
    var validImage = document.createElement("img");
    
    //variable to help place new image next to onblur text
    var newImageSrc;

    while (newImage1.hasChildNodes()) {
        newImage1.removeChild(newImage1.lastChild);
    }

    //if the input for text field matches nameVerif settings, it will display the success method
    if (fname.match(nameVerif) && fname.length > 0) {
        //if nothing is within the node value, a text node displaying "Success!" will be displayed. Else, it'll continue showing Success and remain unchanged.
        if (span1[0].firstChild == null) {
        //creates a text node saying "success!" within the span tag
        span1[0].appendChild(document.createTextNode("Looks good!"));

        //calls replaceImage, which uses global variables newImageSrc and validimage to replace xs and checks next to status messages
        newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");

        //apends above image to newImage
        newImage1.appendChild(validImage);

        //sets this variable to true to be returned later
        } else {
            span1[0].firstChild.nodeValue = "Looks good!";

            newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage1.appendChild(validImage);
        } 

        q1_valid = true;
    //Below is the else if the value.length is less than zero, so it displays Error! instead          
    } else {
        //Same as above. Just refer to that code.
        if (span1[0].firstChild == null) {
            span1[0].appendChild(document.createTextNode("Error! Please enter a valid first name."));

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage1.appendChild(validImage);
        } else {
            span1[0].firstChild.nodeValue = "Error! Please enter a valid first name.";

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage1.appendChild(validImage);
        }

        q1_valid = false;
    }

    console.log(q1_valid);
}

//validate last name input
function lnamefocus() {
    var q2 = document.getElementById("q2");
    var span2 = q2.getElementsByTagName("span");

    document.validform.validlname.value = "";

    while (newImage2.hasChildNodes()) {
        newImage2.removeChild(newImage2.lastChild);
    }

    if (span2[0].firstChild == null) {
        span2[0].appendChild(document.createTextNode("Enter your last name. No numbers please!"));
    } else {
        span2[0].firstChild.nodeValue = "Enter your last name. No numbers please!";
    }
}

//removes focus text
function lnameblur() {
    var q2 = document.getElementById("q2");
    var span2 = q2.getElementsByTagName("span");

    while (newImage2.hasChildNodes()) {
        newImage2.removeChild(newImage2.lastChild);
    }

    span2[0].firstChild.nodeValue = "";
}

//validate last name input
function lnamevalid() {
    var q2 = document.getElementById("q2");
    var span2 = q2.getElementsByTagName("span");
    var lname = document.validform.validlname.value;
    var newImage2 = document.getElementById("newImage2");
    var validImage = document.createElement("img");
    var newImageSrc;

    while (newImage2.hasChildNodes()) {
        newImage2.removeChild(newImage2.lastChild);
    }

    if (lname.match(nameVerif) && lname.length > 0) {
        if (span2[0].firstChild == null) {
        span2[0].appendChild(document.createTextNode("Looks good!"));

        newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");

        newImage2.appendChild(validImage);
        } else {
            span2[0].firstChild.nodeValue = "Looks good!";

            newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage2.appendChild(validImage);
        } 

        q2_valid = true;
    } else {
        if (span2[0].firstChild == null) {
            span2[0].appendChild(document.createTextNode("Error! Please enter a valid last name."));

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage2.appendChild(validImage);
        } else {
            span2[0].firstChild.nodeValue = "Error! Please enter a valid last name.";

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage2.appendChild(validImage);
        }

        q2_valid = false;
    }

    console.log(q2_valid);
}

//clicked onto email input
function emailfocus() {
    var q3 = document.getElementById("q3");
    var span3 = q3.getElementsByTagName("span");

    document.validform.validemail.value = "";

    while (newImage3.hasChildNodes()) {
        newImage3.removeChild(newImage3.lastChild);
    }

    if (span3[0].firstChild == null) {
        span3[0].appendChild(document.createTextNode("Enter your email. Ex: someone@gotmail.com."));
    } else {
        span3[0].firstChild.nodeValue = "Enter your email. Ex: someone@gotmail.com.";
    }
}

//removes focus text
function emailblur() {
    var q3 = document.getElementById("q3");
    var span3 = q3.getElementsByTagName("span");

    while (newImage3.hasChildNodes()) {
        newImage3.removeChild(newImage3.lastChild);
    }

    span3[0].firstChild.nodeValue = "";
}

//validate email input
function emailvalid() {
    var q3 = document.getElementById("q3");
    var span3 = q3.getElementsByTagName("span");
    var email = document.validform.validemail.value;
    var newImage3 = document.getElementById("newImage3");
    var validImage = document.createElement("img");
    var newImageSrc;

    while (newImage3.hasChildNodes()) {
        newImage3.removeChild(newImage3.lastChild);
    }

    if (email.match(emailVerif) && email.length > 0) {
        if (span3[0].firstChild == null) {
        span3[0].appendChild(document.createTextNode("Looks good!"));

        newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");

        newImage3.appendChild(validImage);
        } else {
            span3[0].firstChild.nodeValue = "Looks good!";

            newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage3.appendChild(validImage);
        } 

        q3_valid = true;
    } else {
        if (span3[0].firstChild == null) {
            span3[0].appendChild(document.createTextNode("Error! Please enter a valid e-mail."));

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage3.appendChild(validImage);
        } else {
            span3[0].firstChild.nodeValue = "Error! Please enter a valid e-mail.";

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage3.appendChild(validImage);
        }

        q3_valid = false;
    }

    console.log(q3_valid);
}

//clicked onto phone input
function phonefocus() {
    var q4 = document.getElementById("q4");
    var span4 = q4.getElementsByTagName("span");

    document.validform.validphone.value = "";

    while (newImage4.hasChildNodes()) {
        newImage4.removeChild(newImage4.lastChild);
    }

    if (span4[0].firstChild == null) {
        span4[0].appendChild(document.createTextNode("Enter your phone number. Ex: 555-555-5555."));
    } else {
        span4[0].firstChild.nodeValue = "Enter your phone number. Ex: 555-555-5555.";
    }
}

//removes focus text
function phoneblur() {
    var q4 = document.getElementById("q4");
    var span4 = q4.getElementsByTagName("span");

    while (newImage4.hasChildNodes()) {
        newImage4.removeChild(newImage4.lastChild);
    }

    span4[0].firstChild.nodeValue = "";
}

//validate phone input
function phonevalid() {
    var q4 = document.getElementById("q4");
    var span4 = q4.getElementsByTagName("span");
    var phone = document.validform.validphone.value;
    var newImage4 = document.getElementById("newImage4");
    var validImage = document.createElement("img");
    var newImageSrc;

    while (newImage4.hasChildNodes()) {
        newImage4.removeChild(newImage4.lastChild);
    }

    if (phone.match(phoneVerif) && phone.length > 0) {
        if (span4[0].firstChild == null) {
        span4[0].appendChild(document.createTextNode("Looks good!"));

        newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");

        newImage4.appendChild(validImage);
        } else {
            span4[0].firstChild.nodeValue = "Looks good!";

            newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage4.appendChild(validImage);
        } 

        q4_valid = true;
    } else {
        if (span4[0].firstChild == null) {
            span4[0].appendChild(document.createTextNode("Error! Please enter a valid phone number."));

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage4.appendChild(validImage);
        } else {
            span4[0].firstChild.nodeValue = "Error! Please enter a valid phone number.";

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage4.appendChild(validImage);
        }

        q4_valid = false;
    }

    console.log(q4_valid);
}

//clicked onto address input
function addressfocus() {
    var q5 = document.getElementById("q5");
    var span5 = q5.getElementsByTagName("span");

    document.validform.validaddress.value = "";

    while (newImage5.hasChildNodes()) {
        newImage5.removeChild(newImage5.lastChild);
    }

    if (span5[0].firstChild == null) {
        span5[0].appendChild(document.createTextNode("Enter your student e-mail. Ex: student@edu.com"));
    } else {
        span5[0].firstChild.nodeValue = "Enter your student e-mail. Ex: student@edu.com";
    }
}

//removes focus text
function addressblur() {
    var q5 = document.getElementById("q5");
    var span5 = q5.getElementsByTagName("span");

    while (newImage5.hasChildNodes()) {
        newImage5.removeChild(newImage5.lastChild);
    }

    span5[0].firstChild.nodeValue = "";
}

//validate address input
function addressvalid() {
    var q5 = document.getElementById("q5");
    var span5 = q5.getElementsByTagName("span");  
    var address = document.validform.validaddress.value;
    var newImage5 = document.getElementById("newImage5");
    var validImage = document.createElement("img");
    var newImageSrc;

    while (newImage5.hasChildNodes()) {
        newImage5.removeChild(newImage5.lastChild);
    }

    if (address.match(addressVerif) && address.length > 0) {
        if (span5[0].firstChild == null) {
        span5[0].appendChild(document.createTextNode("Looks good!"));

        newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
        newImage5.appendChild(validImage);
        } else {
            span5[0].firstChild.nodeValue = "Looks good!";

            newImageSrc = image[0].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage5.appendChild(validImage);
        } 

        q5_valid = true;
    } else {
        if (span5[0].firstChild == null) {
            span5[0].appendChild(document.createTextNode("Error! Please enter a valid student address."));

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage5.appendChild(validImage);
        } else {
            span5[0].firstChild.nodeValue = "Error! Please enter a valid student address.";

            newImageSrc = image[1].src;
            validImage.setAttribute("src", newImageSrc);
            validImage.setAttribute("height", "10px");
            validImage.setAttribute("width", "10px");
            newImage5.appendChild(validImage);
        }

        q5_valid = false;
    }

    console.log(q5_valid);
}

function validateData() {
    console.log("validateData is working.");

    //validation functions
    fnamevalid();
    lnamevalid();
    emailvalid();
    phonevalid();
    addressvalid();
    
    if (q1_valid == true && q2_valid == true && q3_valid == true && q4_valid == true && q5_valid == true) {
        console.log("Everything validated.");

        disableInput();

        showSurvey();

        userInfoInput();
    } else {
        console.log("Something/nothing validated.");
    }
} 

function surveySubmit() {
    console.log("Survey is submitted.");

    //gets all radio buttons with the same name to combine their checked values
    var q1radios = document.getElementsByName("q1name");
    var q1answer;

    var q2radios = document.getElementsByName("q2name");
    var q2answer;

    var q3radios = document.getElementsByName("q3name");
    var q3answer;

    //first answer
    //checks each radio to see if it was checked. If it was, its value is assigned to the answer variable.
    for (x = 0; x < q1radios.length; x++) {
        if (q1radios[x].checked) {
            q1answer = q1radios[x].value;
        }
    }

    console.log(q1answer);

    //Checks the value of the answer variable and tallies that value's corresponding variable up by one.
    switch(q1answer) {
        case "grief":
            grieftally++;
            break;
        case "anger":
            angertally++;
            break;
        case "pride":
            pridetally++;
            break;
        case "disgust":
            disgusttally++;
            break;
        default: 
            break;
    }

    //second answer
    for (x = 0; x < q2radios.length; x++) {
        if (q2radios[x].checked) {
            q2answer = q2radios[x].value;
        }
    }

    console.log(q2answer);

    switch(q2answer) {
        case "grief":
            grieftally++;
            break;
        case "anger":
            angertally++;
            break;
        case "pride":
            pridetally++;
            break;
        case "disgust":
            disgusttally++;
            break;
        default: 
            break;
    }

    //third answer
    for (x = 0; x < q3radios.length; x++) {
        if (q3radios[x].checked) {
            q3answer = q3radios[x].value;
        }
    }

    console.log(q3answer);

    switch(q3answer) {
        case "grief":
            grieftally++;
            break;
        case "anger":
            angertally++;
            break;
        case "pride":
            pridetally++;
            break;
        case "disgust":
            disgusttally++;
            break;
        default: 
            break;
    }

    //displays resulting tally
    console.log(grieftally);
    console.log(angertally);
    console.log(pridetally);
    console.log(disgusttally);

    resultTally();
}

function resultTally() {
    var resultImage = document.createElement("img");
    var resultText = document.createElement("p");
    
    var resultSrc;
    var resultAlt;
    var resultCap;
    
    if (grieftally >= 2) {
        resultSrc = resultimage[0].src;
        resultAlt = "Anime girl cries.";
        resultCap = document.createTextNode(capArray[0]);
    } else if (angertally >= 2) {
        resultSrc = resultimage[1].src;
        resultAlt = "Pepe punches.";
        resultCap = document.createTextNode(capArray[1]);
    } else if (pridetally >= 2) {
        resultSrc = resultimage[2].src;
        resultAlt = "Mini Drake."
        resultCap = document.createTextNode(capArray[2]);
    } else if (disgusttally >= 2) {
        resultSrc = resultimage[3].src;
        resultAlt = "Close up on Tom looking upset.";
        resultCap = document.createTextNode(capArray[3]);
    } else {
        resultSrc = resultimage[4].src;
        resultAlt = "Marge and Spongebob fight.";
        resultCap = document.createTextNode(capArray[4]);
    }

    resultImage.setAttribute("src", resultSrc);
    resultImage.setAttribute("alt", resultAlt);

    resultText.appendChild(resultCap);

    picresult.appendChild(resultImage);
    capresult.appendChild(resultText);

    showResults();

    disableSubmit();
}

function userInfoInput() {
    var fname = document.validform.validfname.value;
    var lname = document.validform.validlname.value;
    var email = document.validform.validemail.value;
    var phone = document.validform.validphone.value;
    var address = document.validform.validaddress.value;

    var userInfoDisplay = document.createElement("p");
    var userInput = document.createTextNode("Thank you "+fname+" "+lname+" | "+email+" | "+phone+" | "+address+" | Have a good one!");

    while (userInfo.hasChildNodes()) {
        userInfo.removeChild(userInfo.lastChild);
    }
    
    userInfoDisplay.appendChild(userInput);
    userInfo.appendChild(userInfoDisplay);
}

/*
var nameVerif = /^[a-zA-Z]* ?[a-zA-z'-]*$/;

var emailVerif = /(\w|.)+\.?\w+?@\w+\.(edu|com)/;

Ways to slim down this code:
var phoneVerif = /^\([0-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/;

or 

var phoneVerif = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;

or

var phoneVerif = /^\(\d{3}\) \d{3}-\d{4}$/;

//Example:
if (validphone.match(phoneVerif)) {
    return true;
} else {
    //don't use alerts
    alert("Phone number no worky");
    return false;
}
*/