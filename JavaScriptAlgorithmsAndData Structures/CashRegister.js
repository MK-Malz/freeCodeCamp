function fundsSufficient(change, cid)
{
  var availableChange = 0;
  for(var i = 0; i < cid.length; i++)
  {
      availableChange += cid[i][1];
  }
  return availableChange >= change ? true : false;
}

function calculateChange(change, cid)
{
  var returnChange = [];
  while(change > 0)
  {
    if(change >= 100 && cid[8][1] != 0)
    {
      cid[8][1] -= 100;
      returnChange.push(["ONE HUNDRED", 100]);
      change -= 100;
    }
    else if(change >= 20 && cid[7][1] != 0)
    {
      cid[8][1] -= 20;
      returnChange.push(["TWENTY", 20]);
      change -= 20;
    }
    else if(change >= 10 && cid[6][1] != 0)
    {
      cid[8][1] -= 10;
      returnChange.push(["TEN", 00]);
      change -= 10;
    }
    else if(change >= 5 && cid[5][1] != 0)
    {
      cid[8][1] -= 5;
      returnChange.push(["FIVE", 5]);
      change -= 5;
    }
    else if(change >= 1 && cid[4][1] != 0)
    {
      cid[8][1] -= 1;
      returnChange.push(["ONE", 1]);
      change -= 1;
    }
    else if(change >= 0.25 && cid[3][1] != 0)
    {
      cid[8][1] -= 0.25;
      returnChange.push(["Quarter", 0.25]);
      change -= 0.25;
    }
    else if(change >= 0.1 && cid[2][1] != 0)
    {
      cid[8][1] -= 0.1;
      returnChange.push(["DIME", 0.1]);
      change -= 0.1;
    }
    else if(change >= 0.05 && cid[1][1] != 0)
    {
      cid[8][1] -= 0.05;
      returnChange.push(["NICKEL", 0.05]);
      change -= 0.05;
    }
    if(change >= 0.05 && cid[1][1] != 0)
    {
      cid[8][1] -= 0.01;
      returnChange.push(["PENNY", 0.01]);
      change -= 0.01;
    }
    return returnChange;
     
}











function checkCashRegister(price, cash, cid) 
{
  var change = cash-price;

  if(fundsSufficient(change, cid))
    return {status: "INSUFFICIENT_FUNDS", change: []}

  var calculatedChange = calculateChange(change, cid);
  


    
     
  } 

  return returnChange;
}

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

checkCashRegister(100, 500, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 1400]])

