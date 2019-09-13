(function(decrementMinBidKey, 
    incrementMinBinKey, 
    decrementMaxBuyNowKey, 
    incrementMaxBuyNowKey, 
    backButtonKey, 
    searchButtonKey, 
    buyNowButtonKey, 
    sendToTransferListButtonKey,
    sendToClubButtonKey) {
    const ver = "v1.1";
    
    if(window.__palesnipe) return;

    const 
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
            [sendToTransferListButtonKey]: () => mouseClick($(".ut-button-group > button:contains('" + window.services.Localization.localize('infopanel.label.sendTradePile') + "')")),
            [sendToClubButtonKey]: () => mouseClick($(".ut-button-group > button:contains('" +  window.services.Localization.localize('infopanel.label.storeInClub') + "')"))
        };

    console.log(keys);

    document.body.onkeydown = e => {
        if(!keys.hasOwnProperty(e.keyCode)) return;
        keys[e.keyCode]();
    };

    $("nav.view-tab-bar").append('<button class="view-tab-bar-item" style="order: 6"><a style="text-decoration:none;color:inherit" target="paletools" href="http://eallegretta.github.io/paletools.html">Palesnipe ' + ver + '</a>');
    window.__palesnipe = true;
})(37,39,40,38,188,190,32,222,187);
