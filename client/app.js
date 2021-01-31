// ********** Get all previous posts function ********
getAllPosts();

function getAllPosts() {
  fetch("http://localhost:3012/anonymousPosts")
    .then((r) => r.json())
    .then(appendPosts)
    .catch(console.warn);
}
function appendPosts(data) {
  data = JSON.parse(JSON.stringify(data));
  data.forEach(createPost);
}

// ********** Submit Message Function ********

const form = document.querySelector("#postForm");
form.addEventListener("submit", submitPost);

const postList = document.querySelector("#posts");

function submitPost(e) {
  e.preventDefault();

  const postData = {
    content: e.target.content.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousPosts", options)
    .then((r) => r.json())
    .then(createPost)
    .catch(console.warn);

  e.target.content.value = "";
}

// ********** Submit Reply Function **********

function submitReply(e) {
  e.preventDefault();
  const replyData = {
    id: e.target.getAttribute("postId"),
    reply: e.target.replies.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(replyData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousReplies", options)
    .then((r) => r.json())
    .catch(console.warn);

  repliesFunction(replyData, e.target);
  e.target.replies.value = "";
}

// ********** Function Send Reaction **********

function submitLike(e) {
  e.preventDefault();

  const likeData = {
    id: e.target.getAttribute("postId"),
  };

  const options = {
    method: "POST",
    body: JSON.stringify(likeData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousLike", options)
    .then((r) => r.json())
    .catch(console.warn);
}

function submitDislike(e) {
  e.preventDefault();

  const dislikeData = {
    id: e.target.getAttribute("postId"),
  };

  const options = {
    method: "POST",
    body: JSON.stringify(dislikeData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousDislike", options)
    .then((r) => r.json())
    .catch(console.warn);
}

function submitLove(e) {
  e.preventDefault();

  const loveData = {
    id: e.target.getAttribute("postId"),
  };

  const options = {
    method: "POST",
    body: JSON.stringify(loveData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousLove", options)
    .then((r) => r.json())
    .catch(console.warn);
}

// ********** Create Reaction Button Function **********

function createReactionButtons(newPost, postId) {
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute('class', 'reactionContainer');
  let likeBtn = document.createElement("button");
  let dislikeBtn = document.createElement("button");
  let loveBtn = document.createElement("button");
  const buttons = [likeBtn, dislikeBtn, loveBtn];
  buttonContainer.style.visibility = "visible";
  buttonContainer.append(likeBtn, dislikeBtn, loveBtn);
  buttons.forEach((button) => button.classList.add("reactionButtons"));
  //create a class for each button for the content
  likeBtn.classList.add("like");
  dislikeBtn.classList.add("dislike");
  loveBtn.classList.add("love");
  likeBtn.setAttribute("postId", postId);
  dislikeBtn.setAttribute("postId", postId);
  loveBtn.setAttribute("postId", postId);
  newPost.append(buttonContainer);
  //event listeners for reactions
  likeBtn.addEventListener("click", submitLike);
  dislikeBtn.addEventListener("click", submitDislike);
  loveBtn.addEventListener("click", submitLove);
}

// ********** Create New Posts Function **********

function createPost(postData) {
  const newPost = document.createElement("div");
  const newMessage = document.createElement("p");
  newPost.setAttribute('class', 'newPostDiv');
  // create form for replies
  const formReply = document.createElement("form");

  //create reply input and submitbtn
  const formReplyInput = document.createElement("input");
  formReplyInput.setAttribute("type", "text");
  formReplyInput.setAttribute("name", "replies");
  formReplyInput.setAttribute("value", " ");
  formReplyInput.setAttribute('class', 'formReplyInput');

  //set id to post to use later in the reply
  formReply.setAttribute("postId", postData.id);
  const formReplySubmitButton = document.createElement("input");
  formReplySubmitButton.setAttribute("type", "submit");
  formReplySubmitButton.setAttribute('class', 'formReplySubmitButton');
  newMessage.textContent = `Anonymous says: ${postData.content}`;
  createReactionButtons(newPost, postData.id);
  createReplyButton(newPost, formReply);
  formReply.append(formReplyInput);
  formReply.append(formReplySubmitButton);
  newPost.append(formReply);
  postList.append(newPost);
  postList.insertAdjacentElement("afterbegin", newPost);
  newPost.insertAdjacentElement("afterbegin", newMessage);
  formReply.style.visibility = "hidden";
  // add event listener to submit button
  formReply.addEventListener("submit", submitReply);
}

// ********** Create New Replies Function **********

function repliesFunction(replyData, formReply) {
  const newReplyContainer = document.createElement("div");
  const newReplyMessage = document.createElement("p");
  newReplyMessage.textContent = `Anonymous reply: ${replyData.reply}`;
  newReplyContainer.append(newReplyMessage);
  formReply.append(newReplyContainer);
}

// ********** Create Reply Button Function **********

function createReplyButton(newPost, formReply) {
  const replyButton = document.createElement("button");
  replyButton.setAttribute('class', 'replyBtn')
  replyButton.textContent = "Reply";
  replyButton.addEventListener("click", hiddenForm);
  function hiddenForm() {
    formReply.style.visibility == "hidden"
      ? (formReply.style.visibility = "visible")
      : (formReply.style.visibility = "hidden");
  }
  newPost.appendChild(replyButton);
}

// ********** Giphy Search Functionality **********
let appkey = require("./secret").appkey;
const gifBtn = document.getElementById("gif");
gifBtn.addEventListener("click", gifapiCall);

function gifapiCall(e) {
  e.preventDefault();
  console.log("gif has been clicked");

  

  let url = `https://api.giphy.com/v1/gifs/search?api_key=${appkey}&limit=10&q=`;
  let str = document.getElementById("giphyInput").value.trim();
  console.log(str);
  url = url.concat(str);

  fetch(url)
    .then((r) => r.json())
    .then((content) => {
      let gifimg = document.createElement("img");
      gifimg.src =
        content.data[
          Math.floor(content.data.length * Math.random())
        ].images.downsized.url;
      gifimg.classList.add("imgFormat");
      let gifContainer = document.getElementById("posts");
      gifContainer.setAttribute('class', 'gifPost');
      gifContainer.append(gifimg);
      gifContainer.insertAdjacentElement("afterbegin", gifimg);
    })
    .then(createPost)
    .catch((err) => {
      console.log(err.warn);
    });
}

// render giphy grid 

const GiphyFetch = require("@giphy/js-fetch-api").GiphyFetch;
const renderGrid = require("@giphy/js-components").renderGrid;
//const throttle = require('throttle-debounce').throttle;


const gridBtn = document.getElementById("gridBtn");
gridBtn.addEventListener("click", componentApiCall);

function componentApiCall(e){
  e.preventDefault();
  
  const targetEl = document.getElementById("targetEl");
    const gf = new GiphyFetch(appkey);
    
    const fetchGifs = () => gf.trending({ offset: 20, limit: 10 });
    // render a grid
    renderGrid({  fetchGifs, 
                  onGifClick: (gif, e) => {
                  e.preventDefault(); 
                  console.log(gif.images.downsized.url)
                  },
                  width: 800,
                  columns: 5,
                  gutter: 2,
                }, 
                  targetEl);

}
