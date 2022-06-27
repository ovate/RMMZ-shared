//=============================================================================
// MPP_EncounterEffect_Op2.js
//=============================================================================
// Copyright (c) 2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Randomize the effect pattern.
 * @author Mokusei Penguin
 * @url 
 * 
 * @base MPP_EncounterEffect
 * @orderAfter MPP_EncounterEffect
 * @orderAfter MPP_EncounterEffect_Op1
 *
 * @help [version 1.1.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin parameter details
 *  - Up to 9 types of patterns can be set, and the patterns are
 *    randomly selected from the set ones.
 *  - Parameters that are not included in the setting items are
 *    either the default or the values set in MPP_EncounterEffect_Op1.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Pattern 1
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 2
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 3
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 4
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 5
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 6
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 7
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 8
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 9
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 */

/*~struct~pattern:
 *  @param Effect Type
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 5
 *      @default 1
 * 
 *  @param Shape Type
 *      @desc Effect type 1 does not support [random].
 *      @type select
 *          @option square
 *          @option triangle
 *          @option random
 *      @default square
 * 
 *  @param Break Direction
 *      @desc Corresponding effect type : 2,3,4,5
 *      @type select
 *          @option left
 *          @option center
 *          @option right
 *          @option inside
 *          @option outside
 *      @default left
 * 
 *  @param Scatter Direction
 *      @desc Corresponding effect type : 2,4,5
 *      @type select
 *          @option left
 *          @option right
 *          @option outside
 *      @default left
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc エフェクトパターンをランダムにします。
 * @author 木星ペンギン
 * @url 
 * 
 * @base MPP_EncounterEffect
 * @orderAfter MPP_EncounterEffect
 * @orderAfter MPP_EncounterEffect_Op1
 *
 * @help [version 1.0.2]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインパラメータ 詳細
 *  - パターンは９種類まで設定でき、設定したものの中からランダムで選ばれます。
 *  - 設定項目にないパラメータはデフォルトか、MPP_EncounterEffect_Op1で
 *    設定した値になります。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Pattern 1
 *      @text パターン1
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 2
 *      @text パターン2
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 3
 *      @text パターン3
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 4
 *      @text パターン4
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 5
 *      @text パターン5
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 6
 *      @text パターン6
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 7
 *      @text パターン7
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 8
 *      @text パターン8
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 *  @param Pattern 9
 *      @text パターン9
 *      @desc 
 *      @type struct<pattern>
 *      @default
 * 
 * 
 */

/*~struct~pattern:ja
 *  @param Effect Type
 *      @text エフェクトタイプ
 *      @desc 画面割れエフェクトのタイプ
 *      @type number
 *          @min 0
 *          @max 5
 *      @default 1
 * 
 *  @param Shape Type
 *      @text 破片の形状
 *      @desc エフェクトタイプ1は[ランダム]未対応。
 *      @type select
 *          @option 四角形
 *              @value square
 *          @option 三角形
 *              @value triangle
 *          @option ランダム
 *              @value random
 *      @default square
 * 
 *  @param Break Direction
 *      @text 割れる方向
 *      @desc 画面が割れる方向
 * 対応するエフェクトタイプ : 2,3,4,5
 *      @type select
 *          @option left
 *          @option center
 *          @option right
 *          @option inside
 *          @option outside
 *      @default left
 * 
 *  @param Scatter Direction
 *      @text 散っていく方向
 *      @desc 画面が散っていく方向
 * 対応するエフェクトタイプ : 2,4,5
 *      @type select
 *          @option left
 *          @option right
 *          @option outside
 *      @default left
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_EncounterEffect_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const reviver = (key, value) => {
        try {
            return JSON.parse(value, reviver);
        } catch (e) {
            return value;
        }
    };
    
    const param_PatternList = [];
    for (let i = 0; i < 9; i++) {
        const pattern = JSON.parse(parameters[`Pattern ${i + 1}`], reviver);
        if (pattern) {
            param_PatternList.push(pattern);
        }
    }

    const math_randomInt = (x) => Math.floor(x * Math.random());
    const array_random = (array) => array[math_randomInt(array.length)];
    
    //-------------------------------------------------------------------------
    // EncounterEffect
    
    EncounterEffect._random = true;
    
    const _EncounterEffect_clear = EncounterEffect.clear;
    EncounterEffect.clear = function() {
        _EncounterEffect_clear.call(this);
        this._random = true;
    };
    
    const _EncounterEffect_setType = EncounterEffect.setType;
    EncounterEffect.setType = function(type) {
        _EncounterEffect_setType.call(this, type);
        this._random = false;
    };
    
    const _EncounterEffect_params = EncounterEffect.params;
    EncounterEffect.params = function() {
        const params = _EncounterEffect_params.call(this);
        if (params && this._random && param_PatternList.length > 0) {
            const pattern = array_random(param_PatternList);
            this._type = pattern['Effect Type'];
            return { ...params, ...pattern };
        }
        return params;
    };

    
})();
