function rot13(str) {
  var decodeString = ''
  for(var i = 0; i < str.length; i++)
  {
      if(str.charCodeAt(i) >= 78 && str.charCodeAt(i) <= 90)
      {
        var j = str.charCodeAt(i)-13;
        decodeString += String.fromCharCode(j);
      }  
      else if(str.charCodeAt(i) < 78 && str.charCodeAt(i) > 64)
      {
        var j = str.charCodeAt(i)+13;
        decodeString += String.fromCharCode(j);
      }
      else
      {
          decodeString += str[i];
      }       
  }
  return decodeString;
}

rot13("SERR PBQR PNZC");
