import { Box, Grid } from '@mui/material';
import Header from '../components/Header/header';
import PostList from '../components/PostList/postList';
import Profile from '../components/Profile/profile';
import RecentPosts from '../components/RecentPosts/recentPosts';

// Initial value
const recentPosts = [
  {title: "Post 1"},
  {title: "Post 2"},
  {title: "Post 3"},
  // Add more posts as needed
];

const posts = [
  {
    id: '1',
    author: 'John Doe',
    publication: 'Tech Crunch',
    title: 'The Future of AI: Exploring the next frontier',
    content: 'Artificial Intelligence (AI) is rapidly transforming our world. Remarkable breakthroughs are being achieved in AI every year...',
    imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    tags: ['AI', 'Technology', 'Future'],
    readTime: 5
  },
  {
    id: '2',
    author: 'Jane Smith',
    publication: 'Nature',
    title: 'Climate Change: A ticking time bomb',
    content: 'Climate change is the defining issue of our time and we are at a defining moment...',
    imageUrl: 'https://picsum.photos/id/237/200/300',
    tags: ['Climate Change', 'Environment', 'Science'],
    readTime: 7
  },
  {
    id: '3',
    author: 'Robert Johnson',
    publication: 'The Economist',
    title: 'The Global Economy Post-Pandemic',
    content: 'The global economy is gradually recovering from the impact of the COVID-19 pandemic...',
    imageUrl: 'https://picsum.photos/200/300?grayscale',
    tags: ['Economy', 'COVID-19', 'Global'],
    readTime: 6
  },
  {
    id: '4',
    author: 'Emily Davis',
    publication: 'The New Yorker',
    title: 'The Art of Storytelling',
    content: 'Storytelling is an ancient and valuable art that extends around the globe...',
    imageUrl: 'https://picsum.photos/200/300/?blur',
    tags: ['Art', 'Storytelling', 'Culture'],
    readTime: 4
  },
  {
    id: '5',
    author: 'Michael Brown',
    publication: 'National Geographic',
    title: 'Exploring the Depths: Ocean Biodiversity',
    content: 'The ocean, covering about 70% of the Earth’s surface, houses a significant amount of the planet’s biodiversity...',
    imageUrl: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
    tags: ['Ocean', 'Biodiversity', 'Exploration'],
    readTime: 8
  },
  {
    id: '6',
    author: 'Sarah Wilson',
    publication: 'Time',
    title: 'The Role of Technology in Modern Education',
    content: 'Technology has revolutionized the field of education. The importance of technology in schools cannot be ignored...',
    imageUrl: 'https://placekitten.com/640/360',
    tags: ['Education', 'Technology'],
    readTime: 5
  },
  {
    id: '7',
    author: 'David Miller',
    publication: 'Wired',
    title: 'The Rise of Electric Vehicles',
    content: 'Electric vehicles are changing the future of auto travel. The electric vehicle market has grown substantially over the past few years and its not slowing down...',
    imageUrl: 'https://placebeard.it/640x360',
    tags: ['Electric Vehicles', 'Technology', 'Auto'],
    readTime: 6
  },
];

function HomePage() {

  return (
    <Box sx={{ mx: 'auto', px: 6 }}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ maxWidth: '1450px', mx: 'auto', px: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ overflowY: 'auto', pr: 8, maxHeight: 'calc(90vh - 100px)', scrollbarWidth: 'none' }}>
              <PostList posts={posts} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: ['static', 'sticky'], top: '0', p: 3 }}>
              <Profile />
              <RecentPosts posts={recentPosts} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;