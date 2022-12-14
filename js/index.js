let stepIndex = 1,
  DISC_LENGTH = 0,
  SLEEP_TIME = 1000,
  started = false

// DOM
const resetBtn = document.getElementById("reset-button")
const startBtn = document.getElementById("start-button")

async function sleep() {
  await new Promise((r) => setTimeout(r, SLEEP_TIME))
}

const state = {
  a: Array(7)
    .fill(0)
    .map((e, i) => i + 1)
    .reverse(),
  b: [],
  c: [],
  stack: [],

  renderStack() {
    document.getElementById("move-to").innerHTML = this.stack[this.stack.length - 1]?.substring(20) || ""
    document.querySelector("#stack").innerHTML = ""
    this.stack.forEach((ele) => {
      document.querySelector(
        "#stack"
      ).innerHTML += `<div class="stack">${ele}</div>`
    })

    document.querySelector("#stack").innerHTML += '<div class="p-1"></div>'
  },

  push(x) {
    this.stack.push(x)
    this.renderStack()
  },

  pop() {
    this.stack.pop()
    this.renderStack()
  },

  move(key1, key2) {
    key1 = key1.toLowerCase()
    key2 = key2.toLowerCase()

    if (this[key1].length === 0 && this[key2].length === 0) {
      console.log("ERROR")
      console.log(key1, key2)
      return
    }

    if (this[key1].length === 0) {
      this[key1].push(this[key2].pop())
      render()
      return
    }

    if (this[key2].length === 0) {
      this[key2].push(this[key1].pop())
      render()
      return
    }

    if (this[key1][this[key1].length - 1] < this[key2][this[key2].length - 1])
      this[key2].push(this[key1].pop())
    else this[key1].push(this[key2].pop())

    render()
  },
}

function mapDiscWidth(X) {
  const A = 1,
    B = DISC_LENGTH,
    C = 20,
    D = 100
  return ((X - A) / (B - A)) * (D - C) + C
}

function render() {
  const bibes = document.querySelectorAll(".flex-col-reverse")

  bibes[0].innerHTML = '<div class="base-plate">A</div>'
  state.a.forEach((ele) => {
    bibes[0].innerHTML += `
      <div class="plate" style="width: ${mapDiscWidth(ele)}%">${ele}</div>
    `
  })

  bibes[1].innerHTML = '<div class="base-plate">B</div>'
  state.b.forEach((ele) => {
    bibes[1].innerHTML += `
      <div class="plate" style="width: ${mapDiscWidth(ele)}%">${ele}</div>
    `
  })

  bibes[2].innerHTML = '<div class="base-plate">C</div>'
  state.c.forEach((ele) => {
    bibes[2].innerHTML += `
      <div class="plate" style="width: ${mapDiscWidth(ele)}%">${ele}</div>
    `
  })
}

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

function start() {
  SLEEP_TIME = document.querySelector("input#time").value
  console.log(DISC_LENGTH)
  if (!started) compute(), (started = true)
}

function reset() {
  resetBtn.style.display = "none"
  startBtn.style.display = "block"

  let arr = []
  for (let i = 0; i < DISC_LENGTH; i++) arr.push(i + 1)

  state.a = arr.reverse()
  state.c = []
  state.b = []

  started = false

  render()
}

document.querySelector("#main-form").addEventListener("submit", (e) => {
  e.preventDefault()
  init()
})

function init() {
  const count = document.querySelector("input").value
  document.getElementById("init-window").style.display = "none"

  DISC_LENGTH = count

  state.c = []
  state.b = []
  state.a = Array(+count)
    .fill(0)
    .map((e, i) => i + 1)
    .reverse()

  render()
}
