import {
    JupyterFrontEnd, JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  
  import {
    INotebookTracker, NotebookPanel
  } from '@jupyterlab/notebook';
  
  const rawcellPlugin: JupyterFrontEndPlugin<void> = {
    id: 'custom-raw-cell-render',
    autoStart: true,
    requires: [INotebookTracker as any],
    activate: (app: JupyterFrontEnd, notebookTracker: INotebookTracker) => {

    console.log("JupyterLab extension @quarto/jupyterlab-quarto raw cell rendering is activated!")

      notebookTracker.widgetAdded.connect((sender, notebookPanel: NotebookPanel) => {
        notebookPanel.content.activeCellChanged.connect((sender, cell) => {
            if (cell?.model.type === 'raw') {

                console.log({cell});

                // Create a custom overlay element
                const customOverlay = document.createElement('div');
                customOverlay.style.display = 'none'; // Initially hidden
                customOverlay.innerHTML = '<div>Custom Rendered Content</div>'; // Your custom content
                cell.node.appendChild(customOverlay);
      
                const updateOverlayDisplay = () => {
                  if (cell.editor !== null && cell.editor.host.classList.contains('jp-mod-editMode')) {
                    // Hide overlay in edit mode
                    customOverlay.style.display = 'none';
                  } else {
                    // Show overlay in command mode
                    customOverlay.style.display = '';
                  }
                };
      
                // Attach listeners to cell mode changes
                cell.displayChanged.connect(updateOverlayDisplay);
      
                // Apply initial rendering state based on current mode
                updateOverlayDisplay();          }
        });
      });
    }
  };
  
  export default rawcellPlugin;
  