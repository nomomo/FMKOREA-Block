// ==UserScript==
// @name        FMKOREA-Block
// @namespace   FMKOREA-Block
// @version     0.0.1
// @description FMKOREA-Block
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
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// ==/UserScript==

(async function() {
    'use strict';
    var DEBUG = false;

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

    /* GM_setting */
    var GM_setting = (function ($, global, document) { // 
        NOMO_DEBUG("GM_setting 시작");
        // local vars
        var $g_elem;
        var name_ = "";
        var changed_key = [];
        const settings_full = {
            boardBlock: {
                category: "general",
                category_name: "General",
                depth: 1,
                type: "checkbox",
                value: true,
                title: "포텐 터진 게시판의 게시판 별 차단 기능 사용",
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
                title: "포텐 터진 게시판의 게시판 별 키워드 차단",
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
                desc: "포텐 터진 게시판의 <strong>게시글 제목</strong>에서<br />지정 키워드 감지 시 해당 게시글을 목록에서 숨김"
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
            boardBlockTitleEverywhere: {
                category: "general",
                depth: 2,
                type: "checkbox",
                value: false,
                title: "모든 게시판에 적용",
                desc: "포텐 게시판 이외의 게시판에서도<br />게시글 제목에서 지정 키워드 감지 시<br />해당 게시글을 목록에서 숨김"
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
        var settings_init = {};
        var settings = {};
        var $inputs = {};

        /////////////////////////////////////////////////
        // private functions
        var init_event_ = async function () {
        };
        var init_ = async function () {
            init_event_();

            for (var key in settings_full) {
                settings_init[key] = settings_full[key].value;
            }

            await load_();
            if (!hasSameKey_(settings_init, settings)) {
                // 추가
                for (key in settings_init) {
                    if (settings[key] === undefined) {
                        settings[key] = settings_init[key];
                    }
                }
                // 삭제
                for (key in settings) {
                    if (settings_init[key] === undefined) {
                        delete settings[key];
                    }
                }
                await save_();
            }
        };
        var save_ = async function () {
            //NOMO_DEBUG("save_");
            if (name_ !== "") {
                await GM.setValue(name_, settings);
            }
            global[name_] = settings;

            // changed_key: 배열,       인덱스번호, 값(키)
            $.each(changed_key, function (eindex, evalue) {
                if (settings_full[evalue].change !== undefined) {
                    settings_full[evalue].change(settings[evalue]);
                }
            });
            changed_key = [];
        };
        var load_ = async function () {
            NOMO_DEBUG("load_");
            if (name_ !== "") {
                settings = await GM.getValue(name_, settings);
            }
            global[name_] = settings;
        };
        var event_ = async function () {
            if (typeof GM.addValueChangeListener === "function") {
                NOMO_DEBUG("설정에 대한 addValueChangeListener 바인드");
                GM.addValueChangeListener(name_, async function (val_name, old_value, new_value, remote) {
                    if (remote) {
                        NOMO_DEBUG("다른 창에서 설정 변경됨. val_name, old_value, new_value:", val_name, old_value, new_value);
                        await load_();
                        // old_value: obj,       ekey:키, evalue:값(old 설정값)
                        $.each(old_value, function (ekey, _evalue) {
                            if (settings_full[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]) {
                                settings_full[ekey].change(settings[ekey]);
                            }
                        });
                        changed_key = [];
                        // 설정 변경 시 바뀌는 이벤트들
                    }
                });
            }

            $(document).on("click", ".GM_setting_reset", async function () {
                var conf = confirm("Do you really want to reset the settings?");
                if (conf) {
                    await GM_setting.reset();
                    GM_setting.createlayout($g_elem);
                    message_("Reset settings complete! " + (new Date()).toLocaleTimeString(), $g_elem);
                }
            });
            $(document).on("click", ".GM_setting_reset_all", async function () {
                var conf = confirm("Do you really want to reset the script?");
                if (conf) {
                    var listValues = await GM.listValues();
                    for (var key = 0; key < listValues.length; key++) {
                        var key_str = listValues[key];
                        await GM.deleteValue(key_str);
                    }
                    await GM_setting.reset();
                    GM_setting.createlayout($g_elem);
                    message_("Reset script complete! " + (new Date()).toLocaleTimeString(), $g_elem);
                }
            });

            $(document).on("input", "input[gm_setting_key='under_dev']", function () {
                NOMO_DEBUG("실험실 기능 온오프 이벤트");
                var $this = $(this);
                if ($this.is(":checked")) {
                    $(".GM_setting_under_dev").css("opacity", 0).slideDown("fast").animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: "fast"
                    });
                } else {
                    $(".GM_setting_under_dev").css("opacity", 1).slideUp("fast").animate({
                        opacity: 0.0
                    }, {
                        queue: false,
                        duration: "fast"
                    });
                }
            });
        };
        var addStyle_ = function () {
            GM.addStyle( /*css*/ `
    #GM_setting .btn {font-size:12px;}
    .GM_setting_autosaved.btn {
        max-width:100%;
        font-size:0.8em;
        white-space:pre-wrap;
        user-select:text;
    }
    #GM_setting .btn-xxs {
        cursor: pointer;
        padding: 4px 4px;
    }
    #GM_setting label.btn-xxs {
        box-sizing: content-box;
        width:11px;
        height:11px;
    }
    #GM_setting a{
        color: #428bca;
        text-decoration: none;
    }
    #GM_setting a:hover, #GM_setting a:focus {
        color: #2a6496;
        text-decoration: underline;
    }
    #GM_setting {clear:both;margin-left:auto; margin-right:auto; padding:0;font-size:13px;max-width:1400px; min-width:750px; box-sizing:content-box;}
    #GM_setting_head{margin-left:auto; margin-right:auto; padding:1.6em 0px 0.8em 0.8em;font-size:1.5em;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}
    #GM_setting li {list-style:none;margin:0px;padding:0.8em;border-top:1px solid #eee;}

    #GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:20px;padding-top:0.8em;}
    #GM_setting li[GM_setting_key='version_check'] {margin-top:0px !important}

    #GM_setting .GM_setting_category_name{display:table-cell;width:110px;padding:0 0 0 0px;font-weight:700;vertical-align:top;}
    #GM_setting .GM_setting_category_blank{display:table-cell;width:110px;padding:0 0 0 0px;vertical-align:top;}

    #GM_setting .GM_setting_list_head{display:table-cell;box-sizing:content-box;vertical-align:top;}
    #GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:0px;width:300px;}
    #GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:30px;width:270px;}
    #GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:60px;width:240px;}
    #GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:90px;width:210px;}
    #GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:120px;width:180px;}

    #GM_setting .GM_setting_title{display:block;font-weight:700;}
    #GM_setting .GM_setting_desc{display:block;font-size:1em;}

    #GM_setting .GM_setting_input_container {display:table-cell;padding:0 0 0 30px;vertical-align:top;}
    #GM_setting .GM_setting_input_container span{vertical-align:top;}
    #GM_setting .GM_setting_input_container span.btn{margin:0 0 0 0.9em;}
    #GM_setting input{display:inline}
    #GM_setting input[type="text"]{
    width: 100px;
    height: 30px;
    padding: 5px 5px;
    font-size:0.9em;
    }
    #GM_setting textarea{
    width: 300px;
    height: 30px;
    padding: 5px 5px;
    font-size:0.9em;
    }
    #GM_setting input[type="checkbox"] {
    display:none;
    width: 20px;height:20px;
    padding: 0; margin:0;
    }
    #GM_setting input[type="radio"] {
    width: 20px;height:20px;
    padding: 0; margin:0;
    }

    #GM_setting .radio-inline{
    padding-left:0;
    padding-right:0.8em;
    }
    #GM_setting .radio-inline input{
    margin:0 0.5em 0 0;
    }

    #GM_setting .GM_setting_item_disable, #GM_setting .GM_setting_item_disable .GM_setting_title, #GM_setting .GM_setting_item_disable .GM_setting_desc{color:#999 !important}
    #GM_setting .invalid input, #GM_setting .invalid textarea{border-color:#dc3545;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;color:#dc3545;}
    #GM_setting .invalid input:focus, #GM_setting .invalid textarea:focus{border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220,53,69,.25);outline:0;color:#dc3545;}
    #GM_setting .invalid {color:#dc3545}
    #GM_setting .invalid_text {font-size:12px;padding:5px 0 0 5px;}

    #GM_setting .GM_setting_under_dev .GM_setting_title{color:#6441a5;font-style:italic}

    #GM_setting .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/
    #GM_setting .btn-xxs .glyphicon{}
    #GM_setting .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}
    #GM_setting .btn-xxs.active span.glyphicon {opacity: 0.9;}
    #GM_setting .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}

    `);
        };
        var createlayout_ = function (elem) {
            //NOMO_DEBUG("createlayout_");
            $inputs = {};

            var $elem = $(elem);
            $g_elem = $elem;
            if ($elem.find("#GM_setting_container").length !== 0) {
                $elem.empty();
            }
            var $container = $("<div id='GM_setting_container'></div>");
            var $setting_head = $( /*html*/ `
                <div id='GM_setting_head'>
                <div style='height:25px;display:inline-block;white-space:nowrap'>Settings</div>
                <div style='display:flex;height:25px;float:right;'>
                    <a href='${(GM.info.script.homepage)}' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>${(GM.info.script.name)} v${(GM.info.script.version)} (${(GM.info.script.homepage)})</a>
                </div>
                </div>
            `);

            var $ul = $("<ul id='GM_setting'></ul>");
            var $prev = undefined;

            $elem.append($container);
            $container.append($setting_head).append($ul);

            var finals = [];
            for (var key in settings_full) {
                var category = settings_full[key].category;
                var depth = settings_full[key].depth;
                var type = settings_full[key].type;
                var title = settings_full[key].title;
                var desc = settings_full[key].desc;
                var category_name = settings_full[key].category_name;

                var $inputContainer = $("<div class='GM_setting_input_container form-group'></div>");
                var isTextarea = $.inArray(type, ["tag","textarea","object"]) !== -1;
                var $input;

                // type : radio 의 경우
                if (type === "radio") {
                    var radioObj = settings_full[key].radio;
                    $input = $("<div GM_setting_type='radio'></div>");
                    for (var radiokey in radioObj) {
                        var $label = $("<label class='radio-inline'>" + radioObj[radiokey].title + "</label>");
                        var $temp_input = $("<input name='GM_setting_" + key + "' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({
                            "value": radioObj[radiokey].value,
                            "type": (type === "set" ? type === "text" : (type === "tag" ? "textarea" : type)),
                            "GM_setting_type": type,
                            "GM_setting_key": key,
                            "GM_setting_category": (category === undefined ? "default" : category),
                        });
                        $temp_input.prependTo($label);
                        $input.append($label);
                    }
                }
                // type : 그 외
                else {
                    $input = $("<" + (isTextarea ? "textarea " : "input ") + "class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' " + (type === "checkbox" ? "onfocus='this.blur()'" : "") + (isTextarea ? "></textarea>" : " />")).attr({
                        "type": (type === "set" ? type === "text" : (type === "tag" ? "textarea" : type)),
                        "GM_setting_type": type,
                        "GM_setting_key": key,
                        "GM_setting_category": (category === undefined ? "default" : category),
                    });
                }

                // placeholder 존재 시 삽입
                var placeholder = settings_full[key].placeholder;
                if(placeholder !== undefined){
                    $input.attr("placeholder", placeholder);
                }

                // 카테고리 이름 존재하는 경우 삽입
                var $category;
                if (category_name !== undefined) {
                    $category = $("<div class='GM_setting_category_name'>" + category_name + "</div>");
                } else {
                    $category = $("<div class='GM_setting_category_blank'></div>");
                }

                var $head = $("<div class='GM_setting_list_head'></div>");
                var $title = $("<span class='GM_setting_title'>" + title + "</span>");
                var $desc = $("<span class='GM_setting_desc'>" + desc + "</span>");
                var $li = $("<li GM_setting_key='" + key + "' GM_setting_depth='" + depth + "' class='" + (settings_full[key].under_dev ? "GM_setting_under_dev " : "") + (category_name !== undefined && $prev !== undefined && category !== $prev.category ? "GM_setting_category " : "") + "GM_setting_depth" + depth + "'></li>");
                $ul.append($li);
                $head.append($title).append($desc);

                if (type === "checkbox") {
                    var $label_container = $(`
                    <label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>
                    `);
                    $label_container.prepend($input).appendTo($inputContainer);

                    $input.on("change", function () {
                        if ($(this).is(":checked")) {
                            $(this).closest("label").addClass("active");
                        } else {
                            $(this).closest("label").removeClass("active");
                        }

                        if ($(this).is(":disabled")) {
                            $(this).closest("label").addClass("disable").prop("disabled", true);
                        } else {
                            $(this).closest("label").removeClass("disable").prop("disabled", false);
                        }
                    });
                } else {
                    $inputContainer.append($input);
                }

                $li.append($category).append($head).append($inputContainer);
                $inputs[key] = $input;

                if (settings_full[key].append !== undefined) {
                    $inputContainer.append(settings_full[key].append);
                }

                // 디버그 설정 숨기기
                // if( (!nomo_global.DEBUG && settings_full[key].disable) || (settings_full[key].under_dev) ){    // if( (!nomo_global.DEBUG && settings_full[key].disable) || (!ADD_config.under_dev && settings_full[key].under_dev) ){
                //     NOMO_DEBUG("숨김", key);
                //     $li.css("display","none");
                // }

                $prev = settings_full[key];

                // 마지막에 실행 될 final 이벤트들 저장
                if(settings_full[key].final !== undefined){
                    finals.push(settings_full[key].final);
                }
            }

            // 설정 on-off 이벤트
            $elem.find("input[type='checkbox']").on("click", function () {
                usageCheck_($elem);
            });

            // 자동 저장 이벤트
            var timeoutId;
            $elem.find("input, textarea").on("input", function () { // "input[type='text']"  input propertychange
                NOMO_DEBUG("GM_setting - text change");

                var $this = $(this);
                var val = getInputValue_($this);
                var this_key = $this.attr("GM_setting_key");
                var validation = validation_(this_key, val);
                $this.closest("div").find(".invalid_text").remove();
                if (validation.valid) {
                    $this.closest("div").removeClass("invalid");
                } else {
                    NOMO_DEBUG("validation", validation);
                    $this.closest("div").addClass("invalid");
                    $this.after("<div class='invalid_text'>" + validation.message + "</div>");
                }

                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    // 저장 시도
                    // 정상적으로 값이 체크 된 경우
                    var g_validation = true;
                    $.each($inputs, function (ekey, evalue) {
                        var temp = validation_(ekey, getInputValue_(evalue));
                        if (!temp.valid) {
                            g_validation = false;
                            return false;
                        }
                    });
                    if (g_validation) {
                        read_();
                        save_();
                        message_("Auto Saved! " + (new Date()).toLocaleTimeString(), $elem);
                    }
                }, 1000);
            });

            write_();
            usageCheck_($elem);

            // 리셋 버튼 추가
            $ul.append( /*html*/ `<li class="GM_setting_category GM_setting_depth1">
                <div class="GM_setting_category_name">Reset</div>
                <div class="GM_setting_list_head">
                    <span class="GM_setting_title">
                        <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">Reset Settings</span>
                        <!--<span class="GM_setting_reset_all btn btn-primary">전체 초기화(새로고침 필요)</span>-->
                    </span>
                    <span class="GM_setting_desc"></span>
                </div>
                <div class="GM_setting_input_container form-group">
                </div>
            </li>`);

            // 마지막에 실행될 이벤트 (final)
            for(var i=0;i<finals.length;i++){
                finals[i]();
            }
        };
        var message_ = function (msg, $elem) {
            if ($elem === undefined) {
                return;
            }
            var prefix = "GM_setting_autosaved";
            $elem.find("." + prefix).animate({
                bottom: "+=40px"
            }, {
                duration: 300,
                queue: false
            });
            $("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='" + prefix + " btn btn-success'>" + msg + "</div>")
                .appendTo($elem)
                .fadeIn("fast")
                .animate({
                    opacity: 1
                }, 6000, function () {
                    $(this).fadeOut("fast").delay(600).remove();
                })
                .animate({
                    left: "+=30px"
                }, {
                    duration: 300,
                    queue: false
                });
        };
        var read_ = async function () {
            NOMO_DEBUG("read_");
            for (var key in $inputs) {
                if(settings_full[key].autosavepass && settings[key] !== undefined){
                    continue;
                }

                var $input = $inputs[key];
                var val = getInputValue_($input);

                if (settings_full[key].type === "tag") {
                    val = val.split(","); // val = val.replace(/\s/g,"").split(",");
                    if (val.length === 1 && val[0] === "") {
                        val = [];
                    }
                    $.each(val, function (index, value) {
                        val[index] = value.replace(/^\s*|\s*$/g, "");
                    });
                }

                // 이전 설정과 변경된 값 키 체크
                if (settings[key] !== val && changed_key.indexOf(key) === -1) {
                    changed_key.push(key);
                }
                settings[key] = val;
            }
        };
        var write_ = async function () {
            NOMO_DEBUG("write_");
            for (var key in $inputs) {
                var $input = $inputs[key];
                writeInputValue_($input, settings[key]);
            }
        };
        var getInputValue_ = function ($input) {
            var val;
            switch ($input.attr("GM_setting_type")) {
                case "checkbox":
                    val = $input.prop("checked");
                    break;
                case "set": // 현재 text 와 동일
                    val = $input.val();
                    break;
                case "text":
                    val = $input.val();
                    break;
                case "tag": // 현재 textarea 와 동일
                    val = $input.val();
                    break;
                case "object": // 현재 textarea 와 동일
                    val = JSON.parse($input.val());
                    break;
                case "textarea":
                    val = $input.val();
                    break;
                case "radio":
                    val = $input.find("input:checked").val();
                    break;
                default:
                    //NOMO_DEBUG($input);
                    val = undefined;
                    break;
            }
            return val;
        };
        var writeInputValue_ = function ($input, val) {
            switch ($input.attr("GM_setting_type")) {
                case "checkbox":
                    $input.prop("checked", val).trigger("change");
                    break;
                case "set": // 현재 text 와 동일
                    $input.val(val);
                    break;
                case "text":
                    $input.val(val);
                    break;
                case "tag": // 현재 textarea 와 동일
                    $input.val(val);
                    $input.height("auto");
                    $input.height(String(Number($input.prop("scrollHeight")) + 20) + "px");
                    break;
                case "object": // 현재 textarea 와 동일
                    $input.val(JSON.stringify(val));
                    $input.height("auto");
                    $input.height(String(Number($input.prop("scrollHeight")) + 20) + "px");
                    break;
                case "textarea":
                    $input.val(val);
                    $input.height("auto");
                    $input.height(String(Number($input.prop("scrollHeight")) + 20) + "px");
                    break;
                case "radio":
                    $input.find("input[value=" + val + "]").prop("checked", true);
                    break;
                default:
                    break;
            }
        };
        var usageCheck_ = async function ($elem) {
            // 일단 다 켠다.
            var $lis = $elem.find("li");
            $lis.removeClass("GM_setting_item_disable");
            $lis.find("input, textarea").prop("disabled", false);
            $lis.find("input[type='checkbox']").trigger("change");

            var enable = [true];
            for (var i = 0; i < $lis.length; i++) {
                var $curr = $($lis[i]);
                var curr_depth = $curr.attr("GM_setting_depth");
                var curr_key = $curr.attr("GM_setting_key");

                if (i !== 0) {
                    var $prev = $($lis[i - 1]);
                    var prev_depth = $prev.attr("GM_setting_depth");
                    if (prev_depth < curr_depth) {
                        var $prev_checkbox = $prev.find("input[type='checkbox']");
                        // 이전 요소가 체크박스이고, 켜져있으면 현재 요소도 켠다.
                        if ($prev_checkbox.length !== 0 && $prev_checkbox.is(":checked")) {
                            enable[prev_depth] = true;
                        } else {
                            enable[prev_depth] = false;
                        }

                        // 이전 요소가 체크박스가 아니면 그냥 켠다.
                        // if($prev_checkbox.length !== 0){
                        //     enable[prev_depth] = true;
                        // }
                    }
                }

                for (var e = 0; e < curr_depth; e++) {
                    if (settings_full[curr_key].disable || !enable[e]) {
                        $curr.addClass("GM_setting_item_disable");
                        $curr.find("input, textarea").prop("disabled", true);
                        $curr.find("input[type='checkbox']").trigger("change");
                        break;
                    }
                }
            }
        };
        var validation_ = function (key, val) {
            var val_array;
            var duplicate;
            var sorted_array;
            var regex_array_string = /^[A-Za-z0-9 _,]*$/;
            //var regex_number = /^[0-9]*$/;
            var valid = true;
            var message = "";

            // 숫자의 경우
            if (settings_full[key].valid === "number") {
                valid = $.isNumeric(val);
                if (val === "") {
                    message += "반드시 값이 입력되어야 합니다.";
                } else if (!valid) {
                    message += "숫자만 입력 가능합니다.";
                } else {
                    if (settings_full[key].min_value !== undefined && settings_full[key].min_value > val) {
                        valid = false;
                        message += "입력 값은 " + settings_full[key].min_value + "이상의 숫자이어야 합니다.";
                    } else if (settings_full[key].max_value !== undefined && settings_full[key].max_value < val) {
                        valid = false;
                        message += "입력 값은 " + settings_full[key].max_value + "이하의 숫자이어야 합니다.";
                    }
                }
            }
            // array_string - ID 태그
            else if (val !== "" && settings_full[key].valid === "array_string") {
                val_array = $.map(val.split(","), $.trim);
                var match = val.match(regex_array_string);
                //NOMO_DEBUG(match);
                if (match === null || match.length === 0) {
                    valid = false;
                    message += "영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.";
                } else if ($.inArray("", val_array) !== -1) {
                    valid = false;
                    message += "공백 값 등 값이 존재하지 않는 항목이 존재합니다.";
                    NOMO_DEBUG(val_array, $.inArray("", val_array));
                } else if ((new Set(val_array)).size !== val_array.length) {
                    valid = false;
                    duplicate = [];
                    sorted_array = val_array.sort();
                    for (var i = 0; i < val_array.length - 1; i++) {
                        if (sorted_array[i + 1] == sorted_array[i] && $.inArray(sorted_array[i], duplicate) === -1) {
                            duplicate.push(sorted_array[i]);
                        }
                    }
                    message += "중복된 값이 존재합니다: " + duplicate.join(",");
                } else {
                    for (var j = 0; j < val_array.length; j++) {
                        //NOMO_DEBUG(val_array, val_array[j].indexOf(" "));
                        if (val_array[j].indexOf(" ") !== -1) {
                            valid = false;
                            message += "문자열 내 공백이 존재하는 항목이 있습니다: " + val_array[j];
                            break;
                        }
                    }
                }
            }
            // array_word - 금지단어
            else if (val !== "" && settings_full[key].valid === "array_word") {
                val_array = $.map(val.split(","), $.trim);
                if ($.inArray("", val_array) !== -1) {
                    valid = false;
                    message += "공백 값 등 값이 존재하지 않는 항목이 존재합니다.";
                    NOMO_DEBUG(val_array, $.inArray("", val_array));
                } else if ((new Set(val_array)).size !== val_array.length) {
                    valid = false;
                    duplicate = [];
                    sorted_array = val_array.sort();
                    for (var k = 0; k < val_array.length - 1; k++) {
                        if (sorted_array[k + 1] == sorted_array[k] && $.inArray(sorted_array[k], duplicate) === -1) {
                            duplicate.push(sorted_array[k]);
                        }
                    }
                    message += "중복된 값이 존재합니다: " + duplicate.join(",");
                }
            }

            var return_obj = {
                valid: valid,
                message: message
            };
            return return_obj;
        };
        var hasSameKey_ = function (a, b) {
            var aKeys = Object.keys(a).sort();
            var bKeys = Object.keys(b).sort();
            return JSON.stringify(aKeys) === JSON.stringify(bKeys);
        };

        /////////////////////////////////////////////////
        // public interface
        return {
            init: async function (name) {
                name_ = name;
                NOMO_DEBUG("GM_setting - init");
                await init_();
                await event_();
                addStyle_();
            },
            load: async function () {
                NOMO_DEBUG("GM_setting - load");
                await load_();
                //return settings;
            },
            save: async function () {
                NOMO_DEBUG("GM_setting - save");
                await save_();
            },
            save_overwrite: async function () {
                // old_value: obj,       ekey:키, evalue:값(old 설정값)
                var old_value = settings;
                var new_value = global[name_];
                $.each(old_value, function (ekey, _evalue) {
                    if (settings_full[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]) {
                        settings_full[ekey].change(new_value[ekey]);
                    }
                });
                settings = global[name_];
                NOMO_DEBUG("GM_setting - save_overwrite");
                await save_();
            },
            reset: async function () {
                await GM.setValue(name_, settings_init);
                await load_();
            },
            createlayout: function (elem) {
                createlayout_(elem);
            },
            getType: function (key) {
                if (settings_full[key] !== undefined) {
                    return settings_full[key].type;
                } else {
                    return undefined;
                }
            },
            message: function (msg, $elem) {
                message_(msg, $elem);
            }
        };
    })(jQuery, window, document);

    ////////////////////////////////////////////////////////////////////////////////////
    // Initialize
    ////////////////////////////////////////////////////////////////////////////////////
    window.GM_setting = GM_setting;
    await GM_setting.init("GM_SETTINGS");

    var whiteList = ["best", "best2"];
    var blockListBoard = GM_SETTINGS.blockListBoard; // await GM.getValue("blockListBoard", {}); // {"baseball":"야구"};
    var blockTextArrayBoard = GM_SETTINGS.blockTextArrayBoard; //await GM.getValue("blockTextArrayBoard", ["소식", "자동차", "유머"]); // ["야구", "이슈"];
    var blockTextArrayTitle = GM_SETTINGS.blockTextArrayTitle; //await GM.getValue("blockTextArrayTitle", ["트와이스"]); // ["리버풀"];
    // var blockListCategory = {"humor":{"id":"1899663","name":"유머 - 이슈"}}

    GM_addStyle(`
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

    function isBlockTextTitle(title){
        for(var i=0;i<blockTextArrayTitle.length;i++){
            if(title.indexOf(blockTextArrayTitle[i]) !== -1){
                return true;
            }
        }
        return false;
    }

    function isBlockTextBoard(boardCategory){
        for(var i=0;i<blockTextArrayBoard.length;i++){
            if(boardCategory.indexOf(blockTextArrayBoard[i]) !== -1){
                return true;
            }
        }
        return false;
    }

    // block 버튼 클릭 시 작동
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

    function control(input){
        var pathname = input.pathname;
        var $v = input.$v;
        var $title = input.$title;
        var title = input.title;
        var $boardA = input.$boardA;
        var $category = input.$category;
        var categoryText = input.categoryText;
        var isBest = input.isBest;

        // 1. 카테고리 리스트에서 체크
        var board = String(pathname).replace("/", "");
        if(isBest && isBlock(board)){
            if(GM_SETTINGS.debug){
                $v.addClass("border_red_important");
            }
            else{
                $v.hide();
                return true;
            }
        }

        // 2. 카테고리 글자에서 체크
        if(isBest && isBlockTextBoard(categoryText)){
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
        if(isBlockTextTitle(title)){
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

    $(document).ready(function(){
        // 설정 페이지의 경우
        if(document.location.href.indexOf("www.fmkorea.com/addon_settings") !== -1){
            $("body").empty().css("padding","0px 30px 30px 30px");
            $("head").append(`
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
            `);
            var webfont = "<link href=\"https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,900&display=swap&subset=korean\" rel=\"stylesheet\">";
            $("head").append(webfont);


            GM.addStyle(/*css */`
            #nomo_settings {
                color: #000;
                overflow-y: scroll;
            }
            .fm_alert, #fm_alert {display:none;}
                
            body{font-family: "Noto Sans KR", "맑은 고딕", malgun gothic, dotum, serif; font-weight:400;}
            `);
            document.title = "fmkorea 애드온 상세 설정 페이지";

            GM_setting.createlayout($("body"));
        }
        // main 포텐글 처리
        else {
            var isBest = (document.location.href === "https://www.fmkorea.com" || document.location.href === "https://www.fmkorea.com/" || document.location.href.indexOf("www.fmkorea.com/index.php?mid=best") !== -1 || document.location.href.indexOf("www.fmkorea.com/best") !== -1);
            // list style 의 경우
            if(isBest || GM_SETTINGS.boardBlockTitleEverywhere){
                var $tr = $("table.bd_lst tr");
                
                $tr.each(function(i,v){
                    try {
                        var $v = $(v);
                        if($v.hasClass("notice")){
                            return true;
                        }
                        var $category = $v.find("td").first();
                        var $boardA = $category.find("a");
                        var categoryText = $boardA.get(0).innerText;
                        var pathname = $boardA.attr("href");
                        var $title = $v.find("td.title a").first();
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

                // webzine style 의 경우
                $("li.li").each(function(i,v){
                    try {
                        var $v = $(v);
                        var $category = $v.find("span.category");
                        var $boardA = $category.find("a");
                        var categoryText = $category.get(0).innerText;
                        var pathname = $boardA.attr("href");
                        var $title = $v.find("h3.title").first();
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
                        console.log(input);
                        return control(input);
                    }
                    catch(e){
                        return true;
                    }
                });

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
            }

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
        }
    });
    
    // 설정 메뉴 추가 및 관리
    if(typeof GM.registerMenuCommand === "function"){
        GM.registerMenuCommand("상세 설정 열기", function(){
            var ww = $(window).width(),
                wh = $(window).height();
            var wn = (ww > 850 ? 850 : ww/5*4);
            var left  = (ww/2)-(wn/2),
                top = (wh/2)-(wh/5*4/2);
            window.open("https://www.fmkorea.com/addon_settings","winname",
                "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4+",top="+top+",left="+left);
        });
    }
})();