
var cvr = new CanvasGrid(50, 50, 500)
var SatThres = 0.8

// need an alternative "own" as an optional parameter
function satisfaction(cg, i, j, self) {
    let cnv = cg.canvas
    if (self === undefined) { self = cnv[i][j] }
    let own = 0, total = 0

    if (self == 0) { return 0 }
    for (let m = Math.max(i - 1, 0); m <= Math.min(i + 1, cg.M - 1); m++) {
	for (let n = Math.max(j - 1, 0); n <= Math.min(j + 1, cg.N - 1); n++) {
	    if (m == i && n == j) { continue }
	    if (cnv[m][n] == 0) { continue }

	    if (cnv[m][n] == self) {
		own++
	    }
	    total++
	}
    }
    return own/total
}

function model_step() {
    for (let i = 0; i < cvr.M; i++) {
	for (let j = 0; j < cvr.N; j++) {
	    if (cvr.canvas[i][j] == 0) { continue }
	    if (satisfaction(cvr, i, j) >= SatThres) { continue }
	    
	    for (let n = 0; n < cvr.unoccupied.length; n++) {
		if (satisfaction(cvr, cvr.unoccupied[n][0], cvr.unoccupied[n][1],
				 cvr.canvas[i][j]) < SatThres) {

		    continue
		}
		cvr.exchange_cells([i, j], [cvr.unoccupied[n][0], cvr.unoccupied[n][1]])
		cvr.unoccupied[n] = [i, j]
		break
	    }
	}
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function run_sim() {
    for (let n = 0; n < 10; n++) {
	console.log(n)
	model_step()
	cvr.render_all()
	await sleep(100)
    }
}

function reset() {
    cvr.randomize_data()
    cvr.render_all()
}


document.getElementById("btn_reset").onclick = reset
document.getElementById("btn_run").onclick = run_sim

cvr.render_all()



// TODO:
// compute satisfaction value and make the model stop
// after satisfaction stopped changing (or number of steps exceeded)
//
// print satisfaction
// make input to change satisfaction threshold as well as
// some other parameters of simulation
//
// include plots in real time

// make tolerance distribution
// different for different groups
//
// mobility parameter
// different for different groups
//
// 
