let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("download-btn");
let qrContainer = document.getElementById("qrImage");
let generateBtn = document.getElementById("generate-btn");
let actionGroup = document.getElementById("action-group");

//Function to generate QR Code
function generateQR() {
  if (qrText.value.length > 0) {
    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true; 
    qrImage.onload = function() {
      imgBox.classList.add("show-img");
      generateBtn.style.display = "none";
      actionGroup.style.display = "flex";
      generateBtn.innerText = "Generate QR Code";
      generateBtn.disabled = false;
    };
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
      encodeURIComponent(qrText.value);
      
  } else {
    // The error shake animation for empty input
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
}
//To download the said QR
function downloadQR() {
  console.log("clicked this");
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
//Reset to initial state
 function resetQR() {
    qrText.value = "";
    imgBox.classList.remove("show-img");

    setTimeout(() => {
      qrImage.src = "";
    }, 500);

    generateBtn.style.display = "block";
    actionGroup.style.display = "none";
  }
  //Incase input is cleared then Qr will be removed too
  qrText.addEventListener("input", () => {
    if (qrText.value.length == 0) {
        resetQR();
    }
});
