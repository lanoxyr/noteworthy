import { ipcRenderer } from "electron";
import Renderer from "./render";
import { FILE_IO, IFileInfo, INamedFile } from "@common/fileio";

export default class RendererIPC {
	_app:Renderer;

	constructor(appRenderer:Renderer){
		this._app = appRenderer;
	}

	init(){
		console.log("RendererIPC :: init()");

		ipcRenderer.on("message", (event: Event, arg: Object) => {
			console.log(event, arg);
		});

		ipcRenderer.on(FILE_IO.FILE_OPENED, (event:Event, fileInfo:INamedFile)=> {
			console.log("RendererIPC :: FILE_OPENED");
			if(!this._app._editor){ 
				console.log("RenderIPC :: no active editor!");
				return;
			}
			this._app._editor.setCurrentFile(fileInfo);
		});

		ipcRenderer.on(FILE_IO.FILE_SAVED, (event: Event, arg: Object) => {
			console.log("RendererIPC :: FILE_SAVED", event, arg);
			if (!this._app._editor) {
				console.log("RenderIPC :: no active editor!");
				return;
			}
		});

		ipcRenderer.on(FILE_IO.FILE_SAVED_AS, (event: Event, fileName:string) => {
			console.log("RendererIPC :: FILE_SAVED_AS", event, fileName);
			if (!this._app._editor) {
				console.log("RenderIPC :: no active editor!");
				return;
			}
			this._app._editor.setCurrentFileName(fileName);
		});
	}

	////////////////////////////////////////////////////////

	openFileDialog(){
		console.log("RendererIPC :: openFileDialog()");
		ipcRenderer.send(FILE_IO.DIALOG_OPEN);
	}

	openSaveAsDialog(fileInfo:IFileInfo) {
		console.log("RendererIPC :: openSaveAsDialog()");
		ipcRenderer.send(FILE_IO.DIALOG_SAVE_AS, fileInfo);
	}

	requestFileSave(fileInfo:INamedFile){
		console.log("RendererIPC :: requestFileSave()");
		ipcRenderer.send(FILE_IO.FILE_SAVE, fileInfo);
	}

	////////////////////////////////////////////////////////

	/* DISPATCH
	 * Dispatch a command to the parent.
	 * @param (arg) message body
	 */
	dispatch(arg:Object){
		//this.handleEvent(arg.command, arg.content);
	}

	send(command:string, arg:{}={}){

	}

	/* HANDLEEVENT
	 * Act on messages received from the main process.
	 * @param (cmd) message sent from main
	 * @param (content) message body
	 */
	handleEvent(cmd:string, content:Object) {
		switch (cmd) {
			// FILE_OPEN
			case FILE_IO.FILE_OPEN:
				break;
			// FILE_SAVE
			case FILE_IO.FILE_SAVE:
				break;
			// UNKNOWN
			default:
				console.log("RendererIPC :: unknown command");
				break;
		}
	}
}