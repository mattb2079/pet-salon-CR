//object literal

const salon = {
    name: "The Fashion Pets",
    phone: "5567893",
    address:{
        street: "Av University",
        number: "262-G"
    },
    workingHours:{
        days: "Mon-Fri",
        open: "9:00 am",
        close: "5:00 pm"
    },
    pets:[]
}

// object destructuring

let {name, phone, address:{street,number},workingHours:{days, open, close}} = salon;

document.querySelector(".info").innerHTML=`<p> ${name} <br> ${street},${number} <br> ${days} from ${open} to ${close} <br> ${phone}`;

document.querySelector("footer .info").innerHTML=`<p> ${name} <br> ${street},${number} <br> ${days} from ${open} to ${close} <br> ${phone}`;


// object constructor
var petc=0;
class Pet {
    constructor(name, age, breed, gender, service, ownerName, phoneContact){
        this.name=name;
        this.age=age;
        this.breed=breed;
        this.gender=gender;
        this.service=service;
        this.ownerName=ownerName;
        this.phoneContact=phoneContact;
        this.id="pet"+petc;
        petc+=1;
        this.hunger = 10;
        this.happiness = 5;
    }
    ownerInfo = function(){
        console.log("Owner name: " + this.ownerName + "\n" + "Contact Phone: " + this.phoneContact);
    }
    feed = function(){
        this.hunger-=10;
        this.happiness+=10;
        console.log("Feeding...");
    }

    status = function(){
        console.log ("Hunger " + this.hunger + "\n" + "Happiness: " + this.happiness);
    }
}

var textname = document.getElementById('petName');
var textage = document.getElementById('petAge');
var textbreed = document.getElementById('petBreed');
var textgender = document.getElementById('petGender');
var textservice = document.getElementById('petService');
var textownername = document.getElementById('ownerName');
var textcontactphone = document.getElementById('contactPhone');

function register(){
    const thePet = new Pet(textname.value, textage.value, textbreed.value, textgender.value, textservice.value, textownername.value, textcontactphone.value);
    salon.pets.push(thePet);
    alert("You have registered a pet")
    clean();
    displayPet(thePet);
}

function clean(){
    textname.value="";
    textage.value="";
    textbreed.value="";
    textgender.value="";
    textservice.value="";
    textownername.value="";
    textcontactphone.value="";
}

function displayPet(aPet){
    var tBody = document.getElementById("rowPet");
    var row = `<tr id="${aPet.id}">
                <td> ${aPet.name} </td>
                <td> ${aPet.age} </td>
                <td> ${aPet.breed} </td>
                <td> ${aPet.gender} </td>
                <td> ${aPet.service} </td>
                <td> ${aPet.ownerName} </td>
                <td> ${aPet.phoneContact} </td>
                <td>
                    <button onclick='remove("${aPet.id}");'> Delete </button>
                </td>`;
    tBody.innerHTML+=row;
}

function remove(petId){
    var tr = document.getElementById(petId);
    var indexDelete;
    for(var i=0; i<salon.pets.length; i++){
        var selectedPet = salon.pets[i]; // <== there's a problem here
        console.log(selectedPet.id);
        console.log(petId);
        if (selectedPet.id == petId){
            indexDelete = i;
        }
    }
    salon.pets.splice(indexDelete, 1);
    tr.remove();
    console.log(indexDelete);
}

//-- Automatically populate some sample pets to start the table
pet0 = new Pet("Barney", 6, "dog", "M", "Shower", "Brian", "123-456-7890");
pet1 = new Pet("Zed", 6, "cat", "M", "Nail Clipping", "Jim", "123-456-7890");
pet2 = new Pet("Jake", 6, "dog", "M", "Full Service", "Will", "123-456-7890");
pet3 = new Pet("Lulu", 6, "cat", "M", "Shower", "Jessie", "123-456-7890");

salon.pets.push(pet0, pet1, pet2, pet3);
displayPet(pet0);
displayPet(pet1);
displayPet(pet2);
displayPet(pet3);


function searchButtonClicked(){
    //-- If search field is empty, show all table rows
    if(document.getElementById('petSearch').value == ""){
        showAllTableRows();
    } else search();
}

function showAllTableRows(){
    for(var i=0; i<salon.pets.length; i++){
        var selectedPet = salon.pets[i];
        $("#" + selectedPet.id).show();
        console.log("#" + selectedPet.id);
    }
}

function search(){
    //deleting the style(css)
    document.getElementById("result").innerHTML="";
    for(var j=0; j<salon.length;j++){
         document.getElementById('pet'+j).setAttribute('class','x');
     }
    
    const nameEntered = document.getElementById("petSearch").value;
    const searchString = nameEntered.toLowerCase();
    
    var flag = false;

    for(var i=0; i<salon.pets.length; i++){
        var selectedPet = salon.pets[i];
        const foundPetName = selectedPet.name.toLowerCase();
        if(foundPetName == searchString){
            $("#" + selectedPet.id).show();
            flag = true;
        } else{
            $("#" + selectedPet.id).hide();
        }
        //deleting the text in the input search
        document.getElementById("petSearch").value="";

        }
        // the other situation
        if (flag==false){
            document.getElementById("result").innerHTML="<h3>" + nameEntered + " doesn't exist </>";
        }
    }

    // Competence Report: Complete this web page & all functions

    // Corrected the logic to display accurate pet information mixed in with deleteing, adding, and searching pets 
    // I also added a function to show all pets in the table when "search" is clicked with nothing in the search field
    // and modified the search function to display the name of pets not found when searching ('x' doesn't exist)