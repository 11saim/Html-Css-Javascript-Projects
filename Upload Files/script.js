const browse = document.querySelector(".upload-area span");
const input = document.querySelector(".upload-area input");
const upload_area = document.querySelector(".upload-area");
function createFile(fileName, fileSize) {
  const formattedFileSize =
    fileSize >= 1024 * 1024
      ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB`
      : `${(fileSize / 1024).toFixed(2)} KB`;
  // Create the outermost div
  const fileDiv = document.createElement("div");
  fileDiv.className = "file";

  // Create the h2 element for the icon
  const iconH2 = document.createElement("h2");
  iconH2.className = "icon";
  iconH2.textContent = fileName.split(".").pop();
  fileDiv.appendChild(iconH2);

  // Create the file-info div
  const fileInfoDiv = document.createElement("div");
  fileInfoDiv.className = "file-info";

  // Create the h2 element for the file name
  const fileNameH2 = document.createElement("h2");
  fileNameH2.className = "file-name";
  fileNameH2.textContent = fileName;
  fileInfoDiv.appendChild(fileNameH2);

  // Create the file-uploading-details div
  const uploadingDetailsDiv = document.createElement("div");
  uploadingDetailsDiv.className = "file-uploading-details";

  // Create the file-uploading-status div
  const uploadingStatusDiv = document.createElement("div");
  uploadingStatusDiv.className = "file-uploading-status";

  // Create the file-size div
  const fileSizeDiv = document.createElement("div");
  fileSizeDiv.className = "file-size";
  fileSizeDiv.textContent = `${formattedFileSize} / ${formattedFileSize}`;
  uploadingStatusDiv.appendChild(fileSizeDiv);

  // Create the file-status div
  const fileStatusDiv = document.createElement("div");
  fileStatusDiv.className = "file-status";
  fileStatusDiv.textContent = "UPLOADING...";
  uploadingStatusDiv.appendChild(fileStatusDiv);

  uploadingDetailsDiv.appendChild(uploadingStatusDiv);

  // Create the progress div
  const progressDiv = document.createElement("div");
  progressDiv.className = "progress";
  uploadingDetailsDiv.appendChild(progressDiv);

  fileInfoDiv.appendChild(uploadingDetailsDiv);

  // Append the file-info div to the file div
  fileDiv.appendChild(fileInfoDiv);

  // Create the cancel-upload button
  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-upload";

  // Create the icon for the cancel button
  const cancelIcon = document.createElement("i");
  cancelIcon.className = "fa-solid fa-xmark";
  cancelButton.appendChild(cancelIcon);

  fileDiv.appendChild(cancelButton);

  return fileDiv;
}
const handleFiles = ([...Files]) => {
  if (Files.length === 0) return;
  const file_area = document.querySelector(".file-area");
  Files.forEach((File) => {
    const file = createFile(File.name, File.size);
    file_area.insertAdjacentElement("afterbegin", file);
  });
};
upload_area.addEventListener("dragover", (e) => {
  e.preventDefault();
  upload_area.classList.add("active");
  document.querySelector(
    ".upload-area h2"
  ).innerHTML = `Release to upload or <span>browse</span>`;
});
upload_area.addEventListener("drop", (e) => {
  e.preventDefault();
  handleFiles(e.dataTransfer.files);
  upload_area.classList.remove("active");
  document.querySelector(
    ".upload-area h2"
  ).innerHTML = `Drag File's here or <span>browse</span>`;
});
upload_area.addEventListener("dragleave", (e) => {
  e.preventDefault();
  upload_area.classList.remove("active");
  document.querySelector(
    ".upload-area h2"
  ).innerHTML = `Drag File's here or <span>browse</span>`;
});
input.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});
browse.addEventListener("click", () => {
  input.click();
});
