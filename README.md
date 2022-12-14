# HANOI.EXE

A simple tower of hanoi visualization tool.

## Overview

Clone the repo, then open the `index.html` file.

## The algorithm

```js
async function compute() {
  async function hanoi(n, a, b, c) {
    if (n == 1) {
      await sleep()
      state.move(a, c)
      return
    }

    await sleep()
    state.push(
      `hanoi(${
        n - 1
      }, ${a.toUpperCase()}, ${c.toUpperCase()}, ${b.toUpperCase()}) - move <span>${a.toUpperCase()}</span> to <span>${b.toUpperCase()}</span>`
    )
    await hanoi(n - 1, a, c, b)
    await sleep()
    state.pop()

    await sleep()
    state.push(
      `hanoi(${
        n - 1
      }, ${b.toUpperCase()}, ${a.toUpperCase()}, ${c.toUpperCase()}) - move <span>${b.toUpperCase()}</span> to <span>${c.toUpperCase()}</span>`
    )
    state.move(a, c)
    await hanoi(n - 1, b, a, c)
    await sleep()
    state.pop()
  }

  state.push(
    `hanoi(${DISC_LENGTH}, A, B, C) - move <span>A</span> to <span>C</span>`
  )
  await hanoi(DISC_LENGTH, "a", "b", "c")
  await sleep()
  state.pop()

  resetBtn.style.display = "block"
  startBtn.style.display = "none"
}

```

<hr>

Developed by [Hassan Ezz](https://github.com/hasssanezzz)