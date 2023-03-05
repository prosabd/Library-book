/*$('.typefun').on('keydown', function(){
	$('.conductor').toggleClass('blah');
});
*/

const textbox = document.querySelector('.typefun');
const conductor = document.querySelector('.conductor');
const table = document.querySelector('.table');
const tdtable = document.querySelector('td')
var delbookall = 0;
var addbook = "";
let myLibrary = [];
let librarycount = 0;
let delbook = document.querySelector('.delete');
let readed = document.querySelector('.read');
const observread = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Vérifiez les changements spécifiques que vous recherchez
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            //console.log('Une ou plusieurs lignes ont été ajoutées à la table.');
            let readed = document.querySelectorAll('.read');
            //the readed button will change the text to yes or no for all of querySelectorAll
            for (let i = 0; i < readed.length; i++) {
                
                readed[i].onclick = function(){
                    console.log("clickedread");
                    if (readed[i].textContent == "No"){
                        readed[i].textContent = "Yes";
                    }else{
                    readed[i].textContent = "No";
                }
            }
        };
    }
    
    });
});
const observdel = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Vérifiez les changements spécifiques que vous recherchez
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        //console.log('Une ou plusieurs lignes ont été ajoutées à la table.');
        let delbook = document.querySelectorAll('.delete');
        //the readed button will change the text to yes or no for all of querySelectorAll
        for (let i = 0; i < delbook.length; i++) {
            
            delbook[i].onclick = function(){
                console.log("clickeddelete");
                //this.ariaSelected = delete this.ariaSelected;
                let row = this.parentNode.parentNode;
                // Supprime la ligne du tableau
                row.parentNode.removeChild(row);
            
            }
        };
    }

    });
});
// Configurez l'observateur pour observer les modifications apportées à la table
observread.observe(table, { childList: true, subtree: true });
// Configurez l'observateur pour observer les modifications apportées à la table
observdel.observe(table, { childList: true, subtree: true });

    //when the text is too long the textbox will be bigger and can be scrollable 
    textbox.addEventListener('input', function() {
        var lines = this.value.split("\n");
        for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > 50) {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
            this.value = lines.join("\n");
            this.scrollTop = this.scrollHeight;
        }
        }
    });

    
    function book(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read  
    };
  
const theHobbit = new book("The Hobbit by J.R.R. Tolkien", "295 pages", " not read yet");
const userbook = new book("userbook", "userbook", "userbook", "userbook");


function del() {
    delbookall.onclick = function(){
        console.log("clickeddelete");
        table.rows[this.ariaSelected].deleteCell(0);
        let index = this.ariaSelected;
        myLibrary.splice(index, 1);
        console.log(index);
    };

}
conductor.onclick = function(){
    console.log("clicked");
    //textbox.value = theHobbit.title + theHobbit.author + theHobbit.pages + theHobbit.read;
    addbook = textbox.value;
    console.log(addbook);
    //add the book to the library
    myLibrary.push(addbook);
    console.log(myLibrary);
    // Configurez l'observateur pour observer les modifications apportées à la table
    observread.observe(table, { childList: true, subtree: true });
    // Configurez l'observateur pour observer les modifications apportées à la table
    observdel.observe(table, { childList: true, subtree: true });
    
    //function to add a book to the library
    if (myLibrary != []){
        console.log(librarycount);
            librarycount = myLibrary.length;
            console.log(librarycount);
            
            const addtr = document.createElement("tr");
            const addtd = document.createElement("td");
            const addtd2 = document.createElement("td");
            const addtd3 = document.createElement("td");
            const addtd4 = document.createElement("td");
            const addread = document.createElement("button");
            const addtd5 = document.createElement("td");
            const addbutton = document.createElement("button");
            table.appendChild(addtr);
            addtr.appendChild(addtd);
            addtr.appendChild(addtd2);
            addtr.appendChild(addtd3);
            addtr.appendChild(addtd4);
            addtd4.appendChild(addread);
            addtr.appendChild(addtd5);
            addtd5.appendChild(addbutton);
            addtd.textContent = myLibrary[librarycount - 1];
            addtd2.textContent = myLibrary[1000] + "2";
            addtd3.textContent = myLibrary[1000] + "3";
            addread.classList.add("read");
            addread.textContent = "No";
            addbutton.classList.add("delete");
            addbutton.textContent = "Delete";
            
           
            
        }
    }
    
    












    /*
    if (addtd.textContent.length > 30){
        let div = document.createElement('div');
            div.style.maxHeight = '2em';
            div.textContent = addtd.textContent;
            div.innerHTML = '';
            div.appendChild(addtd);
            let nouveauTexte = addtd.textContent.slice(0, 30) + '\n' + addtd.textContent.slice(30);
            div.textContent
        }
        //go to the backline if the text is over 30 characters
        for (let i = 0; i < table.rows.length; i++) {
    
            // Récupère le texte de la première colonne de la ligne
            let texte = table.rows[i].cells[0].textContent;
            try{
                // Vérifie si le texte dépasse 30 caractères
                if (texte.length > 30) {
                    // Crée un nouvel élément div pour contenir le texte
                    let div = document.createElement('div');
                    // Définit la hauteur maximale de la div pour forcer le texte à passer à la ligne suivante
                    div.style.maxHeight = '2em';
                    // Met à jour le texte de la div
                    div.textContent = texte;
                    // Remplace le texte de la cellule par la div
                    table.rows[i].cells[0].innerHTML = '';
                    table.rows[i].cells[0].appendChild(div);
                    // Insère un saut de ligne après le 30ème caractère
                    let nouveauTexte = texte.slice(0, 30) + '\n' + texte.slice(30);
                    // Met à jour le texte de la cellule
                    table.rows[i].cells[0].textContent = nouveauTexte;
                }
            }catch(e){
                console.log(e);
            }
        }
        */
