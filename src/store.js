const hiragana = {
  a: [ 'あ', 'い', 'う', 'え', 'お' ],
  k: [ 'か', 'き', 'く', 'け', 'こ' ],
  s: null,
  t: null,
  n: null,
  m: null,
  y: null,
  r: [ 'ら', 'り', 'る', 'れ', 'ろ' ],
};


export class Store {
    _state = {
      grid: {},
      masuCells: [],
      verbCells: [],
      currentVerb: {
        type: 'ICHIDAN',
        dictionaryForm: '食べる'
      },
      hiraganaColumn: 'r'
    };

    constructor(rows = 5, columns = 9) {
      this.ROWS = rows;
      this.COLUMNS = columns;
      this.hiraganaColumnIds = ['0,4', '1,4', '2,4', '3,4', '4,4'];
    }

    createCell(row, col) {
      const id = `${row},${col}`;
      const cell = {
        id,
        row,
        col,
        character: '',
        highlight: false
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

    setMasuCells(kanaCellId) {
      // reset the previous cells
      this._state.masuCells.forEach(id => this._state.grid[id].character = '');


      const [ row, column ] = kanaCellId.split(',').map(i => +i);

      const maCellId = `${row},${column}`;
      const suCellId = `${row},${column + 1}`;

      this._state.grid[maCellId].character = 'ま';
      this._state.grid[suCellId].character = 'す';


      this._state.masuCells = [suCellId];
    }

    setVerbCells(kanaCellId) {
      this._state.verbCells.forEach(id => this._state.grid[id].character = '');
      this._state.verbCells = [];

      const [ row, column ] = kanaCellId.split(',').map(i => +i);

      const verb = this._state.currentVerb.dictionaryForm.split('');
      const startColumn = column - (verb.length - 1);

      for ( let i = 0; i < verb.length - 1; i++ ) {
        const character = verb[i];
        const id = `${row},${startColumn + i}`;
        this._state.grid[id].character = character;
        this._state.verbCells.push(id);
      }
    }

    /**
     * Set current row
     * 
     * @param {Cell} currentCell Cell object
     */
    setCurrentRow(currentCell) {
      this.setHiraganaColumn();

      for (const cell of Object.values(this._state.grid)) {
        if (cell.row === currentCell.row) {
          cell.highlight = true;
        } else {
          cell.highlight = false;
        }
      }

      const kanaCell = this.hiraganaColumnIds.find(hiraganaCell => hiraganaCell.search(RegExp(`${currentCell.row},`)) != -1);
      this.setMasuCells(kanaCell);
      this.setVerbCells(kanaCell);
    }

    resetRowHighlight(row) {
      for (const cell of Object.values(this._state.grid)) {
        if(cell.row === row) {
          cell.highlight = false;
        }
      }
    }

    setHiraganaColumn() {
      this.hiraganaColumnIds.forEach((id, i) => {
        this._state.grid[id].character = hiragana[this._state.hiraganaColumn][i];
      });
    }

    initialiseGrid() {
      this.generateGrid();
      this.setHiraganaColumn();
      this.setVerbCells('2,4'); // RU
    }
}

const store = new Store();
store.initialiseGrid();

window.grid = store._state.grid;


export default store;