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
  var returnChange = [
  ["PENNY", 0.0, 0.01],
  ["NICKEL", 0.0, 0.05],
  ["DIME", 0.0, 0.1],
  ["QUARTER", 0.0, 0.25],
  ["ONE", 0.0, 1.0],
  ["FIVE", 0.0, 5.0],
  ["TEN", 0.0, 10.0],
  ["TWENTY", 0.0, 20.0],
  ["ONE HUNDRED", 0.0, 100.0]
];
  
  var i = returnChange.length-1;
  while(change > 0)
  {
    if(change >= returnChange[i][2] && cid[i][1] != 0)
    {
      cid[i][1] -=  returnChange[i][2]   ;
      returnChange[i][1] +=  returnChange[i][2]   ;
      change -=  returnChange[i][2]  ;
    }
    else
      i--
    change = Math.round(change * 100) / 100    
  }

  var formatedChange = [];
  for(var j = returnChange.length-1; j >= 0; j--)
  {
    if(returnChange[j][1] != 0)
    {
        returnChange[j].pop();
        formatedChange.push(returnChange[j]);
    }
  }
  return formatedChange;    
}

function checkCashRegister(price, cash, cid) 
{
  var change = cash-price;
  
  if(!fundsSufficient(change, cid))
    return {status: "INSUFFICIENT_FUNDS", change: []}

  var calculatedChange = calculateChange(change, cid);

  return {status: "OPEN", change: calculatedChange};
}

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

checkCashRegister(100, 335.37, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 1400]])

