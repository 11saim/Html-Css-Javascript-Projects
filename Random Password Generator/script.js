const Password = () => {
  let Password = "";
  for (let i = 0; i < 12; i++) {
    Password += All[Math.floor(Math.random() * 91)];
  }
  return Password;
};
function copyTextToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard:", text);
    })
    .catch((err) => {
      console.error("Failed to copy text:", err);
    });
}

const digits = "123456789";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const specialSymbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
const All = digits + upperCase + lowerCase + specialSymbols;
let gen_btn = document.getElementsByClassName("gen-btn")[0];
let Pass = "";
gen_btn.addEventListener("click", () => {
  Pass = Password();
  const input = document.querySelector("h3");
  input.innerText = Pass;
  input.style.color = "black";
  input.style.letterSpacing = "2px";
});
const copy_btn = document.getElementsByClassName("btn")[0];
copy_btn.addEventListener("click", () => {
  copyTextToClipboard(Pass);
});
