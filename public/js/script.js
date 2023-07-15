// const homePage=document.getElementById('homepage');
// const dashboard=document.getElementById('dashboard');
// const login=document.getElementById('login');
// const logout = document.getElementById('logout');

// homePage.addEventListener('click', document.location.replace('/'));
// dashboard.addEventListener('click', document.location.replace('/dashboard'));
// login.addEventListener('click', document.location.replace('/login'));
const postForm = document.getElementById('post-form');
const postContainer = document.getElementById('post-container');
const createPost=document.getElementById('new-post');

createPost.addEventListener('click', document.location.replace('/post/new'))
const createCard = (post) => {
  // Create card
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3');
  cardEl.setAttribute('key', post.id);

  // Create card header
  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-2',
    'm-0'
  );
  cardHeaderEl.innerHTML = `${post.user_name} </br>`;

  // Create card body
  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>${post.post}</p>`;

  // Append the header and body to the card element
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the tips container in the DOM
 postContainer.appendChild(cardEl);
};



// Post a new tip to the page
const postTip = (tip) =>
  fetch('api/tips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tip),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(tip);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

// When the page loads, get all the tips
getTips().then((data) => data.forEach((post) => createCard(post)));

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Form submit invoked');

  // Get the value of the tip and save it to a variable
  const postContent = document.getElementById('postText').value;

  // get the value of the username and save it to a variable
  const postUsername = document.getElementById('postUsername').value.trim();

  // Create an object with the tip and username
  const newPost = {
    username: postUsername,
    topic: 'UX',
    post: postContent,
  };

  // Make a fetch POST request to the server
  postPost(newPost);
};

// Listen for when the form is submitted
postForm.addEventListener('submit', handleFormSubmit);
