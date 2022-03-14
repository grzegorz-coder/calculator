const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.but')
const clear= document.querySelector('.clear')
const del = document.querySelector('.delet')
const eq = document.querySelector('.equal')
const before = document.querySelector('.firstcal')
const now = document.querySelector('.secondcal')


let move = ''
let previousMove = ''
let calculate = undefined

const count = () => {
    let action
    if(!move || !previousMove) {
        return
    } 
    
    const previous = parseFloat(previousMove)
    const current = parseFloat(move)

    if(isNaN(previous) || isNaN(current)) {
        return
    }
    switch (calculate) {
        case '+':
            action = current + previous
            break;
        case '-':
            action = previous - current
            break;
        case 'x':
            action = current * previous
            break;
        case '/':
            if(current === 0) {
                deleteResults()
                return
            }
            action = previous / current
            break;
        case '√':
            action = Math.pow(previous, 1/current)
            break;
        case '%':
            action = previous / 100 * current
            break;
        case '^':
            action = Math.pow(previous, current)
            break;
        default:
            return
    }
    move = action
    calculate = undefined
    previousMove = ''
}


const selectOperation = (but) => {
    if (move === ''){

        return
    }
    if (previousMove !== '') {
        const previous = before.innerText
        if(move.toString() === '0' && previous[previous.lenght-1] === '/') {
            deleteResults()
            return
        }
        count()
    }
    calculate = but
    previousMove = move
    move = ''
   
}

const actual = () => {
    now.innerText = move
    if(calculate != null) {
        before.innerText = previousMove + calculate
    } else {
        before.innerText = ''
    }
    
}

const plusnumber = (number) => {
    if (number === ".") {
        if(move.includes(".")){
            return

        }
    }
    
    move = move.toString() + number.toString()
}

const clearNumber = () => {
  
    move = move.toString().slice(0, -1) 

}

const deleteResults = () => {
    move = ''
    previousMove = ''
    calculate = undefined
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        plusnumber(number.innerText)
        actual()
    })
})

clear.addEventListener('click', () => {
        clearNumber()
        actual()
})

operators.forEach((but) => {
    but.addEventListener('click', () =>{
        selectOperation(but.innerText)
        actual()
    })
})

eq.addEventListener('click', () =>{
    count()
    actual()
})

del.addEventListener('click', () =>{
    deleteResults()
    actual()
})