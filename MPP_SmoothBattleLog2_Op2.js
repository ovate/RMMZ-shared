//=============================================================================
// MPP_SmoothBattleLog2_Op2.js
//=============================================================================
// Copyright (c) 2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Display the log only with the item name or skill name.
 * @author Mokusei Penguin
 * @url 
 * @base MPP_SmoothBattleLog2
 * @orderAfter MPP_SmoothBattleLog2
 *
 *
 * @help [version 1.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Plugin parameters
 *  - In [Not Display Skils], you can specify a numerical value from n to m
 *    by writing n-m.
 *      Example: 1,2,4-10,12-15
 * 
 * ▼ Supplement
 *  - When using an item or skill, the log display is only the name,
 *    but the battle log confirmation command displays the normal log.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param Not Display Skils
 * @desc Array of skill IDs that do not display names.
 * (Range can be specified)
 * @default 1,2
 * 
 * @param Show Icon?
 * @desc 
 * @type boolean
 * @default false
 * 
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ログ表示をアイテム名またはスキル名のみにします。
 * @author 木星ペンギン
 * @url 
 * @base MPP_SmoothBattleLog2
 * @orderAfter MPP_SmoothBattleLog2
 *
 *
 * @help [version 1.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ プラグインパラメータ
 *  - [表示しないスキルID]では n-m と表記することで nからmまでの数値を
 *    指定できます。
 *      例: 1,2,4-10,12-15
 * 
 * ▼ 補足
 *  - アイテムやスキルを使用した際のログ表示は名前のみとなりますが、
 *    戦闘ログの確認コマンドでは通常のログが表示されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param Not Display Skils
 * @text 表示しないスキルID
 * @desc 名前を表示しないスキルIDの配列
 * (範囲指定可)
 * @default 1,2
 * 
 * @param Show Icon?
 * @text アイコン表示
 * @desc 
 * @type boolean
 * @default false
 * 
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_SmoothBattleLog2_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const convertToArray = (name) => {
        const param = parameters[name];
        const result = [];
        if (param) {
            for (const item of param.split(',')) {
                const match = /(\d+)-(\d+)/.exec(item);
                if (match) {
                    const max = Number(match[2]);
                    for (let n = Number(match[1]); n <= max; n++) {
                        result.push(n);
                    }
                } else {
                    result.push(Number(item));
                }
            }
        }
        return result;
    };
    
    const param_NotDisplaySkils = convertToArray('Not Display Skils');
    const param_ShowIcon = parameters['Show Icon?'] === 'true';

    //-------------------------------------------------------------------------
    // Window_BattleLog

    // overwrite
    Window_BattleLog.prototype.clear = function() {
        this.clearSmoothBattleLog();
    };
    
    // overwrite
    Window_BattleLog.prototype.addText = function(text) {
        const indentText = this.indentText(text);
        $gameTemp.addBattleLog(indentText);
        this.wait();
        this._clearDuration = 0;
        this._clientArea.opacity = 255;
    };

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        if (DataManager.isSkill(item) &&
                !param_NotDisplaySkils.includes(item.id)) {
            this.push('addItemText', item);
        }
        _Window_BattleLog_displayAction.apply(this, arguments);
    };

    Window_BattleLog.prototype.addItemText = function(item) {
        this._lines.push(this.centerName(item));
        const index = this.numLines() - 1;
        this._logSprites[index + 1].popup(0);
        this.drawLineText(index);
    };

    Window_BattleLog.prototype.centerName = function(item) {
        let text = '';
        if (param_ShowIcon) text += '\\i[%1]'.format(item.iconIndex);
        text += item.name;
        const lineWidth = this.innerWidth - this.itemPadding() * 2;
        const x = Math.floor((lineWidth - this.textSizeEx(text).width) / 2);
        return '\\mx[%1]'.format(x) + text;
    };

})();
