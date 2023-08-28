/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';
import copy from "copy-to-clipboard"

const setItem=(key, data)=>{
    copy(data)
}

function getItem(){
    // 获取到剪切板的内容
    let contentEditable = document.createElement('div'); // 新建元素
    contentEditable.contentEditable = true; // 允许该元素中的文本可编辑
    document.body.appendChild(contentEditable); // 添加元素到body中
    contentEditable.focus(); // 元素获得焦点
    document.execCommand('paste'); // 获取剪贴板中的内容
    let text = contentEditable.innerText; // 从该元素中读取内容
    document.body.removeChild(contentEditable); // 移除元素

    return text||"{}"
}
/**
 * Convert block to save info.
 * @param {Blockly.Block} block The block you want to convert.
 * @returns {{saveInfo:?Blockly.serialization.blocks,
 * typeCounts:?Object}} The serialized block and type information.
 */
export function convertBlockToSaveInfo(block) {
  return {
    saveInfo: Blockly.serialization.blocks.save(
        block, {addCoordinates: true, addNextBlocks: false}),
    typeCounts: Blockly.common.getBlockTypeCounts(block, true),
  };
}

 
 
 /**
  * A Blockly plugin that adds context menu items and keyboard shortcuts
  * to allow users to copy and paste a block between tabs.
  */
 export class CrossTabCopyPaste {
   /**
    * Initializes the cross tab copy paste plugin. If no options are selected
    * then both context menu items and keyboard shortcuts are added.
    * @param {{contextMenu: boolean, shortcut: boolean}} options
    * `contextMenu` Register copy and paste in the context menu.
    * `shortcut` Register cut (ctr + x), copy (ctr + c) and paste (ctr + v)
    * in the shortcut.
    * @param {Function=} typeErrorCallback
    * callback function to handle type errors
    */
   init({
     contextMenu = true,
     shortcut = true,
   } = {
     contextMenu: true,
     shortcut: true,
   },
   typeErrorCallback) {
     if (contextMenu) {
       // Register the menus
       this.blockCopyToStorageContextMenu();
       this.blockPasteFromStorageContextMenu(typeErrorCallback);
     }
 
     if (shortcut) {
       // Unregister the default KeyboardShortcuts
       Blockly.ShortcutRegistry.registry.unregister(
           Blockly.ShortcutItems.names.COPY);
       Blockly.ShortcutRegistry.registry.unregister(
           Blockly.ShortcutItems.names.CUT);
       Blockly.ShortcutRegistry.registry.unregister(
           Blockly.ShortcutItems.names.PASTE);
       // Register the KeyboardShortcuts
       this.blockCopyToStorageShortcut();
       this.blockCutToStorageShortcut();
       this.blockPasteFromStorageShortcut(typeErrorCallback);
     }
   }
 
   /**
    * Adds a copy command to the block context menu.
    */
   blockCopyToStorageContextMenu() {
     /** @type {!Blockly.ContextMenuRegistry.RegistryItem} */
     const copyToStorageOption = {
       displayText: function() {
         if (Blockly.Msg['CROSS_TAB_COPY']) {
           return Blockly.Msg['CROSS_TAB_COPY'];
         }
         return 'Copy';
       },
       preconditionFn: function(
           /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
         if (
           Blockly.getSelected().isDeletable() &&
           Blockly.getSelected().isMovable()) {
           return 'enabled';
         }
         return 'disabled';
       },
       callback: function(
           /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
         const blockText = JSON.stringify(
             convertBlockToSaveInfo(scope.block));
         setItem('blocklyStash', blockText);
       },
       scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
       id: 'blockCopyToStorage',
       weight: 0,
     };
     Blockly.ContextMenuRegistry.registry.register(copyToStorageOption);
   }
 
   /**
    * Adds a paste command to the block context menu.
    * @param {Function=} typeErrorCallback
    * callback function to handle type errors
    */
   blockPasteFromStorageContextMenu(typeErrorCallback) {
     /** @type {!Blockly.ContextMenuRegistry.RegistryItem} */
     const pasteFromStorageOption = {
       displayText: function() {
         if (Blockly.Msg['CROSS_TAB_PASTE']) {
           return Blockly.Msg['CROSS_TAB_PASTE'];
         }
         return 'Paste';
       },
       preconditionFn: function(
           /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            let copyData=null
            try{
                copyData = JSON.parse(getItem('blocklyStash'));
            }catch(e){
            };
         if (copyData &&
           scope.workspace.isCapacityAvailable(copyData.typeCounts)) {
           return 'enabled';
         }
         return 'disabled';
       },
       callback: function(
           /** @type {!Blockly.ContextMenuRegistry.Scope} */ scope) {
            let saveInfo=null
            try{
                saveInfo = JSON.parse(getItem('blocklyStash'));
            }catch(e){
            };
         try {
           scope.workspace.paste(saveInfo['saveInfo']);
         } catch (e) {
           if (e instanceof TypeError && typeErrorCallback) {
             typeErrorCallback();
           } else {
             throw e;
           }
         }
       },
       scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
       id: 'blockPasteFromStorage',
       weight: 0,
     };
     Blockly.ContextMenuRegistry.registry.register(pasteFromStorageOption);
   }
 
   /**
    * Adds a keyboard shortcut that will store copy information for a block
    * in localStorage.
    */
   blockCopyToStorageShortcut() {
     /** @type {!Blockly.ShortcutRegistry.KeyboardShortcut} */
     const copyShortcut = {
       name: 'copy',
       preconditionFn: function(workspace) {
         return !workspace.options.readOnly &&
           !Blockly.Gesture.inProgress() &&
           Blockly.getSelected() &&
           Blockly.getSelected().isDeletable() &&
           Blockly.getSelected().isMovable() &&
           !Blockly.getSelected().isInMutator;
       },
       callback: function(workspace, e) {
         // Prevent the default copy behavior,
         // which may beep or otherwise indicate
         // an error due to the lack of a selection.
         e.preventDefault();
         workspace.hideChaff();
         const blockText = JSON.stringify(
             convertBlockToSaveInfo(Blockly.getSelected()));
         setItem('blocklyStash', blockText);
         return true;
       },
     };
     Blockly.ShortcutRegistry.registry.register(copyShortcut);
 
     const ctrlC = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.C, [Blockly.utils.KeyCodes.CTRL]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(ctrlC, copyShortcut.name);
 
     const altC =
       Blockly.ShortcutRegistry.registry.createSerializedKey(
           Blockly.utils.KeyCodes.C, [Blockly.utils.KeyCodes.ALT]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(altC, copyShortcut.name);
 
     const metaC = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.C, [Blockly.utils.KeyCodes.META]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(metaC, copyShortcut.name);
   }
 
   /**
    * Adds a keyboard shortcut that will store copy information for a block
    * in local storage and delete the block.
    */
   blockCutToStorageShortcut() {
     /** @type {!Blockly.ShortcutRegistry.KeyboardShortcut} */
     const cutShortcut = {
       name: 'cut',
       preconditionFn: function(workspace) {
         return !workspace.options.readOnly &&
           !Blockly.Gesture.inProgress() &&
           Blockly.getSelected() &&
           Blockly.getSelected().isDeletable() &&
           Blockly.getSelected().isMovable() &&
           !Blockly.getSelected().workspace.isFlyout;
       },
       callback: function(workspace, e) {
         // Prevent the default copy behavior,
         // which may beep or otherwise indicate
         // an error due to the lack of a selection.
         e.preventDefault();
         const blockText = JSON.stringify(
             convertBlockToSaveInfo(Blockly.getSelected()));
         setItem('blocklyStash', blockText);
         Blockly.Events.setGroup(true);
         Blockly.getSelected().dispose(true);
         Blockly.Events.setGroup(false);
         return true;
       },
     };
     Blockly.ShortcutRegistry.registry.register(cutShortcut);
 
     const ctrlX = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.X, [Blockly.utils.KeyCodes.CTRL]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(ctrlX, cutShortcut.name);
 
     const altX = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.X, [Blockly.utils.KeyCodes.ALT]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(altX, cutShortcut.name);
 
     const metaX = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.X, [Blockly.utils.KeyCodes.META]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(metaX, cutShortcut.name);
   }
 
   /**
    * Adds a keyboard shortcut that will paste the block stored in localStorage.
    * @param {Function=} typeErrorCallback
    * callback function to handle type errors
    */
   blockPasteFromStorageShortcut(typeErrorCallback) {
     /** @type {!Blockly.ShortcutRegistry.KeyboardShortcut} */
     const pasteShortcut = {
       name: 'paste',
       preconditionFn: function(workspace) {
         if (workspace.options.readOnly || Blockly.Gesture.inProgress()) {
           return false;
         }
         let copyData=null
        try{
            copyData = JSON.parse(getItem('blocklyStash'));
        }catch(e){
        };
         
         if (!copyData || !workspace.isCapacityAvailable(copyData.typeCounts)) {
           return false;
         }
         return true;
       },
       callback: function(workspace, e) {
         // Prevent the default copy behavior,
         // which may beep or otherwise indicate
         // an error due to the lack of a selection.
         e.preventDefault();
         let saveInfo=null
        try{
            saveInfo = JSON.parse(getItem('blocklyStash'));
        }catch(e){
        };
         try {
           workspace.paste(saveInfo['saveInfo']);
         } catch (e) {
           if (e instanceof TypeError && typeErrorCallback) {
             typeErrorCallback();
           } else {
             throw e;
           }
         }
         return true;
       },
     };
     Blockly.ShortcutRegistry.registry.register(pasteShortcut);
 
     const ctrlV = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.V, [Blockly.utils.KeyCodes.CTRL]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(ctrlV, pasteShortcut.name);
 
     const altV =
       Blockly.ShortcutRegistry.registry.createSerializedKey(
           Blockly.utils.KeyCodes.V, [Blockly.utils.KeyCodes.ALT]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(altV, pasteShortcut.name);
 
     const metaV = Blockly.ShortcutRegistry.registry.createSerializedKey(
         Blockly.utils.KeyCodes.V, [Blockly.utils.KeyCodes.META]);
     Blockly.ShortcutRegistry.registry.addKeyMapping(metaV, pasteShortcut.name);
   }
 }
 