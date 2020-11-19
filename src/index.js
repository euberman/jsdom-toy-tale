let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('add-toy').addEventListener('submit', (event) => {
    event.preventDefault();
    buildToyData(event);
  });

  newToyButton();
  createToys();
  incrementLikeButton();
});

function newToyButton () {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};

function buildToyData(e){
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };
  return postNewToytoServer(toy);
};

function createToys () {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => data.forEach(toy => {
      addToyToPage(toy);
    }));
};

function addToyToPage(toy){
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const img= document.createElement('img');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  div.className = 'card';
  h2.innerHTML = toy['name'];
  img.src = toy['image'];
  img.className = "toy-avatar";
  p.innerHTML = `${toy['likes']} Likes`;
  btn.className = "like-btn";
  btn.innerHTML = 'Like';

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);

  const toyCollectionDiv = document.getElementById('toy-collection');
  toyCollectionDiv.appendChild(div);

  btn.addEventListener('click', (event) => {
    toy['likes'] += 1;
    p.innerHTML = `${toy['likes']} Likes`;
  });
};

function addNewToyToDatabase () {
  const form = document.getElementById('add-toy');
  const formData = new FormData(form);
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      body: form
    });
};

function postNewToytoServer(toyData){
  fetch('http://localhost:3000/toys', {
    method: 'POST', // or 'PUT'
    headers: {'Content-Type': 'application/json', Accept: "application/json"},
    body: JSON.stringify(toyData)
  })
  .then(response => response.json())
  .then(data => { console.log('Success:', toyData) 
  });
  
  addToyToPage(toyData);
};

function incrementLikeButton () {
  // find button element and then increment by posting to server
  const allToys = document.getElementById('toy-collection');
  };