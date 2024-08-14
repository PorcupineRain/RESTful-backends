const removeBtns = document.querySelectorAll(".btn-close");
const connectBtns = document.querySelectorAll(".btn-connect");
const pendingInvitations = document.querySelector(".pending-invitations");
const removeBtn1 = document.querySelector(".btn-close");
const contentCards = document.querySelectorAll("li");
const collection = document.querySelector("ul");
// const name = document.querySelector(".contact-name");
// const picture = document.querySelector(".contact-picture");
// const background = document.querySelector(".background-image");
// const job = document.querySelector(".contact-job");
// const connections = document.querySelector(".mutual-connections");

let pendingAmount = 0;

connectBtns.forEach(function (i) {
  i.addEventListener("click", function () {
    if (i.innerText === "Connect") {
      i.innerText = "Pending";
      pendingAmount++;

      if (pendingAmount === 1) {
        pendingInvitations.innerText = pendingAmount + " Pending Invitation";
      } else {
        pendingInvitations.innerText = pendingAmount + " Pending Invitations";
      }
    } else {
      i.innerText = "Connect";
      pendingAmount--;
      if (pendingAmount === 1) {
        pendingInvitations.innerText = pendingAmount + " Pending Invitation";
      } else {
        pendingInvitations.innerText = pendingAmount + " Pending Invitations";
      }
    }
  });
});

// removeBtns.forEach(function (i) {
//   i.addEventListener("click", function () {
//     console.log(contentCards.i);
//     i.parentNode.parentNode.parentNode.remove();
//   });
// });

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

//function to load API Content
// async function getContactInfo() {
//   const contactResponse = await fetch(
//     "https://dummy-apis.netlify.app/api/contact-suggestions?count=1"
//   );
//   const contactInfo = await contactResponse.json();
//   console.log(contactInfo[0].title);
// }

// getContactInfo();
