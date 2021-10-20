let requestText          = chrome.i18n.getMessage('request');
let requestInput         = chrome.i18n.getMessage('requestInput');
let nextInput            = chrome.i18n.getMessage('nextInput');
let clearCached          = chrome.i18n.getMessage('clearCached');
let temporarilyRemoveUrl = chrome.i18n.getMessage('temporarilyRemoveUrl');
let submitRequest        = chrome.i18n.getMessage('submitRequest');
let close                = chrome.i18n.getMessage('close');
let dublicateRequest     = chrome.i18n.getMessage('dublicateRequest');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "changePage"){
            let lenght = request.data.length, mainIndex = 0;

            if(mainIndex === 0){
                repeater(0);
            }

            function repeater(indexItem){


                if (request.data[indexItem] === undefined) {
                    return false;
                }

                let requestButton = $("div:contains('"+requestText+"'):last");
                requestButton.click();

                let interval = setInterval(function(){
                    let input = $('input[placeholder="'+requestInput+'"]');

                    if (input.length != 0) {
                        clearInterval(interval);

                        let tabsButton;

                        if (request.checked == "temporarily-remove") {
                            tabsButton = $("div:contains('"+temporarilyRemoveUrl+"'):last");
                        } else {
                            tabsButton = $("div:contains('"+clearCached+"'):last");
                        }

                        tabsButton.click();

                        setTimeout(function(){
                            $("input[placeholder='"+requestInput+"']").each(function(index, el) {
                                if($(this).is(":visible")){

                                    $(this).attr('value', request.data[indexItem]).trigger('click').trigger('change');

                                    let nextButton = $("div:contains('"+nextInput+"')[role='button']:last").attr('aria-disabled', false);

                                    nextButton.click();

                                    let intervalSubmit = setInterval(function(){
                                        let submitButton = $("div:contains('"+submitRequest+"')[role='button']:last");
                                        if (submitButton.length != 0) {
                                            clearInterval(intervalSubmit);
                                            submitButton.click();
                                            mainIndex++;

                                            var duplicateRequestIndex = 0;
                                            let duplicateRequest = setInterval(function(){
                                                duplicateRequestBox = $("div:contains('"+dublicateRequest+"')");
                                                if (duplicateRequestBox.length != 0) {
                                                    clearInterval(duplicateRequest);
                                                    $("div:contains('"+close+"')[role='button']").click();
                                                    setTimeout(function(){
                                                        repeater(mainIndex);
                                                    },100);
                                                } else if(duplicateRequestIndex == 3){
                                                    clearInterval(duplicateRequest);
                                                    setTimeout(function(){
                                                        repeater(mainIndex);
                                                    },100);
                                                }  
                                                else {
                                                    duplicateRequestIndex++;
                                                }
                                            }, 500);
                                        }
                                    });
                                }
                            });
                        }, 100);
                    }
                }, 200);
            }

            sendResponse({text: document.body.innerText, method: "changePage"}); //same as innerText
        }
    }
);