let rando = document.getElementById("rando")
let score = document.getElementById("score")
let cash = document.getElementById("cash")
let playersElm = Array.from(document.getElementsByClassName("player"))

let autoint;

const getRando = () => Math.floor(Math.random() * 13) + 1

let oldNumber = 0
let number = getRando()
rando.innerHTML = number

class Player {
    constructor(name) {
        this.name = name
        this.bet = null
        this.score = 0
        this.cash = 0
    }

    betLo() {
        this.bet = "lo"
    }

    betHi() {
        this.bet = "hi"
    }

    bank() {
        this.score += this.cash
        this.cash = 0
    }
}

const cpuArr = ["reckless", "dumb", "safe", "scared", "spam", "spam2", "spam3", "amazienge", "terrible", "bad_hacker"]

class CPU extends Player {
    constructor(name, style) {
        super(name);
        this.style = style
    }


    guess(num) {
        switch (this.style) {
            case "reckless":
                if (num > 6) {
                    this.betLo()
                } else if (num < 5) {
                    this.betHi()
                } else {
                    this.bank()
                }
                break;
            case "dumb":
                const random = Math.floor(Math.random() * 3)
                if (random === 0) this.betLo()
                if (random === 1) this.betHi()
                if (random === 2) this.bank()
                break;
            case "scared":
                if (num > 7) {
                    this.betLo()
                } else if (num < 3) {
                    this.betHi()
                } else {
                    this.bank()
                }
                break;
            case "safe":
                if (num > 6) {
                    this.betLo()
                } else if (num < 4) {
                    this.betHi()
                } else {
                    this.bank()
                }
                break;
            case "spam":
                if (this.cash > 10) {
                    this.bank()
                } else {
                    this.betLo()
                }
                break;
            case "spam2":
                if (this.cash > 10) {
                    this.bank()
                } else if (num < 7) {
                    this.betHi()
                } else {
                    this.betLo()
                }
                break;
            case "spam3":
                if (this.cash > 0) {
                    this.bank()
                } else if (num < 7) {
                    this.betHi()
                } else {
                    this.betLo()
                }
                break;
            case "amazienge":
                if (this.cash > 6) {
                    this.bank()
                } else if (num < 7) {
                    this.betHi()
                } else {
                    this.betLo()
                }
                break;
            case "terrible":
                if (this.cash === 1) {
                    this.bank()
                } else {
                    this.betHi()
                }
                break;
            case "bad_hacker":
                this.betHi()

        }
    }
}

const human = new Player("You")
const players = [
    "Player A",
    "Player B",
    "Player C",
    "Player D",
    "Player E",
    "Player F",
    "Player G",
    "Player H",
    "Player I",
    "Player GFARGbA"
].map((name, i) => new CPU(name, cpuArr[i]))

const sorter = (p1, p2) => {
    if (p1.score < p2.score) {
        return 1
    }
    return -1
}

const updateScreen = () => {
    rando.innerHTML = number
    score.innerHTML = `Current banked score:<br> ${human.score}`
    cash.innerHTML = `Current cash:<br> ${human.cash}`
    playersElm.forEach((elm, i) => {
        const plr = players.concat(human).sort(sorter)[i]
        elm.innerHTML = `${plr.style || "You"} - ${plr.score} + ${plr.cash}`
    })
}

updateScreen()

const handleBet = player => {
    if (player.name === "Player GFARGbA") {
        player.cash += oldNumber
    } else if ((player.bet === "lo" && number > oldNumber) ||
        (player.bet === "hi" && number < oldNumber)) {
        // Player lost
        player.cash = 0
    } else if ((player.bet === "hi" && number > oldNumber) ||
        (player.bet === "lo" && number < oldNumber)) {
        // Player won
        player.cash += oldNumber
    }
    player.bet = null
}

const doRound = () => {
    players.forEach(player => player.guess(number))
    oldNumber = number
    number = getRando()
    handleBet(human)
    players.forEach(handleBet)
    updateScreen()
}