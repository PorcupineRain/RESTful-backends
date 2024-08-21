let pendingInvitations = document.querySelector(".pending-invitations");

let state = {
  pendingAmount: 0,
  contacts: [],
  pendingStates: [],
};

loadState();

async function generateCards() {
  for (let i = 0; i < 8; i++) {
    let contact = await getContactInfo();
    generateCard(contact, "Connect");

    state.contacts.push(contact);
    state.pendingStates.push("Connect");
  }
  saveState();
}

function generateCard(contact, pendingState) {
  let cardLi = document.createElement("li");
  let article = document.createElement("article");
  let header = document.createElement("header");
  let closeBtn = document.createElement("button");
  let buttonIcon = document.createElement("i");
  let div = document.createElement("div");
  let img = document.createElement("img");
  let h2 = document.createElement("h2");
  let jobP = document.createElement("p");
  let mutualP = document.createElement("p");
  let newButton = document.createElement("button");

  newButton.contact = contact;
  closeBtn.connectButton = newButton;
  closeBtn.contact = contact;

  newButton.addEventListener("click", changeConnectionStatus);
  closeBtn.addEventListener("click", replaceCard);

  article.classList.add("contact-card");
  header.classList.add("background-image");
  closeBtn.classList.add("btn-close");
  buttonIcon.classList.add("fa-solid", "fa-circle-xmark");
  img.classList.add("contact-picture");
  div.classList.add("contact-info");
  h2.classList.add("contact-name");
  jobP.classList.add("contact-job");
  mutualP.classList.add("mutual-connections");
  newButton.classList.add("btn-connect");

  img.src = contact.picture;
  h2.innerText = contact.name.first + " " + contact.name.last;
  jobP.innerText = contact.title;

  let connectionText = "connections";
  if (contact.mutualConnections == 1) {
    connectionText = "connection";
  }
  mutualP.innerText = contact.mutualConnections + " mutual " + connectionText;

  newButton.innerText = pendingState;

  list.appendChild(cardLi);
  cardLi.appendChild(article);
  article.appendChild(header);
  article.appendChild(div);
  header.appendChild(closeBtn);
  closeBtn.appendChild(buttonIcon);
  header.appendChild(img);
  div.appendChild(h2);
  div.appendChild(jobP);
  div.appendChild(mutualP);
  div.appendChild(newButton);
}

async function getContactInfo() {
  const contactResponse = await fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=1"
  );
  const contactInfo = await contactResponse.json();
  return contactInfo[0];
}

function showPendingInvitations() {
  if (state.pendingAmount === 1) {
    pendingInvitations.innerText = state.pendingAmount + " Pending Invitation";
  } else if (state.pendingAmount === 0) {
    pendingInvitations.innerText = "No Pending Invitations";
  } else {
    pendingInvitations.innerText = state.pendingAmount + " Pending Invitations";
  }
}

function changeConnectionStatus() {
  if (this.innerText === "Connect") {
    this.innerText = "Pending";
    state.pendingAmount++;
  } else {
    this.innerText = "Connect";
    state.pendingAmount--;
  }

  let cardIndex = state.contacts.findIndex(function (item) {
    return item === this;
  }, this.contact);

  state.pendingStates[cardIndex] = this.innerText;
  showPendingInvitations();
  saveState();
}

async function replaceCard() {
  if (this.connectButton.innerText === "Pending") {
    state.pendingAmount--;
  }
  showPendingInvitations();

  let cardIndex = state.contacts.findIndex(function (item) {
    return item === this;
  }, this.contact);

  state.contacts.splice(cardIndex, 1);
  state.pendingStates.splice(cardIndex, 1);

  let listElement = this.parentNode.parentNode.parentNode;
  listElement.remove();
  let contact = await getContactInfo();
  generateCard(contact, "Connect");
  state.contacts.push(contact);
  state.pendingStates.push("Connect");

  saveState();
}

function saveState() {
  let json = JSON.stringify(state);
  localStorage.setItem("appState", json);
}

function loadState() {
  let json = localStorage.getItem("appState");
  if (json != null) {
    state = JSON.parse(json);
    state.pendingAmount = state.pendingAmount;
    for (let i = 0; i < state.contacts.length; i++) {
      generateCard(state.contacts[i], state.pendingStates[i]);
    }
  } else {
    generateCards();
  }
  showPendingInvitations();
}
