window.addEventListener('DOMContentLoaded', () => {
    console.log('hello')
    const dogBarDiv = document.querySelector('#dog-bar')

    function pupSpan(pup) {
        const span = document.createElement('span');
        span.innerText = pup.name;
        span.addEventListener('click', (event) => {
            displayInfo(pup.id)
        })
        return span;
    }

    function dogText(pup) {
        return pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    }

    function displayInfo(pupId) {
        fetch('http://localhost:3000/pups/' + pupId)
            .then(res => res.json())
            .then(pup => {
                const oldDiv = document.querySelector('#dog-info');
                // console.log(pupInfo(pup))
                oldDiv.parentElement.replaceChild(pupInfo(pup), oldDiv)
            })

    }
    function pupInfo(pup) {

        const img = document.createElement('img');
        img.src = pup.image;
        const h2 = document.createElement('h2');
        h2.innerText = pup.name;
        const button = document.createElement('button');
        button.innerText = dogText(pup);
        button.addEventListener('click', (event) => {
            newText = event.target.innerText == 'Bad Dog!' ? 'Good Dog!' : 'Bad Dog!';

            event.target.innerText = newText;

            fetch('http://localhost:3000/pups/' + pup.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isGoodDog: !pup.isGoodDog })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    event.target.innerText = dogText(data);
                })

        })
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