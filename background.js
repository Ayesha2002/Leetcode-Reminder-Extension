
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyReminder", {
    when: Date.now(),
    periodInMinutes: 60 * 24 // daily
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyReminder") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "LeetCode Reminder",
      message: "Don't forget to solve a LeetCode problem today!",
      priority: 2
    });
  }
});
