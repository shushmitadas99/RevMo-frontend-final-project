console.log("in pending-transactions.js")
let userId = sessionStorage.getItem('userId')
console.log("user Id: ", userId)
// console.log(userId)


window.addEventListener('load', async (e) => {
  let res = await fetch(`http://${url}:8080/user`, { //--------------------!!!------------
    'credentials': 'include',
    'method': 'GET',
    'headers': {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
  let data = await res.json();
  console.log("data");
  console.log(data);
  console.log(data.accounts)
  addTableForAccount(data.accounts);

})


let column = document.getElementById('tables-column');


async function addTableForAccount(accounts) {
  console.log(isIterable(accounts));
  if (isIterable(accounts)) {
    for (account of accounts) {
      console.log(account.accountId)

      let trxs = await fetch(`http://${url}:8080/trx/status/outgoing/PENDING/${account.accountId}`, {
        'credentials': 'include',
        'method': 'GET',
        'headers': {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      let trxData = await trxs.json();
      // console.log("trxData")
      console.log(trxData)

      if (Object.keys(trxData).length > 0) {

        let header = document.createElement('h2');
        header.classList.add('is-size-4');
        header.innerHTML = `Account ${account.accountId} <span class="is-size-5">(${account.typeName}) Balance = ${numWCommas((account.balance / 100).toFixed(2))}</span>`;
        column.appendChild(header);
        let table = document.createElement('table');
        table.classList.add('table', 'is-fullwidth')
        table.innerHTML = "<thead><tr class=\"has-text-centered\"><th>Date</th> <th>Amount</th><th>Requested By</th><th>Status</th><th>Action</th></tr></thead>";
        let body = document.createElement('tbody');
        body.innerHTML = "";

        for (transx of trxData) {
          console.log(transx);

          let row = document.createElement('tr');
          let date = document.createElement('td');
          date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
          let amount = document.createElement('td');
          amount.innerHTML = (transx.amount / 100).toFixed(2);
          let requestor = document.createElement('td');
          requestor.innerHTML = transx.initiatedBy;
          let status = document.createElement('td');
          status.innerHTML = transx.typeName;

          let buttons = document.createElement('td');
          let approve = document.createElement('button');
          approve.classList.add('button', 'is-primary', "mr-1");
          approve.setAttribute("name", "approve");
          approve.setAttribute("id", `${transx.transactionId}`);
          approve.innerHTML = "Approve"
          approve.addEventListener('click', async (e) => {
            console.log(`Approve request #${e.target.id} clicked!`);
            console.log()
            // endpoint expects JSON { "statusId": "{2 for approved, 3 for denied}", "transactionId": "{trxId}"}

            await fetch(`http://${url}:8080/trx/req`, {
              'credentials': 'include',
              'method': 'PUT',
              'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify({
                "statusId": "2",
                "transactionId": `${e.target.id}`
              })
            })
            location.reload();
          });

          let deny = document.createElement('button');
          deny.classList.add('button', 'is-danger');
          deny.setAttribute("name", "deny");
          deny.setAttribute("id", `${transx.transactionId}`);
          deny.innerHTML = "Deny"
          deny.addEventListener('click', async (e) => {
            console.log(`Deny request #${e.target.id} clicked!`)
            await fetch(`http://${url}:8080/trx/req`, {
              'credentials': 'include',
              'method': 'PUT',
              'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify({
                "statusId": "3",
                "transactionId": `${e.target.id}`
              })
            })
            location.reload();
          });

          buttons.appendChild(approve);
          buttons.appendChild(deny);


          row.appendChild(date);
          row.appendChild(amount);
          row.appendChild(requestor);
          row.appendChild(status);
          row.appendChild(buttons);



          body.appendChild(row);

        }


        table.appendChild(body);
        column.appendChild(table);
      }



    }
  }


}



function addIncomeToTable(transactions) {
  console.log(isIterable(transactions))
  if (isIterable(transactions)) {
    for (transx of transactions) {
      console.log(transx);

      let row = document.createElement('tr');
      let date = document.createElement('td');
      date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
      let amount = document.createElement('td');
      amount.innerHTML = transx.amount;

      let descrip = document.createElement('td');
      descrip.innerHTML = transx.description;
      let status = document.createElement('td');
      status.innerHTML = transx.typeName;
      let account = document.createElement('td');
      account.innerHTML = transx.receivingId;

      row.appendChild(date);
      row.appendChild(amount);
      row.appendChild(descrip);
      row.appendChild(status);
      row.appendChild(account);


      body.appendChild(row);

    }
  }

}
