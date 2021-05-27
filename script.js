//-------------------------------------------------------Variables-------------------------//

let searchItemsArry= ['HOME','WORLD','POLITICS','MAGAZINE','TECHNOLOGY','SCIENCE','HEALTH','SPORTS','ARTS','FASHION','FOOD','TRAVEL'];
 let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];


//---------------------------------------------------------DOM--------------------------------//


let container = document.createElement('div');
container.classList.add('container','bg-light');
let mainHeaer= document.createElement('div');
mainHeaer.classList.add('display-4','col-12','mainheader');
mainHeaer.innerText='THE PERTINENT TIMES'
container.append(mainHeaer);
let navbarRow = document.createElement('div');
let navbar= document.createElement('nav');
navbar.classList.add('navbar', 'navbar-light', 'bg-light');
navbar.id='navbar';
let buttons= navButtons(searchItemsArry);
 navbar.append(buttons);
navbarRow.append(navbar);
container.append(navbarRow);
let contentRow= document.createElement('div');
contentRow.classList.add('row');
contentRow.id= 'contentRow';
container.append(contentRow);
document.body.append(container); 


//--------------------------------------------navbuttons---------------------------------------------------------//
function navButtons(arry){
let form=document.createElement('form');
form.classList.add('form-inline');
arry.forEach(element => {
    let navButton= document.createElement('input');
    navButton.type='button'
    navButton.classList.add('btn', 'btn-link');
    navButton.id= element.toLowerCase();
    navButton.value= element;
    navButton.innerText=element;
    navButton.setAttribute('onclick','fetchdata(this.id)');
    form.append(navButton);

});

return form;

}

//---------------------------------------------------------------------async fetch function---------------------------//

 async function fetchdata(urlPart){
    try {
        let data = await fetch('https://api.nytimes.com/svc/topstories/v2/'+urlPart+'.json?api-key=VupBCoNJ7OBM0IgRbmFgotIXJB2AXjb9');
        let stringdata = await data.json();
        
        buildCards(stringdata.results)
    } catch (error) {
      console.error(error);  
    }

 }


 //----------------------------------------------------------building cards function--------------------------------------//
 function buildCards(arry) {
    console.log(arry);
    contentRow.innerHTML= '';
 arry.forEach(element => {
    let cardCol = document.createElement('div');
     cardCol.classList.add('col-11','m-2','card');
     cardCol.style.margin='auto';
     let cardrow = document.createElement('div');
     cardrow.classList.add('row');
     let card= document.createElement('div');
     card.classList.add('col','cardBody');
     let header= document.createElement('header');
     header.classList.add('header','sectioncard');
     header.innerText= element.section.toUpperCase();
     card.append(header);
    let title= document.createElement('div');
    title.classList.add('titlecard')
    title.innerText= element.title;
    card.append(title);
    let item_type= document.createElement('div');
    item_type.classList.add('item_typecard')
    item_type.innerText= element.item_type;
    card.append(item_type);
    
    let abstract= document.createElement('div');
    abstract.classList.add('abstractcard')
    abstract.innerText= element.abstract;
    card.append(abstract);

    let byline= document.createElement('div');
    byline.classList.add('bylinecard')
    byline.innerText= element.byline;
    card.append(byline);
    let created_date= document.createElement('div');
    created_date.classList.add('datecard')
    created_date.innerText=  mlist[new Date(element.created_date).getMonth()]+'  '+new Date(element.created_date).getDate();
    card.append(created_date);
    let a1= document.createElement('a');
    a1.href= element.short_url;
    let continueBtn= document.createElement('div');
    continueBtn.classList.add('continueReading','btn','btn-link');
    continueBtn.innerHTML='Continue reading'
    a1.append(continueBtn);
    card.append(a1);
    cardrow.append(card);
     let imgCol= document.createElement('div');
     imgCol.classList.add('col-4')
     let img = document.createElement('img');
     img.classList.add('img-thumbnail','image');
     img.src=element.multimedia[(element.multimedia.length-1)].url;
     //console.log(element.multimedia[4].url)
     imgCol.append(img);
     cardrow.append(imgCol);
     cardCol.append(cardrow);
     document.getElementById('contentRow').append(cardCol);
});

}

fetchdata('home');