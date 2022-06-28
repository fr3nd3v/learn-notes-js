const keys = document.querySelectorAll('.fortepiano__key');
const fortepiano = document.querySelector('.fortepiano');
const randomImageContainer = document.querySelector('.random-note')
const noteArrImageQ = [{
    "noteName": "Ab",
    "noteImageLink":"Abnote.png"
},
{
    "noteName": "A",
    "noteImageLink":"Anote.png"
},
{
    "noteName": "Bb",
    "noteImageLink":"Bbnote.png"
},
{
    "noteName": "B",
    "noteImageLink":"Bnote.png"
},
{
    "noteName": "Db",
    "noteImageLink":"Dbnote.png"
},
{
    "noteName": "D",
    "noteImageLink":"Dnote.png"
},
{
    "noteName": "Eb",
    "noteImageLink":"Ebnote.png"
},
{
    "noteName": "E",
    "noteImageLink":"Enote.png"
},
{
    "noteName": "F",
    "noteImageLink":"Fnote.png"
},
{
    "noteName": "Gb",
    "noteImageLink":"Gbnote.png"
},
{
    "noteName": "G",
    "noteImageLink":"Gnote.png"
}
]


let fnGetArgCurrentNote
function curry (fn){
    return function curried(...args){
        if(args.length >= fn.length){
           return fn.apply(this, args);
        }
        return curried.bind(this, ...args);
        
    }
}
const curriedTrueNoteOrFalse = curry(trueNoteOrFalse);

fortepiano.addEventListener('click', function(e){
  
    if(e.target.classList.contains('fortepiano__key')){
        playNote(e.target)
    }
});
function playNote(key){
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play()
    
}
function playNoteByKeyboard(key){
    const noteAudio = document.getElementById(key.dataset.note);
  
    noteAudio.play()
    key.classList.add('pressdown');
    noteAudio.addEventListener('ended', ()=> {
        key.classList.remove('pressdown');
        
    })
    
}
document.addEventListener('keydown', function(e){
    switch (window.event.keyCode) {
        case 87:
            playNoteByKeyboard(keys[0])
            keys[0].click()
           break;
        case 51:
            playNoteByKeyboard(keys[1])
            keys[1].click()
          break;
        case 69:
            playNoteByKeyboard(keys[2])
            keys[2].click()
          break;
        case 52:
            playNoteByKeyboard(keys[3])
            keys[3].click()
           break;
        case 82:
            playNoteByKeyboard(keys[4])
            keys[4].click()
          break;
        case 84:
            playNoteByKeyboard(keys[5])
            keys[5].click()
          break;
        case 54:
            playNoteByKeyboard(keys[6])
            keys[6].click()
           break;
        case 89:
            playNoteByKeyboard(keys[7])
            keys[7].click()
          break;
        case 55:
            playNoteByKeyboard(keys[8])
            keys[8].click()
          break;
        case 85:
            playNoteByKeyboard(keys[9])
            keys[9].click()
           break;
        case 56:
             playNoteByKeyboard(keys[10])
             keys[10].click()
          break;
        case 73:
             playNoteByKeyboard(keys[11])
             keys[11].click()
          break;
      }
})




document.querySelector('#startRandomNote').onclick = function (){
    renderRandomNote(noteArrImageQ)
    fortepiano.addEventListener('click', function(e){
        if(e.target.classList.contains('fortepiano__key')){
            fnGetArgCurrentNote(e.target.dataset.note, e.target)
        }
    });
}

function trueNoteOrFalse(trueNote, currentNote, key){
    const noteAudio = document.getElementById(key.dataset.note);
    console.log(currentNote)
    if(currentNote == trueNote){
        
        renderRandomNote(noteArrImageQ)
        key.classList.add('true__key')
    }
    else{
        key.classList.add('false__key')
    }
    noteAudio.addEventListener('ended', ()=> {
        key.classList.remove('true__key');
        key.classList.remove('false__key'); 
    })

}

function renderRandomNote(notesArray){
    randomImageContainer.innerHTML = "";
    let noteArr = noteArrImageQ;
    let randomNumber = getRandomNumber(0, notesArray.length)
    let randomImage = noteArr[randomNumber]['noteImageLink']
    let trueNote = noteArr[randomNumber]['noteName']
    const noteHtml = `<img src="/img/${randomImage}" alt="" class="randomNote__noteimg">`
    randomImageContainer.insertAdjacentHTML('afterbegin', noteHtml);
    fnGetArgCurrentNote = curriedTrueNoteOrFalse(trueNote);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min) ;
}


