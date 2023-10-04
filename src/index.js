let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  toyFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.querySelector('input[name="name"]');
    const imageInput = document.querySelector('input[name="image"]');
    const newToy = {
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
    };
    createNewToy(newToy);
  });
  getAllToys()
  addLike()
});

function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    const toyCollection = document.querySelector('#toy-collection');
    toys.forEach(toy => {
      const card = document.createElement('div');
      card.className = 'card';
      const name = document.createElement('h2');
      name.textContent = toy.name;
      const image = document.createElement('img');
      image.src = toy.image;
      image.className = 'toy-avatar';
      const likes = document.createElement('p');
      likes.textContent = `${toy.likes} likes`;
      const likeBtn = document.createElement('button');
      likeBtn.className = 'like-btn';
      likeBtn.id = toy.id;
      likeBtn.textContent = 'Like ❤️';
      card.appendChild(name);
      card.appendChild(image);
      card.appendChild(likes);
      card.appendChild(likeBtn);
      toyCollection.appendChild(card);
    })
  })
}

function createNewToy(newToy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => {
    renderNewToy(toy);
  });
}

function renderNewToy(toy){
  const toyCollection = document.querySelector('#toy-collection');
  const card = document.createElement('div');
  card.className = 'card';
  const name = document.createElement('h2');
  name.textContent = toy.name;
  const image = document.createElement('img');
  image.src = toy.image;
  image.className = 'toy-avatar';
  const likes = document.createElement('p');
  likes.textContent = `${toy.likes} likes`;
  const likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  likeBtn.id = toy.id;
  likeBtn.textContent = 'Like ❤️';
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeBtn);
  toyCollection.appendChild(card);
}

function addLike(){
  const toyCollection = document.querySelector('#toy-collection');
  toyCollection.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-btn')) {
      const toyId = event.target.id;
      const toyLikesElement = event.target.previousSibling;
      const currentLikes = parseInt(toyLikesElement.textContent);
      const updatedToy = {
        likes: newLikes
      };

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(updatedToy)
      })
      .then(res => res.json())
      .then(updatedToyData => {
        toyLikesElement.textContent = `${updatedToyData.likes} likes`;
      });
    }
  });

}




// function addLike(){
//   fetch('http://localhost:3000/toys', {
//     method: 'PATCH',
//     headers:{
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({
//       "likes": newNumberOfLikes,
//     }),
//   })
//   .then(res => res.json())
//   .then(newLike => {
//     changeLikes(newLike)
//   })
// };