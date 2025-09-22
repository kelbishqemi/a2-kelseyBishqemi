// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  
 /* const input = document.querySelector( "#idea" ),
        json = { "idea": input.value },
        body = JSON.stringify( json ) */

  const idea = document.getElementById("idea").value;
  const reason = document.getElementById("reason").value;
  const desire = document.getElementById("desire").value;

  const newSubmission = {idea, reason, desire};

  async function loadUp() {

  const response = await fetch( "/submit", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSubmission)
  });

  const fin = await response.json();
  // const safe = fin.safe;
  const _id = fin.insertedId;

  const tr = document.createElement("tr");

  const tdIdea = document.createElement("td");
  tdIdea.innerText = idea;
  tr.appendChild(tdIdea);

  const tdReason = document.createElement("td");
  tdReason.innerText = reason;
  tr.appendChild(tdReason);

  const tdDesire = document.createElement("td");
  tdDesire.innerText = desire;
  tr.appendChild(tdDesire);

  const tdPriority = document.createElement("td");
  tdPriority.innerText = makePriority(reason, desire);
  tr.appendChild(tdPriority);

  const tdButtons = document.createElement("td");

  const delButton = document.createElement("button");
  delButton.innerText = "remove";
  delButton.onclick = function() {
    fetch ("/delete", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({_id})
    }).then(function () {
      tr.remove();
    });
  };

  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.onclick = function() {
    const newIdea = prompt("new idea:", idea);

    /* const updatedData = {
      safe: safe,
      idea: newIdea
    }; */

    const responseUpdate = fetch ("/update", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id_: _id, idea: newIdea})
    }).then(function (responseUpdate) {
      return responseUpdate.json();
    }).then(function (updated) {
      tdIdea.innerText = updated.idea;
    });

  };

  tdButtons.appendChild(editButton);
  tdButtons.appendChild(delButton);
  tr.appendChild(tdButtons);
  

  const table = document.querySelector(".sectionFour table");
  table.appendChild(tr);

  }


  document.getElementById("idea").value = "";
  //console.log( "text:", text )
  
}

function makePriority(reason, desire) {
  if (reason === "class") {

    return "high"

  } else if (reason === "portfolio") {

    if (desire === "large") {
      return "high"
    } else {
      return "meduim"
    }

  } else {

    if (desire === "large") {
      return "medium"
    } else {
      return "low"
    }

  }
}


window.onload = function() {
  loadUp();
  const button = document.querySelector("#submit");
  button.onclick = submit;
}