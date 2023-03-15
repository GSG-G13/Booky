// Start Books Section
// https://www.googleapis.com/books/v1/volumes?q=b&&api-key=AIzaSyDOEa3KwP6_wmN4JNjNxL1rkl2kRZwqkzk&&maxResults=40
// let url = `https://www.googleapis.com/books/v1/volumes?q=b&&api-key=AIzaSyDOEa3KwP6_wmN4JNjNxL1rkl2kRZwqkzk&&maxResults=40`
let url = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&&api-key=AIzaSyDOEa3KwP6_wmN4JNjNxL1rkl2kRZwqkzk&&maxResults=40'


function openLoader() {
  document.querySelector('.load').style.display = 'flex';
}

function closeLoader() {
  document.querySelector('.load').style.display = 'none';
}
  

let xhr = new XMLHttpRequest()

let booksContainer = document.querySelector('.books-container')

xhr.onreadystatechange = () => {
  openLoader()
  if (xhr.readyState === 4 && xhr.status === 200) {
    closeLoader()
    let data = JSON.parse(xhr.responseText)
    let bookIndex = 0;
    data.items.forEach((book, i) => {
      if (i < 9) {
        domElements(book)
        bookIndex++
      }
    });
    seeMoreFunc(data, bookIndex)
  }
}

const domElements = (book) => {
  let bookContain = document.createElement('div')
  bookContain.className = 'book'

  let bookImgContain = document.createElement('div')
  bookImgContain.className = 'book-banner'

  let bookImg = document.createElement('img')
  bookImg.src = book.volumeInfo.imageLinks.thumbnail;
  bookImg.alt = book.volumeInfo.title;

  bookImgContain.appendChild(bookImg)
  bookContain.appendChild(bookImgContain)

  let bookData = document.createElement('div')
  bookData.className = 'book-data'

  let bookTitle = document.createElement('h2')
  bookTitle.textContent = book.volumeInfo.title;
  bookData.appendChild(bookTitle)

  let bookAuthor = document.createElement('p')
  bookAuthor.textContent = book.volumeInfo.publisher || ' '
  bookData.appendChild(bookAuthor)

  let bookExtraData = document.createElement('div')
  bookExtraData.className = 'book-extra-data'

  let col1 = document.createElement('div')

  let pagesCount = document.createElement('p')
  pagesCount.textContent = book.volumeInfo.pageCount || 150
  let pagesInfo = document.createElement('p')
  pagesInfo.textContent = 'Pages'
  col1.appendChild(pagesCount)
  col1.appendChild(pagesInfo)

  let col2 = document.createElement('div')

  let publishDate = document.createElement('p')
  publishDate.textContent = book.volumeInfo.publishedDate?.split('-').slice(0, 1) || 2005

  let publish = document.createElement('p')
  publish.textContent = 'Published'
  col2.appendChild(publishDate)
  col2.appendChild(publish)

  let col3 = document.createElement('div')

  let categoryKind = document.createElement('p')
  book.volumeInfo.categories?.length > 0 ? categoryKind.textContent = book.volumeInfo.categories[0].split(' ').slice(0, 1) || 'Science' : ''

  let category = document.createElement('p')
  category.textContent = 'Category'
  col3.appendChild(categoryKind)
  col3.appendChild(category)


  bookExtraData.appendChild(col1)
  bookExtraData.appendChild(col2)
  bookExtraData.appendChild(col3)

  bookData.appendChild(bookExtraData)

  let previewBtn = document.createElement('a')
  previewBtn.textContent = 'Preview'
  previewBtn.className = 'preview-btn'
  previewBtn.href = book.volumeInfo.previewLink

  bookData.appendChild(previewBtn)

  let bookContent = document.createElement('div')
  bookContent.className = 'book-content'

  bookContent.appendChild(bookData)
  bookContain.appendChild(bookContent)

  booksContainer.appendChild(bookContain)

}

const seeMoreFunc = (data, bookIndex) => {
  let seeMoreBtn = document.createElement('button')
  seeMoreBtn.textContent = 'See More'
  seeMoreBtn.className = 'seemore-btn'
  document.body.appendChild(seeMoreBtn)

  seeMoreBtn.addEventListener('click', () => {
    data.items.forEach((book, i, arr) => {
      if (i < 6 && bookIndex < 39) {
        domElements(arr[bookIndex])
        bookIndex++
        if (bookIndex === 39) {
          seeMoreBtn.style.display = 'none'
        }
      }
    })
  })
}

xhr.open('Get', url, true)
xhr.send()

// End Books Section

search()