import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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

export function deactivate() {}
