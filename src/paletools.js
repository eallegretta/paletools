// MIT License
//
// Copyright (c) 2019 - Paleta
//
// http://github.com/eallegretta/paletools
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Define default commands, this allows for simpler customzation


(function (buttons) {
    const ver = 'v2.0.8';

    const map = ['', '', '', 'CANCEL', '', '', 'HELP', '', 'BACK_SPACE', 'TAB', '', '', 'CLEAR', 'ENTER', 'ENTER_SPECIAL', '', 'SHIFT', 'CONTROL', 'ALT', 'PAUSE', 'CAPS_LOCK', 'KANA', 'EISU', 'JUNJA', 'FINAL', 'HANJA', '', 'ESCAPE', 'CONVERT', 'NONCONVERT', 'ACCEPT', 'MODECHANGE', 'SPACE', 'PAGE_UP', 'PAGE_DOWN', 'END', 'HOME', 'LEFT', 'UP', 'RIGHT', 'DOWN', 'SELECT', 'PRINT', 'EXECUTE', 'PRINTSCREEN', 'INSERT', 'DELETE', '', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'COLON', 'SEMICOLON', 'LESS_THAN', 'EQUALS', 'GREATER_THAN', 'QUESTION_MARK', 'AT', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'OS_KEY', '', 'CONTEXT_MENU', '', 'SLEEP', 'NUMPAD0', 'NUMPAD1', 'NUMPAD2', 'NUMPAD3', 'NUMPAD4', 'NUMPAD5', 'NUMPAD6', 'NUMPAD7', 'NUMPAD8', 'NUMPAD9', 'MULTIPLY', 'ADD', 'SEPARATOR', 'SUBTRACT', 'DECIMAL', 'DIVIDE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', '', '', '', '', '', '', '', '', 'NUM_LOCK', 'SCROLL_LOCK', 'WIN_OEM_FJ_JISHO', 'WIN_OEM_FJ_MASSHOU', 'WIN_OEM_FJ_TOUROKU', 'WIN_OEM_FJ_LOYA', 'WIN_OEM_FJ_ROYA', '', '', '', '', '', '', '', '', '', 'CIRCUMFLEX', 'EXCLAMATION', 'DOUBLE_QUOTE', 'HASH', 'DOLLAR', 'PERCENT', 'AMPERSAND', 'UNDERSCORE', 'OPEN_PAREN', 'CLOSE_PAREN', 'ASTERISK', 'PLUS', 'PIPE', 'HYPHEN_MINUS', 'OPEN_CURLY_BRACKET', 'CLOSE_CURLY_BRACKET', 'TILDE', '', '', '', '', 'VOLUME_MUTE', 'VOLUME_DOWN', 'VOLUME_UP', '', '', 'SEMICOLON', 'EQUALS', 'COMMA', 'MINUS', 'PERIOD', 'SLASH', 'BACK_QUOTE', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'OPEN_BRACKET', 'BACK_SLASH', 'CLOSE_BRACKET', 'QUOTE', '', 'META', 'ALTGR', '', 'WIN_ICO_HELP', 'WIN_ICO_00', '', 'WIN_ICO_CLEAR', '', '', 'WIN_OEM_RESET', 'WIN_OEM_JUMP', 'WIN_OEM_PA1', 'WIN_OEM_PA2', 'WIN_OEM_PA3', 'WIN_OEM_WSCTRL', 'WIN_OEM_CUSEL', 'WIN_OEM_ATTN', 'WIN_OEM_FINISH', 'WIN_OEM_COPY', 'WIN_OEM_AUTO', 'WIN_OEM_ENLW', 'WIN_OEM_BACKTAB', 'ATTN', 'CRSEL', 'EXSEL', 'EREOF', 'PLAY', 'ZOOM', '', 'PA1', 'WIN_OEM_CLEAR', ''];

    let enabled = true;
    // Set variable to avoid a user from hitting the back button multiple times
    let backButtonLastDate = new Date();
    let filterItemsObserver = null;
    let searchItemsObserver = null;
    buttons = $.extend({
        back: 49,
        enableDisable: 92,
        tech: 84,
        lists: {
            up: 38,
            down: 40,
            prev: 37,
            next: 39,
        },
        search: {
            decMinBid: 37,
            incMinBid: 39,
            decMaxBid: 35,
            incMaxBid: 36,
            decMinBuy: 46,
            incMinBuy: 34,
            decMaxBuy: 40,
            incMaxBuy: 38,
            search: 50
        },
        results: {
            bid: 52,
            buy: 51,
            transfer: 82,
            club: 67,
            pressEnter: true,
            autoBuy: false,
            preventBack: true,
            sell: 81,
            decBid: 46,
            incBid: 34
        }
    }, buttons || {});

    UTMarketSearchResultsViewController.prototype._requestItems = function _requestItems(l) {
        this._paginationViewModel.stopAuctionUpdates(),
        services.Item.searchTransferMarket(this._searchCriteria, l).observe(this, function _onRequestItemsComplete(e, t) {
            if (e.unobserve(this),
            !t.success)
                return NetworkErrorManager.checkCriticalStatus(t.status) ? void NetworkErrorManager.handleStatus(t.status) : (services.Notification.queue([services.Localization.localize("popup.error.searcherror"), enums.UINotificationType.NEGATIVE]),
                void this.getNavigationController().popViewController());
            if (0 < this._searchCriteria.offset && 0 === t.data.items.length)
                this._requestItems(l - 1);
            else {
                var i = this._paginationViewModel.getNumItemsPerPage()
                var o = t.data.items.slice();
                if(this._searchCriteria['_type'] == "player" && this._searchCriteria.level=="gold"){//esto es lo unico nuevo
                    o = o.filter(player => player.rating > 74)
                }
                if (this.onDataChange.notify({
                    items: o
                }),
                o.length > i && (o = o.slice(0, i)),
            
                this._paginationViewModel.setPageItems(o),
                this._paginationViewModel.setPageIndex(l),
                this._selectedItem && 0 < o.length) {
                    var n = this._paginationViewModel.getIndexByItemId(this._selectedItem.id);
                    0 < n && this._paginationViewModel.setIndex(n),
                    this._selectedItem = null
                }


                var s = this.getView()
                  , r = null;
                if (!this._stadiumViewmodel || this._searchCriteria.type !== SearchType.VANITY && this._searchCriteria.type !== SearchType.CLUB_INFO && this._searchCriteria.type !== SearchType.BALL || (r = this._stadiumViewmodel.getStadiumProgression(this._searchCriteria.subtypes)),
                s.setItems(this._paginationViewModel.getCurrentPageItems(), r),
                s.setPaginationState(1 < l, t.data.items.length > i),
                JSUtils.isValid(this._compareItem) && !this._squadContext) {
                    var a = JSUtils.find(o, function(e) {
                        return e.getAuctionData().tradeId === this._compareItem.getAuctionData().tradeId
                    }
                    .bind(this));
                    JSUtils.isValid(a) ? this._pinnedListItem.setItem(a) : this._paginationViewModel.setPinnedItem(this._compareItem)
                } else
                    !isPhone() && 0 < o.length && s.selectListRow(this._paginationViewModel.getCurrentItem().id)
            }
            this._paginationViewModel.startAuctionUpdates()
        })
    }
    
    const
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        BACK_BUTTON_THRESHOLD = 500, // throwhols to avoid multiple back button clicks
        p = buttons, // alias to save space
        loc = window.services.Localization, // alias to save space
        locPlayers = window.services.Localization.localize('search.filters.players'), // alias to save space
        locSquadFitness = window.services.Localization.localize('card.title.squadfitness'), // alias to save space
        locContracts = window.services.Localization.localize('card.title.contract'), //alias to save space
        observeDOM = (target, callback) => {
            let obs = new MutationObserver(function (mutations, observer) {
                if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe(target, { childList: true, subtree: true });
            return obs;
        },
        dispatchMouseEvent = ($target, eventName) => {
            if ($target.length == 0) return false;
            const mouseEvent = document.createEvent('MouseEvents');
            mouseEvent.initEvent(eventName);
            $target[0].dispatchEvent(mouseEvent);
            return true;
        },
        mouseDown = target => dispatchMouseEvent(target, 'mousedown'),
        mouseUp = target => dispatchMouseEvent(target, 'mouseup'),
        mouseClick = target => {
            return mouseDown(target) && mouseUp(target);
        },

        // Palefilter logic
        getPlayerStat = (t, e) => $('.player-stats-data-component .value', t)[e].textContent,
        getContract = (t) => $(".contracts", t).hasClass('rare') ? 'rare' : 'common',
        getCardType = (t) => { 
            let type = $("#card-type").val();
            if(type.charAt(0) === '+'){
                type = type.substr(1);
                let dataUrl = $("canvas", t)[0].toDataURL("image/png").substr(84, 5);
                log(dataUrl);
                log(type);
                return dataUrl == type ? 1 : 0;
            }

            return $(type, t).length;
        },
        playerAttrs = {
            ovr: t => $('.rating', t)[0].textContent,
            pac: t => getPlayerStat(t, 0),
            sho: t => getPlayerStat(t, 1),
            pas: t => getPlayerStat(t, 2),
            dri: t => getPlayerStat(t, 3),
            def: t => getPlayerStat(t, 4),
            phy: t => getPlayerStat(t, 5)
        },
        getSquadFitness = (t) => $(`.name:contains(${locSquadFitness})`, t).length > 0 ? $('.subtype', t)[0].textContent : null,
        header = $('.ut-fifa-header-view'),

        refilterItems = () => {
            $(".listFUTItem").removeClass("hide").removeAttr("processed");
            log('refiltering items');
            filterItems();
        },

        filterItems = (container) => {
            container = container || $('.SearchResults');
            if (container.length == 0) return;
            let items = $('.listFUTItem', container);
            if (items.length == 0 || items.filter('[processed="true"]').length > 0) {
                return;
            }

            let selectedSquadFitness = $('#squadFitness').val();
            let selectedContract = $('#contracts').val();

            items.each((idx, elem) => {
                let $elem = $(elem);
                let removeElement = false;
                $elem.attr('processed', 'true');

                if (selectedFilter === 'player') {
                    if (getCardType(elem) == 0) {
                        removeElement = true;
                    }
                    else {
                        for (var playerAttr in playerAttrs) {
                            let attrValueText = $.trim($(`#_${playerAttr}`).val());
                            if (!attrValueText) continue;

                            let attrValue = parseInt(attrValueText);
                            let playerAttrValue = parseInt(playerAttrs[playerAttr](elem));

                            if (attrValue < 0 &&  playerAttrValue > Math.abs(attrValue)) {
                                removeElement = true;
                            }
                            else if (attrValueText.charAt(0) == '+' && playerAttrValue < attrValue) {
                                removeElement = true;
                            }
                            else if (attrValue != playerAttrValue) {
                                removeElement = true;
                            }

                            if (removeElement) break;
                        }
                    }
                }
                else if ((selectedFilter === 'fitness' && getSquadFitness(elem) != selectedSquadFitness) || (selectedFilter === 'contracts' && getContract(elem) != selectedContract)) {
                    removeElement = true;
                }

                $elem.addClass(removeElement ? 'hide' : 'show');
            });

            items = $('.listFUTItem.show', container);
            if (items.length > 0) {
                setTimeout(function () {
                    mouseClick(items);
                }, 0);
            }

            filterList = false;
        },

        buyNow = () => {
            if (mouseClick($('.buyButton'))) {
                if (p.results.pressEnter) {
                    tryPressOkBtn();
                }
            }
        },

        tryPressOkBtn = () => {
            let enter = $('.dialog-body .ut-button-group button:eq(0)')
            if (!mouseClick(enter)) {
                setTimeout(tryPressOkBtn, 10);
                return;
            }
            updateBoughtUI();
        },

        search = () => {
            mouseClick($('.button-container .btn-standard.call-to-action'));
            let searchContainer = $(".ut-navigation-container-view--content");
            searchItemsObserver = observeDOM(searchContainer[0], () => {
                setItemsFilter();
            });
        },

        setItemsFilter = () => {

            let container = $('.SearchResults');
            if (container.length == 0) {
                log('set items filter - no container');
                return;
            }

            log('set items filter - container found');

            if (searchItemsObserver) {
                searchItemsObserver.disconnect();
            }

            filterItems(container);
            if (filterItemsObserver) {
                filterItemsObserver.disconnect();
            }
            filterItemsObserver = observeDOM(container[0], () => {
                filterItems(container);
            });
        },

        back = () => {
            if (new Date() - backButtonLastDate < BACK_BUTTON_THRESHOLD) {
                return;
            }
            backButtonLastDate = new Date();
            if (!mouseClick($('.ut-navigation-button-control'))) {
                setTimeout(back, 10);
            }
        },

        // tech avion
        tech = () => {
            let boughtForDiv = $('.panelActions .panelActionRow.boughtPrice');
            if (boughtForDiv.length == 0) return;
            let techCoinsDiv = $('#tech-coins');
            if (techCoinsDiv.length == 0) {
                $('<div class="panelActionRow boughtPrice"><span>Tech</span><span id="tech-coins"></span></div>').insertAfter(boughtForDiv);
                techCoinsDiv = $('#tech-coins');
            }

            let boughtFor = parseInt($('.DetailPanel .boughtPriceValue').text().replace(',', '').replace('.', ''));
            let techAvion = boughtFor + ((Math.floor(boughtFor / 10000) - 1) * 1000) + 3500;
            techCoinsDiv.text(techAvion);
        },
        newTech = () => {
            let boughtForDiv = $('.panelActions .panelActionRow.boughtPrice');
            if (boughtForDiv.length == 0) return;
            let techCoinsDiv = $('#tech-coins');
            if (techCoinsDiv.length == 0) {
                $('<div class="panelActionRow boughtPrice"><span>Tech</span><span id="tech-coins"></span></div>').insertAfter(boughtForDiv);
                techCoinsDiv = $('#tech-coins');
            }

            let boughtFor = parseInt($('.DetailPanel .boughtPriceValue').text().replace(',', '').replace('.', ''));
            let techAvion = boughtFor + ((Math.floor(boughtFor / 10000) - 1) * 1000) + 3500;
            techCoinsDiv.text(techAvion);
        },

        transferBtn = () => $(`.ut-button-group > button:contains('${loc.localize('infopanel.label.sendTradePile')}')`),
        clubBtn = () => $(`.ut-button-group > button:contains('${loc.localize('infopanel.label.storeInClub')}')`),
        sellBtn = () => $(`.ut-button-group > button:contains('${loc.localize('infopanel.label.discard')}')`),

        keys = () => {
            try {
                let b = {};

                if ($('.ut-market-search-filters-view').length > 0) {
                    b[p.search.decMinBid] = () => mouseClick($('.decrement-value'));
                    b[p.search.incMinBid] = () => mouseClick($('.increment-value'));
                    b[p.search.decMaxBid] = () => mouseClick($('.decrement-value:eq(1)'));
                    b[p.search.incMaxBid] = () => mouseClick($('.increment-value:eq(1)'));
                    b[p.search.decMinBuy] = () => mouseClick($('.decrement-value:eq(2)'));
                    b[p.search.incMinBuy] = () => mouseClick($('.increment-value:eq(2)'));
                    b[p.search.decMaxBuy] = () => mouseClick($('.decrement-value:eq(3)'));
                    b[p.search.incMaxBuy] = () => mouseClick($('.increment-value:eq(3)'));
                    b[p.search.search] = () => search();
                }
                else {
                    let items = $(".listFUTItem.show");
                    let itemsExists = items.length > 0;
                    let itemsContainer = items.parents('.paginated, .ut-watch-list-view, .ut-transfer-list-view');
                    if (itemsContainer.length == 0) {
                        itemsContainer = items.parent();
                    }
                    if (itemsExists && $('.DetailPanel > .bidOptions').length > 0) {
                        b[p.results.bid] = () => mouseClick($('.bidButton'));
                        b[p.results.buy] = () => buyNow();
                        b[p.results.decBid] = () => mouseClick($('.bidOptions .decrement-value'));
                        b[p.results.incBid] = () => mouseClick($('.bidOptions .increment-value'));
                    }

                    if (itemsExists && $('.DetailPanel > .ut-button-group').length > 0) {
                        b[p.results.transfer] = () => mouseClick(transferBtn());
                        b[p.results.club] = () => mouseClick(clubBtn());
                        b[p.results.sell] = () => mouseClick(sellBtn());
                    }

                    if (itemsExists) {
                        let selected = $('.listFUTItem.selected', itemsContainer);
                        b[p.lists.up] = () => {
                            let prev = selected.prev();
                            while (prev.length == 1 && !prev.hasClass('show')) {
                                prev = prev.prev();
                            }
                            if (prev.length == 0) return;
                            mouseClick(prev);
                            itemsContainer
                                .css('position', 'relative')
                                .scrollTop(itemsContainer.scrollTop() + prev.position().top - prev.height());
                        };
                        b[p.lists.down] = () => {
                            let next = selected.next();
                            while (next.length == 1 && !next.hasClass('show')) {
                                next = next.next();
                            }
                            if (next.length == 0) return;
                            mouseClick(next);
                            itemsContainer
                                .css('position', 'relative')
                                .scrollTop(itemsContainer.scrollTop() + next.position().top - next.height());
                        };
                    }

                    if ($('.pagingContainer').length > 0) {
                        b[p.lists.prev] = () => mouseClick($('.pagingContainer .prev:visible'));
                        b[p.lists.next] = () => mouseClick($('.pagingContainer .next:visible'));
                    }
                }

                return b;
            }
            catch (e) {
                log(e);
            }
        },

        // UI update after buy now
        updateBoughtUI = () => {
            var txBtn = transferBtn();
            if (txBtn.length == 0) {
                setTimeout(updateBoughtUI, 50);
                return;
            }

            let upd = (t, tx) => {
                if (!t) return;
                let add = ` [ ${map[p.results[tx]]} ]`;
                let html = t.html();
                if (html && html.indexOf(add) == -1) {
                    t.html(t.html() + add);
                }
            }

            upd(txBtn, 'transfer');
            upd(clubBtn(), 'club');
            upd(sellBtn(), 'sell');
        },

        addCss = () => {
            let btn = (q, k1, k2, inc) => `${q} .${(inc ? 'in' : 'de')}crement-value:after { font-size:10px; display:block; margin-top:-30px; content: '[ ${map[p[k1][k2]]} ]' }`;
            let sp1 = (i, k, inc) => btn(`.search-prices .price-filter:nth-child(${i})`, 'search', k, inc);
            let sp2 = (i, k1, k2) => `${sp1(i, k1)}${sp1(i, k2, true)}`;
            let css = `
            ${sp2(2, 'decMinBid', 'incMinBid')}
            ${sp2(3, 'decMaxBid', 'incMaxBid')}
            ${sp2(5, 'decMinBuy', 'incMinBuy')}
            ${sp2(6, 'decMaxBuy', 'incMaxBuy')}
            ${btn('.DetailPanel > .bidOptions', 'results', 'decBid', false)}
            ${btn('.DetailPanel > .bidOptions', 'results', 'incBid', true)}
            .ut-market-search-filters-view .call-to-action:after { content: '[ ${map[p.search.search]} ]' }
            .ut-navigation-button-control:after { font-size:10px; float:right; margin-right:12px; content: '[ ${map[p.back]} ]' }
            .pagingContainer .prev:after { font-size: 10px; display:block; content: '[ ${map[p.lists.prev]} ]' }
            .pagingContainer .next:after { font-size: 10px; display:block; content: '[ ${map[p.lists.next]} ]' }
            .bidButton:after { content: ' [ ${map[p.results.bid]} ]' }
            .buyButton:before { float:right; margin-left: -40px; content: ' [ ${map[p.results.buy]} ]' }
            button.ut-tab-bar-item.icon-home { order: 0 }
            button.ut-tab-bar-item.icon-squad { order: 0 }
            button.ut-tab-bar-item.icon-sbc { order: 1 }
            button.ut-tab-bar-item.icon-transfer { order: 2 }
            button.ut-tab-bar-item.icon-store { order: 2 }
            button.ut-tab-bar-item.icon-club { order: 2 }
            .hide { display: none }
            `;

            var style = document.createElement("style");
            style.type = "text/css";
            style.innerText = css;
            document.head.appendChild(style);
        },

        log = msg => {
            $('#log').val(`${new Date()}: ${msg}\n${$('#log').val()}`);
        };

    header.append("<textarea id='log' style='position:absolute;bottom:0;left:0;z-index:1000' rows='10' cols='200'></textarea>");

    // BEGIN: Attach Palefilter to the header
    let selectedFilter = 'player';
    $(`<select style="height:46px"><option value="player">${locPlayers}</option><option value="fitness">${locSquadFitness}</option><option value="contracts">${locContracts}</option></select>`).change(function () {
        selectedFilter = this.value;
        playerAttrsContainer.hide();
        squadFitnessContainer.hide();
        contractsContainer.hide();
        if (this.value == 'player') {
            playerAttrsContainer.show();
        }
        else if (this.value === 'fitness') {
            squadFitnessContainer.show();
        }
        else if (this.value === 'contracts') {
            contractsContainer.show();
        }
    }).appendTo(header);

    let playerAttrsContainer = $('<div />').css('display', 'inline-block').appendTo(header);
    for (var playerAttr in playerAttrs) {
        $('<input />').attr('id', `_${playerAttr}`).attr('type', 'text').attr('style', 'width:52px').addClass('playerattr').attr('placeholder', playerAttr.toUpperCase()).appendTo(playerAttrsContainer);
    }
    $(`<select id="card-type" style="height:46px">
            <option value=".item"></option>
            <option value=".common:not(.champions)">Common</option>
            <option value=".rare:not(.champions)">Rare</options>
            <option value=".common.champions">UCL Common</option>
            <option value=".rare.champions">UCL Rare</option>
            <option value="+SlaVU">BRONZE</option>
            <option value="+Qk51U">BRONZE RARE</option>
            <option value="+htZ3U">SILVER</option>
            <option value="+hc1Xk">SILVER RARE</option>
            <option value="+htZ1U">GOLD</option>
            <option value="+wkWVk">GOLD RARE</option>
            <option value="+hcVbn">SILVER IF</option>
            <option value="+hdVdX">GOLD IF</option>
            <option value="+hkZ3U">Scream</option>
            <option value="+hlaVU">MOTM</option>
            <option value="+hcVbn">FFS</option>
            <option value="+hdZ3X">TOTGS</option>
            <option value="+Qd93X">TOTYN</option>
            <option value="+hcZbn">TOTY</option>
            <option value="+hcZ3n">Headliner</option>
            <option value="+hcZ3U">UCL Live</option>
            <option value="+gdVfn">UEL Live</option>
            <option value="+Bc53U">OTW</option>
            <option value="+glZ3X">Heroe</option>
            <option value="+gc5ZH">Icon</option>
        </select>
    `).appendTo(playerAttrsContainer);

    let squadFitnessContainer = $('<select id="squadFitness" style="height:46px"><option value="+30">+30</option><option value="+20">+20</option><option value="+10">+10</option></select>').appendTo(header).hide();
    let contractsContainer = $('<select id="contracts" style="height:46px"><option value="rare">Rare</option><option value="common">Common</option></select>').appendTo(header).hide();
    // END: Attach Palefilter to the header

    $.each([$('#squadFitness'), $('#contracts'), $('#card-type'), $(".playerattr")], function () {
        $(this).change(() => refilterItems());
    });

    addCss();

    document.body.addEventListener('keydown', e => {
        if (e.keyCode == p.enableDisable) {
            enabled = !enabled;
            $('#paletools-status').css('color', enabled ? 'lime' : 'red').text(enabled ? 'ON' : 'OFF');
        }

        if (!enabled) {
            return;
        }

        if (e.keyCode == p.back) {
            back();
            return;
        }

        if (e.keyCode == p.tech) {
            tech();
            return;
        }

        try {
            let action = keys()[e.keyCode];
            if (action) action();
        }
        catch (e) {
            log(e)
        }
    });

    let donateHtml = `<form id="paletools-donate" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
    <input type="hidden" name="cmd" value="_donations" />
    <input type="hidden" name="business" value="ZAJX6AD6XPLRN" />
    <input type="hidden" name="currency_code" value="USD" />
    <a style="text-decoration:none;color:inherit" onclick="javascript:$(\'#paletools-donate\')[0].submit()" href="javascript:void(0)">Paletools Donate</a></form></a>`;

    let menuItem = (html) => $('nav.ut-tab-bar').append(`<button class="ut-tab-bar-item" style="order:3">${html}</button>`);
    let menuLink = (l, w, c, co) => menuItem(`<a style="text-decoration:none;color:${co || 'inherit'};cursor:pointer;cursor:hand" target="${w}" href="${l}">${c}</a>`);

    menuLink('http://eallegretta.github.io/paletools/', 'paletools', `Paletools ${ver} <span id="paletools-status" style="color:lime">ON</span>`);
    menuLink('https://twitter.com/FFVA', 'twitter', '@FFVA', '#0099FF;font-weight:bold');
    menuItem(donateHtml);
    menuLink('https://www.iesa-global.com', 'iesa', '<img src="data:image/jpeg;base64,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" alt="" />');
})();
