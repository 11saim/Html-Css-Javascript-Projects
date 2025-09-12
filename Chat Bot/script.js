let midSection;
let waitContainer;
let chatMessage;
function createChatArea() {
  // Create the main Chat Area
  const chatArea = document.createElement("div");
  chatArea.classList.add("Chat-Area");

  // Create the top section
  const topSection = document.createElement("div");
  topSection.classList.add("top");

  const chatBotHeader = document.createElement("h2");
  chatBotHeader.innerHTML =
    'Chat Bot <span><i class="fa-brands fa-discord"></i></span>';

  const closeButton = document.createElement("button");
  closeButton.classList.add("Close");
  closeButton.innerHTML = '<i class="fa-solid fa-caret-down"></i>';

  topSection.appendChild(chatBotHeader);
  topSection.appendChild(closeButton);

  // Create the mid section
  midSection = document.createElement("div");
  midSection.classList.add("mid");

  // Create the bottom section
  const bottomSection = document.createElement("div");
  bottomSection.classList.add("bottom");

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input");

  const inputField = document.createElement("input");
  inputField.classList.add("Message");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("placeholder", "Message");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btns");

  const emojiButton = document.createElement("button");
  emojiButton.classList.add("emoji");
  emojiButton.innerHTML = '<i class="fa-regular fa-face-smile"></i>';

  const uploadButton = document.createElement("button");
  uploadButton.classList.add("upload");
  uploadButton.innerHTML = '<i class="fa-solid fa-upload"></i>';

  const sendButton = document.createElement("button");
  sendButton.classList.add("send");
  sendButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';

  buttonContainer.appendChild(emojiButton);
  buttonContainer.appendChild(uploadButton);
  buttonContainer.appendChild(sendButton);

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(buttonContainer);

  bottomSection.appendChild(inputContainer);

  // Assemble the Chat Area
  chatArea.appendChild(topSection);
  chatArea.appendChild(midSection);
  chatArea.appendChild(bottomSection);

  // Append the Chat Area to the body
  document.body.appendChild(chatArea);

  return chatArea;
}
function UserChat(message) {
  // Create the main div element
  const userChatDiv = document.createElement("div");
  userChatDiv.className = "user-chat";

  // Create the p element for chat
  const chatP = document.createElement("p");
  chatP.className = "chat";
  chatP.textContent = message;

  // Create the icon element
  const userIcon = document.createElement("i");
  userIcon.className = "fa-solid fa-user";

  // Append the elements to the main div
  userChatDiv.appendChild(chatP);
  userChatDiv.appendChild(userIcon);

  // Append the userChatDiv to the body or any other container
  midSection.appendChild(userChatDiv);
}
function BotChat(message) {
  // Create the main bot chat container
  const botChat = document.createElement("div");
  botChat.classList.add("bot-chat");

  // Create the Discord icon
  const discordIcon = document.createElement("i");
  discordIcon.classList.add("fa-brands", "fa-discord");

  // Create the chat message
  chatMessage = document.createElement("p");
  chatMessage.classList.add("chat");
  chatMessage.textContent = message;

  // Create the wait container
  waitContainer = document.createElement("div");
  waitContainer.classList.add("wait");

  // Add three dots to the wait container
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.textContent = ".";
    waitContainer.appendChild(dot);
  }

  // Append all elements to the bot chat container
  botChat.appendChild(discordIcon);
  botChat.appendChild(chatMessage);
  botChat.appendChild(waitContainer);

  // Append the bot chat container to the body (or any desired parent element)
  midSection.appendChild(botChat);

  return botChat;
}
const API_KEY = "AIzaSyDz5A9DsFeR0FCmsVXD4vGFEcAVqmD-fsQ";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const chat_btn = document.getElementsByClassName("Chat-Icon")[0];
let chat_Area = null;
let Is_Chatting = false;
let user_chat = null;
const getBotResponse = async () => {
  const request = {
    method: "POST",
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: user_chat }],
        },
      ],
    }),
  };
  try {
    const response = await fetch(API_URL, request);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message.Error);
    chatMessage.textContent = data.candidates[0].content.parts[0].text;
    waitContainer.style.display = "none";
    chatMessage.style.display = "block";
  } catch (error) {
    console.log(error);
  }
};
chat_btn.addEventListener("click", () => {
  if (Is_Chatting) {
    document.body.removeChild(chat_Area);
    chat_Area = null;
    Is_Chatting = false;
    chat_btn.innerHTML = `<i class="fa-regular fa-message"></i>`;
  } else {
    Is_Chatting = true;
    chat_btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    chat_Area = createChatArea();
    document.body.appendChild(chat_Area);
    const input = document.getElementsByClassName("Message")[0];
    const send_btn = document.getElementsByClassName("send")[0];
    input.addEventListener("input", () => {
      if (input.value.trim().length > 0) {
        send_btn.style.display = "block";
      } else {
        send_btn.style.display = "none";
      }
    });
    send_btn.addEventListener("click", () => {
      user_chat = input.value;
      input.value = "";
      send_btn.style.display = "none";
      UserChat(user_chat);
      BotChat("");
      waitContainer.style.display = "flex";
      chatMessage.style.display = "none";
      getBotResponse();
    });
  }
});
