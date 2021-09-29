let emailAddress = [];
let inputEmail = document.getElementById('inputEmail');
let wrap = document.getElementById("wrap");
let winners = [];
let wrapInnerHtml = '';
let cards = [];

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
inputEmail.addEventListener("blur", () => {
    if(inputEmail.value.match(regexEmail)){
        inputEmail.style.border = '2px solid blue';
        document.getElementById('addBtn').disabled = false;
    }else {
        inputEmail.style.border = '2px solid red';
        document.getElementById('addBtn').disabled = true;
    }
})
//DEFAULT EMAIL
window.addEventListener("load", () => {
    emailAddress.push("androsogt@gmail.com");
    emailAddress.push("sirpredro@hotmail.com");
    emailAddress.push("20004118@galileo.edu");
    emailAddress.push("androsogt@outlook.com");
    emailAddress.push("melgar.keyla@gmail.com");
    emailAddress.push("melgar.paola@gmail.com");
    emailAddress.push("pamelaCarranza@gmail.com");
    emailAddress.push("prengbiba@gmail.com");
    emailAddress.push("karl@gmail.com");
    emailAddress.push("fake@hotmail.com");
    emailAddress.push("lasi@galileo.com");
    localStorage.setItem("Emails", JSON.stringify(emailAddress));
    updateList();
    document.getElementById('addBtn').disabled = true;
});
function showWinnersModal(){
    const winnersArray = emailAddress.sort(() => Math.random() - Math.random()).slice(0, 3); //SELECT 3 RANDOM WINNERS
    cards = document.getElementsByClassName('card');
    cards = [...cards]; //HTMLCOLLECTION TO ARRAY
    cards.forEach((element, index) => {
        if(element.id === winnersArray[0] || element.id === winnersArray[1] || element.id === winnersArray[2]){
            element.className = "card text-white bg-warning me-1 mb-1"; //HIGHTLIGHT THE WINNERS
        }
    });

    //EXPORT CVS WINNERS
    let fileContent = "data:text/csv;charset=utf-8," 
    + winnersArray.join('\n');
    const encoded = encodeURI(fileContent);

    let link = document.createElement("a"); //INVISIBLE LINK TO DOWNLOAD .CSV
    link.setAttribute("href", encoded);
    link.setAttribute("download", "winners_Data.csv");
    document.body.appendChild(link);

    link.click(); //TRIGGER

}
function mostrar(){
    emailAddress.push(inputEmail.value);
    localStorage.setItem("Emails", JSON.stringify(emailAddress));
    wrapInnerHtml = '';
    updateList();
}

const updateList = () => { //updates the main dashboard with the emails
    emailAddress.map((element, index) => {
        wrapInnerHtml += `
            <div class="card text-white bg-primary me-1 mb-1" style="max-width: 18rem;" id = "${element}">
                <div class="card-header">Participante #${index}</div>
                <div class="card-body">
                    <h5 class="card-title">Correo electrónico</h5>
                    <p class="card-text">${element}</p>
                </div>
            </div>
        `;
        
    });
    wrap.innerHTML = wrapInnerHtml;
}