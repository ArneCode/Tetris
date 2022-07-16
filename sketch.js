HTMLElement.prototype.addEventListeners=function(events, handler, useCapture, args) {
  let element=this
  if (!(events instanceof Array)) {
    throw 'addMultipleListeners: ' + 'please supply an array of eventstrings ' + '(like ["click","mouseover"])';
  } //create a wrapper to be able to use additional arguments 
  var handlerFn = function(e) {
    handler.apply(this, args && args instanceof Array ? args : []);
  }
  for (var i = 0; i < events.length; i += 1) {
    element.addEventListener(events[i], handlerFn, useCapture);
  }
}

function runTetris() {
  let canvas = document.getElementById("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight * 0.7
  let cellsize = 30
  let gridsizex = Math.round(canvas.width / cellsize)
  let gridsizey = Math.round(canvas.height / cellsize)
  let grid = Array.from({
    length: gridsizey
  }, () => new Array(gridsizex).fill(null))
  //console.log(grid)
  let ctx = canvas.getContext("2d")
  let left = document.getElementById("tetris-left")
  let down = document.getElementById("tetris-down")
  let right = document.getElementById("tetris-right")
  let clockw = document.getElementById("tetris-clockw")
  let anticlockw = document.getElementById("tetris-anticlockw")
  left.addEventListener("click", () => {
    form.move([-1, 0], grid);
    draw()
  })
  down.addEventListener("click", () => {
    form.move([0, 1], grid);
    draw()
  })
  right.addEventListener("click", () => {
    form.move([1, 0], grid);
    draw()
  })
  clockw.addEventListener("click", () => {
    form.rotate(-1, grid);
    draw()
  })
  anticlockw.addEventListener("click", () => {
    form.rotate(1, grid);
    draw()
  })



  let poss_formtypes=["triangle","line","2*2","L","reverse-L"]
      let type=poss_formtypes[Math.floor(Math.random()*poss_formtypes.length)]
      let form = new Form(type, [gridsizex / 2 - 3, 0])
  update()
  function update() {
    let collided = !form.fall(grid)
    if (collided) {
      form.petrify(grid)
      let rows_done=[]
      for(let y in grid){
        let row = grid[y]
        let done=true
        for(let val of row){
          if(val==null)
            done=false
          }
        if(done){
          rows_done.push([y].concat(row))
          }
      }
      for(let row of rows_done){
        let row_y=row.shift()
        for(let y=row_y;y>0;y--){
          grid[y]=grid[y-1]
        }
        grid[0]=new Array(gridsizex).fill(null)
        console.log(grid)
        }
      let type=poss_formtypes[Math.floor(Math.random()*poss_formtypes.length)]
      form = new Form(type, [gridsizex / 2 - 3, 0])
      if(!form.fall(grid)){
        alert("dead")
        runTetris()
        return
        }
    }
    draw()
  setTimeout(update, 1000)
    
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridsizey; y++) {
      ctx.moveTo(0, y * cellsize);
      ctx.lineTo(canvas.width, y * cellsize);
      ctx.stroke()
    }
    for (let x = 0; x < gridsizex; x++) {
      ctx.moveTo(x * cellsize, 0);
      ctx.lineTo(x * cellsize, canvas.height);
      ctx.stroke()
    }
    form.show(ctx, cellsize)

    for (let y in grid) {
      let row = grid[y]
      for (let x in row) {
        let val = row[x]
        if (val != null) {
          ctx.beginPath()
          ctx.rect(x * cellsize, y * cellsize, cellsize, cellsize)
          ctx.fill()
        }
      }
    }

  }
}
