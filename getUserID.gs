//All function calls require a valid Litmos API Key to be declared from the calling script.
//const litmosToken = 'Your API Key';

/**
 * Search for a user and return their Litmos User ID.
 * @param {string} Term to search with.
 * @return {string} Litmos User ID.
 * @return {undefined} If no user found.
 */
function getUserId(searchTerm, litmosToken) {

  var headers = {
  'content-type': 'text/xml'
    };
  
  var url = 'https://api.litmos.com/v1.svc/users?apikey='+litmosToken+'&source=CallToLitmos&search=' + searchTerm;
  var params = {
    'method': 'GET',
    'muteHttpExceptions': true,
    'headers': headers
  };

try {
 var userId;
 var response = UrlFetchApp.fetch(url, params).getContentText();
 var doc = XmlService.parse(response);
 var root = doc.getRootElement();
 var user = doc.getRootElement().getChild("User");
  if(user != null){
    userId = user.getChild("Id").getValue();
    Logger.log('User ID is: ' + userId);
    return userId;
  }
  else{
    Logger.log('User ID is undefined');
    return userId;
  }
    } catch(e) {
      Logger.log("JSON: "+ JSON.stringify(e,null,4));
      Logger.log("Error with call to Litmos API: " + e.message); }
};
