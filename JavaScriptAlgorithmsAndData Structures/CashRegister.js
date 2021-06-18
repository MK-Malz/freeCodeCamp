function aggregateCash(cid)
{
  var availableChange = 0;
  for(var i = 0; i < cid.length; i++)
  {
      availableChange += cid[i][1];
  }
  return availableChange;
}


function fundsSufficient(change, cid)
{
  
  return aggregateCash(cid) >= change ? true : false;
}

function calculateChange(change, cid, statusMessage)
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
    change = Math.round(change * 100) / 100;    
  }

  var formatedChange = [];
  if(statusMessage == "OPEN")
  {
    for(var j = returnChange.length-1; j >= 0; j--)
    {
        if(returnChange[j][1] != 0)
        {
          returnChange[j].pop();
          formatedChange.push(returnChange[j]);
        }
    }
  }
  else
  {
    for(var j = 0; j <= returnChange.length-1; j++)
    {
        returnChange[j].pop();
        formatedChange.push(returnChange[j]);
        formatedChange[j][1] = Math.round(formatedChange[j][1] * 100) / 100 ;
    }
  }
  
  return formatedChange;    
}

function checkCashRegister(price, cash, cid) 
{
  var change = cash-price;
  var statusMessage = change == aggregateCash(cid) ? "CLOSED" : "OPEN";

  if(!fundsSufficient(change, cid))
    return {status: "INSUFFICIENT_FUNDS", change: []}

  var calculatedChange = calculateChange(change, cid, statusMessage);
  console.log({status: statusMessage, change: calculatedChange})
  return {status: statusMessage, change: calculatedChange};
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
