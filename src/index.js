window.addEventListener('DOMContentLoaded', () => {
    let dogFilter = false;

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
                oldDiv.parentElement.replaceChild(pupInfoDiv(pup), oldDiv)
            })
    }

    function pupInfoDiv(pup) {
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
                .then((pup) => {
                    displayInfo(pup.id);
                    displayBar();
                })

        })
        const newDiv = document.createElement('div');
        newDiv.id = 'dog-info';
        newDiv.appendChild(img);
        newDiv.appendChild(h2);
        newDiv.appendChild(button);
        return newDiv;
    }

    function pupBarDiv(data) {

        const div = document.createElement('div');
        div.id = 'dog-bar';
        data.forEach(pup => {
            div.appendChild(pupSpan(pup))
        })
        return div
    }

    function displayBar() {
        fetch('http://localhost:3000/pups')
            .then(res => res.json())
            .then((data) => {
                if (dogFilter) {
                    return data.filter(pup => {
                        return pup.isGoodDog
                    })
                } else {
                    return data
                }
            })
            .then((data) => {
                const dogBarDiv = document.querySelector('#dog-bar')
                dogBarDiv.parentElement.replaceChild(pupBarDiv(data), dogBarDiv)
            })
    }

    const button = document.querySelector('#good-dog-filter');
    button.addEventListener('click', (event) => {
        const onText = 'Filter good dogs: ON';
        const offText = 'Filter good dogs: OFF';
        if (event.target.innerText == onText) {
            event.target.innerText = offText;
            dogFilter = false;
        } else {
            event.target.innerText = onText;
            dogFilter = true;
        }
        displayBar();
    })

    displayBar();
})