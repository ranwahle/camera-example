const constraints = (window.constraints = {
  audio: false,
  video: true,
});

function init() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => handleSuccess(stream));
}

function handleSuccess(stream) {
  const video = document.querySelector("video");
  const videoTracks = stream.getVideoTracks();
  console.log("Got stream with constraints:", constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function queryPermissions() {
  navigator.permissions.query({ name: "camera" }).then((permissions) => {
    console.log("permissions", permissions);

    if (permissions.state !== "allowed") {
      document.querySelector("#permission-status").innerText =
        "You will need to give us camera permissions";
    }
  });
}

queryPermissions();

document
  .querySelector("#btnOpenCamera")
  .addEventListener("click", () => init());
