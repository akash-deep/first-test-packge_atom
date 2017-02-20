'use babel';

import FirstTestPackageView from './first-test-package-view';
import { CompositeDisposable ,Point, Range } from 'atom';
//import Point from 'atom/package/text-buffer';

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
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      //let sub_txt = require("text-buffer")
      var pt1,pt2,range1,selection
      pt1 = new Point(5,32);
      pt2 = new Point(15,4);
      range1 = new Range(pt1,pt2);
      selection = range1.toString();
      //let selection = editor.getText()
      //let reversed = selection.split('').reverse().join('')
      //editor.insertText(reversed)
      console.log(selection);
  }

  }

};
