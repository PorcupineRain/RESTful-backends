function generateCards() {
  for (let i = 0; i < 8; i++) {
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

      img.src = picture;
      h2.innerText = firstname + " " + lastname;
      jobP.innerText = title;
      mutualP.innerText = connections + " mutual connections";
      newButton.innerText = "Connect";

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
    getContactInfo();
  }
}
generateCards();

// let pendingInvitations = document.querySelector(".pending-invitations");
// let pendingAmount = 0;

// function showPendingInvitations() {
//   if (pendingAmount === 1) {
//     pendingInvitations.innerText = pendingAmount + " Pending Invitation";
//   } else if (pendingAmount === 0) {
//     pendingInvitations.innerText = "No Pending Invitations";
//   } else {
//     pendingInvitations.innerText = pendingAmount + " Pending Invitations";
//   }
// }

// let removeBtns = document.querySelectorAll(".btn-close");
// let connectBtns = document.querySelectorAll(".btn-connect");
// let contentCards = document.querySelectorAll("li");
// let collection = document.querySelector("ul");

// let pendingCollection = [
//   "Connect",
//   "Connect",
//   "Connect",
//   "Connect",
//   "Connect",
//   "Connect",
//   "Connect",
//   "Connect",
// ];

// let json = localStorage.getItem("invitationState");
// if (json !== null) {
//   pendingAmount = JSON.parse(json);
// }

// json = localStorage.getItem("buttonStatus");
// if (json !== null) {
//   pendingCollection = JSON.parse(json);
// }

// showPendingInvitations();
// setButtons();

// function saveState() {
//   json = JSON.stringify(pendingAmount);
//   localStorage.setItem("invitationState", json);
//   json = JSON.stringify(pendingCollection);
//   localStorage.setItem("buttonStatus", json);
// }

// function setButtons() {
//   for (let i = 0; i < pendingCollection.length; i++) {
//     connectBtns[i].innerText = pendingCollection[i];
//   }
// }

// for (let i = 0; i < connectBtns.length; i++) {
//   connectBtns[i].addEventListener("click", function () {
//     if (connectBtns[i].innerText === "Connect") {
//       connectBtns[i].innerText = "Pending";
//       // pendingCollection[i] = "Pending";
//       pendingAmount++;
//       // saveState();
//       showPendingInvitations();
//     } else {
//       connectBtns[i].innerText = "Connect";
//       // pendingCollection[i] = "Connect";
//       pendingAmount--;
//       // saveState();
//       showPendingInvitations();
//     }
//   });
// }

// removeBtns.forEach(function (i) {
//   i.addEventListener("click", function () {
//     let replacedCard = i.parentNode.parentNode.parentNode;
//     replacedCard.remove();
//     console.log(replacedCard);

//     async function getContactInfo() {
//       const contactResponse = await fetch(
//         "https://dummy-apis.netlify.app/api/contact-suggestions?count=1"
//       );
//       const contactInfo = await contactResponse.json();
//       let firstname = contactInfo[0].name.first;
//       let lastname = contactInfo[0].name.last;
//       let title = contactInfo[0].title;
//       let picture = contactInfo[0].picture;
//       let connections = contactInfo[0].mutualConnections;
//       let background = contactInfo[0].backgoundImage;

//       replacedCard.firstElementChild.firstElementChild.lastElementChild.src =
//         picture;
//       replacedCard.lastElementChild.lastElementChild.firstElementChild.innerText =
//         firstname + " " + lastname;
//       replacedCard.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.innerText =
//         title;
//       if (connections === 1) {
//         replacedCard.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText =
//           connections + " mutual connection";
//       } else {
//         replacedCard.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText =
//           connections + " mutual connections";
//       }

//       collection.append(replacedCard);
//     }
//     getContactInfo();
//   });
// });
