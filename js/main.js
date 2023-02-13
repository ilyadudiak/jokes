let form = document.querySelector('form');
let btn = document.querySelector('button');
const jokeP = document.querySelector('.main__joke');
jokeP.innerHTML = 'Search for Joke';
form.category.addEventListener('click', function (e) {
    if (this.value != 'Any') {
        form.query.classList.add('boring');
        form.query.setAttribute('disabled', '');
    } else {
        form.query.classList.remove('boring');
        form.query.removeAttribute('disabled');
    }
});
form.query.addEventListener('input', function (e) {
    if (this.value != '') {
        form.category.classList.add('boring');
        form.category.setAttribute('disabled', '');
    } else {
        form.category.classList.remove('boring');
        form.category.removeAttribute('disabled');
    }
});
form.addEventListener('submit', function (e) {
    e.preventDefault();
    getJoke(this.category.value, this.query.value, displayJoke);
    // console.log(this.category.value, this.query.value)
});

async function getJoke(category = '', query = '', cb) {
    let thisCategory = category;
    if (!category && !query) {
        thisCategory = 'Any';
    };

    if (query) {
        let thisQuery = query;
        fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&contains=${thisQuery}`)
            .then(res => res.json())
            .then(res => cb(res))
            .catch(err => console.error(err));
        console.log(typeof query);
    } else {
        fetch(`https://v2.jokeapi.dev/joke/${thisCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`)
            .then(res => res.json())
            .then(res => cb(res))
            .catch(err => console.error(err))
    }




}

function displayJoke(joke) {
    if (joke.error == true) {
        let jokeTemplate = `
            <span>${joke.message}</span>
        `;
        jokeP.innerHTML = jokeTemplate;
        return;
    }
    if (joke.type == 'twopart') {
        let jokeTemplate = `
            <span>${joke.setup}</span>
            <br>
            <span>${joke.delivery}</span>
        `;
        jokeP.innerHTML = jokeTemplate;
    } else {
        let jokeTemplate = `
            <span>${joke.joke}</span>
        `;
        jokeP.innerHTML = jokeTemplate;
    }
}