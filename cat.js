catButton = document.querySelector('#cat-button');
catList = document.querySelector('.fact-list');
catHeaderContainer = document.querySelector('.cat-header-wrapper');

const activate = () => { catButton.addEventListener('click', addFact) };
const deactivate = () => catButton.removeEventListener('click', addFact);

let isHeader = false;



const addFact = async () => {

    try {

        // Turn off event listener
        console.log('reached!');
        deactivate();

        // Add a header if not existant
        if (isHeader == false) {
            // catHeader.innerHTML = 'Cat Facts';
            let catHeader = document.createElement('h3');
            let lineBreak = document.createElement('hr');
            let spacing = document.createElement('br');

            catHeader.classList.add('intro-header', 'cat-header');
            catHeader.innerText = 'Cat Facts';

            catHeaderContainer.append(spacing, spacing);
            catHeaderContainer.append(lineBreak);
            catHeaderContainer.append(spacing);
            catHeaderContainer.append(catHeader);

            isHeader = true;
        }

        // Get Cat Fact and store in variable
        const response = await fetch("https://catfact.ninja/fact");
        const fact = await response.json();

        // Add to List
        let newLi = document.createElement('li');
        newLi.classList.add('gen-h',);
        newLi.innerText = fact.fact;
        catList.append(newLi);

        // Reactivate Event Listener
        activate();

    } catch {
        alert('Unable to connect to CatFact API');
    }
}



// initialize button !

activate();



