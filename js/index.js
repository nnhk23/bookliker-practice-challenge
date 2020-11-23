const URL = "http://localhost:3000/books"
const UserURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", function() {   
    renderAllBooks()
});

function renderAllBooks() {
    fetch(URL)
    .then(resp => resp.json())
    .then(json => json.forEach(book => renderBookNames(book)))
}

function renderBookNames(book) {
    const bookList = document.querySelector('ul')
    const li = document.createElement('li')
    
    li.innerText = book.title
    li.addEventListener('click', () => {    
        renderEachBook(book)
    })
    
    bookList.appendChild(li)
}

function renderEachBook(book) {
    const bookInfo = document.querySelector('#show-panel')
    const bookCover = document.createElement('img')
    const bookName = document.createElement('h1')
    const bookSub = document.createElement('h2')
    const bookAuthor = document.createElement('h2')
    const des = document.createElement('p')
    // const likeList = document.createElement('ul')
    const btn = document.createElement('button')
    
    bookInfo.innerHTML = ""
    bookCover.setAttribute('src', book.img_url)
    bookName.innerText = book.title
    bookSub.innerText = book.subtitle
    bookAuthor.innerText = book.author
    des.innerText = book.description
    
    
    const likeList = addLikers(book)

    btn.innerText = "LIKE"
    btn.dataset.id = book.id
    btn.addEventListener('click', (e) => updateLikeList(e, book))

    bookInfo.append(bookCover, bookName, bookSub, bookAuthor, des, likeList, btn)
}

function addLikers(book) {
    const likeList = document.createElement('ul')
    likeList.setAttribute('id', 'like-list')
    
    for(const num in book.users) {
        const liker = document.createElement('li')
        liker.innerText = book.users[num].username
        likeList.appendChild(liker)
    }
    return likeList
}

function updateLikeList(e, book) {
    const btn = document.querySelector('button') 
    const id = book.id
    const self = {"id":1, "username":"pouros"}

    if (btn.innerText == 'LIKE') {
        btn.innerText = 'UNLIKE'
        const likerObj = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                users: book.users.concat(self)
            })
        }
    
        fetch (URL + "/" + id, likerObj)
        .then(resp => resp.json())
        .then(json => {
            addLike(book)
        })
    } else {
        btn.innerText = 'LIKE'
        // debugger
        const likerObj = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                users: book.users.pop(self)
            })
        }
    
        fetch (URL + "/" + id, likerObj)
        .then(resp => resp.json())
        .then(json => {
            removeLike(book)
        })
    }
    
}

function addLike(book) {
    const self = {"id":1, "username":"pouros"}
    const liker = document.createElement('li')
    const likeList = document.querySelector('#like-list')
    
    liker.innerText = self.username
    likeList.appendChild(liker)
}

function removeLike(book) {
    const self = {"id":1, "username":"pouros"}
    const likeList = document.querySelector('#like-list')

    if (self) {
        likeList.removeChild(likeList.lastChild)
    }
}