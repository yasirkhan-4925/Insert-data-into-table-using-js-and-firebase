// Constructor for BioData

class BioData {
  constructor(name, fatherName, gender, key) {
    this.name = name;
    this.fatherName = fatherName;
    this.gender = gender;
    this.key = key;
  }
}

//constructor for displaying data

class Display {
  validate(bioData) {
    if (bioData.name.length < 2 || bioData.fatherName.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  clear() {
    let myForm = document.getElementById("myForm");
    myForm.reset();
  }

  // this function is for to show user alert message

  showAlert(type, messageText) {
    let successOrerror;
    if (type == "success") {
      successOrerror = "Success";
    } else {
      successOrerror = "Error";
    }
    let message = document.getElementById("message");
    let messageHtml = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${successOrerror} !</strong>    ${messageText}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

    message.innerHTML = messageHtml;

    setTimeout(function () {
      message.innerHTML = "";
    }, 4000);
  }
}

// add event listener to add button

let myForm = document.getElementById("myForm");
myForm.addEventListener("submit", addFormdata);

// creating function for form event listener addFormdata

function addFormdata(e) {
  let name = document.getElementById("name").value;
  let fatherName = document.getElementById("fatherName").value;
  let genderMale = document.getElementById("male");
  let genderFemale = document.getElementById("female");
  let type;
  let key = firebase.database().ref("BioData").push().key;

  if (genderMale.checked) {
    type = genderMale.value;
  } else if (genderFemale.checked) {
    type = genderFemale.value;
  }

  let bioData = new BioData(name, fatherName, type, key);

  let display = new Display();

  display.validate(bioData);

  if (display.validate(bioData)) {
    firebase.database().ref("BioData").child(key).set(bioData);
    display.clear();
    display.showAlert("success", " Your data is added");
  } else {
    display.showAlert("danger", " Please fill all fields ");
  }

  e.preventDefault();
}

// extracting data from firebase and setting it on html

firebase
  .database()
  .ref("BioData")
  .on("child_added", function (data) {
    let tableRow = document.getElementById("myTablerow");
    let tableHtml = ` <td>${data.val().name}</td>
    <td>${data.val().fatherName}</td>
    <td>${data.val().gender}</td>
    <td><button type="button" class="btn btn-dark" id="${
      data.val().key
    }" onclick="deleteData(this)">Delete</button></td>

    <td><button type="button" class="btn btn-dark" id="${
      data.val().key
    }" onclick="editData(this)">Edit</button></td>
    `;

    tableRow.innerHTML += tableHtml;
  });

// making delete button

function deleteData(e) {
  console.log(e.parentNode.parentNode);
  e.parentNode.parentNode.remove();
  firebase.database().ref("BioData").child(e.id).remove();
  let display = new Display();
  display.showAlert("success", " Deleted successfully");
}


// function for edit data
 var updateKey;
function editData(e){
  let name = document.getElementById("name")
  let fatherName = document.getElementById("fatherName")
  name.value=e.parentNode.parentNode.firstChild.innerText
  fatherName.value=e.parentNode.parentNode.children[1].innerText
  updateKey=e.id
  console.log(updateKey)
  let updateBtn=document.getElementById("updateBtn");
  updateBtn.style.display="block"
  let addBtn=document.getElementById("addBtn")
  addBtn.style.display="none"
}









function upBtn(){
      let name = document.getElementById("name").value
      let fatherName = document.getElementById("fatherName").value
      let genderMale = document.getElementById("male");
      let genderFemale = document.getElementById("female");
      let type;
      if (genderMale.checked) {
        type = genderMale.value;
      } else if (genderFemale.checked) {
        type = genderFemale.value;
      }
      let updateObj={
             name:name,
             fatherName:fatherName,
             key:updateKey,
             gender:type
          }


    let display = new Display()

   if( display.validate(updateObj)){
    firebase.database().ref(`BioData/${updateKey}`).set(updateObj)
    display.showAlert("success","update Successfully ")
    let addBtn=document.getElementById("addBtn")
    addBtn.style.display="block"
 
 
    let updateBtn=document.getElementById("updateBtn");
    updateBtn.style.display="none"
    display.clear();
    setTimeout(function(){
      location.reload()
   },2000)
   
   }

   else{
   display.showAlert("danger","please fill all text fields")
   }

  

         
     

    
          
}




