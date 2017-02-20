'use babel';

import FirstTestPackageView from './first-test-package-view';
import { CompositeDisposable } from 'atom';

export default {

  firstTestPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.firstTestPackageView = new FirstTestPackageView(state.firstTestPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.firstTestPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'first-test-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.firstTestPackageView.destroy();
  },

  serialize() {
    return {
      firstTestPackageViewState: this.firstTestPackageView.serialize()
    };
  },

  toggle() {
    console.log('FirstTestPackage was toggled!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
  }

};
