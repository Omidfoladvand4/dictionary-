const $ = document
const resultElem = $.getElementById('result')
const btn = $.getElementById('search-btn')
const input = $.getElementById('inp-word')
const audio = $.getElementById('sound')

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'


const getData = () => {
    let inputWord = input.value
    
    fetch(`${url}${inputWord}`)
    .then(res => res.json())
    .then(data => {
            let datas = data[0]
            
            resultElem.innerHTML = `
            <div class="word">
            <h3>${datas.word}</h3>
            <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
        <p>${datas.meanings[0].partOfSpeech}</p>
        <p>${datas.phonetic}</p>
        </div>
        <p class="word-meaning">
        ${datas.meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${datas.meanings[0].definitions[0].example || ""}
        </p>`
        
        audio.setAttribute('src', datas.phonetics[0].audio)
      })
      .catch(() => {
        resultElem.innerHTML = `<h3 class="error">Could't Find The Word</h3>`
      })
      
    }
    
    function playSound() {
      audio.play()
    }
    btn.addEventListener('click',getData)
    input.addEventListener('keyup' , (e) => {
      if(e.key === "Enter"){
        getData()
      }
    })