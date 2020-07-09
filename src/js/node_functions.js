
const send_result = async(ime, rez) => {
    try {
        const URL = 'http://localhost:3002/';
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                name: ime,
                score: rez
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);

    } catch (err) {
        console.error(err);
    }
}

function ucitajIme() {
    let osoba = prompt("Please enter your name", "Your name:");

    if (osoba == null || osoba == "") {
        ime = "User cancelled the prompt.";
    } else {
        ime = osoba;
    }

    return ime;
};