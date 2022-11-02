const XMLHttpRequest = require('xhr2');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

//Use 44:38:39:ff:ef:57 as an example
readline.question('Please type your mac address ', address => {
    let result = {};
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.macaddress.io/v1?apiKey=at_F6xaj6ZfUpWxOrvLvxEn7b2kPK3wz&output=json&search=' + address);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); //404: Not Found
        } else { // Show the result
            result = JSON.parse(xhr.response);
            console.log("Company name: " + result.vendorDetails.companyName);
            console.log("Company address: " + result.vendorDetails.companyAddress);
            console.log("Country code: " + result.vendorDetails.countryCode);
        }
    };

    xhr.onerror = function() {
        console.log("Bad request");
    };

    readline.close();
});