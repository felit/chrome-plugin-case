console.log(chrome.contextMenus);
chrome.contextMenus.create({
    type: 'normal',
    title: '保存至我的產品',
    id: 'a'
});
var notification = webkitNotifications.createNotification("","Notification Demo","Merry Christmas");
notification.show();