//All function calls require a valid Litmos API Key to be declared from the calling script.
//const litmosToken = 'Your API Key';

/**
 * Create a user and return their new Litmos User ID.
 * @param {string} Minimum fields you can use to create a user are Username, First Name, Last Name, Full Name, and email address.
 * @return nothing on error.
 * @return {function} Relies on the function getUserId to return the newly created ID.
 */
function createUser(userName, firstName, lastName, fullName, email, litmosToken) {
  Logger.log("Init function.");

var userInfo = 
    '<User>' +
     '<Id></Id>' +
     '<UserName>' + userName + '</UserName>' +
     '<FirstName>' + firstName + '</FirstName>' +
     '<LastName>' + lastName + '</LastName>' +
     '<FullName>' + fullName + '</FullName>' +
     '<Email>' + email + '</Email>' +
     '<AccessLevel>Learner</AccessLevel>'+
     '<DisableMessages>false</DisableMessages>' +
     '<Active>true</Active>' +
     '<LastLogin></LastLogin>' +
     '<LoginKey></LoginKey>' +
     '<IsCustomUsername>false</IsCustomUsername>' +
     '<SkipFirstLogin>true</SkipFirstLogin>' +
     '<TimeZone></TimeZone>' +
     '</User>';
  
var headers = {
    'content-type': 'text/xml'
  
    };
  
  var url = 'https://api.litmos.com/v1.svc/users?apikey='+litmosToken+'&source=CallToLitmos';
  var params = {
    'method': 'POST',
    'muteHttpExceptions': true,
    'headers': headers,
    'payload': userInfo
  };
  
    try {
      var response = UrlFetchApp.fetch(url, params).getContentText();
      if(response != ''){ //log the response if there is one
        var doc = XmlService.parse(response);
        Logger.log('Litmos Response: ' + doc);
        return;
      }
      else{
        Logger.log('Everything Looks Good!');
      }
      return getUserId(email);
    }
     catch(e) {
      Logger.log('JSON: '+ JSON.stringify(e,null,4));
      Logger.log('Error with call to Litmos API: ' + e.message);
     }
  
}
