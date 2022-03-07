var canvas = document.getElementById('Canvas5x5');
var ctx = canvas.getContext('2d');


class CanvasGrid {

    constructor(M, N, empty) {
	this.spacing = 1
	this.step = [canvas.width / M, canvas.height / N]
	this.sqsz = [this.step[0] - this.spacing, this.step[1] - this.spacing ]
	this.M = M
	this.N = N
	this.empty = empty
	this.canvas = []
	this.colors = ['rgb(200, 0, 0)', 'rgb(0, 0, 200)']
	this.redraw = []
	this.unoccupied = []

	for (let i = 0; i < this.M; i++) {
	    let locar = []
	    for (let j = 0; j < this.N; j++) {
		if (Math.random() > 0.5) {
		    locar.push(1)
		} else {
		    locar.push(-1)
		}
	    }
    	    this.canvas.push(locar)
	}
	for (let i = 0; i < this.empty; i++) {
	    let x = this.random_cell()
	    this.canvas[x[0]][x[1]] = 0
	    this.unoccupied.push( [x[0], x[1]] )
	}

    }

    render_all () {
	let step = this.step
	for (var i = 0; i < this.M; i++) {
	    for (var j = 0; j < this.N; j++) {
		if (this.canvas[i][j] == 1) {
		    ctx.fillStyle = this.colors[0]
		} else if (this.canvas[i][j] == -1) {
		    ctx.fillStyle = this.colors[1]
		} else if (this.canvas[i][j] == 0) {
		    ctx.fillStyle = 'rgb(0, 0, 0)'
		}

		ctx.fillRect(this.step[0]*i, this.step[1]*j,
			     this.sqsz[0], this.sqsz[1])
	    }
	}
    }

    exchange_cells(c_1, c_2) {
	let first_cell = this.canvas[c_1[0]][c_1[1]]
	this.canvas[c_1[0]][c_1[1]] = this.canvas[c_2[0]][c_2[1]]
	this.canvas[c_2[0]][c_2[1]] = first_cell
    }

    random_cell() {
	let x = Math.floor(this.M * Math.random())
	let y = Math.floor(this.N * Math.random())
	return [x, y]
    }

    randomize_data() {
	this.unoccupied = []
	for (let i = 0; i < this.M; i++) {
	    for (let j = 0; j < this.N; j++) {
		if (Math.random() > 0.5) {
		    this.canvas[i][j] = 1
		} else {
		    this.canvas[i][j] = -1
		}
	    }
	}
	for (let i = 0; i < this.empty; i++) {
	    let x = this.random_cell()
	    this.canvas[x[0]][x[1]] = 0
	    this.unoccupied.push( [x[0], x[1]] )
	}
    }
    
}
