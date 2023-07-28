// CRUD for post
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const READ_POST = 'READ_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

const initialState = {
  posts: [
    {
      id: "1",
      title: 'The Future of AI: Exploring the next frontier',
      image: 'https://picsum.photos/seed/picsum/200/300',
      tags: ['AI', 'Technology', 'Future'],
      content: 'Artificial Intelligence (AI) is rapidly transforming our world. Remarkable breakthroughs are being achieved in AI every year...',
      readTime: '5'
    },
    {
      id: "2",
      title: 'Climate Change: A ticking time bomb',
      image: 'https://picsum.photos/id/237/200/300',
      tags: ['Climate Change', 'Environment', 'Science'],
      content: 'Climate change is the defining issue of our time and we are at a defining moment...',
      readTime: '3'
    },
    {
      id: "3",
      title: 'The Global Economy Post-Pandemic',
      image: 'https://picsum.photos/200/300?grayscale',
      tags: ['Economy', 'COVID-19', 'Global'],
      content: 'The global economy is gradually recovering from the impact of the COVID-19 pandemic...',
      readTime: '7'
    },
    {
      id: "4",
      title: 'The Art of Storytelling',
      image: 'https://picsum.photos/200/300/?blur',
      tags: ['Art', 'Storytelling', 'Culture'],
      content: 'Storytelling is an ancient and valuable art that extends around the globe...',
      readTime: '8'
    },
    {
      id: "5",
      title: 'Exploring the Depths: Ocean Biodiversity',
      image: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
      tags: ['Ocean', 'Biodiversity', 'Exploration'],
      content: 'The ocean, covering about 70% of the Earth’s surface, houses a significant amount of the planet’s biodiversity...',
      readTime: '6'
    },
    {
      id: "6",
      title: 'The Role of Technology in Modern Education',
      image: 'https://placekitten.com/640/360',
      tags: ['Education', 'Technology'],
      content: 'Technology has revolutionized the field of education. The importance of technology in schools cannot be ignored...',
      readTime: '4'
    },
    {
      id: "7",
      title: 'The Rise of Electric Vehicles',
      image: 'https://placebeard.it/640x360',
      tags: ['Electric Vehicles', 'Technology', 'Auto'],
      content: 'Electric vehicles are changing the future of auto travel. The electric vehicle market has grown substantially over the past few years and its not slowing down...',
      readTime: '7'
    },
  ],  // Replace this with your initial posts data
};

export const fetchPosts = () => {
  return (dispatch) => {
    new Promise((resolve) =>
      setTimeout(() => resolve(initialState.posts), 1000)  // Simulate a 2 second network delay
    )
      .then((posts) => {
        dispatch({
          type: FETCH_POSTS,
          payload: posts,
        });
      });
  };
};

export const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

export const readPost = (id) => ({
  type: READ_POST,
  payload: id,
});

export const updatePost = (id, updatedPost) => ({
  type: UPDATE_POST,
  payload: { id, updatedPost },
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

// CRUD for user
export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

// CRUD for editor
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';

export const updateEditorContent = (content) => ({
  type: UPDATE_EDITOR_CONTENT,
  payload: content,
});
