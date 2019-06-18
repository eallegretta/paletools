(function(decrementMinBidKey, 
    incrementMinBinKey, 
    decrementMaxBuyNowKey, 
    incrementMaxBuyNowKey, 
    backButtonKey, 
    searchButtonKey, 
    buyNowButtonKey, 
    sendToTransferListButtonKey,
    sendToClubButtonKey) {
    const ver = "v1.0";
    
    if(window.__palesnipe) return;

    const localeButtons = {
            'es_ES': {
                storeInClub: 'Enviar a Mi club',
                sendTradePile: 'Enviar a transferibles'
            },
            'en_US': {
                storeInClub: 'Send to My Club',
                sendTradePile: 'Send to Transfer List'
            },
            'fr_FR': {
                storeInClub: 'Envoyer vers Mon club',
                sendTradePile: 'Env. Liste transf.'
            },
            'de_DE': {
                storeInClub: 'Zu Mein Verein',
                sendTradePile: 'Auf Transferliste'
            },
            'it_IT': {
                storeInClub: 'Invia a Il mio club',
                sendTradePile: 'Invia a trasferim.'
            },
            'pt_BR': {
                storeInClub: 'Enviar ao Meu clube',
                sendTradePile: 'Enviar para Transfer.'
            }
        },
        dispatchMouseEvent = ($target, eventName) => {
            if($target.length == 0) return;
            const mouseEvent = document.createEvent('MouseEvents');
            mouseEvent.initEvent(eventName);
            $target[0].dispatchEvent(mouseEvent)
        },
        mouseDown = target => dispatchMouseEvent(target, 'mousedown'),
        mouseUp = target => dispatchMouseEvent(target, 'mouseup'),
        mouseClick = target => { 
            mouseDown(target);
            mouseUp(target);
        },
        keys = {
            [decrementMinBidKey]: () => mouseClick($('.decrement-value')),
            [incrementMinBinKey]: () => mouseClick($('.increment-value')),
            [decrementMaxBuyNowKey]: () => mouseClick($('.decrement-value:eq(3)')),
            [incrementMaxBuyNowKey]: () => mouseClick($('.increment-value:eq(3)')),
            [backButtonKey]: () => mouseClick($('.NavigationBar .btn-navigation')),
            [searchButtonKey]: () => mouseClick($('#ut-search-wrapper .call-to-action')),
            [buyNowButtonKey]: () => mouseClick($('.buyButton')),
            [sendToTransferListButtonKey]: () => mouseClick($(".ut-button-group > button:contains('" + localeButtons[window.localStorage.UT_LOCALE].sendTradePile + "')")),
            [sendToClubButtonKey]: () => mouseClick($(".ut-button-group > button:contains('" + localeButtons[window.localStorage.UT_LOCALE].storeInClub + "')"))
        };

    console.log(keys);

    document.body.onkeydown = e => {
        if(!keys.hasOwnProperty(e.keyCode)) return;
        keys[e.keyCode]();
    };

    $("nav.view-tab-bar").append('<button class="view-tab-bar-item" style="order: 6"><a style="text-decoration:none;color:inherit" target="paletools" href="http://eallegretta.github.io/paletools.html">Palesnipe ' + ver + '</a>');
    window.__palesnipe = true;
})(37,39,40,38,188,190,32,222,187);
