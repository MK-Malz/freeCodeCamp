function palindrome(str) {
//remove all non-alphanumeric characters (punctuation, spaces and symbols)
//turn everything into the same case (lower or upper case) 
var strClean = str.replace(/[^a-z0-9]/gi,'').toLowerCase();

//create reversed array
var palindromChecker = [];
var j = 0;
for(let i = strClean.length-1; i >= 0; i--)
{
  palindromChecker[j] = strClean[i];
  j++;
}
//check palindrom
var palindrom = true;
for(let k = 0; k < strClean.length; k++)
{
  if(strClean[k] !== palindromChecker[k])
  {
      palindrom = false;
  }
}
  return palindrom;
}


palindrome("eye");
