window.addEventListener('DOMContentLoaded', () => {
    console.log('hello')
    const dogBarDiv = document.querySelector('#dog-bar')

    function pupSpan(pup) {
        const span = document.createElement('span');
        span.innerText = pup.name;
        span.addEventListener('click', (event) => {
            const oldDiv = document.querySelector('#dog-info');
            // console.log(pupInfo(pup))
            oldDiv.parentElement.replaceChild(pupInfo(pup), oldDiv)
        })
        return span;
    }

    function pupInfo(pup) {

        const img = document.createElement('img');
        img.src = pup.image;
        const h2 = document.createElement('h2');
        h2.innerText = pup.name;
        const button = document.createElement('button');
        button.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        const newDiv = document.createElement('div');
        newDiv.id = 'dog-info';
        newDiv.appendChild(img);
        newDiv.appendChild(h2);
        newDiv.appendChild(button);
        return newDiv;
    }

    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then((data) => {
            data.forEach(pup => {
                dogBarDiv.appendChild(pupSpan(pup))
            })

        })
})