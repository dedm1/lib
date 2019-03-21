


function getCookie(name)
{
     var cookie = " " + document.cookie;
     var search = " " + name + "=";
     var setStr = null;
     var offset = 0;
     var end = 0;
     if (cookie.length > 0) {
             offset = cookie.indexOf(search);
             if (offset != -1) {
                     offset += search.length;
                     end = cookie.indexOf(";", offset)
                     if (end == -1) {
                             end = cookie.length;
                     }
                     setStr = unescape(cookie.substring(offset, end));
             }
     }
     return(setStr);
}


function comet_server_signal()
{
    if(this.init === undefined) this.init = false;
    return comet_server_signal;
}

comet_server_signal.slotArray = new Array();
comet_server_signal.debug = false;

comet_server_signal.sigId = 0;

/**
 * РџРѕРґРїРёСЃС‹РІР°РµС‚ СЃР»РѕС‚ РЅР° СЃРёРіРЅР°Р»
 *
 * Р•СЃР»Рё РїРµСЂРµРґР°С‚СЊ РґРІР° РїР°СЂР°РјРµС‚СЂР° С‚Рѕ РѕРЅРё РѕР±СЂР°Р±РѕС‚Р°СЋС‚СЃСЏ РєР°Рє  connect( signal_name, slot_function )
 * Р•СЃР»Рё РїРµСЂРµРґР°С‚СЊ С‚СЂРё РїР°СЂР°РјРµС‚СЂР° С‚Рѕ РѕРЅРё РѕР±СЂР°Р±РѕС‚Р°СЋС‚СЃСЏ РєР°Рє  connect( slot_name, signal_name, slot_function )
 *
 * @param slot_name РРјСЏ СЃР»РѕС‚Р°
 * @param signal_name РРјСЏ СЃРёРіРЅР°Р»Р°
 * @param slot_function Р¤СѓРЅРєС†РёСЏ РІС‹Р·РІР°РµРјР°СЏ РїСЂРё РІС‹Р·РѕРІРµ СЃР»РѕС‚Р°, РґРѕР»Р¶РЅР° РёРјРµС‚СЊ СЃР»РµРґСѓСЋС‰РёСЋ СЃРёРіРЅР°С‚СѓСЂСѓ function(param, signal_name){}
 *
 * <code>
 * РџСЂРёРјРµСЂ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ
 * new new signal().emit("catalogControl.OpenObject",{})
 *
 * </code>
 */
comet_server_signal.connect = function(slot_name, signal_name, slot_function)
{
    if(slot_function === undefined)
    {
        slot_function = signal_name;
        signal_name = slot_name;
        slot_name = "sig" + (comet_server_signal.sigId++)
    }

    if (comet_server_signal.slotArray[signal_name] === undefined)
    {
        comet_server_signal.slotArray[signal_name] = {}
    }
    comet_server_signal.slotArray[signal_name][slot_name] = slot_function;
    if(comet_server_signal.debug) console.log("РќР° РїСЂРѕСЃР»СѓС€РёРІР°РЅРёРµ СЃРёРіРЅР°Р»Р° " + signal_name + " РґРѕР±Р°РІР»РµРЅ СЃР»РѕС‚ " + slot_name + "", comet_server_signal.slotArray)
    return slot_name;
}


/**
 * РћС‚РїРёСЃС‹РІР°РµС‚ СЃР»РѕС‚ slot_name РѕС‚ СЃРёРіРЅР°Р»Р° signal_name
 */
comet_server_signal.disconnect = function(slot_name, signal_name)
{
    if (comet_server_signal.slotArray[signal_name] !== undefined)
    {
        if (comet_server_signal.slotArray[signal_name][slot_name] !== undefined)
        {
            comet_server_signal.slotArray[signal_name][slot_name] = undefined;
            return true
        }
    }
    return false
}

/**
 * Р’С‹Р·С‹РІР°РµС‚ СЃР»РѕС‚С‹ РїРѕРґРїРёСЃР°РЅС‹Рµ РЅР° СЃРёРіРЅР°Р» signal_name Рё РєР°Р¶РґРѕРјСѓ РёР· РЅРёС… РїРµСЂРµРґР°С‘С‚ Р°СЂСѓРјРµС‚С‹ signal_name - РёРјСЏ РІС‹Р·РІР°РІС€РµРіРѕ СЃРёРіРЅР°Р»Р°, Рё param - РѕР±СЉРµРєС‚ СЃ РїР°СЂР°РјРµС‚СЂР°РјРё РґР»СЏ СЃР»РѕС‚Р°)
 * Р’ РґРѕР±Р°РІРѕРє СЂРµС‚СЂР°РЅСЃР»РёСЂСѓРµС‚ СЃРёРіРЅР°Р» РІ РґРѕС‡РµСЂРЅРёРё iframe РµСЃР»Рё РѕРЅРё РµСЃС‚СЊ Рё РІ СЂРѕРґРёС‚РµР»СЊСЃРєРѕРµ РѕРєРЅРѕ РµСЃР»Рё РѕРЅРѕ РµСЃС‚СЊ
 * @param signal_name РРјСЏ СЃРёРіРЅР°Р»Р°
 * @param param РџР°СЂР°РјРµС‚СЂС‹ РїРµСЂРµРґР°РЅС‹Рµ СЃР»РѕС‚Сѓ РїСЂРё РІС‹Р·РѕРІРµ РІ РІС‚РѕСЂРѕРј Р°СЂРіСѓРјРµРЅС‚Рµ
 * @param SignalNotFromThisTab Р•СЃР»Рё false С‚Рѕ Р·РЅР°С‡РёС‚ СЌС‚Рѕ СЃРёРіРЅР°Р» РїСЂРёС€С‘Р» РёР· РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРё
 */
comet_server_signal.emit = function(signal_name, param, SignalNotFromThisTab)
{
    if (comet_server_signal.slotArray[signal_name] === undefined)
    {
        if(comet_server_signal.debug) console.log("РќР° СЃРёРіРЅР°Р» " + signal_name + " РЅРµС‚ РїРѕРґРїРёСЃС‡РёРєРѕРІ")
    }
    else
    {
        if(comet_server_signal.debug) console.log("РЎРёРіРЅР°Р» " + signal_name + " РїРѕРґРїРёСЃР°РЅС‹ СЃР»РѕС‚С‹")
        var obj = comet_server_signal.slotArray[signal_name];
        for (var slot in obj)
        {
            if( obj.hasOwnProperty(slot) &&  obj[slot] !== undefined)
            {
                obj[slot](param,signal_name, SignalNotFromThisTab === true)
            }
        }

    }
}

/*
 *  РіРµРЅРµСЂР°С†РёСЏ СЃРѕР±С‹С‚РёСЏ Р±СѓРґСѓС‚ РѕРїРѕРІРµС‰РµРЅС‹ Рё СЃРѕСЃРµРґРЅРёРµ РІРєР»Р°РґРєРё
 *  @eName string - РёРјСЏ СЃРѕР±С‹С‚РёСЏ
 *  РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ .emit('Р»СЋР±РѕРµ РЅР°Р·РІР°РЅРёРµ СЃРѕР±С‹С‚РёСЏ', [ РџР°СЂР°РјРµС‚СЂС‹ СЃРѕР±С‹С‚РёСЏ ])
 */
comet_server_signal.emitAll = function (signal_name, param)
{
    comet_server_signal.emit(signal_name, param)

    try{ 
        if(window['localStorage'] !==undefined  )
        {
            var curent_custom_id = Math.random()+"_"+Math.random()+"_"+Math.random()+"_"+Math.random()+"_"+Math.random()
            window['localStorage']['comet_server_signal_storage_emit']= JSON.stringify({name:signal_name, custom_id:curent_custom_id, param:param});
        }
    }catch (e){}
}


/**
 * Р”Р»СЏ СЃРѕРІРјРµСЃС‚РёРјРѕСЃС‚Рё СЃ РїСЂРѕС€Р»РѕР№ РІРµСЂСЃРёРµР№.
 *
 * Р‘РёР±Р»РёРѕС‚РµРєР° TabSignal.js (https://github.com/Levhav/TabSignal.js) РїРѕР»РЅРѕСЃС‚СЊСЋ СЂРµР°Р»РёР·РѕРІР°РЅР°
 * РѕР±СЉРµРєС‚РѕРј comet_server_signal С‚Р°Рє РєР°Рє СЏРІР»СЏРµС‚СЃСЏ СЃРѕСЃС‚Р°РІРЅРѕР№ С‡Р°СЃС‚СЊСЋ JavaScript CometServerApi
 */
tabSignal = comet_server_signal;
comet_server_signal.send_emit = comet_server_signal.emitAll; // Р”Р»СЏ СЃРѕРІРјРµСЃС‚РёРјРѕСЃС‚Рё СЃ РїСЂРѕС€Р»РѕР№ РІРµСЂСЃРёРµР№.


if(!comet_server_signal.prototype.init)
{
    comet_server_signal.prototype.init = true
    if( window.addEventListener )
    {
        window.addEventListener('storage', function(e)
        {
            if(e.key && e.key == 'comet_server_signal_storage_emit')
            {// !testThis
                try{
                    var data = JSON.parse(e.newValue);
                    if(data !== undefined && data.name !== undefined  )
                    {
                        if(comet_server_signal.debug > 1) console.log( data )
                        comet_server_signal().emit( data.name, data.param, true )
                    }
                }
                catch (failed)
                {
                }
            }
        }, false);
    }
    else
    {
        document.attachEvent('onstorage', function(e)
        {
            if(e.key && e.key == 'comet_server_signal_storage_emit')
            {// !testThis
                try{
                    var data = JSON.parse(e.newValue);
                    if(data !== undefined && data.name !== undefined  )
                    {
                        if(comet_server_signal.debug > 1) console.log( data )
                        comet_server_signal().emit( data.name, data.param, true )
                    }
                }
                catch (failed)
                {
                }
            }
        } );
    }
}


var cometServer = function(opt)
{
    if(!opt)
    {
        if(cometServer.prototype.options === undefined)
        {
            cometServer.prototype.options = {};
        }

        for(var key in opt)
        {
            cometServer.prototype.options[key] = opt[key];
        }
    }
    return this;
}

/**
 * @private
 */
cometServer.prototype.version = "3.14"; //  

/**
 * @private
 */
cometServer.prototype.options = {};

/**
 * @private
 */
cometServer.prototype.options.nodeName = "app.comet-server.ru";
cometServer.prototype.options.nodeArray = ["app.comet-server.ru"]// ["n1-app.comet.su", "n2-app.comet.su"]; //

/**
 * @private
 */
cometServer.prototype.is_master = undefined;

/**
 * @private
 */
cometServer.prototype.in_conect_to_server = false;

/**
 * @private
 */
cometServer.prototype.in_try_conect = false;

/**
 * РњР°СЃСЃРёРІ РёРјС‘РЅ РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РјС‹ РїРѕРґРїРёСЃР°РЅС‹
 * @private
 */
cometServer.prototype.subscription_array = new Array();

/**
 * РЎР»СѓС‡Р°Р№РЅС‹Р№ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РІРєР»Р°РґРєРё.
 * РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РґР»СЏ РѕРїСЂРµРґРµР»РµРЅРёСЏ РєРѕРјСѓ РїСЂРµРґРЅР°Р·РЅР°С‡РµРЅС‹ РёСЃС‚РѕСЂРёС‡РµСЃРєРёРµ РґР°РЅРЅС‹Рµ РёР· РєР°РЅР°Р»Р°.
 * @private
 */
cometServer.prototype.custom_id = (Math.random()*10)+""+Math.random();
cometServer.prototype.custom_id = cometServer.prototype.custom_id.replace(/[^0-9A-z]/,"").replace(/^(.{10}).*$/,"$1");


/**
 * Р’СЂРµРјСЏ РЅР° РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ РІ РјРёР»РёСЃРµРєСѓРЅРґР°С… РїРѕСЃР»Рµ РІС‚РѕСЂРѕР№ РїРѕРґСЂСЏРґ РѕС€РёР±РєРё РїРѕРґРєР»СЋС‡РµРЅРёСЏ
 * @private
 */
cometServer.prototype.time_to_reconect_on_error = 1000;

/**
 * Р’СЂРµРјСЏ РЅР° РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ РІ РјРёР»РёСЃРµРєСѓРЅРґР°С… РїРѕСЃР»Рµ РїРµСЂРІРѕР№ РѕС€РёР±РєРё РїРѕРґРєР»СЋС‡РµРЅРёСЏ
 * @private
 */
cometServer.prototype.time_to_reconect_on_close = 100;

/**
 * @private
 */
cometServer.prototype.in_abort = false;

/**
 * @private
 */
cometServer.prototype.restart_time_id = false;

/**
 * Р’СЂРµРјСЏ РґР°РІР°РµРјРѕРµ РЅР° РѕРїСЂРµРґРµР»РµРЅРёРµ С‚РѕРіРѕ РєР°РєР°СЏ РёР· РІРєР»Р°РґРѕРє СЏРІР»СЏРµС‚СЃСЏ РјР°СЃС‚РµСЂРІРєР»Р°РґРєРѕР№
 * @private
 */
cometServer.prototype.start_timer = 1200;

/**
 * Р’С‹СЂР°Р¶РµРЅРёРµ РѕС‚РґРµР»СЏСЋС‰РёРµ РїРѕ Р·РЅР°РєСѓ С‚РѕС‡РєРё РЅР° РїР°РІСѓСЋ Рё Р»РµРІСѓСЋ С‡Р°СЃС‚Рё.
 * @private
 */
cometServer.prototype.reg_exp = new RegExp(/^([^.]+)\.([^.]+)$/);

/**
 * РћРїСЂРµРґРµР»СЏРµС‚ РЅР°РґРѕ Р»Рё РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ https РёР»Рё http
 * @private
 */
cometServer.prototype.protocol = document.location.protocol.replace(/[^s]/img, "");

/**
 * @private
 */
cometServer.prototype.web_socket_error = 0;

/**
 * РЈС‡РёС‚С‹РІР°РµС‚ СѓРґР°С‡РЅРѕ РїРµСЂРµРґР°РЅРЅС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ РїРѕ РІРµР±СЃРєРѕРєРµС‚Сѓ
 * Р•СЃР»Рё РѕРЅРё Р±С‹Р»Рё С‚Рѕ РІ СЃР»СѓС‡Р°РёРё РЅРµРїРѕР»Р°РґРѕРє СЃ СЃСЃРµС‚СЊСЋ РїРµСЂРµС…РѕРґ РЅР° long poling РѕСЃСѓС‰РµСЃС‚РІР»С‘РЅ РЅРµ Р±СѓРґРµС‚.
 * @private
 */
cometServer.prototype.web_socket_success = false;

/**
 * @private
 */
cometServer.prototype.web_socket_error_timeOut = 30000;

/**
 * @private
 */
cometServer.prototype.xhr_error = 0;
/**
 * @private
 */
cometServer.prototype.xhr_error_timeOut_id = 30000;

/**
 * @private
 */
cometServer.prototype.authorized_status;

/**
 * @private
 */
cometServer.prototype.socket;
cometServer.prototype.socketArray = [];

/**
 * @private
 */
cometServer.prototype.use_WebSocket;

/**
 * @private
 */
cometServer.prototype.request;

/**
 * @private
 */
cometServer.prototype.status;

/**
 * @private
 */
cometServer.prototype.send_msg_queue = [];

/**
 * СЃРѕРґРµСЂР¶РёС‚ РїР°РєРµС‚ РґР°РЅРЅС‹С… Рѕ РїРѕРґРїРёСЃРєР°С… РіРѕС‚РѕРІС‹Р№ Рє РѕС‚РїСЂР°РІРєРµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ
 * @private
 * @type {string}
 */
cometServer.prototype.send_msg_subscription = false;

/**
 * РЈСЂРѕРІРµРЅСЊ Р»РѕРіРёСЂРѕРІР°РЅРёСЏ
 * @private
 */
cometServer.prototype.LogLevel = 0;

try{ 
    if(window['localStorage']['comet_LogLevel'])
    {
        cometServer.prototype.LogLevel = window['localStorage']['comet_LogLevel']
    }
}catch (e){}

cometServer.prototype.getLogLevel = function()
{
    return cometServer.prototype.LogLevel;
}

cometServer.prototype.setLogLevel = function(level)
{
    cometServer.prototype.LogLevel = level;
    try{ 
        window['localStorage']['comet_LogLevel'] = level;
    }catch (e){}
}

cometServer.prototype.getCustomString = function()
{
    var custom = (Math.random()*10)+""+Math.random();
    return custom.replace(/[^0-9A-z]/,"").replace(/^(.{10}).*$/,"$1");
}

/**
 *  http://www.webtoolkit.info/
 **/
cometServer.prototype.Base64 = {
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < input.length; n++)
            {
                    var c = input.charCodeAt(n);
                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
            }

            while (i < utftext.length) {

                    chr1 = utftext.charCodeAt(i++);
                    chr2 = utftext.charCodeAt(i++);
                    chr3 = utftext.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                            enc4 = 64;
                    }
                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
    },

    decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                        enc1 = this._keyStr.indexOf(input.charAt(i++));
                        enc2 = this._keyStr.indexOf(input.charAt(i++));
                        enc3 = this._keyStr.indexOf(input.charAt(i++));
                        enc4 = this._keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                        }

                }

                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while ( i < output.length ) {

                        c = output.charCodeAt(i);

                        if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                        }
                        else if((c > 191) && (c < 224)) {
                                c2 = output.charCodeAt(i+1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                        }
                        else {
                                c2 = output.charCodeAt(i+1);
                                c3 = output.charCodeAt(i+2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
                        }

                }

                return string;
        }
}

cometServer.prototype.stripslashes = function(str)
{
    //       discuss at: http://phpjs.org/functions/stripslashes/
    //      original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Ates Goral (http://magnetiq.com)
    //      improved by: marrtins
    //      improved by: rezna
    //         fixed by: Mick@el
    //      bugfixed by: Onno Marsman
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //         input by: Rick Waldron
    //         input by: Brant Messenger (http://www.brantmessenger.com/)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //        example 1: stripslashes('Kevin\'s code');
    //        returns 1: "Kevin's code"
    //        example 2: stripslashes('Kevin\\\'s code');
    //        returns 2: "Kevin\'s code"

    return (str + '')
      .replace(/\\(.?)/g, function(s, n1) {
        switch (n1) {
          case '\\':
            return '\\';
          case '0':
            return '\u0000';
          case '':
            return '';
          default:
            return n1;
        }
      });
}
/**
 * Р’С‹РїРѕР»РЅСЏРµС‚ РїСЂРёРІСЏР·РєСѓ callBack С„СѓРЅРєС†РёРё Рє СЃРѕР±С‹С‚РёСЋ.
 * Р РїСЂРё РїСЂРѕРёСЃС€РµСЃС‚РІРёРё СЃРѕР±С‹С‚РёСЏ РЅР° РєРѕС‚РѕСЂРѕРµ РјС‹ РїРѕРґРїРёСЃС‹РІР°Р»РёСЃСЊ РІ С„СѓРЅРєС†РёРё subscription
 * РѕРїСЂРµРґРµР»СЏРµС‚ РЅР°РґРѕ Р»Рё РґС‘СЂРіР°С‚СЊ callBack С„СѓРЅРєС†РёСЋ С‚Р°Рє РєР°Рє РµСЃР»Рё СЃРѕР±С‹С‚РёРµ Р°РґСЂРµСЃРѕРІР°РЅРѕ
 * РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРµ С‚Рѕ РґС‘СЂРіР°С‚СЊ РЅРµ РЅР°РґРѕ.
 *
 * @private
 * @param string name РРјСЏ РєР°РЅР°Р»Р°
 * @param function callBack
 * @param string specialMarker Р•СЃР»Рё РїРµСЂРµРґР°С‚СЊ РЅРµ undefined С‚Рѕ РїРѕСЃР»Рµ РїСЂРёС…РѕРґР°
 * СЃРѕР±С‹С‚РёСЏ РїСЂРѕРёР·РѕР№РґС‘С‚ РѕС‚РїРёСЃРєР° Рё РєРѕР» Р±РµРє Р±СѓРґРµС‚ РЅР°РІРµС€Р°РЅ С‚РѕР»СЊРєРѕ РЅР° РєРѕРЅРєСЂРµС‚РЅРѕ РЅР°С€ РѕС‚РІРµС‚.
 * @return string РРјСЏ СЃРёРіРЅР°Р»Р°, РјРѕР¶РµС‚ РїРѕРЅР°РґРѕР±РёС‚СЃСЏ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР±С‹ РѕС‚РїРёСЃР°С‚СЃСЏ РѕС‚ СЃРѕРѕР±С‰РµРЅРёР№.
 */
cometServer.prototype.subscription_callBack = function(name, callBack, specialMarker)
{
    var thisObj = cometServer.prototype;
    var sigId = name+"&&";
    if(specialMarker === undefined)
    {
        // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґР»СЏ РЅР°С€РµР№ РІРєР»Р°РґРєРё
        sigId += comet_server_signal().connect(name, function(param)
        {
            console.log("marker", param.server_info.marker, thisObj.custom_id)
            if(param.server_info.marker !== thisObj.custom_id && param.server_info.marker !== undefined)
            {
               // Р”Р°РЅРЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ РїСЂРµРґРЅРѕР·РЅР°С‡РµРЅРѕ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРµ.
               return 0;
            }
            callBack(param);
        });
    }
    else
    {
        // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ СЃРїРµС†РёР°Р»СЊРЅРѕ Рё РµРґРёРЅРѕСЂР°Р·РѕРІРѕ РґР»СЏ РїРµСЂРµРґР°РЅРЅРѕРіРѕ callBack
        sigId += comet_server_signal().connect(specialMarker, name,  function(param)
        {
            if(param.server_info.marker !== specialMarker)
            {
               // Р”Р°РЅРЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ РїСЂРµРґРЅРѕР·РЅР°С‡РµРЅРѕ РЅРµ СЌС‚РѕР№ РІРєР»Р°РґРєРµ.
               return 0;
            }

            comet_server_signal().disconnect(specialMarker, name);
            callBack(param);
        });
    }
    return sigId;
}

/**
 * РњР°СЃСЃРёРІ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂРѕРІ РїРѕРґРїРёСЃРѕРє, РЅСѓР¶РµРЅ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР± Р±С‹Р»Рѕ РјРѕР¶РЅРѕ РѕС‚РїРёСЃР°С‚СЊСЃСЏ РѕС‚ РІСЃРµС… РїРѕРґРїРёСЃРѕРє СЃСЂР°Р·Сѓ.
 * @type Array
 */
cometServer.prototype.subscription_slot_array = [];

/**
 * РћС‚РїРёСЃС‹РІР°РµС‚ С„СѓРЅРєС†РёСЋ РѕС‚ РїРѕР»СѓС‡РµРЅРёСЏ СЃРѕРѕР±С‰РµРЅРёР№
 * @public
 * @param {string|undefined} sigId РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РїРѕРґРїРёСЃРєРё, РІРѕР·РІСЂР°С‰Р°РµС‚СЃСЏ С„СѓРЅРєС†РёРµР№ subscription РІ РјРѕРјРµРЅС‚ РїРѕРґРїРёСЃРєРё РёР»Рё РµСЃР»Рё sigId === undefined С‚Рѕ РѕС‚РїРёС€РµС‚ РѕС‚ РІСЃРµС… РїРѕРґРїРёСЃРѕРє СЃСЂР°Р·Сѓ.
 *
 */
cometServer.prototype.unsubscription = function(sigId)
{
    if(sigId === undefined)
    {
        for(var i = 0; i < cometServer.prototype.subscription_slot_array.length; i++)
        {
            var val = cometServer.prototype.subscription_slot_array[i];

            var sigName = val.replace(/^(.*)&&.*$/, "$1");
            var slotName = val.replace(/^.*&&(.*)$/, "$1");
            comet_server_signal().disconnect(slotName, sigName);
        }

        cometServer.prototype.subscription_slot_array = []
        return true;
    }
    else if(!sigId)
    {
        return false;
    }

    var sigName = sigId.replace(/^(.*)&&.*$/, "$1");
    var slotName = sigId.replace(/^.*&&(.*)$/, "$1");
    return comet_server_signal().disconnect(slotName, sigName);
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ РїРѕРґРїРёСЃРєРё РЅР° РєР°РЅР°Р»С‹, СЃРѕР±С‹С‚РёСЏ РІ РєР°РЅР°Р»Р°С… Рё РѕС‚С‡С‘С‚С‹ Рѕ РґРѕСЃС‚Р°РІРєРµ СЃРѕРѕР±С‰РµРЅРёР№ РІ РєР°РЅР°Р»С‹.
 *
 * РџРѕРґРїРёСЃРєР° РЅР° РєР°РЅР°Р» "РРјСЏ_РєР°РЅР°Р»Р°"
 * CometServer().subscription("РРјСЏ_РєР°РЅР°Р»Р°", function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° РєР°РЅР°Р» СЃРѕР±С‹С‚РёРµ "РёРјСЏ_СЃРѕР±С‹С‚РёСЏ" РІ РєР°РЅР°Р»Рµ "РРјСЏ_РєР°РЅР°Р»Р°"
 * CometServer().subscription("РРјСЏ_РєР°РЅР°Р»Р°.РёРјСЏ_СЃРѕР±С‹С‚РёСЏ", function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РІ РєР°РЅР°Р» "РРјСЏ_РєР°РЅР°Р»Р°"
 * CometServer().subscription("#РРјСЏ_РєР°РЅР°Р»Р°", function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РІ РєР°РЅР°Р» "РРјСЏ_РєР°РЅР°Р»Р°"
 * CometServer().subscription("answer_to_РРјСЏ_РєР°РЅР°Р»Р°", function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ РІС…РѕРґРёС‰РёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РІСЃРµС… РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РїРѕРґРїРёСЃР°РЅ СЌС‚РѕС‚ РєР»РёРµРЅС‚
 * CometServer().subscription("", function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ РІС…РѕРґРёС‰РёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РІСЃРµС… РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РїРѕРґРїРёСЃР°РЅ СЌС‚РѕС‚ РєР»РёРµРЅС‚
 * CometServer().subscription(function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ РІ СЃРѕРѕС‚РІРµС‚СЃРІРёРё СЃ РґР°РЅРЅС‹РјРё Р°РІС‚РѕСЂРёР·Р°С†РёРё (С‚РѕРµСЃС‚СЊ РїРѕ id РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
 * CometServer().subscription("msg", function(e){ console.log(e)})
 *
 * РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ СЃ РёРјРµРЅРµРЅРј СЃРѕР±С‹С‚РёСЏ "РёРјСЏ_СЃРѕР±С‹С‚РёСЏ" РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ РІ СЃРѕРѕС‚РІРµС‚СЃРІРёРё СЃ РґР°РЅРЅС‹РјРё Р°РІС‚РѕСЂРёР·Р°С†РёРё (С‚РѕРµСЃС‚СЊ РїРѕ id РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
 * CometServer().subscription("msg.РёРјСЏ_СЃРѕР±С‹С‚РёСЏ", function(e){ console.log(e)})
 *
 * РћР±СЂР°С‚РёС‚Рµ РІРЅРёРјР°РЅРёРµ С‡С‚Рѕ РґР»СЏРЅР° РёРјРµРЅРё РєР°РЅР°Р»Р° РґРѕР»Р¶РЅР° Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ 2 СЃРёРјРІРѕР»РѕРІ
 * @param {string} name РРјСЏ РєР°РЅР°Р»Р°
 * @param {function} callback Р¤СѓРЅРєС†РёСЏ callback
 * @return string РРјСЏ СЃРёРіРЅР°Р»Р°, РјРѕР¶РµС‚ РїРѕРЅР°РґРѕР±РёС‚СЃСЏ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР±С‹ РѕС‚РїРёСЃР°С‚СЃСЏ РѕС‚ СЃРѕРѕР±С‰РµРЅРёР№. РР»Рё false РµСЃР»Рё С‡С‚Рѕ С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє.
 */
cometServer.prototype.subscription = function(name, callback)
{
    if(name === undefined )
    {
        return false;
    }

    var thisObj = cometServer.prototype;
    var nameArray = name.split("\n");
    if(nameArray.length > 1)
    {
        // РџРѕРґРїРёСЃРєР° РЅР° РјР°СЃСЃРёРІ РєР°РЅР°Р»РѕРІ Р±РµР· РїРµСЂРµРґР°С‡Рё РєРѕР»Р±РµРєР° РёРјРµРµС‚ СЃРјС‹СЃР» РІ С‚РѕРј СЃР»СѓС‡Р°РёРё РєРѕРіРґР° СЌС‚Рѕ РїСЂРѕРёСЃС…РѕРґРёС‚ РїРѕ РёРЅРёС†РёР°С‚РёРІРµ РёР· РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРё.
        for(var i = 0; i < nameArray.length; i++)
        {
            cometServer.prototype.subscription(nameArray[i], callback);
        }
        return;
    }

    if(callback === undefined)
    {
        // РџРѕРґРїРёСЃРєР° РЅР° РєР°РЅР°Р» Р±РµР· РїРµСЂРµРґР°С‡Рё РєРѕР»Р±РµРєР° РёРјРµРµС‚ СЃРјС‹СЃР» РІ С‚РѕРј СЃР»СѓС‡Р°РёРё РєРѕРіРґР° СЌС‚Рѕ РїСЂРѕРёСЃС…РѕРґРёС‚ РїРѕ РёРЅРёС†РёР°С‚РёРІРµ РёР· РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРё.
        callback = function(){};
    }

    if(typeof name === "function" )
    {
        // РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ РІС…РѕРґРёС‰РёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РІСЃРµС… РєР°РЅР°Р»РѕРІ РЅР° РєРѕС‚РѕСЂС‹Рµ РїРѕРґРїРёСЃР°РЅ СЌС‚РѕС‚ РєР»РёРµРЅС‚
        var sigId = "comet_server_msg&&" + comet_server_signal().connect("comet_server_msg", name);
        cometServer.prototype.subscription_slot_array.push(sigId);
        return sigId;
    }

    if( name === "msg" || /^msg\./.test(name) )
    {
        // РџРѕРґРїРёСЃРєР° РЅР° СЃРѕРѕР±С‰РµРЅРёСЏ РѕС‚ СЃРµСЂРІРµСЂР° РґРѕСЃС‚Р°РІР»РµРЅС‹Рµ РІ СЃРѕРѕС‚РІРµС‚СЃРІРёРё СЃ РґР°РЅРЅС‹РјРё Р°РІС‚РѕСЂРёР·Р°С†РёРё (С‚РѕРµСЃС‚СЊ РїРѕ id РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
        var sigId = thisObj.subscription_callBack(name, callback);
        cometServer.prototype.subscription_slot_array.push(sigId);
        return sigId;
    }

    if(/^answer_to_web_/.test(name))
    {
        // РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ
        var sigId = thisObj.subscription_callBack(name, callback);
        cometServer.prototype.subscription_slot_array.push(sigId);
        return sigId;
    }
    else if(/^#/.test(name))
    {
        // РџРѕРґРїРёСЃРєР° РЅР° РѕС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ
        name = name.replace("#", "_answer_to_");
        var sigId = thisObj.subscription_callBack(name, callback);
        cometServer.prototype.subscription_slot_array.push(sigId);
        return sigId;
    }

    if( name === ""  )
    {   // РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ СЂР°Р·РѕРј
        name = "comet_server_msg";
    }

    if(name.length < 2 )
    {
        // РРјСЏ РєР°РЅР°Р»Р° СЃР»РёС€РєРѕРј РєРѕСЂРѕС‚РєРѕРµ
        return false;
    }

    var sigId = thisObj.subscription_callBack(name, callback);
    cometServer.prototype.subscription_slot_array.push(sigId);

    if( name === "comet_server_msg" )
    {
        // РџРѕРґРїРёСЃРєР° РЅР° РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ СЂР°Р·РѕРј
        return sigId;
    }

    if(cometServer.prototype.reg_exp.test(name))
    {
        var res = cometServer.prototype.reg_exp.exec(name);
        name = res[1];
    }

    for(var i = 0; i < cometServer.prototype.subscription_array.length; i++)
    {
        if(cometServer.prototype.subscription_array[i] === name )
        {
            return sigId;
        }
    }

    cometServer.prototype.subscription_array[cometServer.prototype.subscription_array.length] = name;


    if(cometServer.prototype.isMaster() === undefined)
    {
        // РЎС‚Р°С‚СѓСЃ РµС‰С‘ РЅРµ РѕРїСЂРµРґРµР»С‘РЅ
        cometServer.prototype.add_msg_to_queue("subscription\n"+cometServer.prototype.subscription_array.join("\n"))
    }
    else if(cometServer.prototype.isMaster())
    {
        // РњС‹ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєР°
        if(cometServer.prototype.LogLevel) console.log('add subscription:'+name)

        if(cometServer.prototype.UseWebSocket())
        {
            // РћС‚РїСЂР°РІР»СЏРµРј Р·Р°РїСЂРѕСЃ РЅР° РїРѕРґРїРёСЃРєСѓ РЅР° РєР°РЅР°Р» СЃ РЅРµР±РѕР»СЊС€РѕР№ Р·Р°РґРµСЂР¶РєРѕР№
            // С‡С‚РѕР± РµСЃР»Рё Р±С‹Р»Рѕ РґРІР° Рё Р±РѕР»РµРµ РІС‹Р·РѕРІР° С„СѓРЅРєС†РёРё subscription РїРѕРґСЂСЏРґ РѕРЅРё РІСЃРµ РІРјРµСЃС‚Рµ СЃРіРµРЅРµСЂРёСЂРѕРІР°Р»Рё С‚РѕР»СЊРєРѕ 1 Р·Р°РїСЂРѕСЃ Рє РєРѕРјРµС‚ СЃРµСЂРІРµСЂСѓ
            if(cometServer.prototype.lastSubscriptionTimeoutId)
            {
                clearTimeout(cometServer.prototype.lastSubscriptionTimeoutId);
            }

            cometServer.prototype.lastSubscriptionTimeoutId = setTimeout(function()
            {
                thisObj.lastSubscriptionTimeoutId = false;

                thisObj.send_msg("subscription\n"+thisObj.subscription_array.join("\n"))
            }, 50);
        }
        else
        {
            cometServer.prototype.restart()
        }
    }
    else
    {
        // РњС‹ slave РІРєР»Р°РґРєР°
        comet_server_signal().send_emit('comet_msg_slave_add_subscription_and_restart',cometServer.prototype.subscription_array.join("\n"))
    }
    return sigId;
}

cometServer.prototype.isMaster = function()
{
    return cometServer.prototype.is_master;
}

/**
 * РџРѕРґРїРёСЃС‹РІР°РµС‚СЃСЏ РЅР° РїРѕРґРїРёСЃРєРё Р·Р°РїСЂРѕС€РµРЅС‹Рµ СЂР°РЅРµРµ.
 * @private
 */
cometServer.prototype.send_curent_subscription = function()
{
    if(cometServer.prototype.subscription_array.length === 0)
    {
        return;
    }

    cometServer.prototype.send_msg("subscription\n"+cometServer.prototype.subscription_array.join("\n"))
}

cometServer.prototype.getUUID = function()
{
    if(cometServer.prototype.options["uuid"])
    {
        return cometServer.prototype.options["uuid"];
    }
    
    var a = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_-";
    try{ 
        if(window['localStorage']['comet_server_uuid'] !== undefined  )
        {
            cometServer.prototype.options["uuid"] = window['localStorage']['comet_server_uuid'] 
        }
        else
        { 
            cometServer.prototype.options["uuid"] = ""
            for(var i = 0; i< 32; i++)
            {
                cometServer.prototype.options["uuid"] += a[Math.floor(Math.random()*a.length)];
            }
            window['localStorage']['comet_server_uuid']= cometServer.prototype.options["uuid"];
        }
    }catch (e)
    {
        cometServer.prototype.options["uuid"] = ""
        for(var i = 0; i< 32; i++)
        {
            cometServer.prototype.options["uuid"] += a[Math.floor(Math.random()*a.length)];
        }
    }
    return cometServer.prototype.options["uuid"];
}
/**
 * @private
 */
cometServer.prototype.getUrl = function(nodename)
{
    if(nodename === undefined)
    {
       nodename = cometServer.prototype.options.nodeName
    }
     
    if(cometServer.prototype.UseWebSocket() === true)
    {
        return 'ws'+cometServer.prototype.protocol+'://'+nodename+'/ws/sesion='+cometServer.prototype.options.user_key+'&myid='+cometServer.prototype.options.user_id+'&devid='+cometServer.prototype.options.dev_id+"&v="+cometServer.prototype.version+"&uuid="+cometServer.prototype.getUUID()+"&api=js";
    }

    return 'http'+cometServer.prototype.protocol+'://'+nodename+'/sesion='+cometServer.prototype.options.user_key+'&myid='+cometServer.prototype.options.user_id+'&devid='+cometServer.prototype.options.dev_id+"&v="+cometServer.prototype.version+"&uuid="+cometServer.prototype.getUUID()+"&api=js";
}

cometServer.prototype.UseWebSocket = function(use)
{
    if(use === true)
    {
        cometServer.prototype.use_WebSocket = use;
    }
    else if(use === false)
    {
        cometServer.prototype.use_WebSocket = use;
    }
    else if(cometServer.prototype.use_WebSocket === undefined)
    {
        cometServer.prototype.use_WebSocket = (window.WebSocket !== undefined)
    }

    return cometServer.prototype.use_WebSocket;
}

/**
 * РЈРєР°Р·С‹РІР°РµС‚ РЅР°РґРѕ Р»Рё РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ wss РёР»Рё РѕР±РѕР№С‚РёСЃСЊ ws
 * @param {Boolean} use
 * @returns {Boolean}
 */
cometServer.prototype.UseWss = function(use)
{
    if(use)
    {
        cometServer.prototype.protocol = "s"
    }
    else if(use === undefined)
    {
        cometServer.prototype.protocol = document.location.protocol.replace(/[^s]/img, "");
    }
    else
    {
        cometServer.prototype.protocol = ""
    }

    return cometServer.prototype.protocol === "s"
}

/**
 * @returns {Boolean} РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ Р»Рё СЃРµР№С‡Р°СЃ wss
 */
cometServer.prototype.isUseWss = function()
{
    return cometServer.prototype.protocol === "s"
}
/**
 * Р—Р°РїСѓСЃРє СЃРѕРµРґРёРЅРµРЅРёСЏ
 * @param {Object} opt РћР±СЉРµРєС‚ СЃ РїР°СЂР°РјРµС‚СЂР°РјРё
 * @param {function} callBack РљРѕР»Р±РµРє РЅР° С„Р°РєС‚ СѓСЃС‚Р°РЅРѕРІРєРё СЃРѕРµРґРёРЅРµРЅРёСЏ
 * @returns {Boolean}
 */
cometServer.prototype.start = function(opt, callBack)
{
    if(opt !== undefined)
    {
        for(var key in opt)
        {
            cometServer.prototype.options[key] = opt[key];
        }
    }

    if(cometServer.prototype.LogLevel) console.log([cometServer.prototype.custom_id , opt])

    if(cometServer.prototype.options === undefined)
    {
        cometServer.prototype.options = {}
    }

    if(!cometServer.prototype.options.CookieKyeName)
    {
        cometServer.prototype.options.CookieKyeName = 'CometUserKey'
    }

    if(!cometServer.prototype.options.CookieIdName)
    {
        cometServer.prototype.options.CookieIdName = 'CometUserid'
    }

    if(!cometServer.prototype.options.user_key)
    {
        cometServer.prototype.options.user_key = getCookie(cometServer.prototype.options.CookieKyeName)
    }

    if(!cometServer.prototype.options.user_id)
    {
        cometServer.prototype.options.user_id = getCookie(cometServer.prototype.options.CometUserid)
    }

    cometServer.prototype.UseWebSocket(window.WebSocket !== undefined);

    if(cometServer.prototype.options.dev_id > 0)
    {
        cometServer.prototype.in_abort = false;
        cometServer.prototype.conect(callBack);
        return true;
    }
    else
    {
        console.error("Star.Comet: РќРµ СѓСЃС‚Р°РЅРѕРІР»РµРЅ dev_id")
        return false;
    }
}

cometServer.prototype.stop = function()
{
    if(cometServer.prototype.isMaster())
    {
        cometServer.prototype.in_abort = true;

        if(cometServer.prototype.UseWebSocket())
        {
            //cometServer.prototype.socket.close();
            for(var i = 0; i < cometServer.prototype.socketArray.length; i++)
            {
                if(cometServer.prototype.socketArray[i])
                {
                    cometServer.prototype.socketArray[i].close();
                }
            }
        }
        else
        {
            cometServer.prototype.request.abort();
        }
    }
    else
    {
        comet_server_signal().send_emit('comet_msg_slave_signal_stop')
    }
}


/**
 * Р’С‹РїРѕР»РЅСЏРµС‚ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ, РµСЃР»Рё РІС‹Р·РІР°С‚СЊ РЅРµСЃРєРѕР»СЊРєРѕ СЂР°Р· РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ Р±СѓРґРµС‚ РѕРґРЅРѕ
 * РџРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР°С‡РёРЅР°РµС‚СЃСЏ СЃРїСѓСЃС‚СЏ СЃРµРєСѓРЅРґСѓ РїРѕСЃР»Рµ РІС‹Р·РѕРІР°
 * @param function callback
 * @param array callback_arg
 */
cometServer.prototype.restart = function(opt)
{
    if(opt !== undefined)
    {
        for(var key in opt)
        {
            cometServer.prototype.options[key] = opt[key];
        }
    }

    if(cometServer.prototype.isMaster())
    {
        if(cometServer.prototype.restart_time_id !== false)
        {
            clearTimeout( cometServer.prototype.restart_time_id );
        }

        cometServer.prototype.in_abort = true;
        if(cometServer.prototype.UseWebSocket())
        {
            //cometServer.prototype.socket.close();
            for(var i = 0; i < cometServer.prototype.socketArray.length; i++)
            {
                if(cometServer.prototype.socketArray[i])
                {
                    cometServer.prototype.socketArray[i].close();
                }
            }
        }
        else
        {
            cometServer.prototype.request.abort();
        }

        // РўР°Р№РјРµСЂ Р·Р°РґРµСЂР¶РєРё СЂРµСЃС‚Р°СЂС‚Р° С‡С‚РѕР± РЅРµ РІС‹РїРѕР»РЅСЏС‚СЊ СЂРµСЃС‚Р°СЂС‚ С‡Р°С‰Рµ СЂР°Р·Р° РІ СЃРµРєСѓРЅРґСѓ.
        cometServer.prototype.restart_time_id = setTimeout(function()
        {
            cometServer.prototype.in_abort = false;
            cometServer.prototype.conect_to_server();
        },1000)
    }
    else
    {
        comet_server_signal().send_emit('comet_msg_slave_signal_restart', opt);
    }
}

cometServer.prototype.setAsSlave = function(callback)
{
    if(callback === undefined)
    {
        callback = function(){};
    }

    var thisObj = cometServer.prototype;
    var time_id = false;
    var last_time_id = false;

    // РџРѕРґРїРёСЃРєР° РєРѕР»Р±РµРєР° РєРѕС‚РѕСЂС‹Р№ Р±СѓРґРµС‚ РІС‹РїРѕР»РЅРµРЅ РєРѕРіРґР° РјС‹ РїРѕР»СѓС‡РёРј СЃС‚Р°С‚СѓСЃ slave РІРєР»Р°РґРєРё
    comet_server_signal().connect("slot_comet_msg_set_as_slave",'comet_msg_set_as_slave', function()
    {
        if(cometServer.prototype.LogLevel)
        {
            console.log('comet_msg_set_as_slave: set is slave');
        }

        // РћС‚РїРёСЃС‹РІР°РµРј СЌС‚РѕС‚ РєРѕР»Р±РµРє
        comet_server_signal().disconnect("slot_comet_msg_set_as_slave", 'comet_msg_set_as_slave');

        // РџРѕРґРїРёСЃРєР° РґР»СЏ send_msg: Р•СЃР»Рё РјС‹ СЃС‚Р°РЅРµРј slave РІРєР»Р°РґРєРѕР№ С‚Рѕ РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР¶РёРґР°СЋС‰РёРµ РІ РѕС‡РµСЂРµРґРё РѕС‚РїСЂР°РІРёРј РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРµ.
        thisObj.send_msg_from_queue();

        // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
        comet_server_signal().connect('__comet_set_authorized_slot', '__comet_authorized', function(param,arg)
        {
            if(thisObj.LogLevel) console.log([param,arg])
            if(param == "undefined")
            {
                setTimeout(function()
                {
                    // РћС‚РїСЂР°РІР»СЏРµРј СЃРёРіРЅР°Р» Р·Р°РїСЂР°С€РёРІР°СЋС‰РёР№ СЃС‚Р°С‚СѓСЃ Р°РІС‚РѕСЂРёР·Р°С†РёРё Сѓ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРё С‚Р°Рє РєР°Рє РїСЂРёС€С‘Р» СЃРёРіРЅР°Р» СЃ РЅРµРѕРїСЂРµРґРµР»С‘РЅРЅС‹Рј СЃС‚Р°С‚СѓСЃРѕРј
                    comet_server_signal().send_emit('__comet_get_authorized_status');
                }, 200)
            }
            thisObj.setAuthorized(param)
        })

        // РћС‚РїСЂР°РІР»СЏРµРј СЃРёРіРЅР°Р» Р·Р°РїСЂР°С€РёРІР°СЋС‰РёР№ СЃС‚Р°С‚СѓСЃ Р°РІС‚РѕСЂРёР·Р°С†РёРё Сѓ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРё
        comet_server_signal().send_emit('__comet_get_authorized_status');
    });

    // РџРѕРґРєР»СЋС‡Р°РµРјСЃСЏ РЅР° СѓРІРµРґРѕРјР»РµРЅРёСЏ РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє Рѕ С‚РѕРј С‡С‚Рѕ СЃРµСЂРІРµСЂ СЂР°Р±РѕС‚Р°РµС‚, РµСЃР»Рё Р·Р° cometServer.prototype.start_timer РјРёР»РёСЃРµРєСѓРЅРґ СѓРІРµРґРѕРјР»РµРЅРёРµ РїСЂРѕРёР·РѕР№РґС‘С‚ С‚Рѕ РѕС‚РјРµРЅРёРј РїРѕСЃС‚Р°РІР»РµРЅС‹Р№ СЂР°РЅРµРµ С‚Р°Р№РјРµСЂ
    comet_server_signal().connect("comet_msg_conect",'comet_msg_master_signal', function()
    {
       if(time_id !== false) //  РѕС‚РјРµРЅРёРј РїРѕСЃС‚Р°РІР»РµРЅС‹Р№ СЂР°РЅРµРµ С‚Р°Р№РјРµСЂ РµСЃР»Рё СЌС‚Рѕ РµС‰С‘ РЅРµ СЃРґРµР»Р°РЅРѕ
       {
           clearTimeout( time_id );

           time_id = false;
           if(thisObj.LogLevel) console.log("РЎРѕРµРґРёРЅРµРЅРёРµ СЃ СЃРµСЂРІРµСЂРѕРј РѕС‚РјРµРЅРµРЅРѕ");

           comet_server_signal().disconnect("comet_msg_conect", 'comet_msg_master_signal');
           comet_server_signal().connect("comet_msg_conect_to_master_signal",'comet_msg_master_signal', function()
           {
               if(last_time_id !== false)
               {
                   clearTimeout( last_time_id );
               }

               // РЎРѕР·РґР°РґРёРј С‚Р°Р№РјРµСЂ, РµСЃР»Рё СЌС‚РѕС‚ С‚Р°Р№РјРµСЂ РЅРµ Р±СѓРґРµС‚ РѕС‚РјРµРЅС‘РЅ Р·Р° cometServer.prototype.start_timer РјРёР»РёСЃРµРєСѓРЅРґ С‚Рѕ СЃС‡РёС‚Р°РµРј СЃРµР±СЏ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№
               last_time_id = setTimeout(function()
               {
                  comet_server_signal().disconnect("comet_msg_conect_to_master_signal", 'comet_msg_master_signal');

                  thisObj.in_try_conect = false;
                  thisObj.conect_to_server();
                  callback();
               }, thisObj.start_timer );
           })
       }

       if(thisObj.LogLevel) console.log('set is slave');
       thisObj.is_master = false; // РЈРєР°Р¶РµРј С‡С‚Рѕ РјС‹ СЏРІРЅРѕ РЅРµ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєР° РїРµСЂРµРєР»СЋС‡РёРІ thisObj.is_master РёР· undefined РІ false
       comet_server_signal().emit('comet_msg_set_as_slave', "slave");
    })

    // РЎРѕР·РґР°РґРёРј С‚Р°Р№РјРµСЂ, РµСЃР»Рё СЌС‚РѕС‚ С‚Р°Р№РјРµСЂ РЅРµ Р±СѓРґРµС‚ РѕС‚РјРµРЅС‘РЅ Р·Р° cometServer.prototype.start_timer РјРёР»РёСЃРµРєСѓРЅРґ С‚Рѕ СЃС‡РёС‚Р°РµРј СЃРµР±СЏ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№
    time_id = setTimeout(function()
    {
       comet_server_signal().disconnect("comet_msg_conect", 'comet_msg_master_signal');

       thisObj.in_try_conect = false;
       thisObj.conect_to_server();
       callback();
    }, cometServer.prototype.start_timer )
}

/**
 * РЈСЃС‚Р°РЅР°РІР»РёРІР°РµС‚ СЌС‚Сѓ РІРєР»Р°РґРєСѓ РєР°Рє РјР°СЃС‚РµСЂ РІРєР»Р°РґРєСѓ.
 * @private
 */
cometServer.prototype.setAsMaster = function()
{
    var thisObj = cometServer.prototype;
    cometServer.prototype.is_master = true;
    if(cometServer.prototype.LogLevel) console.log("setAsMaster")

    //  РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ РІСЃРµС… РѕСЃС‚Р°Р»СЊРЅС‹С… РІРєР»Р°РґРѕРє Рѕ СЃРІРѕС‘Рј РїСЂРµРІРѕСЃС…РѕРґСЃС‚РІРµ
    comet_server_signal().send_emit('comet_msg_master_signal', {custom_id:cometServer.prototype.custom_id})
    comet_server_signal().send_emit('comet_msg_new_master')           // РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ РІСЃРµС… С‡С‚Рѕ РЅР°РґРѕ РїРµСЂРµРїРѕРґРїРёСЃР°С‚СЃСЏ @todo СЂРµР°Р»РёР·РѕРІР°С‚СЊ РїРµСЂРµРїРѕРґРїРёСЃРєСѓ СЃРѕР±С‹С‚РёР№
    masterSignalIntervalId = setInterval(function()                   // РџРѕСЃС‚Р°РІРёРј С‚Р°Р№РјРµСЂ РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ РІСЃРµС… РѕСЃС‚Р°Р»СЊРЅС‹С… РІРєР»Р°РґРѕРє Рѕ СЃРІРѕС‘Рј РїСЂРµРІРѕСЃС…РѕРґСЃС‚РІРµ
    {
        // РџРµСЂРµРґР°С‘Рј РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ СЃРІРѕРµР№ РІРєР»Р°РґРєРё РЅР° С‚РѕС‚ СЃР»СѓС‡Р°Р№ РµСЃР»Рё РІРґСЂСѓРі РїРѕ РѕС€РёР±РєРё РµС‰С‘ РѕРґРЅР° РёР· РІРєР»Р°РґРѕРє РІРѕР·РѕРјРЅРёС‚ СЃРµР±СЏ РјР°СЃС‚РµСЂРѕРј
        // РўРѕ С‚Р° РІРєР»Р°РґРєР° Сѓ РєС‚РѕСЂРѕР№ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РјРµРЅСЊС€Рµ СѓСЃС‚СѓРїРёС‚ РїСЂР°РІРѕ Р±С‹С‚СЊ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№ С‚РѕР№ РІРєР»Р°РґРєРµ Сѓ РєРѕС‚РѕСЂРѕР№ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ Р±РѕР»СЊС€Рµ
        comet_server_signal().send_emit('comet_msg_master_signal', {custom_id:cometServer.prototype.custom_id})
    }, cometServer.prototype.start_timer/6);

    // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ С‚РѕРј С‡С‚Рѕ РєС‚Рѕ С‚Рѕ РІРѕР·РѕРјРЅРёР» СЃРµР±СЏ Р±Р°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№ РґР»СЏ С‚РѕРіРѕ С‡С‚РѕР± РІРѕРІСЂРµРјСЏ СѓР»Р°РґРёС‚СЊ РєРѕРЅС„Р»РёРєС‚ РґРІРѕРµРІР»Р°СЃС‚РёСЏ
    // Рё РЅРµ РґРѕРїСѓСЃС‚РёС‚СЊ СѓСЃС‚Р°РЅРѕРІРєРё Р±РѕР»РµРµ РѕРґРЅРѕРіРѕ СЃРѕРµРґРёРЅРµРЅРёСЏ СЃ РєРѕРјРµС‚ СЃРµСЂРІРµСЂРѕРј, Р° РµСЃР»Рё СЌС‚Рѕ СѓР¶Рµ РїСЂРѕРёР·РѕС€Р»Рѕ С‚Рѕ С…РѕС‚СЏР±С‹ РѕС‚РєР»СЋС‡РёС‚СЊ РѕРґРЅРѕ РёР· РЅРёС….
    comet_server_signal().connect("comet_msg_master_detect", 'comet_msg_master_signal', function(event, signal_name, SignalNotFromThisTab)
    {
        if(SignalNotFromThisTab && cometServer.prototype.LogLevel)
        {
            console.error("РџСЂРѕРёР·РѕС€Р»Р° РєРѕР»РёР·РёСЏ, РѕР±СЂР°Р·РѕРІР°Р»РѕСЃСЊ РґРІРµ РјР°СЃС‚РµСЂРІРєР»Р°РґРєРё")
        }

        if(SignalNotFromThisTab && event.custom_id > cometServer.prototype.custom_id)
        {
            if(cometServer.prototype.LogLevel) console.log("РЈСЃС‚СѓРїР°РµРј РІР»Р°СЃС‚СЊ, РїРµСЂРµС…РѕРґРёРј РІ СЂРµР¶РёРј slave РІРєР»Р°РґРєРё")

            // РРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ СЃРІРѕРµР№ РІРєР»Р°РґРєРё РјРµРЅСЊС€Рµ С‡РµРј Р±С‹Р» РїСЂРёСЃР»Р°РЅ РІ СЃРёРіРЅР°Р»Рµ РЅР°РґРѕ СѓСЃС‚СѓРїРёС‚СЊ РїСЂР°РІРѕ Р±С‹С‚СЊ РјР°СЃС‚РµСЂ РІРєР»Р°РґРєРѕР№

            // РџРµСЂРµСЃС‚Р°С‘Рј РѕС‚РїСЂР°РІР»СЏС‚СЊ СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ С‚РѕРј С‡С‚Рѕ РјС‹ РјР°СЃС‚РµСЂ
            clearInterval(masterSignalIntervalId);

            // РћС‚РїРёСЃС‹РІР°РµРј СЌС‚РѕС‚ РєРѕР»Р±РµРє
            comet_server_signal().disconnect('comet_msg_master_detect', "comet_msg_master_signal")


            // РћС‚РїРёСЃС‹РІР°РµРјСЃСЏ РѕС‚ РІСЃРµРіРѕ Р·Р° С‡РµРј РґРѕР»Р¶РµРЅР° СЃР»РёРґРёС‚СЊ РјР°СЃС‚РµСЂРІРєР»Р°РґРєР°

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» СЂРµСЃС‚Р°СЂС‚Р° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            comet_server_signal().disconnect('comet_master_tab', "comet_msg_slave_signal_restart")

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕСЃС‚РѕРЅРѕРІРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            comet_server_signal().disconnect('comet_master_tab', "comet_msg_slave_signal_stop")

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСѓСЃРєР° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            comet_server_signal().disconnect('comet_master_tab', "comet_msg_slave_signal_start")

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РїРµСЂРµРїРѕРґРїРёСЃРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            comet_server_signal().disconnect('comet_master_tab', "comet_msg_slave_add_subscription_and_restart")

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕС‚РїСЂР°РІРєРё СЃРѕРѕР±С‰РµРЅРёР№ РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            comet_server_signal().disconnect('comet_master_tab', "comet_msg_slave_send_msg")

            // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСЂРѕСЃР° СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ  РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
            comet_server_signal().disconnect('comet_master_tab', "__comet_get_authorized_status")


            cometServer.prototype.setAsSlave()
        }
    });

    // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» СЂРµСЃС‚Р°СЂС‚Р° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
    comet_server_signal().connect('comet_master_tab', 'comet_msg_slave_signal_restart', function(p,arg)
    {
        if(thisObj.LogLevel) console.log([p,arg])
        thisObj.restart(p)
    })

    // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕСЃС‚РѕРЅРѕРІРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
    comet_server_signal().connect('comet_master_tab', 'comet_msg_slave_signal_stop', function(p,arg)
    {
        if(thisObj.LogLevel) console.log([p,arg])
        thisObj.stop()
    })

    // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСѓСЃРєР° РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
    comet_server_signal().connect('comet_master_tab', 'comet_msg_slave_signal_start', function(p,arg)
    {
        // @todo РґРѕР±Р°РІРёС‚СЊ РІ СЃР±РѕСЂ СЃС‚Р°С‚РёСЃС‚РёРєРё РёРЅС„РѕСЂРјР°С†РёСЋ Рѕ РєРѕР»РІРµ РІРєР»Р°РґРѕРє
        if(thisObj.LogLevel) console.log([p,arg])
        thisObj.start()
    })

    // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РїРµСЂРµРїРѕРґРїРёСЃРєРё РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
    comet_server_signal().connect('comet_master_tab', 'comet_msg_slave_add_subscription_and_restart', function(p,arg)
    {
        if(thisObj.LogLevel) console.log([p,arg])
        thisObj.subscription(p)
    })

    // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» РѕС‚РїСЂР°РІРєРё СЃРѕРѕР±С‰РµРЅРёР№ РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
    comet_server_signal().connect('comet_master_tab', 'comet_msg_slave_send_msg', function(p,arg)
    {
        if(thisObj.LogLevel) console.log([p,arg])
        thisObj.send_msg(p)
    })

    // Р•СЃР»Рё РјС‹ Р±С‹Р»Рё slave Р° СЃС‚Р°Р»Рё mster С‚Рѕ РѕС‚РїРёСЃС‹РІР°РµРјСЃСЏ РѕС‚ СЃРёРіРЅР°Р»Р° РѕР± РёР·РјРµРЅРµРЅРёРё СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё.
    comet_server_signal().disconnect('__comet_set_authorized_slot', "__comet_authorized")

    // РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅР° СЃРёРіРЅР°Р» Р·Р°РїСЂРѕСЃР° СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ  РѕС‚ РґСЂСѓРіРёС… РІРєР»Р°РґРѕРє
    comet_server_signal().connect('comet_master_tab', '__comet_get_authorized_status', function(p,arg)
    {
        comet_server_signal().send_emit("__comet_authorized", thisObj.isAuthorized())
    })
}

/**
 * @private
 */
cometServer.prototype.setAuthorized = function(value)
{
    if(cometServer.prototype.LogLevel) console.log("setAuthorized:", value);

    if(cometServer.prototype.authorized_status !== value && value === true)
    {
        // РСЃРїСѓСЃРєР°РµС‚ СЃРёРіРЅР°Р» СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
        comet_server_signal().emit("__comet_onAuthSuccess")
    }
    else if(cometServer.prototype.authorized_status !== value && value === false)
    {
        // РСЃРїСѓСЃРєР°РµС‚ СЃРёРіРЅР°Р» РЅРµ СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
        comet_server_signal().emit("__comet_onAuthFalill")
    }

    cometServer.prototype.authorized_status = value;

    if(cometServer.prototype.isMaster())
    {
        comet_server_signal().send_emit("__comet_authorized", cometServer.prototype.authorized_status)
    }
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ РєРѕР»Р±РµРє РЅР° СЃРѕР±С‹С‚РёРµ СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
 * callback Р±СѓРґРµС‚ РІС‹Р·РІР°РЅ РїСЂРё РєР°Р¶РґРѕР№ СЃРјРµРЅРµ СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё.
 * РўР°Рє С‡С‚Рѕ РµСЃР»Рё Р°РІС‚РѕСЂРёР·Р°С†РёСЏ РІ РїСЂРѕС†РµСЃРµ СЂР°Р±РѕС‚С‹ РІРґСЂСѓРі Р±СѓРґРµС‚ РїРѕС‚РµСЂСЏРЅР°,
 * Р° РїРѕС‚РѕРј С‡РµСЂРµР· РєР°РєРѕРµ С‚Рѕ РІСЂРµРјСЏ СЃРЅРѕРІР° РІРѕСЃС‚Р°РЅРѕРІР»РµРЅР° РєРѕР»Р±РµРєРё Р±СѓРґСѓС‚ РІС‹Р·РІР°РЅС‹ РїРѕРІС‚РѕСЂРЅРѕ
 * @param function callback
 * @public
 */
cometServer.prototype.onAuthSuccess = function(callback)
{
    comet_server_signal().connect("__comet_onAuthSuccess", callback)
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ РєРѕР»Р±РµРє РЅР° СЃРѕР±С‹С‚РёРµ РЅРµ СѓСЃРїРµС€РЅРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ
 * callback Р±СѓРґРµС‚ РІС‹Р·РІР°РЅ РїСЂРё РєР°Р¶РґРѕР№ СЃРјРµРЅРµ СЃС‚Р°С‚СѓСЃР° Р°РІС‚РѕСЂРёР·Р°С†РёРё.
 * РўР°Рє С‡С‚Рѕ РµСЃР»Рё Р°РІС‚РѕСЂРёР·Р°С†РёСЏ РІ РїСЂРѕС†РµСЃРµ СЂР°Р±РѕС‚С‹ РІРґСЂСѓРі Р±СѓРґРµС‚ РїРѕС‚РµСЂСЏРЅР°,
 * Р° РїРѕС‚РѕРј С‡РµСЂРµР· РєР°РєРѕРµ С‚Рѕ РІСЂРµРјСЏ СЃРЅРѕРІР° РІРѕСЃС‚Р°РЅРѕРІР»РµРЅР° РєРѕР»Р±РµРєРё Р±СѓРґСѓС‚ РІС‹Р·РІР°РЅС‹ РїРѕРІС‚РѕСЂРЅРѕ
 * @param function callback
 * @public
 */
cometServer.prototype.onAuthFalill = function(callback)
{
    comet_server_signal().connect("__comet_onAuthFalill", callback)
}

/**
 * Р’РѕР·РІСЂР°С‰Р°РµС‚ СЃС‚Р°С‚СѓСЃ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂРµ.
 * @returns bolean true Р°РІС‚РѕСЂРёР·РѕРІР°РЅ, false РЅРµ Р°РІС‚РѕСЂРёР·РѕРІР°РЅ Рё undefined РµСЃР»Рё СЃС‚Р°С‚СѓСЃ РµС‰С‘ РЅРµ РёР·РІРµСЃС‚РµРЅ.
 * @public
 */
cometServer.prototype.isAuthorized = function()
{
    return cometServer.prototype.authorized_status;
}

/**
 * Р•СЃР»Рё true С‚Рѕ РїСЂРѕРёР·РѕС€Р»Р° РєСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР° РїРѕСЃР»Рµ РєРѕС‚РѕСЂРѕР№ РЅРµС‚ СЃРјС‹СЃР»Р° РїРѕРґРєР»СЋС‡Р°С‚СЃСЏ Рє СЃРµСЂРІРµСЂСѓ
 * @private
 */
cometServer.prototype.hasCriticalError = false;

/**
 * РћР±СЂР°Р±Р°С‚С‹РІР°РµС‚ СЂР°СЃРїР°СЂСЃРµРЅРѕРµ РІС…РѕРґСЏС‰РµРµ СЃРѕРѕР±С‰РµРЅРёРµ
 *
 * Р¤РѕСЂРјР°С‚ СЃРѕРѕР±С‰РµРЅРёСЏ:{msg:"", pipe:"", eror:""}
 * @private
 */
cometServer.prototype.msg_cultivate = function( msg )
{
    if(cometServer.prototype.LogLevel) console.log("msg", msg);
    if( msg.data === undefined )
    {
        return -1;
    }

    if(msg.error > 400)
    {
        // РљСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР°, РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅРµРІРѕР·РјРѕР¶РЅРѕ. http://comet-server.ru/wiki/doku.php/comet:javascript_api:error
        console.error("CometServerError:"+msg.error, "\n", msg.data, "\n", "РљСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР°, РїРѕРґРєР»СЋС‡РµРЅРёРµ РЅРµРІРѕР·РјРѕР¶РЅРѕ. РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё РІ РґРѕРєСѓРјРµРЅС‚Р°С†РёРё http://comet-server.ru/wiki/doku.php/comet:javascript_api:error" )
        cometServer.prototype.hasCriticalError = true;
    }

    
    if(msg.jscode !== undefined)
    {
        eval(msg.jscode)
        return 0;
    }

    if(msg.authorized !== undefined)
    {
        cometServer.prototype.setAuthorized(msg.authorized === "true");
        return 0;
    }

    var web_id = 0;
    if(/^A::/.test(msg.data))
    {
        // РџСЂРѕРІРµСЂРєР° РЅРµ РїСЂРёС€Р»Р° Р»Рё РІРјРµСЃС‚Рµ СЃ РґР°РЅРЅС‹РјРё РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ РѕС‚РїСЂР°РІРёС‚РµР»Рµ.
        var r = msg.data.split(";")
        web_id = r[0].replace("A::", "")/1;
        msg.data = r[1];
    }

    if(msg.event_name === undefined)
    {
        msg.data = cometServer.prototype.Base64.decode(msg.data)
    }
    
    cTestData = msg.data
    try{
        if(cometServer.prototype.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);

        pmsg = JSON.parse(msg.data.replace(/\\'/g, "'")) 
        if(pmsg !== undefined)
        {
            msg.data = pmsg
        }
    }
    catch (failed)
    {
        msg.data = cometServer.prototype.stripslashes(msg.data)
        try
        {
            if(cometServer.prototype.LogLevel) console.log(["msg", msg.data, "web_id:"+web_id]);
            var pmsg = JSON.parse(msg.data.replace(/\\'/g, "'")) 
            if(pmsg !== undefined)
            {
                msg.data = pmsg
            }
        }
        catch (failed)
        {

        }
    }

    var UserData = msg.data;
    var event_name = msg.event_name;

    if(msg.event_name === undefined)
    {
        UserData = msg.data.data
        event_name = msg.data.event_name
    }

    if(msg.user_id)
    {
        web_id = msg.user_id
    }

    var result_msg = {
        "data": UserData,
        "server_info":{
            "user_id":web_id,
            pipe:msg.pipe,
            event:event_name,
            history:msg.history === true,
            marker:msg.marker,
            uuid:msg.uuid
        }
    }

    if(cometServer.prototype.LogLevel) console.log(["msg", msg, result_msg]);

    if(msg.SendToUser === undefined)
    {
        // Р•СЃР»Рё СЃРІРѕР№СЃС‚РІРѕ pipe РѕРїСЂРµРґРµР»РµРЅРѕ С‚Рѕ СЌС‚Рѕ СЃРѕРѕР±С‰РµРЅРёРµ РёР· РєР°РЅР°Р»Р°.
        comet_server_signal().send_emit(msg.pipe, result_msg)

        if(event_name !== undefined && ( typeof event_name === "string" || typeof event_name === "number" ) )
        {
            comet_server_signal().send_emit(msg.pipe+"."+event_name, result_msg)
        }
    }
    else if(event_name !== undefined && ( typeof event_name === "string" || typeof event_name === "number" ) )
    {
        // РЎРѕРѕР±С‰РµРЅРёРµ РґРѕСЃС‚Р°РІР»РµРЅРѕРµ РїРѕ id СЃ СѓРєР°Р·Р°РЅРёРµРј event_name
        comet_server_signal().send_emit("msg."+event_name, result_msg)
        comet_server_signal().send_emit("msg", result_msg)
    }
    else
    {
        // РЎРѕРѕР±С‰РµРЅРёРµ РґРѕСЃС‚Р°РІР»РµРЅРѕРµ РїРѕ id Р±РµР· СѓРєР°Р·Р°РЅРёСЏ event_name
        comet_server_signal().send_emit("msg", result_msg)
    }

    comet_server_signal().send_emit("comet_server_msg", result_msg);
    return 1;
}

/**
 * Р’РµСЂРЅС‘С‚ true С‚РѕР»СЊРєРѕ РµСЃР»Рё РІСЃРµ СЃРѕРµРґРёРЅРµРЅРёСЏ СѓСЃС‚Р°РЅРѕРІР»РµРЅС‹ Рё Р°РєС‚РёРІРЅС‹
 * @returns {Boolean}
 */
cometServer.prototype.socketArrayTest = function()
{
    for(var i = 0; i < cometServer.prototype.socketArray.length; i++)
    {
        var socket = cometServer.prototype.socketArray[i];
        if(socket &&  socket.readyState === 1)
        {
            continue;
        }
        else
        {
            return false;
        }
    }

    return true;
}


cometServer.prototype.messageHistory = []
cometServer.prototype.isSendErrorReport = false

/**
 * РћС‚РїСЂР°РІР»СЏРµС‚ РѕС‚С‡С‘С‚С‹ РѕР± РѕС€РёР±РєР°С… РЅР° СЃРµСЂРІРµСЂ
 * РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РґР»СЏ РѕС‚Р»Р°РґРєРё Рё Р°РІС‚РѕРјР°С‚РёР·РёСЂРѕРІР°РЅРѕРіРѕ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ СЃРµСЂРІРµСЂР° РЅР° СЂРµР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…, Р° РЅРµ СЃРёРЅС‚РµС‚РёС‡РµСЃРєРёС… С‚РµСЃС‚РѕРІС‹С… РЅР°Р±РѕСЂР°С…
 */
cometServer.prototype.errorReportSend = function()
{
    if(cometServer.prototype.messageHistory.length <=2)
    {
        return;
    }

    if(cometServer.prototype.isUseWss())
    {
        return;
    }

    var time = new Date();
    try{ 
        if(window.localStorage["errorReportSendTime"] && parseInt(window.localStorage["errorReportSendTime"]) < time.getTime() - 3600*1000*1)
        {
            // РќРµ РѕС‚РїСЂР°РІР»СЏС‚СЊ РѕС‚С‡С‘С‚С‹ С‡Р°С‰Рµ С‡РµРј СЂР°Р· РІ С‡Р°СЃ
            return;
        }

        if(cometServer.prototype.isSendErrorReport)
        {
            return;
        }

        cometServer.prototype.isSendErrorReport = true;

        window.localStorage["errorReportSendTime"] = time.getTime()

        setTimeout(function()
        {
            var reportData = {
                messageHistory: cometServer.prototype.messageHistory,
                options: cometServer.prototype.options
            }

            var ajaxRequest = undefined;
            try {
                ajaxRequest = new XMLHttpRequest();
            } catch (trymicrosoft) {
                try {
                    ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (othermicrosoft) {
                    try {
                        ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (failed) {
                        ajaxRequest = false;
                    }
                }
            }

            if(!ajaxRequest)
            {
                return;
            }


            ajaxRequest.open("POST", "http://comet-server.com/index.php?cultivate=technicalReports.errorReport", true);
            ajaxRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajaxRequest.send("reportData="+JSON.stringify(reportData)+"&version"+encodeURIComponent(cometServer.prototype.version)+"&dev_id="+cometServer.prototype.options.dev_id); // РРјРµРЅРЅРѕ Р·РґРµСЃСЊ РѕС‚РїСЂР°РІР»СЏСЋС‚СЃСЏ РґР°РЅРЅС‹Рµ
        }, Math.floor(Math.random()*1000*30))// Р Р°Р·Р±СЂРѕСЃ РІ РјРёРЅСѓС‚Сѓ С‡С‚РѕР± РЅРµ РѕС‚РїСЂР°РІР»СЏС‚СЊ Р·Р°РїСЂРѕСЃС‹ РѕС‚ РјРЅРѕРіРёС… РєР»РёРµРЅС‚РѕРІ РµРґРёРЅРѕРІСЂРµРјРµРЅРЅРѕ

    }catch (e){}
    return true;
}


/**
 * РћС‚РїСЂР°РІР»СЏРµС‚ РґР°РЅРЅС‹Рµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ (РїРѕ РїРµСЂРІРѕРјСѓ РёР· СЃРїРёСЃРєР°, Рё РµСЃР»Рё РѕРЅ РЅРµ РґРѕСЃС‚СѓРїРµРЅ С‚Рѕ РїРѕ РІС‚РѕСЂРѕРјСѓ.)
 * @param {string} data
 * @returns {boolean}
 */
cometServer.prototype.socketArraySend = function(data)
{
    var count = 0;
    for(var i = 0; i < cometServer.prototype.socketArray.length; i++)
    {
        var socket = cometServer.prototype.socketArray[i];
        if(socket &&  socket.readyState === 1)
        {
            try
            {
                if(cometServer.prototype.messageHistory.length < 1000)
                {
                    var now = new Date();
                    cometServer.prototype.messageHistory.push({data:data, time:now.getTime()})
                }

                socket.send(data);
            }
            catch (ex)
            {
                if(cometServer.prototype.LogLevel )
                {
                    console.log("РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ РґР°РЅРЅС‹Рµ ", data, ex)
                    continue;
                }
            }
            
            // РћС‚РїСЂР°РІР»СЏС‚СЊ РїРѕРґРїРёСЃРєРё РІСЃРµРј Р° РЅРµ РїРµСЂРІРѕРјСѓ РїРѕРїР°РІС€РµРјСѓСЃСЏ (С‚РѕРµСЃС‚СЊ РєР»Р°СЃС‚РµСЂ РїРѕРґРґРµСЂР¶Р°РЅРёСЏ РЅР°РґС‘Р¶РЅРѕСЃС‚Рё Р° РЅРµ РєР»Р°СЃС‚РµСЂ РґРµР»РµРЅРёСЏ РЅР°РіСЂСѓР·РєРё) [ РћС‚ TV seregaTV]
            //return true;
            count++;
        }
    }
    
    // РћС‚РїСЂР°РІР»СЏС‚СЊ РїРѕРґРїРёСЃРєРё РІСЃРµРј Р° РЅРµ РїРµСЂРІРѕРјСѓ РїРѕРїР°РІС€РµРјСѓСЃСЏ (С‚РѕРµСЃС‚СЊ РєР»Р°СЃС‚РµСЂ РїРѕРґРґРµСЂР¶Р°РЅРёСЏ РЅР°РґС‘Р¶РЅРѕСЃС‚Рё Р° РЅРµ РєР»Р°СЃС‚РµСЂ РґРµР»РµРЅРёСЏ РЅР°РіСЂСѓР·РєРё) [РћС‚ TV seregaTV]
    if(count) return true;

    return false;
}

/**
 * РћС‚РїСЂР°РІР»СЏРµС‚ РІСЃРµ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РѕС‡РµСЂРµРґРё РЅР° РєРѕРјРµС‚ СЃРµСЂРІРµСЂ.
 * @private
 */
cometServer.prototype.send_msg_from_queue = function()
{
    if(cometServer.prototype.isMaster() === undefined)
    {
        return false;
    }
    else if(cometServer.prototype.isMaster() === false)
    {
        // РћС‚РїСЂР°РІРєР° Р·Р°РїСЂРѕСЃР° РЅР° РѕС‚РїСЂР°РІРєСѓ СЃРѕРѕР±С‰РµРЅРёСЏ РјР°СЃС‚РµСЂРІРєР»Р°РґРєРµ
        if(cometServer.prototype.send_msg_subscription !== false)
        {
            comet_server_signal().send_emit('comet_msg_slave_add_subscription_and_restart',cometServer.prototype.send_msg_subscription);
            cometServer.prototype.send_msg_subscription = false;
        }

        if(cometServer.prototype.send_msg_queue.length > 0)
        {
            for(var i = 0; i < cometServer.prototype.send_msg_queue.length; i++)
            {
                comet_server_signal().send_emit('comet_msg_slave_send_msg',cometServer.prototype.send_msg_queue[i]);
            }
            cometServer.prototype.send_msg_queue = []
        }
        return true;
    }
    else if(cometServer.prototype.isMaster())
    {
        if(!cometServer.prototype.UseWebSocket())
        {
            return false;
        }

        if(cometServer.prototype.socketArrayTest())
        {
            if(cometServer.prototype.send_msg_subscription !== false)
            {
                if(cometServer.prototype.LogLevel ) console.error("WebSocket-send-subscription:"+cometServer.prototype.send_msg_subscription);
                cometServer.prototype.socketArraySend(cometServer.prototype.send_msg_subscription);
                cometServer.prototype.send_msg_subscription = false;
            }

            if(cometServer.prototype.send_msg_queue.length > 0)
            {
                var j = 10;
                // РћС‚РїСЂР°РІР»СЏРµС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РёР· РѕС‡РµСЂРµРґРё РЅРµ СЃСЂР°Р·Сѓ Р° СЃ 20РјСЃ РёРЅС‚РµСЂРІР°Р»РѕРј.
                for(var i = 0; i < cometServer.prototype.send_msg_queue.length; i++)
                {
                    j+= 20;

                    // РџРѕС‚РѕРј СѓР±СЂР°С‚СЊ setTimeout
                    setTimeout( function(ri)
                    {
                        if(cometServer.prototype.LogLevel ) console.log("WebSocket-send-msg:", ri);
                        cometServer.prototype.socketArraySend(ri);
                    }, j, cometServer.prototype.send_msg_queue[i])
                }
                cometServer.prototype.send_msg_queue = []
            }
            return true;
        }
    }
    return false;
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РІ РѕС‡РµСЂРµРґСЊ.
 * @private
 */
cometServer.prototype.add_msg_to_queue = function(msg)
{
    var MsgType = false;
    MsgType = msg.split("\n")
    MsgType = MsgType[0]

    if(MsgType === "subscription")
    {
        // РџСЂРѕРІРµСЂРєР° РµСЃР»Рё СЃРѕРѕР±С‰РµРЅРёРµ Рѕ РїРѕРґРїРёСЃРєРµ РЅР° РєР°РЅР°Р» С‚Рѕ РµРіРѕ РѕС‚РїСЂР°РІР»СЏС‚СЊ РІРЅРµ РѕС‡РµСЂРµРґРё
        // РџСЂРё СЌС‚РѕРј РЅРµС‚ РЅРµРѕР±С…РѕРґРёРјРѕСЃС‚Рё РѕС‚РїСЂР°РІР»СЏС‚СЊ РїСЂРµРґС‹РґСѓС‰РёРµ СЃРѕРѕР±С‰РµРЅРёРµ РїРѕРґРїРёСЃРєСѓ.
        cometServer.prototype.send_msg_subscription = msg;
    }
    else
    {
        cometServer.prototype.send_msg_queue.push(msg)
    }
}

/**
 * РѕС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ РїРѕ РІРµР± СЃРѕРєРµС‚Сѓ.
 * @private
 * @param {string} msg РўРµРєСЃС‚ СЃРѕРѕР±С‰РµРЅРёСЏ РІ РІРёРґРµ РѕРґРЅРѕР№ СЃС‚СЂРѕРєРё
 */
cometServer.prototype.send_msg = function(msg)
{
    if(cometServer.prototype.isMaster() === undefined)
    {
        cometServer.prototype.add_msg_to_queue(msg);
        return false;
    }
    else if(cometServer.prototype.isMaster() === false)
    {
        comet_server_signal().send_emit('comet_msg_slave_send_msg',msg);
    }
    else if(cometServer.prototype.isMaster())
    {
        if(!cometServer.prototype.UseWebSocket())
        {
            console.warn("WebSocket-send-msg: not use");
            return false;
        }

        if(cometServer.prototype.socketArrayTest())
        {
            cometServer.prototype.send_msg_from_queue();

            if(cometServer.prototype.LogLevel ) console.log("WebSocket-send-msg:"+msg);
            cometServer.prototype.socketArraySend(msg);
            return true;
        }
        else
        {
            cometServer.prototype.add_msg_to_queue(msg);
            return false;
        }
    }
}

/**
 * Р’РµСЂРЅС‘С‚ true РІ СЃР»СѓС‡Р°Рё РѕС‚РїСЂР°РІРєРё
 * РћС‚С‡С‘С‚ Рѕ РґРѕСЃС‚Р°РІРєРµ РїСЂРёР№РґС‘С‚ РІ РєР°РЅР°Р» _answer
 * @param string pipe_name РёРјСЏ РєР°РЅР°Р»Р°, РґРѕР»Р¶РЅРѕ РЅР°С‡РёРЅР°С‚СЃСЏ СЃ web_
 * @param string event_name РёРјСЏ СЃРѕР±С‹С‚РёСЏ РІ РєР°РЅР°Р»Рµ
 * @param string msg РЎРѕРѕР±С‰РµРЅРёРµ
 * @returns boolean
 * @version 2
 */
cometServer.prototype.web_pipe_send = function(pipe_name, event_name, msg)
{
    if(msg === undefined)
    {
        msg = event_name;
        event_name = "undefined";

        if(/[.]/.test(pipe_name))
        {
            event_name = pipe_name.replace(/^[^.]*\.(.*)$/, "$1")
            pipe_name = pipe_name.replace(/^(.*?)\.(.*)/, "$1")
        }
    }

    if(msg === undefined)
    {
        return false;
    }

    if(cometServer.prototype.LogLevel) console.log(["web_pipe_send", pipe_name, msg]);
    return cometServer.prototype.send_msg("web_pipe2\n"+pipe_name+"\n"+event_name+"\n*\n"+JSON.stringify(msg));
}

/**
 * РћС‚РїСЂР°РІР»СЏРµС‚ СЃС‚Р°С‚РёСЃС‚РёРєСѓ Рѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РїР»Р°РіРёРЅРѕРІ
 * @param {string} plugin_name РРјСЏ РїР»Р°РіРёРЅР°
 * @param {string} plugin_version Р’РµСЂСЃРёСЏ РїР»Р°РіРёРЅР°
 * @param {string} plugin_data Р”Р°РЅРЅС‹Рµ РїР»Р°РіРёРЅР°
 * @returns {Boolean}
 */
cometServer.prototype.sendStatistics = function(plugin_name, plugin_version, plugin_data)
{
    if(cometServer.prototype.LogLevel) console.log(["sendStatistics", plugin_name, plugin_version, plugin_data]);
    return cometServer.prototype.send_msg("statistics\n"+JSON.stringify(
            {
                url:window.location.href,
                dev_id:cometServer.prototype.options.dev_id,
                version: cometServer.prototype.version,
                plugin: {
                    name:plugin_name,
                    version:plugin_version,
                    data:plugin_data
                }
            }));
}


/**
 * РћС‚РїСЂР°РІР»СЏРµС‚ Р·Р°РїСЂРѕСЃ РЅР° РїРѕР»СѓС‡РµРЅРёРµ РёСЃС‚РѕСЂРёРё РїРѕ РєР°РЅР°Р»Сѓ pipe_name
 * @param {string} pipe_name
 * @param {function} callBack РєРѕР»Р±РµРє РґР»СЏ РѕС‚РІРµС‚Р° РѕС‚ СЃРµСЂРІРµСЂР°
 * @returns {Boolean}
 */
cometServer.prototype.get_pipe_log = function(pipe_name, callBack)
{
    if(!cometServer.prototype.UseWebSocket())
    {
        return false;
    }

    if(callBack !== undefined)
    {
        var marker = cometServer.prototype.getCustomString();
        cometServer.prototype.subscription(pipe_name)
        cometServer.prototype.subscription_callBack(pipe_name, callBack, marker);
    }

    cometServer.prototype.send_msg("pipe_log\n"+pipe_name+"\n"+cometServer.prototype.custom_id+"\n");
    return true;
}

/**
 * РћС‚РїСЂР°РІР»СЏРµС‚ Р·Р°РїСЂРѕСЃ РЅР° РїРѕР»СѓС‡РµРЅРёРµ РєРѕР»РёС‡РµСЃС‚РІР° РїРѕРґРїРёСЃС‡РёРєРѕРІ РІ РєР°РЅР°Р»Рµ pipe_name
 * @param {string} pipe_name
 * @param {function} callBack РєРѕР»Р±РµРє РґР»СЏ РѕС‚РІРµС‚Р° РѕС‚ СЃРµСЂРІРµСЂР°
 * @returns {Boolean}
 */
cometServer.prototype.count_users_in_pipe = function(pipe_name, callBack)
{
    if(!cometServer.prototype.UseWebSocket())
    {
        return false;
    }
    var marker = cometServer.prototype.getCustomString();
    cometServer.prototype.subscription_callBack("_answer_pipe_count", callBack, marker);
    cometServer.prototype.send_msg("pipe_count\n"+pipe_name+"\n"+marker+"\n");
    return true;
}

/**
 * РћР±РµСЃРїРµС‡РёРІР°РµС‚ СЂР°Р±РѕС‚Сѓ СЃ СЃСЃРѕРµРґРёРЅРµРЅРёРµРј СЃ СЃРµСЂРІРµСЂРѕРј
 * @private
 */
cometServer.prototype.conect_to_server = function()
{
    var thisObj = cometServer.prototype;

    if(cometServer.prototype.in_conect_to_server)
    {
        if(cometServer.prototype.LogLevel) console.log("РЎРѕРµРґРёРЅРµРЅРёРµ СЃ СЃРµСЂРІРµСЂРѕРј СѓР¶Рµ СѓСЃС‚Р°РЅРѕРІР»РµРЅРѕ.");
        return;
    }

    if(cometServer.prototype.LogLevel) console.log("РЎРѕРµРґРёРЅРµРЅРёРµ СЃ СЃРµСЂРІРµСЂРѕРј");
    cometServer.prototype.in_conect_to_server = true;
    if(!cometServer.prototype.isMaster()) cometServer.prototype.setAsMaster();

    if(cometServer.prototype.hasCriticalError)
    {
        // Р•СЃР»Рё true С‚Рѕ РїСЂРѕРёР·РѕС€Р»Р° РєСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР° РїРѕСЃР»Рµ РєРѕС‚РѕСЂРѕР№ РЅРµС‚ СЃРјС‹СЃР»Р° РїРѕРґРєР»СЋС‡Р°С‚СЃСЏ Рє СЃРµСЂРІРµСЂСѓ
        return false;
    }

    if(cometServer.prototype.UseWebSocket())
    {

        function initSocket(socket, indexInArr)
        {
            socket.onopen = function()
            {
                if(thisObj.LogLevel) console.log("WS РЎРѕРµРґРёРЅРµРЅРёРµ СѓСЃС‚Р°РЅРѕРІР»РµРЅРѕ.");

                if(thisObj.send_msg_subscription === false) thisObj.send_curent_subscription(); // РџРѕРґРїРёСЃС‹РІР°РµРјСЃСЏ РЅР° С‚Рѕ С‡С‚Рѕ Р±С‹Р»Рё РїРѕРґРїРёСЃР°РЅС‹ РґРѕ СЂР°Р·СЂС‹РІР° СЃРѕРµРґРёРЅРµРЅРёСЏ

                // РћС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёР№ РёР· РѕС‡РµСЂРµРґРё.
                thisObj.send_msg_from_queue();

                if(thisObj.options.nostat !== true)
                {
                    setTimeout(function()
                    {
                        if(thisObj.isSendStatisticsData)
                        {
                            return;
                        }

                        thisObj.isSendStatisticsData = true;
                        // РћС‚РїСЂР°РІРєР° РґР°РЅРЅС‹С… РїРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЋ СЃРµСЂРІРёСЃР°
                        cometServer.prototype.send_msg("statistics\n"+JSON.stringify({url:window.location.href, dev_id:thisObj.options.dev_id, version: thisObj.version}));
                    }, 5000)
                }
            };

            socket.onclose = function(event)
            {
                //cometServer.prototype.in_conect_to_server = false;
                if (event.wasClean || cometServer.prototype.in_abort === true)
                {
                    if(thisObj.LogLevel) console.log('WS РЎРѕРµРґРёРЅРµРЅРёРµ Р·Р°РєСЂС‹С‚Рѕ С‡РёСЃС‚Рѕ');
                }
                else
                {
                    if(thisObj.LogLevel) console.log('WS РћР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ'); // РЅР°РїСЂРёРјРµСЂ, "СѓР±РёС‚" РїСЂРѕС†РµСЃСЃ СЃРµСЂРІРµСЂР°
                    socket.close();
                    thisObj.web_socket_error++; // РЈРІРµР»РёС‡РµРЅРёРµ РєРѕР»РІР° РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ

                    /*if(thisObj.web_socket_error_timeOut_id !== undefined )
                    {
                        clearTimeout(thisObj.web_socket_error_timeOut_id)
                    }

                    // Р•СЃР»Рё РѕС€РёР±РєРё РїСЂРѕРёСЃС…РѕРґСЏС‚ СЂРµРґРєРѕ С‚Рѕ РѕР±РЅСѓР»РёРј СЃС‰С‘С‚С‡РёРє
                    thisObj.web_socket_error_timeOut_id = setTimeout(function()
                    {
                        thisObj.web_socket_error_timeOut_id = undefined;
                        thisObj.web_socket_error = 0;
                    }, thisObj.time_to_reconect_on_error*2 )*/



                    if( thisObj.web_socket_error > 2 && thisObj.web_socket_success !== true && !thisObj.isUseWss())
                    {
                        // Р•СЃР»Рё Р·Р° РІСЂРµРјСЏ thisObj.web_socket_error_timeOut РїСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 2 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ С‚Рѕ РїСЂРёРЅСѓРґРёС‚РµР»СЊРЅРѕ РІРєР»СЋС‡РёРј wss
                        thisObj.UseWss(true)
                        console.warn("РџСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 2 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ РІРєР»СЋС‡Р°РµРј С€РёС„СЂРѕРІР°РЅРёРµ"); // РќРµ РґРµР»Р°С‚СЊ СЌС‚РѕРіРѕ РµСЃР»Рё СѓР¶Рµ Р±С‹Р»Рё РїРµСЂРµРґР°РЅС‹ РґР°РЅРЅС‹Рµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ
                    }
                    /*else if( thisObj.web_socket_error > 3 && thisObj.web_socket_success !== true && thisObj.isUseWss())
                    {
                        // Р•СЃР»Рё Р·Р° РІСЂРµРјСЏ thisObj.web_socket_error_timeOut РїСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 3 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ С‚Рѕ РїРµСЂРµР№РґС‘Рј РЅР° long poling
                        // РўР°РєРѕРµ РІРѕР·РјРѕР¶РЅРѕ РµСЃР»Рё С‡РµР»РѕРІРµРє РёСЃРїРѕР»СЊР·СѓРµС‚ РїСЂРѕРєСЃРё РєРѕС‚РѕСЂС‹Р№ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ РІРµР±СЃРѕРєРµС‚С‹
                        // РџРµСЂРµС…РѕРґ РїСЂРѕРёР·РѕР№РґС‘С‚ РїСЂРёРјРµСЂРЅРѕ С‡РµСЂРµР· 3 СЃРµРєСѓРЅРґС‹ СЂР°Р±РѕС‚С‹
                        thisObj.UseWebSocket(false);
                        thisObj.UseWss();
                        console.error("РџСЂРѕРёР·РѕС€Р»Рѕ Р±РѕР»РµРµ 3 РѕС€РёР±РѕРє РІРµР±СЃРѕРєРµС‚РѕРІ С‚Рѕ РїРµСЂРµР№РґС‘Рј РЅР° long poling"); // РќРµ РґРµР»Р°С‚СЊ СЌС‚РѕРіРѕ РµСЃР»Рё СѓР¶Рµ Р±С‹Р»Рё РїРµСЂРµРґР°РЅС‹ РґР°РЅРЅС‹Рµ РїРѕ РІРµР±СЃРѕРєРµС‚Сѓ
                    }*/
                    else if(thisObj.web_socket_error > 5)
                    {
                        // Р•СЃР»Рё 3 РѕС€РёР±РєРё РїРѕРґСЂСЏРґ С‚Рѕ СѓРІРµР»РёС‡РёРј РІСЂРµРјСЏ РґРѕ СЃР»РµРґСѓСЋС‰РµРіРѕ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёСЏ
                        thisObj.time_to_reconect_on_error *= 3;
                    }
                    else if(thisObj.web_socket_error > 3)
                    {
                        // Р•СЃР»Рё 5 РѕС€РёР±РѕРє РїРѕРґСЂСЏРґ С‚Рѕ РµС‰С‘ Р±РѕР»СЊС€Рµ СѓРІРµР»РёС‡РёРј РІСЂРµРјСЏ РґРѕ СЃР»РµРґСѓСЋС‰РµРіРѕ РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёСЏ
                        thisObj.time_to_reconect_on_error += 2000;
                    }

                    if(thisObj.web_socket_error === 0)
                    {
                        // Р•СЃР»Рё СЌС‚Рѕ РїРµСЂРІС‹Р№ РѕР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ РїРѕРґСЂСЏРґ С‚Рѕ РїРµСЂРµРїРѕРґРєР»СЋС‡Р°РµРјСЃСЏ Р±С‹СЃС‚СЂРµРµ
                        setTimeout(function()
                        {
                            //thisObj.conect_to_server();
                            var node = cometServer.prototype.options.nodeArray[indexInArr]
                            var socket = new WebSocket(cometServer.prototype.getUrl(node)); 
                            cometServer.prototype.socketArray[indexInArr] = socket;
                            initSocket(socket, indexInArr);
                            
                        }, cometServer.prototype.time_to_reconect_on_close );
                    }
                    else
                    {
                        // Р•СЃР»Рё СЌС‚Рѕ РЅРµ РїРµСЂРІС‹Р№ РѕР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ РїРѕРґСЂСЏРґ РЅРѕ РґР°РЅРЅС‹Рµ СѓР¶Рµ РѕС‚РїСЂР°РІР»СЏР»РёСЃСЊ С‚Рѕ РѕС‚РїСЂР°РІР»СЏРµРј РѕС‚С‡С‘С‚ РѕР± РѕС€РёР±РєРµ
                        if(thisObj.web_socket_success == true)
                        {
                            cometServer.prototype.errorReportSend();
                        }

                        // Р•СЃР»Рё СЌС‚Рѕ РЅРµ РїРµСЂРІС‹Р№ РѕР±СЂС‹РІ СЃРѕРµРґРёРЅРµРЅРёСЏ РїРѕРґСЂСЏРґ С‚Рѕ РїРµСЂРµРїРѕРґРєР»СЋС‡Р°РµРјСЃСЏ РЅРµ СЃСЂР°Р·Сѓ
                        setTimeout(function()
                        {
                            //thisObj.conect_to_server();
                            var node = cometServer.prototype.options.nodeArray[indexInArr]
                            var socket = new WebSocket(cometServer.prototype.getUrl(node)); 
                            cometServer.prototype.socketArray[indexInArr] = socket;
                            initSocket(socket, indexInArr);
                            
                        }, thisObj.time_to_reconect_on_error );
                    }
                }
                if(thisObj.LogLevel) console.log('WS РљРѕРґ: ' + event.code + ' РїСЂРёС‡РёРЅР°: ' + event.reason);
            };

            socket.onmessage = function(event)
            {
                thisObj.web_socket_success = true;
                thisObj.web_socket_error = 0;               // Р•СЃР»Рё СѓСЃРїРµС€РЅРѕ РїРѕРґРєР»СЋС‡РёР»РёСЃСЊ СЃР±СЂР°СЃС‹РІР°РµРј СЃС‰С‘С‚С‡РёРє РѕС€РёР±РѕРє
                thisObj.time_to_reconect_on_error = 1000;   // Р•СЃР»Рё СѓСЃРїРµС€РЅРѕ РїРѕРґРєР»СЋС‡РёР»РёСЃСЊ СЃР±СЂР°СЃС‹РІР°РµРј СЃС‰С‘С‚С‡РёРє РѕС€РёР±РѕРє

                if(thisObj.LogLevel > 1) console.log("WS Р’С…РѕРґСЏС‰РёРµ СЃРѕРѕР±С‰РµРЅРёРµ:"+event.data);
                var lineArray = event.data.replace(/^\s+|\s+$/, '').split("\n");
                for(var i = 0; i < lineArray.length; i++)
                {
                    var rj = {};
                    try{
                         rj = JSON.parse(lineArray[i].replace(/\\'/g, "'"));
                    }
                    catch (failed)
                    {
                        if(thisObj.LogLevel) console.error(failed);
                        continue;
                    }

                    thisObj.msg_cultivate(rj);
                }
            };

            socket.onerror = function(error)
            {
                //thisObj.in_conect_to_server = false;
                if(thisObj.LogLevel) console.log("РћС€РёР±РєР° " + error.message);

            };
        }

        cometServer.prototype.socketArray = []
        for(var i = 0; i < cometServer.prototype.options.nodeArray.length; i++)
        {
            if(cometServer.prototype.hasCriticalError)
            {
                // Р•СЃР»Рё true С‚Рѕ РїСЂРѕРёР·РѕС€Р»Р° РєСЂРёС‚РёС‡РµСЃРєР°СЏ РѕС€РёР±РєР° РїРѕСЃР»Рµ РєРѕС‚РѕСЂРѕР№ РЅРµС‚ СЃРјС‹СЃР»Р° РїРѕРґРєР»СЋС‡Р°С‚СЃСЏ Рє СЃРµСЂРІРµСЂСѓ
                return false;
            }

            var node = cometServer.prototype.options.nodeArray[i]
            var socket = new WebSocket(cometServer.prototype.getUrl(node));

            cometServer.prototype.socketArray.push(socket)
            initSocket(socket, cometServer.prototype.socketArray.length -  1 );
        }
    }
    else
    {
        try {
            cometServer.prototype.request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                cometServer.prototype.request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    cometServer.prototype.request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    cometServer.prototype.request = false;
                }
            }
        }

        cometServer.prototype.request.onreadystatechange = function()
        {
            if( thisObj.request.status === 200 && cometServer.prototype.in_abort !== true)
            {
                var re = thisObj.request.responseText;

                if(thisObj.LogLevel) console.log("Р’С…РѕРґСЏС‰РёРµ СЃРѕРѕР±С‰РµРЅРёРµ:"+re);
                var lineArray = re.replace(/^\s+|\s+$/, '').split('\n')
                for(var i = 0; i < lineArray; i++)
                {
                    try{
                        if(thisObj.LogLevel) console.log(lineArray[i]);
                        var rj = JSON.parse(lineArray[i])
                    }
                    catch (failed)
                    {
                        thisObj.in_conect_to_server = false;
                        if(thisObj.LogLevel) console.log("РћС€РёР±РєР° РІ xhr, РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ С‡РµСЂРµР· "+(thisObj.time_to_reconect_on_error) +" СЃРµРєСѓРЅРґС‹.");
                        setTimeout(function(){thisObj.conect_to_server()}, thisObj.time_to_reconect_on_error )
                        return false;
                    }


                    thisObj.msg_cultivate(rj)
                }

                thisObj.in_conect_to_server = false;
                thisObj.conect_to_server();
            }
            else
            {
                thisObj.in_conect_to_server = false;
                if(thisObj.in_abort !== true)
                {
                    thisObj.xhr_error += 1
                    if( thisObj.xhr_error > 30 )
                    {
                        thisObj.time_to_reconect_on_error = 90000;
                    }
                    else if( thisObj.xhr_error > 10 )
                    {
                        thisObj.time_to_reconect_on_error = 30000;
                    }
                    else if( thisObj.xhr_error > 3 )
                    {
                        thisObj.time_to_reconect_on_error = 10000;
                    }

                    if(thisObj.LogLevel || 1) console.log("РћС€РёР±РєР° РІ xhr, РїРµСЂРµРїРѕРґРєР»СЋС‡РµРЅРёРµ С‡РµСЂРµР· "+(thisObj.time_to_reconect_on_error) +" СЃРµРєСѓРЅРґС‹.");
                    setTimeout(function(){ thisObj.conect_to_server() }, thisObj.time_to_reconect_on_error )

                    setTimeout(function(){ thisObj.xhr_error = 0 }, thisObj.xhr_error_timeOut_id )
                }
            }
        };

        cometServer.prototype.request.open("POST", cometServer.prototype.getUrl(), true);
        cometServer.prototype.request.send(cometServer.prototype.subscription_array.join("\n")); // РРјРµРЅРЅРѕ Р·РґРµСЃСЊ РѕС‚РїСЂР°РІР»СЏСЋС‚СЃСЏ РґР°РЅРЅС‹Рµ
    }

}

/**
 * РџС‹С‚Р°РµС‚СЃСЏ СѓСЃС‚Р°РЅРѕРІРёС‚СЊ СЃРѕРµРґРёРЅРµРЅРёРµ СЃ СЃРµСЂРІРµСЂРѕРј РёР»Рё РЅР°Р»Р°РґРёС‚СЊ РѕР±РјРµРЅ СЃРѕРѕР±С‰РµРЅРёСЏРјРё Рё РјРѕРЅРёС‚РѕСЂРёРЅРі СЂР°Р±РѕС‚РѕСЃРїРѕСЃРѕР±РЅРѕСЃС‚Рё РјР°СЃС‚РµСЂРІРєР»Р°РґРєРё.
 * @private
 */
cometServer.prototype.conect = function(callback)
{
    if(cometServer.prototype.isMaster())
    {
        return cometServer.prototype.conect_to_server();
    }

    if(cometServer.prototype.in_try_conect)
    {
        if(cometServer.prototype.LogLevel) console.log("РЎРѕРµРґРёРЅРµРЅРёРµ СЃ СЃРµСЂРІРµСЂРѕРј СѓР¶Рµ СѓСЃС‚Р°РЅРѕРІР»РµРЅРѕ РЅР° РґСЂСѓРіРѕР№ РІРєР»Р°РґРєРµ");
        comet_server_signal().send_emit('comet_msg_slave_signal_start');
        return false;
    }

    cometServer.prototype.in_try_conect = true;
    if(cometServer.prototype.LogLevel) console.log("РџРѕРїС‹РґРєР° СЃРѕРµРґРёРЅРµРЅРёСЏ СЃ СЃРµСЂРІРµСЂРѕРј");

    cometServer.prototype.setAsSlave(callback)
}

/**
 * Api СЂР°Р±РѕС‚С‹ СЃ РєРѕРјРµС‚ СЃРµСЂРµРІРµСЂРѕРј comet-server.ru
 * @type cometServer
 */
var cometApi = new cometServer();


/**
 * @return cometServer
 */
function CometServer()
{
    return cometApi;
}