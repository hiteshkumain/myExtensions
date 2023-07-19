// Extension code for creating file header comments

const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.createFileHeaderComment', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const languageId = editor.document.languageId;
      const commentStyle = getCommentStyle(languageId);

      if (commentStyle) {
        const fileHeader = generateFileHeader(languageId);
        const currentPosition = editor.selection.start;
        editor.edit((editBuilder) => {
          editBuilder.insert(currentPosition, fileHeader);
        });
      } else {
        vscode.window.showWarningMessage(`File header comment is not supported for ${languageId} files.`);
      }
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function getCommentStyle(languageId) {
  // Add support for additional languages and their comment styles here
  switch (languageId) {
    case 'javascript':
    case 'typescript':
    case 'python':
      return '//';

    case 'cpp':
    case 'csharp':
    case 'java':
      return '//';

    case 'html':
    case 'xml':
    case 'vue':
    case 'php':
      return '<!--';

    case 'css':
    case 'scss':
      return '/*';

    default:
      return null;
  }
}

function generateFileHeader(languageId) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const author = "Hitesh Kumain";
  const github ="https://www.github.com/hiteshkumain" ;
  const commentStyle = getCommentStyle(languageId);

  switch (languageId) {
    case 'javascript':
    case 'typescript':
    case 'python':
    case 'cpp':
    case 'csharp':
    case 'java':
      return `${commentStyle}------------------------------------------------------------------\n` +
             `${commentStyle} File Name: ${vscode.window.activeTextEditor.document.fileName}\n` +
             `${commentStyle} Author: ${author}\n` +
             `${commentStyle} Date: ${date}\n` +
             `${commentStyle} Github: ${github}\n` +
             `${commentStyle} Description: \n` +
             `${commentStyle}------------------------------------------------------------------\n\n`;

    case 'html':
    case 'xml':
    case 'vue':
    case 'php':
      return `${commentStyle}------------------------------------------------------------------>\n` +
             `${commentStyle} File Name: ${vscode.window.activeTextEditor.document.fileName}\n` +
             `${commentStyle} Author: ${author}\n` +
             `${commentStyle} Date: ${date}\n` +
             `${commentStyle} Github: ${github}\n` +
             `${commentStyle} Description: \n` +
             `${commentStyle}------------------------------------------------------------------>\n\n`;

    case 'css':
    case 'scss':
      return `${commentStyle}------------------------------------------------------------------\n` +
             `${commentStyle} File Name: ${vscode.window.activeTextEditor.document.fileName}\n` +
             `${commentStyle} Author: ${author}\n` +
             `${commentStyle} Date: ${date}\n` +
             `${commentStyle} Github: ${github}\n` +
             `${commentStyle} Description: \n` +
             `${commentStyle}------------------------------------------------------------------\n\n`;

    default:
      return '';
  }
}

function deactivate() { }
exports.deactivate = deactivate;
