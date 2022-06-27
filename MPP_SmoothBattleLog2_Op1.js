//=============================================================================
// MPP_SmoothBattleLog2_Op1.js
//=============================================================================
// Copyright (c) 2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Shortens the weight due to character movement and production.
 * @author Mokusei Penguin
 * @url 
 *
 *
 * @help [version 1.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Overview
 *  - You will be able to proceed to the next process without waiting for
 *    the disappearance effect when defeating an enemy or the end of movement
 *    of the character who acted before.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc キャラクターの移動や演出によるウェイトを短縮します。
 * @author 木星ペンギン
 * @url 
 *
 *
 * @help [version 1.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ 概要
 *  - 敵と倒した際の消滅エフェクトや、前に行動したキャラクターの移動終了を
 *    待たずに次のプロセスへと進むようになります。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 */

(() => {
    'use strict';
    
    //-------------------------------------------------------------------------
    // Window_BattleLog

    const _BattleManager_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function() {
        return _BattleManager_isBusy.apply(this, arguments) ||
                (this.isBattleSettle() && this.isDirecting());
    };

    BattleManager.isBattleSettle = function() {
        return $gameParty.isAllDead() || $gameTroop.isAllDead();
    };

    BattleManager.isDirecting = function() {
        return this._spriteset.isEffecting() ||
                this._spriteset.isAnyoneMoving();
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Battle

    // overwrite
    Spriteset_Battle.prototype.isBusy = function() {
        return this.isAnimationPlaying();// || this.isAnyoneMoving();
    };
    
})();
