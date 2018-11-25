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
			character: id
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
}

const store = new Store();
store.generateGrid()

export default store;