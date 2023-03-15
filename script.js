let url = `https://api.quotable.io/quotes`;
let xhr = new XMLHttpRequest();
let quotsContainer = document.querySelector('.qouts-container')
xhr.onreadystatechange = ()=> {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let newdata = JSON.parse(xhr.responseText);
    //console.log(newdata);
    newdata.results.forEach((quot) => {
        let quotContain = document.createElement('div')
        quotContain.className = 'quot'

        let quotContent = document.createElement('h3')
        quotContent.className = 'quot-content';
        quotContent.textContent = quot.content;
        //console.log(quotContent)
        let quotAuther = document.createElement('p')
        quotAuther.className = 'quot-author'
        quotAuther.textContent = quot.author;
       // console.log(quotAuther)
        quotContain.appendChild(quotContent)
        quotContain.appendChild(quotAuther)

        quotsContainer.appendChild(quotContain)

        let randomNum =Math.floor(Math.random(quot.count-4));
        console.log(randomNum);
        newdata.slice(randomNum,randomNum+4)

    });

    
     //return Math.floor(Math.random()-4);
  }
};
xhr.open("GET", url, true);
xhr.send();
