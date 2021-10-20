/*document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('start');
    if (checkPageButton) {
        chrome.runtime.sendMessage({'myPopupIsOpen': true});
    }
});*/

document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('check');
    checkButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var list = document.getElementById('list').value.split(String.fromCharCode(10));
            var checked = document.querySelector('input[name="select"]:checked').value;
            chrome.tabs.sendMessage(tabs[0].id, {method: "changePage", data: list, checked: checked}, function(response) {});
        });
    }, false);
}, false);