class Form {
  constructor(type, center) {
    this.center = center
    let sizex, sizey
    if (type == "line") {
      this.squares = [
        [-2, 0],
        [-1, 0],
        [0, 0],
        [1, 0],
        [2, 0]
      ] //positions relative to rotation center
      sizex = 5
      sizey = 1
    } else if (type == "2*2") {
      this.squares = [
        [-1, 0],
        [-1, 1],
        [0, 0],
        [0, 1]
      ] //positions relative to rotation center
      sizex = 2
      sizey = 2
    } else if (type == "triangle") {
      this.squares = [
        [-1, 0],
        [0, 0],
        [0, 1],
        [1, 0]
      ]
      sizex = 3
      sizey = 2
    } else if (type == "reverse-L") {
      this.squares = [
        [-1, 1],
        [-1, 0],
        [0, 0],
        [1, 0]
      ]
      sizex = 3
      sizey = 2
    } else if (type == "L") {
      this.squares = [
        [-1,-1],
        [-1,0],
        [0,0],
        [1,0]
      ]
      sizex=3
      sizey=2
    }
    if (sizex % 2 == 0) {
      this.center[0] = Math.round(this.center[0])
    } else {
      this.center[0] = Math.round(this.center[0])
    }
    if (sizey % 2 == 0) {
      this.center[1] = Math.round(this.center[1])
    } else {
      this.center[1] = Math.round(this.center[1])

    }
  }
  rotate(dir, grid) {
    let nsquares = []
    for (let square of this.squares) {
      let relposx = square[1] * dir
      let relposy = square[0] * dir * -1
      let posx = relposx + this.center[0]
      let posy = relposy + this.center[1]

      if (posx < 0 || posx > grid[0].length - 1 || posy < 0 || posy > grid.length - 1) {
        return
      }
      if (grid[posy][posx] == "square") {
        return
      }
      nsquares.push([relposx, relposy])
      console.log(nsquares)

    }
    console.log(nsquares)
    this.squares = nsquares
  }
  move(dir, grid) {
    let newx = this.center[0] + dir[0]
    let newy = this.center[1] + dir[1]
    for (let square of this.squares) {
      let posx = newx + square[0]
      let posy = newy + square[1]
      if (posx < 0 || posx > grid[0].length - 1 || posy < 0 || posy > grid.length - 1) {
        return
      }

      if (grid[posy][posx] == "square") {
        return
      }
    }
    this.center = [newx, newy]

  }
  fall(grid) {
    for (let square of this.squares) {
      let nposy = this.center[1] + square[1] + 1
      let nposx = [this.center[0] + square[0]]
      if (nposy > grid.length - 1) {
        return false
      }
      let newpos = grid[nposy][nposx]
      if (newpos != null) {
        return false
      }
    }

    this.center[1] += 1
    return true
  }
  petrify(grid) {
    for (let square of this.squares) {
      let posy = this.center[1] + square[1]
      let posx = [this.center[0] + square[0]]
      grid[posy][posx] = "square"
    }
  }
  show(ctx, cellsize) {
    for (let square of this.squares) {
      let posx = (square[0] + this.center[0]) * cellsize
      let posy = (square[1] + this.center[1]) * cellsize
      ctx.beginPath()
      ctx.rect(posx, posy, cellsize, cellsize)
      ctx.fill()
    }
  }
}
