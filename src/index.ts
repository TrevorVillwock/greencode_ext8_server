import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ITranslator } from '@jupyterlab/translation';

import { ToolbarButton } from "@jupyterlab/apputils";
import { DocumentRegistry } from "@jupyterlab/docregistry";
import { INotebookModel, NotebookPanel, INotebookTracker } from "@jupyterlab/notebook";

import { IDisposable } from "@lumino/disposable";

//import 'jupyterlab-jupytext';


//import * as test1 from './jtest.json';

export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    
  constructor(app: JupyterFrontEnd) { 
      this.app = app;
  }
    
  readonly app: JupyterFrontEnd
    
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    const { commands } = this.app;
    const command = 'notebook:export-to-format';

    const data2 = {"line_1" : "x = 7",
           "line_2" : "print(x+3)"}
    const options = {
      method: 'POST',
      body: JSON.stringify(data2),
      headers: {'Content-Type': 'application/json'
      }
    };
 
    // Create the toolbar button
    let mybutton = new ToolbarButton({
      label: 'Measure Power Usage',
      onClick: () => {
        fetch('http://localhost:9898/api', options);

        /*
        fetch('nbtest.ipynb').then(response => {
          console.log('about to send response');
          console.log(response);
          return response;
        }).catch(error => {
          console.log('error!');
          console.error(error);
        });
        */
             
        commands.execute(command, {format: 'script', 'activate': true, 'download': false});
          
      }
    });
    // Add the toolbar button to the notebook toolbar
    panel.toolbar.insertItem(10, 'MeasureEnergyUsage', mybutton);
    console.log("MeasEnerUsage activated");

    // The ToolbarButton class implements `IDisposable`, so the
    // button *is* the extension for the purposes of this method.
    return mybutton;
  }
}
/**
 * Initialization data for the greencode-ext3 extension.
 */
const yourPlugin: JupyterFrontEndPlugin<void> = {
  id: '@greencode/measureenergy',
  autoStart: true,
  requires: [ITranslator, INotebookTracker],
  activate: (app: JupyterFrontEnd) => {
    const your_button = new ButtonExtension(app);
    app.docRegistry.addWidgetExtension('Notebook', your_button);
  }
}

export default yourPlugin;
