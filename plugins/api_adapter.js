import { WindowWidget } from '/os/window_widget.js'
import { Log } from '/os/debug.js'

export class API_Adapter {
	/** @param {import('/os/os.js').OS} os @param {string} pluginName */
	constructor(os, pluginName) {
		this.os = os;
		this.debug = os.debug;
		this.pluginName = pluginName
	}

	getAPI_Object() {
		return {
			os: this.#getOS_API(),
			classes: this.#getClassesAPI(),
		};
	}

	#getOS_API() {
		return {
			/** @param {(NS) => void} func @returns Promise */
			getNS: (func) => {
				this.debug.log(Debug.DEBUG_LEVEL, "API.getNS for "+this.pluginName)
				this.os.getNS(func)
			},

			/** @param {(NS) => void} func */
			getNS_noPromise: (func) => {
				this.os.getNS_noPromise(func)
			},
		}
	}

	#getClassesAPI() {
		/** @param { {onWindowClose: Function} } parent @param {import('/os/os.js').OS} os @param {string} [id]  */
		WindowWidget: (parent, id) => { return new WindowWidget(parent, this.os, id) }
	}
}
