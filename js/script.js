


const text = document.querySelector('#search')
const numb = document.querySelector('#numb')
const btn = document.querySelector('#btn')
const output = document.querySelector('#output')

const API = 'https://api.giphy.com/v1/gifs/search?api_key='
const KEY = 'sTdCJjIAUz2fNDMUob8nqHx6G50HnUzP'

const search = async () => {
    output.innerHTML = ''
    if (text.value.length > 3 && numb.value < 20 && numb.value > 0) {
        const limit = `&limit=${numb.value}&q=`
        let url = API + KEY + limit + text.value
        let request = await fetch(url)
        let response = await request.json()

        render(response.data)
    } else if (text.value.length < 3 && numb.value > 20) {
        alert("Вы ввели слишком короткое название и большое количество гифок")
    } else if(numb.value < 1 && text.value.length < 1){
        alert("Вы ничего не ввели!")
    } else if (numb.value > 20) {
        alert("Вы ввели слишком большое количество гифок")
    } else if (text.value.length < 3 && text.value.length > 0){
        alert("Вы ввели слишком короткое название")
    } else if (numb.value < 1){
        alert("Вы не ввели количество гифок!")
    } else if (text.value.length < 1){
        alert("Вы не ввели названия гифок")
    }

    text.value = ''
    numb.value = ''
}


const render = (api) => {
    console.log(api)
    api.map(el => {
        let title = document.createElement('h3')
        let iframe = document.createElement('iframe')
        let col = document.createElement('div')
        let gifBox = document.createElement('div')

        iframe.src = el.embed_url
        title.textContent = el.title
        col.className = 'col-4'
        gifBox.className = 'gifBox'
        iframe.className = 'gif'
        title.className = 'title'
        

        output.style=`
            display: flex;
        `

        gifBox.append(title,iframe)
        col.append(gifBox)
        output.append(col)
    })
}

btn.addEventListener('click', search)
text.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        search()
    }
})
numb.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        search()
    }
})