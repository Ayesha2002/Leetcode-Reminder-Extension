const streakSpan = document.querySelector("#streak span");
const statusP = document.getElementById("status");
const markDoneBtn = document.getElementById("mark-done");

const today = new Date().toLocaleDateString();

chrome.storage.local.get(["streak", "lastDate"], (data) => {
  let { streak = 0, lastDate = "" } = data;
  if (lastDate === today) {
    statusP.textContent = "Already marked for today!";
  }
  streakSpan.textContent = streak;
});

markDoneBtn.addEventListener("click", () => {
  const today = new Date().toLocaleDateString();
  chrome.storage.local.get(["streak", "lastDate"], (data) => {
    let { streak = 0, lastDate = "" } = data;
    if (lastDate === today) {
      statusP.textContent = "Already marked for today!";
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toLocaleDateString();
      streak = (lastDate === yStr) ? streak + 1 : 1;

      chrome.storage.local.set({ streak, lastDate: today }, () => {
        streakSpan.textContent = streak;
        statusP.textContent = "Marked! Keep the streak going 🔥";
      });
    }
  });
});
