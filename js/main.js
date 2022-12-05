
var gNums
var currNum = 1
var currDiff
var isTimerOff = true
var interval = 0;
var pageLoadTime
var delta



function onInitGame() {
    gNums = creatArrayOfNums(16)
    renderBoard(gNums)
    onDifficultyPress()
}

function renderBoard(nums) {
    var strHTML = ''
    var shuffleIdx = null
    var cols = Math.sqrt(nums.length);
    var randomRange = nums.length - 1

    for (var i = 0; i < cols; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < cols; j++) {
            shuffleIdx = getRandomInt(nums[0], randomRange)
            randomRange -= 1
            var cell = nums[shuffleIdx]
            nums.splice(shuffleIdx, 1)
            strHTML += `<td class="cell" onclick="onCellClicked(this,${cell})">${cell}</td>`
        }
        strHTML += '</tr>\n'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

}

function creatArrayOfNums(num = 16) {
    var nums = []
    for (var i = 1; i <= num; i++) {
        nums.push(i)
    }
    return nums
}

function onCellClicked(elCell, cell) {
    if (currNum !== cell) return
    elCell.classList.add('pressedNum')
    currNum++

    if (cell === 1) {
        elRestart = document.querySelector('.playAgain')
        elRestart.classList.remove('invisible')

        pageLoadTime = Date.now()
        interval = setInterval(timer, 1000)

        var field = document.querySelector('.clockText')
        field.classList.remove('invisible')
    }

    if (currDiff) {
        if (cell === currDiff) {
            var elNextNum = document.querySelector('.nextNumber')
            elNextNum.innerText = `Congratulations you won!`
            stopTimer()
            return
        }
    } else if (cell === 16) {
        var elNextNum = document.querySelector('.nextNumber')
        elNextNum.innerText = `Congratulations you won!`
        stopTimer()
        return
    }
    var elNextNum = document.querySelector('.nextNumber')
    elNextNum.innerText = `Next: ${currNum}`
}

function onDifficultyPress() {
    var elCurrDif = document.querySelector('.difficulty')
    elCurrDif.addEventListener('change', (event) => {
        var currDiff = Number(event.target.value)

        playAgain(currDiff)

        var field = document.querySelector('.clockText')
        field.classList.add('invisible')
    });
}

function timer() {
    var start = Date.now()
    var field = document.querySelector('.clockText')
    delta = start - pageLoadTime
    delta = Math.floor(delta / 1000) // in seconds
    isTimerOff = false
    field.innerText = delta + ' s'
}

function playAgain(num = 16) {
    pageLoadTime = 0
    delta = 0;
    currNum = 1

    gNums = creatArrayOfNums(num)
    renderBoard(gNums)

    var elNextNumber = document.querySelector('.nextNumber')
    elNextNumber.innerText = `Press ${currNum} to start`

    stopTimer()
}

function stopTimer() {
    clearInterval(interval)
    var field = document.querySelector('.clockText')
    field.classList.add('invisible')
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}