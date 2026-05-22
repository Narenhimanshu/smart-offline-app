const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const statusBox = document.getElementById("status");
const listBox = document.getElementById("list");

let pendingMessage = [];

function addMessage(text, pending = false) {
  const now = new Date();
  const li = document.createElement("li");
  const message=document.createElement("msg")
  message.innerText =(pending? text +"(pending)":text);
  const span=document.createElement("span")
  span.innerHTML=now.toLocaleString("hi-in")
  li.appendChild(message)
  li.appendChild(span)
   listBox.appendChild(li);
}

// for send button
sendBtn.addEventListener("click", () => {
  const text = inputBox.value;
  if (!text) return;
  if (navigator.onLine) {
    addMessage(text);
  } else {
    pendingMessage.push(text);
    addMessage(text, true);
  }
  inputBox.value = "";
});

// for online / offline
window.addEventListener("offline", () => {
  statusBox.innerText = "🔴You are offline";
  document.body.style.filter = "grayScale(1)";
});

window.addEventListener("online", () => {
  statusBox.innerText = "🟢You are online";
  document.body.style = "none";
  if (pendingMessage.length > 0) {
    pendingMessage.forEach((msg) => {
      addMessage(msg + "(synced)");
    });
  }
  pendingMessage = [];
});

// for enter
document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        sendBtn.click();
    }
})
