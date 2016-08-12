var grid = require('./main')

function renderPuzzle(grid) {
	var html = '';
	for (row = 0; row < grid.length; row++) {
		html += '<tr>';
		for (var column = 0; column < grid[row].length; column++) {
			if (!grid[row][column]) {
				html += '<td class="filled"></td>';
			} else {
				html += '<td>' + grid[row][column].toUpperCase() + '</td>';
			}
		}
		html += '</td>';
	}
	return html;
}

document.getElementById('puzzle').innerHTML = renderPuzzle(grid);
