const removeBtns = document.querySelectorAll(".btn-close");
const connectBtns = document.querySelectorAll(".btn-connect");
const pendingInvitations = document.querySelector(".pending-invitations");
const contentCards = document.querySelectorAll("li");
const collection = document.querySelector("ul");

let pendingAmount = 0;
let pendingCollection = [
  "Connect",
  "Connect",
  "Connect",
  "Connect",
  "Connect",
  "Connect",
  "Connect",
  "Connect",
];

let json = localStorage.getItem("invitationState");
if (json !== null) {
  pendingAmount = JSON.parse(json);
}

json = localStorage.getItem("buttonStatus");
if (json !== null) {
  pendingCollection = JSON.parse(json);
}

showPendingInvitations();
setButtons();

function saveState() {
  json = JSON.stringify(pendingAmount);
  localStorage.setItem("invitationState", json);
  json = JSON.stringify(pendingCollection);
  localStorage.setItem("buttonStatus", json);
}

function setButtons() {
  for (let i = 0; i < pendingCollection.length; i++) {
    connectBtns[i].innerText = pendingCollection[i];
  }
}

function showPendingInvitations() {
  if (pendingAmount === 1) {
    pendingInvitations.innerText = pendingAmount + " Pending Invitation";
  } else if (pendingAmount === 0) {
    pendingInvitations.innerText = "No Pending Invitations";
  } else {
    pendingInvitations.innerText = pendingAmount + " Pending Invitations";
  }
}

for (let i = 0; i < connectBtns.length; i++) {
  connectBtns[i].addEventListener("click", function () {
    if (connectBtns[i].innerText === "Connect") {
      connectBtns[i].innerText = "Pending";
      pendingCollection[i] = "Pending";
      pendingAmount++;
      saveState();
      showPendingInvitations();
    } else {
      connectBtns[i].innerText = "Connect";
      pendingCollection[i] = "Connect";
      pendingAmount--;
      saveState();
      showPendingInvitations();
    }
  });
}

removeBtns.forEach(function (i) {
  i.addEventListener("click", function () {
    let replacedCard = i.parentNode.parentNode.parentNode;
    replacedCard.remove();
    console.log(replacedCard);

    async function getContactInfo() {
      const contactResponse = await fetch(
        "https://dummy-apis.netlify.app/api/contact-suggestions?count=1"
      );
      const contactInfo = await contactResponse.json();
      let firstname = contactInfo[0].name.first;
      let lastname = contactInfo[0].name.last;
      let title = contactInfo[0].title;
      let picture = contactInfo[0].picture;
      let connections = contactInfo[0].mutualConnections;
      let background = contactInfo[0].backgoundImage;

      replacedCard.firstElementChild.firstElementChild.lastElementChild.src =
        picture;
      replacedCard.lastElementChild.lastElementChild.firstElementChild.innerText =
        firstname + " " + lastname;
      replacedCard.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.innerText =
        title;
      if (connections === 1) {
        replacedCard.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText =
          connections + " mutual connection";
      } else {
        replacedCard.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText =
          connections + " mutual connections";
      }

      collection.append(replacedCard);
    }
    getContactInfo();
  });
});
