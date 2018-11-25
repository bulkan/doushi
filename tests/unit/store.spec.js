import { Store } from '@/store';

describe('Store', () => {
	describe('#generateGrid', () => {
		let store = new Store(2, 2);
		store.generateGrid();

		it('should create a 2 x 2 grid', () => {
			const expectedKeys = [ '0,0', '0,1', '1,0', '1,1' ];
			expect(Object.keys(store._state.grid)).toEqual(expectedKeys);
		});
	});
});
