// ==UserScript==
// @name        FMKOREA-Block
// @namespace   FMKOREA-Block
// @version     0.1.3
// @description FM Korea의 포텐글을 필터링하여 표시해주는 UserScript
// @author      NOMO
// @match       https://www.fmkorea.com/*
// @supportURL  https://github.com/nomomo/FMKOREA-Block/issues
// @homepageURL https://github.com/nomomo/FMKOREA-Block/
// @downloadURL https://raw.githubusercontent.com/nomomo/FMKOREA-Block/master/FMKOREA-Block.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/FMKOREA-Block/master/FMKOREA-Block.user.js
// @grant       GM.addStyle
// @grant       GM_addStyle
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.deleteValue
// @grant       GM_deleteValue
// @grant       GM.listValues
// @grant       GM_listValues
// @grant       GM.info
// @grant       GM_info
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @grant       GM.notification
// @grant       GM_notification
// @grant       GM.addValueChangeListener
// @grant       GM_addValueChangeListener
// @grant       GM.removeValueChangeListener
// @grant       GM_removeValueChangeListener
// @run-at      document-start
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(async function() {
    'use strict';
    var DEBUG = true;

////////////////////////////////////////////////////////////////////////////////////
    // libs
    ////////////////////////////////////////////////////////////////////////////////////
    var NOMO_DEBUG = function ( /**/ ) {
        if (DEBUG) {
            var args = arguments,
                args_length = args.length,
                args_copy = args;
            for (var i = args_length; i > 0; i--) {
                args[i] = args_copy[i - 1];
            }
            args[0] = "[FB]  ";
            args.length = args_length + 1;
            console.log.apply(console, args);
        }
    };

    /* arrive.js
    * v2.4.1
    * https://github.com/uzairfarooq/arrive
    * MIT licensed
    * Copyright (c) 2014-2017 Uzair Farooq
    */
    // eslint-disable-next-line
    const Arrive = function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback);}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave");}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n);},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n;};},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback);},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r);},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r;},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t;}};}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null;};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i;},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null);}},e.prototype.beforeAdding=function(e){this._beforeAdding=e;},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e;},e;}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n);});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o;}),i.beforeRemoving(function(e){e.observer.disconnect();}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n);},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1;});},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1;}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1;},i.removeEvent(t);},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1;});},this;},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t;}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t);});}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1;}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a);}c.call(this,e,t,r);},f;},u=function(){function e(){var e={childList:!0,subtree:!0};return e;}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t);});}function r(e,t){return l.matchesSelector(e,t.selector);}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r);},d;},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h;}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);

    /* GM_setting.js
    * Version: May. 31, 2022
    * MIT licensed
    * https://github.com/nomomo/
    * nomotg@gmail.com
    * Copyright (c) 2017-2022 NOMO
    */
    // eslint-disable-next-line
    var GM_setting=function(t,e,n){var i,a=void 0,s="",o=[],l={},r={},_={},d={},c=!1,p=function(){if(c){for(var t=arguments,e=t.length,n=t,i=e;i>0;i--)t[i]=n[i-1];t[0]="+[GM_SETTINGS]  ",t.length=e+1,console.log.apply(console,t)}},g=(navigator.language||navigator.userLanguage).toLowerCase().substring(0,2),f=g,u="ko",v=!1;const h={en:{title_settings:"Settings",title_reset:"Reset",donate:"Donate",buymeacoffee:"Buy me a coffee",buymeacoffeeDesc:"Support my projects by buying me a coffee! ☕",toonation:"Toonation",button_reset_settings:"Reset Settings",confirm_reset_settings:"Are you sure you want to reset the settings?",complete_reset_settings:"Settings reset complete!",button_reset_settings_all:"Script reset (refresh is required)",confirm_reset_settings_all:"Do you really want to reset script?",complete_reset_settings_all:"Script initialization complete!",auto_saved:"Autosaved: ",err_val_req:"A value must be entered.",err_num_req:"Only numbers can be entered.",err_num_over:"The input value must be a number greater than or equal to : ",err_num_not_more_than:"The input value must be a number less than or equal to: ",err_valid_array_string:"Only English letters, numbers, commas (,) and underscores (_) can be entered.",err_value_empty:"Something for which no value exists, such as an empty value.",err_value_dup:"Duplicate value exists: ",err_value_blank:"There is an item of a space in the string: ",setting_changed_from_other_window:"설정이 다른 창에서 변경되어 다시 불러옵니다."},ko:{title_settings:"Settings",title_reset:"Reset",donate:"후원하기",buymeacoffee:"Buy me a coffee 로 커피 한 잔 사주기",buymeacoffeeDesc:"커피 한 잔☕ 으로 프로젝트를 지원해주세요~",toonation:"Toonation 으로 후원하기",button_reset_settings:"Reset Settings",confirm_reset_settings:"진짜 설정을 초기화 할까요?",complete_reset_settings:"설정 초기화 완료!",button_reset_settings_all:"전체 초기화(새로고침 필요)",confirm_reset_settings_all:"진짜 스크립트를 모두 초기화 할까요?",complete_reset_settings_all:"스크립트 초기화 완료!",auto_saved:"자동 저장 됨: ",err_val_req:"반드시 값이 입력되어야 합니다.",err_num_req:"숫자만 입력 가능합니다.",err_num_over:"입력 값은 다음 값 이상의 숫자이어야 합니다. : ",err_num_not_more_than:"입력 값은 다음 값 이하의 숫자이어야 합니다. : ",err_valid_array_string:"영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.",err_value_empty:"공백 값 등 값이 존재하지 않는 항목이 존재합니다.",err_value_dup:"중복된 값이 존재합니다: ",err_value_blank:"문자열 내 공백이 존재하는 항목이 있습니다: ",setting_changed_from_other_window:"설정이 다른 창에서 변경되어 다시 불러옵니다: "}};var b=function(t){var e="";if("object"==typeof t){var n=Object.keys(t);if(0===n.length)return e;e=void 0!==t[f]||void 0!==t[u]?t[f]:t[n[0]]}else e=t;return e},y=function(t){return void 0!==h[f]?h[f][t]:void 0!==h[u]?h[u][t]:""},G=async function(){""!==s&&await GM.setValue(s,_),e[s]=_,t.each(o,(function(t,e){void 0!==r[e]&&void 0!==r[e].change&&r[e].change(_[e])})),o=[]},M=async function(){p("load_"),""!==s&&(_=await GM.getValue(s,_)),_.Lang=await m(),e[s]=_},m=async function(){return f=await GM.getValue("GM_SETTING_LANG",g),p("loadLang_",f),f},x=function(e,n,i){e.empty(),e.empty();for(var a=0;a<i.length;a++){for(var s=t("<tr></tr>"),o=0;o<i[a].length;o++)0==o&&s.append(`<td>${a+1}</td>`),s.append(`<td>${i[a][o]}</td>`);s.append(`<td class="table_btn_container"><span title="Modify" alt="Modify" class="glyphicon glyphicon-pencil cp table_modify" GM_setting_key="${n}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_save" GM_setting_key="${n}"></span></td>`),s.append(`<td class="table_btn_container"><span title="Delete" alt="Delete" class="glyphicon glyphicon-trash cp table_delete" GM_setting_key="${n}"></span><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_cancel" GM_setting_key="${n}"></span></td>`),e.append(s)}for(var l=t("<tr></tr>"),_=0;_<r[n].head.length;_++)0==_&&l.append("<td></td>"),l.append("<td></td>");l.append(`<td class="table_btn_container"><span title="New" alt="New" class="glyphicon glyphicon-plus cp table_new" GM_setting_key="${n}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_new_save" GM_setting_key="${n}"></span></td>`),l.append(`<td class="table_btn_container"><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_new_cancel" GM_setting_key="${n}"></span></td>`),e.append(l)},k=function(e){d={};var n=t(e);i=n,0!==n.find("#GM_setting_container").length&&n.empty();var s=t("<div id='GM_setting_container'></div>"),o=t(`\n<div id='GM_setting_head'>\n<div style='height:25px;display:inline-block;white-space:nowrap'>Settings</div>\n<div style='display:flex;height:25px;float:right;'>\n    <div id='GM_homepage_link' style='align-self: flex-end;'>\n        <a href='${GM.info.script.homepage}' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>${GM.info.script.name} v${GM.info.script.version} (${GM.info.script.homepage})</a>\n    </div>\n    <div id='GM_multilang' style='margin-left:15px;'>\n        <select id='GM_multilang_select' class="form-control input-sm">\n            <option value="ko">한국어</option>\n            <option value="en">English</option>\n        </select>\n    </div>\n</div>\n</div>`);void 0!==GM.info&&null!==GM.info&&void 0!==GM.info.script&&null!==GM.info.script&&void 0!==GM.info.script.homepage&&null!==GM.info.script.homepage&&""!==GM.info.script.homepage?o.find("#GM_homepage_link").show():o.find("#GM_homepage_link").hide();var l=o.find("#GM_multilang");if(v){l.show();var c=l.find("#GM_multilang_select");c.val(f),c.on("change",(async function(e){var n=f;t("option:selected",this),this.value;f=this.value,p(`LANG VALUE CHANGED FROM ${n} TO ${f}`),await async function(t){null==t?(await GM.setValue("GM_SETTING_LANG",f),p("saveLang_",f)):(await GM.setValue("GM_SETTING_LANG",t),p("saveLang_",t))}(),null!=a?(t(a).empty(),k(a)):p("NO CREATED LAYOUT")}))}else l.hide();var g=t("<ul id='GM_setting'></ul>"),u=void 0;for(var h in n.append(s),s.append(o).append(g),r){var M,m,w=r[h].category,S=r[h].depth,L=r[h].type,N=b(r[h].title),D=b(r[h].desc),C=b(r[h].category_name),O=r[h].radio_enable_value,E=t("<div class='GM_setting_input_container form-group'></div>"),q=-1!==t.inArray(L,["tag","textarea","object"]);if("radio"===L){var V=r[h].radio;for(var j in M=t("<div GM_setting_type='radio'></div>"),V){var I=t("<label class='radio-inline'>"+b(V[j].title)+"</label>");t("<input name='GM_setting_"+h+"' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({value:V[j].value,type:"set"===L?"text"===L:"tag"===L?"textarea":L,GM_setting_type:L,GM_setting_key:h,GM_setting_category:void 0===w?"default":w,GM_setting_radio_enable_value:void 0===O?"none":O}).prependTo(I),M.append(I)}}else if("combobox"===L){var U=r[h].options;for(var R in M=t(`<select name="GM_setting_${h}" class='form-control input-sm select-inline'></select>`).attr({GM_setting_type:L,GM_setting_key:h,GM_setting_category:void 0===w?"default":w,GM_setting_radio_enable_value:void 0===O?"none":O}),U){var B=t(`<option spellcheck='false' value="${R}" onfocus='this.blur()'>${b(U[R].title)}</option>`);M.append(B)}}else if("table"===L){var F=(M=t(`<table name="GM_setting_${h}" class="table table-bordered table-striped table-hover"><thead><tr></tr></thead><tbody></tbody></table>`).attr({GM_setting_type:L,GM_setting_key:h,GM_setting_category:void 0===w?"default":w,GM_setting_radio_enable_value:void 0===O?"none":O})).find("thead tr");F.append("<th>#</th>");for(var J=0;J<r[h].head.length;J++)F.append(`<th>${r[h].head[J]}</th>`);F.append('<th class="table_btn_container"> </th>'),F.append('<th class="table_btn_container"> </th>')}else M=t(`<${q?"textarea ":"input "} class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' ${"checkbox"===L?"onfocus='this.blur()'":""}${q?"></textarea>":" />"}`).attr({type:"set"===L?"text"===L:"tag"===L?"textarea":L,GM_setting_type:L,GM_setting_key:h,GM_setting_category:void 0===w?"default":w,GM_setting_radio_enable_value:void 0===O?"none":O});m=t(void 0!==C?`<div class='GM_setting_category_name'>${C}</div>`:"<div class='GM_setting_category_blank'></div>");var H=t("<div class='GM_setting_list_head'></div>"),Y=t(`<span class='GM_setting_title'>${N}</span>`),Q=t(`<span class='GM_setting_desc'>${D}</span>`),Z=t(`<li ${void 0!==r[h].radio_enable_value?" GM_setting_radio_enable_value='"+r[h].radio_enable_value+"'":""}\n                GM_setting_key='${h}'\n                GM_setting_depth='${S}'\n                class='${r[h].under_dev?"GM_setting_under_dev ":""} ${void 0!==C&&void 0!==u&&w!==u.category?"GM_setting_category ":""} GM_setting_depth${S}'\n                style='${r[h].under_dev&&!_.under_dev?"display:none;opacity:0":""}'></li>`);if(g.append(Z),H.append(Y).append(Q),"checkbox"===L)t('<label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>').prepend(M).appendTo(E),M.on("change",(function(){t(this).is(":checked")?t(this).closest("label").addClass("active"):t(this).closest("label").removeClass("active"),t(this).is(":disabled")?t(this).closest("label").addClass("disable").prop("disabled",!0):t(this).closest("label").removeClass("disable").prop("disabled",!1)}));else E.append(M);Z.append(m).append(H).append(E),d[h]=M,void 0!==r[h].append&&E.append(r[h].append),u=r[h]}T(),z(n),n.find("input[type='checkbox']").on("click",(function(){z(n)})),n.find("input[type='radio']").on("click",(function(){z(n)})),s.on("click",".table_modify",(function(e){p("clicked table_modify btn");var n=t(e.target),i=n.closest("tbody"),a=n.closest("tr");i.find(".table_modify").hide(),i.find(".table_delete").hide(),i.find(".table_new").hide(),i.find(".table_save").hide(),i.find(".table_cancel").hide(),a.find(".table_save").show(),a.find(".table_cancel").show();for(var s=a.find("td"),o=0;o<s.length-2;o++)if(0!=o){var l=t(s[o]),r=l.text();l.html(`<input type="text" value="${r}" orivalue="${r}"></input>`)}})),s.on("click",".table_save",(async function(e){p("clicked table_save btn");var n=t(e.target),a=n.closest("tr"),s=a.find("input"),o=Number(a.find("td").first().text())-1,l=n.attr("GM_setting_key");console.log(s);for(var r=0;r<s.length;r++)_[l][o][r]=t(s[r]).val();await G(),$(y("auto_saved")+(new Date).toLocaleTimeString(),i);var d=n.closest("tbody"),c=_[l];x(d,l,c)})),s.on("click",".table_cancel",(function(e){p("clicked table_cancel btn");var n=t(e.target),i=n.attr("GM_setting_key"),a=n.closest("tbody"),s=_[i];x(a,i,s)})),s.on("click",".table_delete",(async function(e){p("clicked table_delete btn");var n=t(e.target);if(confirm("Delete?")){var a=n.closest("tr"),s=Number(a.find("td").first().text())-1;a.remove();var o=n.attr("GM_setting_key");_[o].splice(s,1),await G();var l=n.closest("tbody"),r=_[o];x(l,o,r),$(y("auto_saved")+(new Date).toLocaleTimeString(),i)}})),s.on("click",".table_new",(function(e){p("clicked table_new btn");var n=t(e.target),i=n.closest("tbody");i.find(".table_modify").hide(),i.find(".table_delete").hide(),i.find(".table_new").hide(),i.find(".table_new_save").show(),i.find(".table_new_cancel").show();for(var a=n.closest("tr").find("td"),s=0;s<a.length-2;s++){if(0!=s)t(a[s]).html('<input type="text" value=""></input>')}})),s.on("click",".table_new_save",(async function(e){p("clicked table_new_save btn");for(var n=t(e.target),a=n.closest("tr").find("input"),s=[],o=0;o<a.length;o++)s.push(t(a[o]).val());var l=n.attr("GM_setting_key");_[l].push(s),await G(),$(y("auto_saved")+(new Date).toLocaleTimeString(),i);var r=n.closest("tbody"),d=_[l];x(r,l,d)})),s.on("click",".table_new_cancel",(function(e){p("clicked table_new_cancel btn");var n=t(e.target).attr("GM_setting_key"),i=t(e.target).closest("tbody"),a=_[n];x(i,n,a)})),s.find("select").on("change",(function(){p("GM_setting - select change"),A(t(this),n,d)})),s.find("input, textarea").on("input",(function(){p("GM_setting - text change"),A(t(this),n,d)})),g.append(`<li class="GM_setting_category GM_setting_depth1">\n            <div class="GM_setting_category_name">${y("title_reset")}</div>\n            <div class="GM_setting_list_head">\n                <span class="GM_setting_title">\n                    <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">${y("button_reset_settings")}</span>\n                    \x3c!--<span class="GM_setting_reset_all btn btn-primary">button_reset_settings_all</span>--\x3e\n                </span>\n                <span class="GM_setting_desc"></span>\n            </div>\n            <div class="GM_setting_input_container form-group">\n            </div>\n        </li>`),g.find(".GM_setting_reset").on("click",(async function(){confirm(y("confirm_reset_settings"))&&(await GM_setting.reset(),GM_setting.createlayout(i),$(y("complete_reset_settings")+(new Date).toLocaleTimeString(),i))})),g.find(".GM_setting_reset_all").on("click",(async function(){if(confirm(y("confirm_reset_settings_all"))){for(var t=await GM.listValues(),e=0;e<t.length;e++){var n=t[e];await GM.deleteValue(n)}await GM_setting.reset(),GM_setting.createlayout(i),$(y("complete_reset_settings_all")+(new Date).toLocaleTimeString(),i)}})),g.append(`<li class="GM_setting_category GM_setting_depth1">\n        <div class="GM_setting_category_name">${y("donate")}</div>\n        <div class="GM_setting_list_head">\n            <span class="GM_setting_title">\n                ${y("buymeacoffee")}\n            </span>\n            <span class="GM_setting_desc">\n                ${y("buymeacoffeeDesc")}\n            </span>\n        </div>\n        <div class="GM_setting_input_container form-group">\n        <a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>\n        </div>\n        </li>\n        <li class="GM_setting_depth1">\n        <div class="GM_setting_category_blank"></div>\n            <div class="GM_setting_list_head">\n                <span class="GM_setting_title">\n                    ${y("toonation")}\n                </span>\n                <span class="GM_setting_desc"></span>\n            </div>\n            <div class="GM_setting_input_container form-group">\n            <a href="https://toon.at/donate/636947867320352181" target="_blank"><img src="https://raw.githubusercontent.com/nomomo/Addostream/master/assets/toonation_b11.gif" height="41" alt="Donate with Toonation" /></a>\n            </div>\n        </li>\n    `),g.after(`\n        <div id="GM_setting_footer">\n            <a href="${GM.info.script.homepage}" target="_blank">${GM.info.script.name}</a> v${GM.info.script.version}\n            <div class="footer_divider"></div> GM Setting v22.5.31\n            <div class="footer_divider"></div> ©2017-${(new Date).getFullYear()} <a href="https://nomo.asia/" target="_blank">NOMO</a></div>\n        `)},w=void 0,$=function(e,n){if(void 0!==n){var i="GM_setting_autosaved";n.find("."+i).animate({bottom:"+=40px"},{duration:300,queue:!1}),t("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='"+i+" btn btn-success'>"+e+"</div>").appendTo(n).fadeIn("fast").animate({opacity:1},6e3,(function(){t(this).fadeOut("fast").delay(600).remove()})).animate({left:"+=30px"},{duration:300,queue:!1})}},S=async function(){for(var e in p("read_"),d)if(!(r[e].autosavepass&&void 0!==_[e]||"table"===_[e].type)){var n=d[e],i=L(n);"tag"===r[e].type&&(1===(i=i.split(",")).length&&""===i[0]&&(i=[]),t.each(i,(function(t,e){i[t]=e.replace(/^\s*|\s*$/g,"")}))),_[e]!==i&&-1===o.indexOf(e)&&o.push(e),_[e]=i}},T=async function(){for(var t in p("write_"),d){var e=d[t];N(e,_[t])}},L=function(e){var n;switch(e.attr("GM_setting_type")){case"checkbox":n=e.prop("checked");break;case"set":case"text":case"tag":case"textarea":n=e.val();break;case"object":n=JSON.parse(e.val());break;case"radio":n=e.find("input:checked").val();break;case"combobox":n=e.find("option:selected").val();break;case"table":n=[];for(var i=e.find("tbody").find("tr"),a=0;a<i.length-1;a++){n.push([]);for(var s=t(i[a]).find("td"),o=0;o<s.length-2;o++)if(0!==o){var l=t(s[o]).text();n[a][o-1]=l}}break;default:n=void 0}return n},N=function(e,n){switch(e.attr("GM_setting_type")){case"checkbox":e.prop("checked",n).trigger("change");break;case"set":case"text":e.val(n);break;case"tag":case"textarea":e.val(n),e.height("auto"),e.height(String(Number(e.prop("scrollHeight"))+0)+"px");break;case"object":e.val(JSON.stringify(n)),e.height("auto"),e.height(String(Number(e.prop("scrollHeight"))+0)+"px");break;case"radio":e.find("input[value="+n+"]").prop("checked",!0);break;case"combobox":e.find("option[value="+n+"]").prop("selected",!0);break;case"table":var i=e.find("tbody"),a=e.attr("GM_setting_key");i.empty();for(var s=0;s<n.length;s++){for(var o=t("<tr></tr>"),l=0;l<n[s].length;l++)0==l&&o.append(`<td>${s+1}</td>`),o.append(`<td>${n[s][l]}</td>`);o.append(`<td class="table_btn_container"><span title="Modify" alt="Modify" class="glyphicon glyphicon-pencil cp table_modify" GM_setting_key="${a}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_save" GM_setting_key="${a}"></span></td>`),o.append(`<td class="table_btn_container"><span title="Delete" alt="Delete" class="glyphicon glyphicon-trash cp table_delete" GM_setting_key="${a}"></span><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_cancel" GM_setting_key="${a}"></span></td>`),i.append(o)}for(var _=t("<tr></tr>"),d=0;d<r[a].head.length;d++)0==d&&_.append("<td></td>"),_.append("<td></td>");_.append(`<td class="table_btn_container"><span title="New" alt="New" class="glyphicon glyphicon-plus cp table_new" GM_setting_key="${a}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_new_save" GM_setting_key="${a}"></span></td>`),_.append(`<td class="table_btn_container"><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_new_cancel" GM_setting_key="${a}"></span></td>`),i.append(_)}},z=async function(e){var n=e.find("li");n.removeClass("GM_setting_item_disable"),n.find("input, textarea, select").prop("disabled",!1),n.find("input[type='checkbox']").trigger("change");for(var i,a,s=[!0,!0],o=1e3,l=0;l<n.length;l++){var _=t(n[l]),d=_.attr("GM_setting_depth"),c=_.attr("GM_setting_key"),p=_.attr("GM_setting_radio_enable_value");_.find("[gm_setting_type]").attr("gm_setting_type");if(0==l);else{var g=(i=t(n[l-1])).attr("GM_setting_depth");if(o>=d&&(a=void 0,o=1e3),g==d&&g>0)void 0!==a&&(s[g-1]=a==p);else if(g<d){a=void 0;var f=i.find("input[type='checkbox']"),u=i.find("input[type='radio']"),v=i.find("select");0!==f.length&&f.is(":checked")?s[g]=!0:0!==u.length?(a=i.find("input[type='radio']:checked").val(),o=g,i.find("input[type='radio']:checked").val()==p?s[g]=!0:s[g]=!1):0!==v.length?s[g]=!0:s[g]=!1}}for(var h=0;h<d;h++)if(r[c].disable||!s[h]){_.addClass("GM_setting_item_disable"),_.find("input, textarea, select").prop("disabled",!0),_.find("input[type='checkbox']").trigger("change");break}}},D=function(e,n){var i,a,s,o=!0,l="";if("number"===r[e].valid)o=t.isNumeric(n),""===n?l+=y("err_val_req"):o?void 0!==r[e].min_value&&r[e].min_value>n?(o=!1,l+=y("err_num_over")+r[e].min_value):void 0!==r[e].max_value&&r[e].max_value<n&&(o=!1,l+=y("err_num_not_more_than")+r[e].max_value):l+=y("err_num_req");else if(""!==n&&"array_string"===r[e].valid){i=t.map(n.split(","),t.trim);var _=n.match(/^[A-Za-z0-9 _,]*$/);if(null===_||0===_.length)o=!1,l+=y("err_valid_array_string");else if(-1!==t.inArray("",i))o=!1,l+=y("err_value_empty"),p(i,t.inArray("",i));else if(new Set(i).size!==i.length){o=!1,a=[],s=i.sort();for(var d=0;d<i.length-1;d++)s[d+1]==s[d]&&-1===t.inArray(s[d],a)&&a.push(s[d]);l+=y("err_value_dup")+a.join(",")}else for(var c=0;c<i.length;c++)if(-1!==i[c].indexOf(" ")){o=!1,l+=y("err_value_blank")+i[c];break}}else if(""!==n&&"array_word"===r[e].valid)if(i=t.map(n.split(","),t.trim),-1!==t.inArray("",i))o=!1,l+=y("err_value_empty"),p(i,t.inArray("",i));else if(new Set(i).size!==i.length){o=!1,a=[],s=i.sort();for(var g=0;g<i.length-1;g++)s[g+1]==s[g]&&-1===t.inArray(s[g],a)&&a.push(s[g]);l+=y("err_value_dup")+a.join(",")}return{valid:o,message:l}},A=function(e,n,i){var a=L(e),s=e.attr("GM_setting_key"),o=D(s,a);e.closest("div").find(".invalid_text").remove(),o.valid?e.closest("div").removeClass("invalid"):(p("validation",o),e.closest("div").addClass("invalid"),e.after("<div class='invalid_text'>"+o.message+"</div>")),clearTimeout(w),w=setTimeout((function(){var e=!0;t.each(i,(function(t,n){if(!D(t,L(n)).valid)return e=!1,!1})),e&&(S(),G(),$(y("auto_saved")+(new Date).toLocaleTimeString(),n))}),1e3)},C=function(t,e){var n=Object.keys(t).sort(),i=Object.keys(e).sort();return JSON.stringify(n)===JSON.stringify(i)};return{init:async function(e,d){s=e,await async function(t){for(var e in p("init_",r),t&&(t.DEBUG&&p("GM_setting - DEBUG",c=!0),t.CONSOLE_MSG&&(p=t.CONSOLE_MSG),t.SETTINGS&&(r=t.SETTINGS),t.MULTILANG&&(v=!0,t.LANG_DEFAULT&&(u=t.LANG_DEFAULT))),r)l[e]=r[e].value;if(l.Lang="",await M(),!C(l,_)){for(e in l)void 0===_[e]&&(_[e]=l[e]);for(e in _)void 0===l[e]&&delete _[e];await G()}}(d),await async function(){"function"==typeof GM.addValueChangeListener&&(p("설정에 대한 addValueChangeListener 바인드"),GM.addValueChangeListener(s,(async function(e,n,s,l){l&&(p("다른 창에서 설정 변경됨. val_name, old_value, new_value:",e,n,s),await M(),t.each(n,(function(t,e){void 0!==r[t]&&void 0!==r[t].change&&n[t]!==s[t]&&r[t].change(_[t])})),o=[],void 0!==a&&(k(a),$(y("setting_changed_from_other_window")+(new Date).toLocaleTimeString(),i)))}))),t(n).on("input","input[gm_setting_key='under_dev']",(function(){p("실험실 기능 온오프 이벤트"),t(this).is(":checked")?t(".GM_setting_under_dev").css("opacity",0).slideDown("fast").animate({opacity:1},{queue:!1,duration:"fast"}):t(".GM_setting_under_dev").css("opacity",1).slideUp("fast").animate({opacity:0},{queue:!1,duration:"fast"})}))}(),GM.addStyle('\n#GM_setting .btn {font-size:12px;}\n.GM_setting_autosaved.btn {\n    max-width:100%;\n    font-size:12px;\n    white-space:pre-wrap;\n    user-select:text;\n}\n#GM_setting .btn-xxs {\n    cursor: pointer;\n    padding: 4px 4px;\n}\n#GM_setting label.btn-xxs {\n    box-sizing: content-box;\n    width:11px;\n    height:11px;\n}\n#GM_setting a{\n    color: #428bca;\n    text-decoration: none;\n}\n#GM_setting a:hover, #GM_setting a:focus {\n    color: #2a6496;\n    text-decoration: underline;\n}\n#GM_setting {clear:both;margin-left:auto; margin-right:auto; padding:0;max-width:1400px; min-width:750px; box-sizing:content-box;}\n#GM_setting, #GM_setting table {font-size:13px;}\n#GM_setting_head{margin-left:auto; margin-right:auto; padding:20px 0px 10px 10px;font-size:18px;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}\n#GM_setting li {display:flex;list-style:none;margin:0px;padding:10px;border-top:1px solid #eee;}\n\n#GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:30px;padding-top:10px;}\n#GM_setting li[GM_setting_key=\'version_check\'] {margin-top:0px !important}\n\n#GM_setting .GM_setting_category_name{display:block;box-sizing:border-box;padding:0 0 0 0px;font-weight:700;vertical-align:top;flex:0 0 100px;}\n#GM_setting .GM_setting_category_blank{display:block;box-sizing:border-box;padding:0 0 0 0px;vertical-align:top;flex:0 0 100px;}\n\n#GM_setting .GM_setting_list_head{display:block;box-sizing:border-box;vertical-align:top;flex:1 0 315px;}\n#GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:10px;}\n#GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:40px;}\n#GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:70px;}\n#GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:100px;}\n#GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:130px;}\n\n#GM_setting .GM_setting_title{display:block;font-weight:700;}\n#GM_setting .GM_setting_desc{display:block;font-size:11px;}\n\n#GM_setting .GM_setting_input_container {display:block;box-sizing:border-box;padding:0 0 0 30px;vertical-align:top;flex:1 1 100%;}\n#GM_setting .GM_setting_input_container span{vertical-align:top;}\n#GM_setting .GM_setting_input_container span.btn{margin:0 0 0 10px;}\n#GM_setting input{display:inline}\n#GM_setting input[type="text"]{ width: 100px; height: 30px; padding: 5px 5px; font-size:12px; }\n#GM_setting textarea{ width: 250px; height: 30px; padding: 5px 5px; font-size:12px; }\n#GM_setting input[type="checkbox"] { display:none; width: 20px;height:20px; padding: 0; margin:0; }\n#GM_setting input[type="radio"] {width: 20px;height:20px; padding: 0; margin:0; }\n\n#GM_setting .radio-inline{ padding-left:0; padding-right:10px; }\n#GM_setting .radio-inline input{ margin:0 5px 0 0; }\n\n#GM_setting table {margin:0; width:100%;}\n#GM_setting th, #GM_setting td {height: 24px;}\n#GM_setting table th, #GM_setting table td{padding:2px 5px;}\n#GM_setting table th {border: 1px solid; border-color: inherit;}\n#GM_setting .table_btn_container {white-space: nowrap; vertical-align:middle; width:24px; font-size:14px; padding:0; text-align:center;}\n#GM_setting .table_btn_container span {padding:0}\n#GM_setting table input[type="text"] {padding:1px 2px; height:auto; width:100%; margin-left:auto; margin-right:auto;}\n\n#GM_setting .GM_setting_item_disable, #GM_setting .GM_setting_item_disable .GM_setting_title, #GM_setting .GM_setting_item_disable .GM_setting_desc{color:#ccc !important}\n#GM_setting .invalid input, #GM_setting .invalid textarea{border-color:#dc3545;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;color:#dc3545;}\n#GM_setting .invalid input:focus, #GM_setting .invalid textarea:focus{border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220,53,69,.25);outline:0;color:#dc3545;}\n#GM_setting .invalid {color:#dc3545}\n#GM_setting .invalid_text {font-size:12px;padding:5px 0 0 5px;}\n\n#GM_setting .GM_setting_under_dev .GM_setting_title{color:#6441a5;font-style:italic}\n\n#GM_setting .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/\n#GM_setting .btn-xxs .glyphicon{}\n#GM_setting .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}\n#GM_setting .btn-xxs.active span.glyphicon {opacity: 0.9;}\n#GM_setting .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}\n\n#GM_setting_footer { padding: 30px 0 30px 0; margin: 30px 0 0 0; border-top: 1px solid #ccc; text-align: center; font-size:13px; letter-spacing:0.2px; }\n#GM_setting_footer .footer_divider { margin: 0 5px; display: inline-block; width: 1px; height: 13px; background-color: #ebebeb; }\n\n#GM_setting .cp {cursor:pointer}\n\n#GM_setting .form-group {margin-bottom:0px;}\n')},load:async function(){p("GM_setting - load"),await M()},save:async function(){p("GM_setting - save"),await G()},save_overwrite:async function(){var n=_,i=e[s];p("_settings",r),t.each(n,(function(t,e){void 0!==r[t]&&void 0!==r[t].change&&n[t]!==i[t]&&r[t].change(i[t])})),_=e[s],p("GM_setting - save_overwrite"),await G()},reset:async function(){await GM.setValue(s,l),await M()},createlayout:function(t){a=t,k(t)},getType:function(t){return void 0!==r[t]?r[t].type:void 0},message:function(t,e){$(t,e)}}}(jQuery,window,document);

    const _settings = {
        boardBlock: {
            category: "general",
            category_name: "General",
            depth: 1,
            type: "checkbox",
            value: true,
            title: "포텐 터진 게시판 별 차단 기능 사용",
            desc: "포텐 터진 게시판에서 특정 게시판의 글을 숨김"
        },
        blockListBoard: {
            disable:true,
            category: "general",
            depth: 2,
            type: "object",
            value: {},
            title: "차단된 게시판 리스트",
            desc: "각 게시판에서 X 버튼을 눌러 추가/삭제 가능",
            autosavepass: true
        },
        boardBlockText: {
            category: "general",
            depth: 1,
            type: "checkbox",
            value: false,
            title: "포텐 터진 게시판 이름 키워드 차단",
            desc: "각 포텐글의 <strong>게시판 이름 or 카테고리 이름에서</strong><br />지정 키워드 감지 시 해당 게시글을 목록에서 숨김"
        },
        blockTextArrayBoard: {
            category: "general",
            depth: 2,
            type: "tag", valid:"array_word",
            value: [],
            title: "차단 키워드",
            desc: "콤마로 구분",
            placeholder: "공부, 농구 - NBA, 축구소식 - 번역기사, 스토브리그"
        },
        boardBlockTitle: {
            category: "general",
            depth: 1,
            type: "checkbox",
            value: false,
            title: "게시글 제목 키워드 차단",
            desc: "모든 게시판의 <strong>게시글 제목</strong>에서<br />지정 키워드 감지 시 해당 게시글을 목록에서 숨김"
        },
        blockTextArrayTitle: {
            category: "general",
            depth: 2,
            type: "tag", valid:"array_word",
            value: [],
            title: "차단 키워드",
            desc: "콤마로 구분",
            placeholder: "고양이, 떼껄룩, [스타리그], 스카이스포츠"
        },
        kk: {
            category: "others",
            category_name: "Others",
            depth: 1,
            type: "checkbox",
            value: true,
            title: "포텐 터진 게시판에서 크킹을 강조",
            desc: "크킹 카테고리의 경우 제목에 [크킹]을 포함시킵니다"
        },
        boardBlockUserCode: {
            category: "user",
            category_name: "[실험실]<br />유저 관리",
            depth: 1,
            type: "checkbox",
            value: false,
            title: "[실험실] 유저 관리 기능 사용",
            desc: "모든 게시판에서 유저 메모 및 차단 기능 사용<br />- 유저 닉네임 클릭 후 [메모하기] 또는 [차단하기] 버튼을 눌러 대상 유저 리스트에 추가 가능.<br /><br /><strong>캠페인: 메모 기능은 단순히 메모장을 대체할 뿐입니다. 메모 기능 및 메모 내용을 언급하지 말고 개인적인 용도로 혼자 조용히 사용해주세요.</strong>"
        },
        blockTextArrayUserCode: {
            category: "user",
            depth: 2,
            type: "table",
            head: ["Code", "Nick", "Memo", "Block?"],
            value: [],
            title: "대상 유저",
            desc: "- Code 는 각 유저가 가지는 고유값을 의미<br />- Nick은 스크립트가 변경을 감지한 경우 자동 갱신하므로, 필요한 경우 이전 닉네임을 메모에 기록해둘 것<br />- Block? 이 true 인 경우 Code 에 해당되는 게시글을 목록에서 숨김.",
        },
        blockTextArrayUserCodeAndNick: {
            category: "user",
            depth: 2,
            type: "checkbox",
            value: true,
            title: "유저 닉네임으로도 차단",
            desc: "본 옵션 체크 시 닉네임이 완벽하게 일치하는 게시글도 목록에서 숨김(포텐 터진 게시판 - 이미지 형식인 경우 글목록에서 고유 코드를 알 수 없어 닉네임으로만 차단 가능)"
        },
        // boardBlockUserCodeBoardListFullMemo: {
        //     category: "user",
        //     depth: 2,
        //     type: "checkbox",
        //     value: false,
        //     title: "메모 아이콘 대신 메모 내용을 표시",
        //     desc: "메모 아이콘 대신 내용을 직접 표시합니다."
        // },
        boardBlockUserName: {
            under_dev:true,
            category: "user",
            category_name: "유저 차단",
            depth: 1,
            type: "checkbox",
            value: false,
            title: "유저 이름 키워드 차단",
            desc: "모든 게시판의 <strong>유저 닉네임</strong>에서<br />지정 키워드 감지 시 해당 게시글을 목록에서 숨김"
        },
        blockTextArrayUserName: {
            under_dev:true,
            category: "user",
            depth: 2,
            type: "tag", valid:"array_word",
            value: [],
            title: "차단 키워드",
            desc: "콤마로 구분",
            placeholder: "유저닉네임예시1, 유저닉네임예시2"
        },
        boardBlockUserNamePerfectMatchOnly: {
            under_dev:true,
            category: "user",
            depth: 2,
            type: "checkbox",
            value: false,
            title: "완벽 일치의 경우에만 차단",
            desc: "차단 키워드와 닉네임이 완벽하게 일치하는 경우에만 차단"
        },
        debug: {
            category: "advanced",
            category_name: "Advanced",
            depth: 1,
            type: "checkbox",
            value: false,
            title: "DEBUG 모드",
            desc: "차단되는 항목을 시각적으로 표시"
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
    // Initialize
    ////////////////////////////////////////////////////////////////////////////////////
    window.GM_setting = GM_setting;
    await GM_setting.init("GM_SETTINGS", {"DEBUG":DEBUG, "SETTINGS":_settings, "CONSOLE_MSG":NOMO_DEBUG, "MULTILANG":false});

    var whiteList = ["best", "best2"];
    var blockListBoard = GM_SETTINGS.blockListBoard; // await GM.getValue("blockListBoard", {}); // {"baseball":"야구"};
    var blockTextArrayBoard = GM_SETTINGS.blockTextArrayBoard; //await GM.getValue("blockTextArrayBoard", ["소식", "자동차", "유머"]); // ["야구", "이슈"];
    var blockTextArrayTitle = GM_SETTINGS.blockTextArrayTitle; //await GM.getValue("blockTextArrayTitle", ["트와이스"]); // ["리버풀"];
    var blockTextArrayUserName = GM_SETTINGS.blockTextArrayUserName;

    var blockTextObjUserCode = {};   // 마지막 닉네임 업데이트 용
    for(var i=0;i<GM_SETTINGS.blockTextArrayUserCode.length;i++){
        blockTextObjUserCode[GM_SETTINGS.blockTextArrayUserCode[i][0]] = {
            "nick": String(GM_SETTINGS.blockTextArrayUserCode[i][1]),
            "memo": String(GM_SETTINGS.blockTextArrayUserCode[i][2]),
            "block": String(GM_SETTINGS.blockTextArrayUserCode[i][3]) === "true"
        };
    }
    // var blockListCategory = {"humor":{"id":"1899663","name":"유머 - 이슈"}}

    GM.addStyle(`
        .border_red_important {
            border:2px solid red !important;
        }
        .border_red_important td {
            border-top:2px solid red !important;
            border-bottom:2px solid red !important;
        }
        .addonBlock {
            opacity:0.5;margin-left:0.1em;cursor:pointer;
        }

        #GM_setting table{
            font-size:11px;
        }
        #GM_setting .GM_setting_list_head{
            flex:1 0 250px !important;
        }

        .fmbmemo_container{position:relative}
        .fmbmemo_container .fmbmemo.iconMemo {
            font-size:13px;
            position: absolute;           
            top: 0;
            left: -16px;
            padding: 8px 0 0 0;
            color:rgba(0,0,0,0.6);
        }
        .fmbmemo_container .fmbmemo.fullMemo{
            font-size:9px;
            display: block;
            max-width: 125px;
            text-overflow: ellipsis;
            vertical-align: text-bottom;
        }

        .fmbmemo.iconMemo{
            font-size:13px;
        }
        .fmbmemo.fullMemo{
            font-size:12px;
            font-weight:bold;
        }

        .fmbmemo {
            display: inline-block;
            color: red;
            padding: 0 0 0 3px;
            margin: 0;
            letter-spacing: 0;
        }
        .bd td .fmbmemo, .bd_tb_lst .author span .fmbmemo{
            display: inline-block;
            overflow:visible;
            padding-left:3px;
        }
        /*
            css-only-tooltip version 1.0.0
            ⓒ 2015 AHN JAE-HA http://github.com/eu81273
            MIT License
        */
        [data-tooltip-text]:hover {
            position: relative;
        }

        [data-tooltip-text]:after {
            -webkit-transition: bottom .3s ease-in-out, opacity .3s ease-in-out;
            -moz-transition: bottom .3s ease-in-out, opacity .3s ease-in-out;
            transition: bottom .3s ease-in-out, opacity .3s ease-in-out;

            background-color: rgba(0, 0, 0, 0.8);

        -webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
            -moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
            box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
            
        -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            
        color: #FFFFFF;
            font-size: 12px;
            margin-bottom: 10px;
            padding: 7px 12px;
            position: absolute;
            width: max-content;
            min-width: 30px;
            max-width: 150px;
            word-wrap: break-word;
            white-space: break-spaces;

            z-index: 9999;

            opacity: 0;
            left: -9999px;
            top: 90%;
            
            content: attr(data-tooltip-text);
        }

        [data-tooltip-text]:hover:after {
            top: 130%;
            left: 0;
            opacity: 1;
        }
    `);

    function isBlock(board, category){
        if(board === undefined){
            return false;
        }

        if(category === undefined){
            return blockListBoard[String(board)] !== undefined;
        }
        else{
            // 
        }
    }

    // match_option - false : search, true: perfect match
    function isBlockTextGeneral(text, ary, match_option){
        for(var i=0;i<ary.length;i++){
            if(match_option){
                if(text == ary[i]){
                    return true;
                }
            }
            else{
                if(text.indexOf(ary[i]) !== -1){
                    return true;
                }
            }
        }
        return false;
    }

    // 게시판 block 버튼 클릭 시 작동
    $(document).on("click", ".addonBlock", async function(e){
        var $target = $(e.target);
        var board = $target.data("board");
        var blocked = isBlock(board);//$target.data("blocked");
        var boardname = $target.data("boardname");
        if(board !== undefined && board !== "undefined"){
            if(blocked){
                delete blockListBoard[String(board)];
                GM_SETTINGS.blockListBoard = blockListBoard;
                await GM_setting.save();
                $target.css("color","gray");
            }
            else {
                blockListBoard[String(board)] = boardname;
                GM_SETTINGS.blockListBoard = blockListBoard;
                await GM_setting.save();
                $target.css("color","red");
            }
            console.log(board, blocked, blockListBoard);
        }
    });

    async function control(input){
        var pathname = input.pathname;
        var $v = input.$v;
        var $title = input.$title;
        var title = String(input.title);
        var $boardA = input.$boardA;
        var $category = input.$category;
        var categoryText = String(input.categoryText);
        var userName = String(input.userName);
        var $userName = input.$userName;
        var userCode = String(input.userCode);
        var isBest = input.isBest;

        await checkLastNickAndSave(userCode, userName);

        // 4. 유저 고유 코드에서 체크
        if(GM_SETTINGS.boardBlockUserCode && blockTextObjUserCode[userCode] !== undefined){
            var savedNick = blockTextObjUserCode[userCode].nick;
            var isBlocked = blockTextObjUserCode[userCode].block;
            
            // 유저 고유 코드에서 체크
            if(isBlocked){
                if(GM_SETTINGS.debug){
                    console.log("유저 고유 코드에서 체크", true, userCode);
                    $userName.css("background-color","rgba(255,0,0,0.3)").append(`<span style="color:red">(blocked by code)</span>`);
                }
                else{
                    $v.hide();
                    return true;
                }
            }

            // 유저 고유 코드의 닉네임에서 체크
            if(isBlocked && GM_SETTINGS.blockTextArrayUserCodeAndNick && savedNick === userName){
                if(GM_SETTINGS.debug){
                    console.log("유저 고유 코드의 닉네임에서 체크", true, userCode, userName);
                    $userName.css("background-color","rgba(255,0,0,0.3)").append(`<span style="color:red">(blocked by nick)</span>`);
                }
                else{
                    $v.hide();
                    return true;
                }
            }
        }

        // 5. 유저 이름에서 체크 (현재 숨겨짐)
        if(GM_SETTINGS.boardBlockUserName && isBlockTextGeneral(userName, blockTextArrayUserName, GM_SETTINGS.boardBlockUserNamePerfectMatchOnly)){
            if(GM_SETTINGS.debug){
                console.log("유저 이름에서 체크", true, userName);
                $userName.css("background-color","rgba(255,0,0,0.3)").append(`<span style="color:red">(by nick)</span>`);
            }
            else{
                $v.hide();
                return true;
            }
        }


        // 1. 카테고리 리스트에서 체크
        var board = String(pathname).replace("/", "");
        if(GM_SETTINGS.boardBlock && isBest && isBlock(board)){
            if(GM_SETTINGS.debug){
                $v.addClass("border_red_important");
            }
            else{
                $v.hide();
                return true;
            }
        }

        // 2. 카테고리 글자에서 체크
        if(isBest && GM_SETTINGS.boardBlockText && isBlockTextGeneral(categoryText, blockTextArrayBoard, false)){
            if(GM_SETTINGS.debug){
                console.log("카테고리 글자에서 체크", true, title);
                $category.css("background-color","rgba(255,0,0,0.3)");
            }
            else{
                $v.hide();
                return true;
            }
        }

        // 3. 게시글 제목에서 체크
        if(GM_SETTINGS.boardBlockTitle && isBlockTextGeneral(title, blockTextArrayTitle, false)){
            if(GM_SETTINGS.debug){
                console.log("카테고리 글자에서 체크", true, title);
                $title.css("background-color","rgba(255,0,0,0.3)");
            }
            else{
                $v.hide();
                return true;
            }
        }
        
        return true;
    }

    ///////////////////////////////////////////////
    // menu 버튼 클릭 시 동작
    function FMBtnAction(MemberCode, type){
        // 닉 찾기
        var $author = $(`.member_${MemberCode}`);
        var Nick = "알 수 없음";
        if($author.length !== 0){
            Nick = $author.first().text();
        }
        else{
            $author = $(`.onlylevel_${MemberCode}`);
            if($author.length !== 0){
                Nick = $author.first().text();
            }
        }

        var prevmemo = "";
        var prevblock = false;
        var userIndex = getUserIndexFromBlockTextArrayUserCode(MemberCode);
        if(userIndex !== -1){
            prevmemo = GM_SETTINGS.blockTextArrayUserCode[userIndex][2];
            prevblock = GM_SETTINGS.blockTextArrayUserCode[userIndex][3] === "true";
        }
        var confirmed;

        // Memo 하기
        if(type == 0){
            confirmed = prompt(`UserCode: ${MemberCode}, Nick: ${Nick} 에 대해 메모 내용을 추가하세요`, prevmemo);
            if(confirmed !== null){
                if(confirmed === "" && !prevblock){
                    if(userIndex === -1){
                        //alert("취소 됨");
                    }
                    else{
                        GM_SETTINGS.blockTextArrayUserCode.splice(userIndex, 1);
                        GM_setting.save();
                        alert("메모가 삭제되었습니다. 새로고침 한 이후부터 적용됩니다.");
                    }
                }
                else{
                    if(userIndex === -1){
                        GM_SETTINGS.blockTextArrayUserCode.push([MemberCode, Nick, confirmed, String(prevblock)]);
                    }
                    else{
                        GM_SETTINGS.blockTextArrayUserCode[userIndex] = [MemberCode, Nick, confirmed, String(prevblock)];
                    }
                    GM_setting.save();
                    alert(`메모 저장 됨. 새로고침 한 이후부터 적용됩니다. Memo: ${confirmed}`);
                }
            }
            else{
                //alert("취소 됨");
            }

        }
        // 차단하기
        else{
            // 차단 리스트에 추가
            if(prevblock){
                alert(`UserCode: ${MemberCode}, Nick: ${Nick} 는 이미 차단되어 있습니다. Memo: ${prevmemo}`);
            }
            else{
                confirmed = confirm(`UserCode: ${MemberCode}, Nick: ${Nick} - 차단할까요?${prevmemo === "" ? "" : " (Memo:"+prevmemo+")"}`);
                if(confirmed){
                    var memo = (prevmemo === "" ? "" : prevmemo + "|") + `차단 일시:${timestamp()}, 닉네임: ${Nick}`;
                    if(userIndex === -1){
                        GM_SETTINGS.blockTextArrayUserCode.push([MemberCode, Nick, memo, "true"]);
                    }
                    else{
                        GM_SETTINGS.blockTextArrayUserCode[userIndex] = [MemberCode, Nick, memo, "true"];
                    }
                    GM_setting.save();
                    alert(`차단 됨. 새로고침 한 이후부터 적용됩니다. Memo: ${memo}`);
                }
                else{
                    //alert("취소 됨");
                }
            }

        }
    }

    $(document).ready(function(){
        ///////////////////////////////////////////////
        // override displayPopupMenu
        unsafeWindow.oriDisplayPopupMenu = unsafeWindow.XE.displayPopupMenu;
        unsafeWindow.XE.displayPopupMenu = function(){
            unsafeWindow.oriDisplayPopupMenu.apply(this, arguments);

            var $ul = $("#popup_menu_area ul");
            if($ul.length == 0) return;

            var $firsta = $ul.find("a").first();
            if($firsta.length == 0) return;

            var matchMemberCode = $firsta.attr("href").match(/(?:member_|receiver_|search_keyword)srl=(\d+)/);
            console.log(matchMemberCode);
            if(matchMemberCode === null || matchMemberCode.length < 1) return;
            var MemberCode = matchMemberCode[1];

            var $FMMemoBtn = $(`<li style="cursor:pointer;">메모하기(by FM-Block)</li>`);
            $FMMemoBtn.on("click", ()=>{
                FMBtnAction(MemberCode, 0);
            });
            $ul.append($FMMemoBtn);

            var $FMBlockBtn = $(`<li style="cursor:pointer;">차단하기(by FM-Block)</li>`);
            $FMBlockBtn.on("click", ()=>{
                FMBtnAction(MemberCode, 1);
            });
            $ul.append($FMBlockBtn);
        };
        

        // 각 게시판 star 우측에 X 버튼 달기
        $("h1 a.star").each(function(i,v){
            var $v = $(v).first();
            var pathname = $v.prev().get(0).pathname;
            var boardname = $v.prev().get(0).innerText;
            if(pathname !== undefined && $.inArray(String(pathname).replace("/",""), whiteList) === -1){
                var board = pathname.split("/").pop();
                if(board !== undefined){
                    var isBlocked = isBlock(board);
                    $v.after(`<span class="addonBlock" style="color:${isBlocked ? "red" : "gray"};" data-boardname="${boardname}" data-blocked="${isBlocked}" data-board="${board}">X</span>`);
                }
            }
        });

        // 포텐 터짐 최신순 우측 게시판 이름에 X 버튼 달기
        $(".pop_more .mid").each(function(i,v){
            var $v = $(v).first();
            var pathname = $v.attr("href");
            var boardname = $v.get(0).innerText;
            if(pathname !== undefined && pathname !== "/best"){
                var board = pathname.split("/").pop();
                if(board !== undefined){
                    var isBlocked = isBlock(board);
                    $v.after(`<span class="addonBlock" style="color:${isBlocked ? "red" : "gray"};" data-boardname="${boardname}" data-blocked="${isBlocked}" data-board="${board}">X</span>`);
                }
            }
        });
    });


    ///////////////////////////////////////////////
    // main 포텐글 처리
    var isBest = (document.location.href === "https://www.fmkorea.com" || document.location.href === "https://www.fmkorea.com/" || document.location.href.indexOf("www.fmkorea.com/index.php?mid=best") !== -1 || document.location.href.indexOf("www.fmkorea.com/best") !== -1);
    // list style 의 경우
    //var $tr = $("table.bd_lst tr");
    //$tr.each(function(i,v){
    $(document).arrive("table.bd_lst tr", { onlyOnce: true, existing: true }, function (v) {
        try {
            var $v = $(v);
            if($v.hasClass("notice") || $v.hasClass("fired")){
                return true;
            }
            $v.addClass("fired");
            var $category = $v.find("td").first();
            var $boardA = $category.find("a");
            var categoryText = $boardA.get(0).innerText;
            var pathname = $boardA.attr("href");
            var $title = $v.find("td.title a").first();
            var title = $title.get(0).innerText;
            var $userName = $v.find(".author a").first();
            var userName = $userName.text();

            var userCode = -1;
            var userNameClassAry = $userName.attr('class').split(/\s+/);
            for(var j=0; j<userNameClassAry.length; j++){
                if(userNameClassAry[j].indexOf("member_") !== -1){
                    userCode = Number(userNameClassAry[j].replace("member_",""));
                    break;
                }
            }

            var input = {
                "pathname" : pathname,
                "$v" : $v,
                "$title" : $title,
                "title" : title,
                "$userName" : $userName,
                "userName" : userName,
                "userCode" : userCode,
                "$boardA" : $boardA,
                "$category" : $category,
                "categoryText" : categoryText,
                "isBest" : isBest
            };
            return control(input);
        }
        catch(e){
            return true;
        }
    });

    // 포텐 - webzine style 의 경우
    //$("li.li").each(function(i,v){
    $(document).arrive("li.li", { onlyOnce: true, existing: true }, function (v) {
        try {
            var $v = $(v);
            if($v.hasClass("fired")){
                return true;
            }
            $v.addClass("fired");

            var $category = $v.find("span.category");
            var $boardA = $category.find("a");
            var categoryText = $category.get(0).innerText;
            var pathname = $boardA.attr("href");
            var $title = $v.find("h3.title").first();
            var title = $title.get(0).innerText;
            var $userName = $v.find(".author").first();
            var userName = $userName.text().replace(/^ \/ /,"");
            var userCode = -1;
            
            if(GM_SETTINGS.kk){
                if(categoryText.indexOf("크킹") !== -1){
                    title = "[크킹]" + title;
                    $title.html(`<span>[크킹]</span>` + $title.html());
                }
            }

            var input = {
                "pathname" : pathname,
                "$v" : $v,
                "$title" : $title,
                "title" : title,
                "$userName" : $userName,
                "userName" : userName,
                "userCode" : userCode,
                "$boardA" : $boardA,
                "$category" : $category,
                "categoryText" : categoryText,
                "isBest" : isBest
            };

            return control(input);
        }
        catch(e){
            return true;
        }
    });

    // 주간 포텐, 월간 포텐
    //$("ul.mpReset li").each(function(i,v){  
    $(document).arrive("ul.mpReset li", { onlyOnce: true, existing: true }, function (v) {
        try {
            var $v = $(v);
            if($v.hasClass("fired")){
                return true;
            }
            $v.addClass("fired");

            var $category = undefined;
            var $boardA = undefined;
            var categoryText = "";
            var pathname = $v.attr("href");
            var $title = $v.find("a.title");
            var title = $title.get(0).innerText;
            
            var input = {
                "pathname" : pathname,
                "$v" : $v,
                "$title" : $title,
                "title" : title,
                "$boardA" : $boardA,
                "$category" : $category,
                "categoryText" : categoryText,
                "isBest" : isBest
            };
            return control(input);
        }
        catch(e){
            return true;
        }
    });

    // 디버그 관련
    if(GM_SETTINGS.debug && isBest){
        $("li.li .category").each(function(i,v){
            var $v = $(v).find("a").first();
            var pathname = $v.attr("href");
            var boardname = $v.get(0).innerText;
            if(pathname !== undefined && pathname !== "/best"){
                var board = pathname.split("/").pop();
                if(board !== undefined){
                    var isBlocked = isBlock(board);
                    $v.after(`<span class="addonBlock" style="color:${isBlocked ? "red" : "gray"};" data-boardname="${boardname}" data-blocked="${isBlocked}" data-board="${board}">X</span>`);
                }
            }
        });
    }


    function getUserIndexFromBlockTextArrayUserCode(UserCode){
        for(var i=0;i<GM_SETTINGS.blockTextArrayUserCode.length;i++){
            if(GM_SETTINGS.blockTextArrayUserCode[i][0] === UserCode){
                return i;
            }
        }
        return -1;
    }

    async function checkLastNickAndSave(code, nick){
        if(blockTextObjUserCode[code] === undefined) return;
        if(blockTextObjUserCode[code].nick !== nick){
            if(GM_SETTINGS.debug){
                console.log(`Nick 변경 감지됨. old: ${blockTextObjUserCode[code].nick}, new: ${nick}`);
            }
            for(var i=0;i<GM_SETTINGS.blockTextArrayUserCode.length;i++){
                if(GM_SETTINGS.blockTextArrayUserCode[i][0] === code){
                    GM_SETTINGS.blockTextArrayUserCode[i][1] = nick;
                }
            }
            await GM_setting.save();
        }
    }

    // 메모 달기
    function appendMemo($targetElem, code, type){
        var savedMemo = blockTextObjUserCode[code].memo;
        var block = blockTextObjUserCode[code].block;
        var modifiedMemo = `${block ? "차단됨|" : ""}${savedMemo}`;
        if(modifiedMemo.length > 13){
            modifiedMemo = modifiedMemo.substr(0,13) + "...";
        }
        var appendedText = "";

        // 메모 내용이 없는 경우 return
        if(modifiedMemo === ""){
            return;
        }
        
        // if(GM_SETTINGS.boardBlockUserCodeBoardListFullMemo){
        //     appendedText = `<div data-tooltip-text="${savedMemo}" class='fmbmemo fullMemo'> (${modifiedMemo})</div>`;
        // }
        // else{
        //     appendedText = `<div data-tooltip-text="${savedMemo}" class="fmbmemo iconMemo" style="cursor:default">💬</div>`;
        // }
        appendedText = `<div data-tooltip-text="${savedMemo}" class='fmbmemo fullMemo'> (${modifiedMemo})</div>`;

        switch(type){
        case 0:
            $targetElem.each(function(i,v){
                var $v = $(v);
                var $author = $v.closest("td.author");
                if($author.length !== 0){
                    $author.addClass("fmbmemo_container");
                    appendedText = `<div data-tooltip-text="${savedMemo}" class="fmbmemo iconMemo" style="cursor:default">💬</div>`;
                    $author.append(appendedText);
                }
                else{
                    $v.after(appendedText);
                }
            });
            break;
        case 1:
            $targetElem.after(appendedText);
            break;
        default:
            break;
        }

    }
    if(GM_SETTINGS.boardBlockUserCode){
        $(document).arrive("#bd_capture .btm_area", { onlyOnce: true, existing: true }, function (elem) {
            var $elem = $(elem);
            if($elem.hasClass("fired")) return;
            
            $elem.addClass("fired");

            setTimeout(function(){
                for(let code in blockTextObjUserCode){
                    // 글 보기 화면에서 닉네임 우측
                    let $members = $elem.find(`.member_${code}`);
                    if($members.length == 0) {
                        $members = $elem.find(`.onlylevel_${code}`);
                    }
                    if($members.length == 0) continue;
                    appendMemo($members, code, 1);
                }
            },1);
        });

        $(document).arrive("#cmtPosition li, td.author", { onlyOnce: true, existing: true }, function (elem) {
            var $elem = $(elem);
            if($elem.hasClass("fired")) return;
            
            $elem.addClass("fired");

            setTimeout(function(){
                for(let code in blockTextObjUserCode){
                    let $members = $elem.find(`.member_${code}`);
                    if($members.length == 0) continue;
    
                    appendMemo($members, code, 0);
                }
            },1);
        });
    }

    function timestamp(){
        var today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }
    
    // 설정 메뉴 추가 및 관리
    if(typeof GM.registerMenuCommand === "function"){
        GM.registerMenuCommand("상세 설정 열기", openSettingsMenu);
    }
    function openSettingsMenu(){
        try{
            if(document === undefined){
                NOMO_DEBUG("Document is undefined from openSettingsMenu");
                return;
            }
            NOMO_DEBUG("msg from openSettingsMenu");
            var GM_Setting_Bootstrap = 'GM_Setting_Bootstrap';
            $("#nomo_settings_container").remove();

            var $container = $( /*html*/ `
            <div id="nomo_settings_container" style="display:none;cursor:pointer;position:fixed;top:0;left:0;width:100%;height:100%;z-index:200000;background:rgba(0,0,0,0.93);">
                <div id="nomo_settings"></div>
            </div>`).appendTo("body");
            $container.on("click", function () {
                $("#GM_Setting_css_temp").remove();
                $("#GM_Setting_Bootstrap").remove();
                $(this).fadeOut(500, function () {
                    $(this).remove();
                });
            });
            $container.find("#nomo_settings").on("click", function (e) {
                e.stopPropagation();
            });

            /*!
            * Bootstrap v3.1.1 (http://getbootstrap.com)
            * Copyright 2011-2014 Twitter, Inc.
            * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
            */
            if (!document.getElementById(GM_Setting_Bootstrap)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = GM_Setting_Bootstrap;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css';
                link.media = 'all';
                head.appendChild(link);
            }
            if ($("#GM_Setting_css_temp").length == 0){
                $("head").append(`<style id='GM_Setting_css_temp' rel='stylesheet' type='text/css'>ul, ol{margin:0; padding:0 !important;}
                #nomo_settings::-webkit-scrollbar { width: 8px; height: 8px; background: #eee; }
                #nomo_settings::-webkit-scrollbar-thumb { background: #ccc; }
                #nomo_settings {
                    background:#fff;
                }
                body.night_mode #nomo_settings {
                    border: 1px solid #333;
                    cursor:default;font-size:12px;max-width:850px;max-height:calc(100% - 40px);margin:20px auto;padding:10px 20px;border-radius:5px;overflow-y:scroll;
                }
                body.night_mode #GM_setting, body.night_mode #nomo_settings, body.night_mode #GM_setting_container {
                    color:#ccc;
                    background-color:#121212;
                }
                body.night_mode #nomo_settings .table-hover>tbody>tr:hover>td,
                body.night_mode #nomo_settings .table-hover>tbody>tr:hover>th{
                    color:#ccc;
                    background-color:#121212;
                }
                body.night_mode #nomo_settings .table-striped>tbody>tr:nth-child(odd)>td,
                body.night_mode #nomo_settings .table-striped>tbody>tr:nth-child(odd)>th{
                    background-color:#151515;
                }

                body.night_mode #GM_setting li
                ,body.night_mode #GM_setting .GM_setting_depth1.GM_setting_category
                ,body.night_mode #GM_setting .table-bordered
                ,body.night_mode #GM_setting tr
                ,body.night_mode #GM_setting td
                ,body.night_mode #GM_setting th
                ,body.night_mode #GM_setting_footer
                {
                    border-color:#303030;
                }

                body.night_mode #GM_setting textarea{
                    color:#ccc;
                    border-color:#303030;
                    background-color:#202020;
                }

                body.night_mode #nomo_settings::-webkit-scrollbar { width: 8px; height: 8px; background: #505050; }
                body.night_mode #nomo_settings::-webkit-scrollbar-thumb { background: #353535; }

                body{overflow-y:hidden;}</style>`);
            }

            $("#nomo_settings_container").fadeIn(500);
            GM_setting.createlayout($("#nomo_settings"));
        }
        catch(e){
            NOMO_DEBUG("Error from openSettingsMenu function", e);
        }
    }
})();