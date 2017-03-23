//All function calls require a valid Litmos API Key to be declared from the calling script.
//const litmosToken = 'Your API Key';

/**
 * Activate a disabled or update a user and return their new Litmos User ID.
 * @param {string} User Id, Username, First Name, Last Name, Full Name, email address, and Litmos API Token.
 * @return Nothing. Only logs errors.
 */

function activateUser(userId, userName, firstName, lastName, fullName, email, litmosToken){
   Logger.log('Init function: Activate User');
    var requestBody = 
     '<User>' +
     '<Id>' + userId + '</Id>' +
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
  
    var url = 'https://api.litmos.com/v1.svc/users/'+userId+'?apikey='+litmosToken+'&source=CallToLitmos';
    
    var params = {
    'method': 'PUT',
    'muteHttpExceptions': true,
    'headers': headers,
    'payload': requestBody
    };
  
    try {
      var response = UrlFetchApp.fetch(url, params).getContentText();
      if(response != ''){
        var doc = XmlService.parse(response);
        Logger.log('Litmos Response: ' + doc);
      }
      else{
        Logger.log('Everything Looks Good!');
      }
    }
     catch(e) {
      Logger.log('JSON: '+ JSON.stringify(e,null,4));
      Logger.log('Error with call to Litmos API: ' + e.message);
     }
}
