function convertToRoman(num) {
if(num == 0)
{
  return "There's no zero in roman numerals";
}

 var romanNumeral = "";
 while (num > 999 )
    {
        romanNumeral += "M";// M = 1000
        num -=  1000 ;
    };
    while (num > 899 )
    {
        romanNumeral += "CM";// CM = 900
        num -=  900 ;
    };
    while (num > 499)
    {
        romanNumeral += "D";// D = 500
        num -=  500;
    };
    while (num > 399)
    {
        romanNumeral += "CD";// CD = 400
        num -=  400;
    };
    while (num > 99)
    {
        romanNumeral += "C";// C = 100
        num -=  100;
    };
    while (num > 89)
    {
        romanNumeral += "XC";// XC = 90
        num -=  90;
    };
    while (num > 49)
    {
        romanNumeral += "L";// L = 50
        num -=  50;
    };
    while (num > 39)
    {
        romanNumeral += "XL";// XL = 40
        num -=  40;
    };
    while (num > 9)
    {
        romanNumeral += "X";// X = 10
        num -=  10;
    };
    while (num > 8)
    {
        romanNumeral += "IX";// IX = 9
        num -=  9;
    };
    while (num > 4)
    {
        romanNumeral += "V";// V = 5
        num -=  5;
    };
    while (num > 3)
    {
        romanNumeral += "IV";// IV = 4
        num -=  4;
    };
    while (num > 0)
    {
        romanNumeral += "I";// I = 1
        num -=  1;
    };

 return romanNumeral;
}

convertToRoman(36);
