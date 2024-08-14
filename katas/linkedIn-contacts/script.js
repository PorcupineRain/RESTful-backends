const removeBtns = document.querySelectorAll(".btn-close");
const connectBtns = document.querySelectorAll(".btn-connect");
const pendingInvitations = document.querySelector(".pending-invitations");
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
