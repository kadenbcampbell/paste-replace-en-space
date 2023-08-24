"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.pasteReplaceEnSpace', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        // Get clipboard contents
        const clipboardText = await vscode.env.clipboard.readText();
        // Replace the character
        const modifiedText = clipboardText.replace(/\u2002/g, ' ');
        // Insert the modified text
        editor.edit((builder) => {
            const selection = editor.selection;
            builder.replace(selection, modifiedText);
        });
    });
    context.subscriptions.push(disposable);
    // Bind to the paste command
    context.subscriptions.push(vscode.commands.registerCommand('editor.action.clipboardPasteAction', () => {
        vscode.commands.executeCommand('extension.pasteReplaceEnSpace');
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map