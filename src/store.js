const hiragana = {
	r: [ 'ら', 'り', 'ろ', 'れ', 'る' ],
	k: [ 'ka', 'ki', 'ko', 'ke', 'ku' ]
};


export class Store {
	_state = {
		grid: {}
	};

	constructor(rows = 5, columns = 9) {
		this.ROWS = rows;
		this.COLUMNS = columns;
	}

	createCell(row, col) {
		const id = `${row},${col}`;
		const cell = {
			id,
			character: ''
		};
		return [ id, cell ];
	}

	generateGrid() {
		for (let row = 0; row < this.ROWS; row++) {
			for (let col = 0; col < this.COLUMNS; col++) {		
				const [id, cell] = this.createCell(row, col);
				this._state.grid[id] = cell;
			}
		}
	}

	initialiseGrid() {
		this.generateGrid();

		['0,4', '1,4', '2,4', '3,4', '4,4'].forEach((id, i) => {
			this._state.grid[id].character = hiragana.r[i];
		});
	}
}

const store = new Store();
store.initialiseGrid()


export default store;