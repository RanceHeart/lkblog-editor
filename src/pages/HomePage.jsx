import { Box, Grid } from '@mui/material';
import Header from '../components/Header/header';
import PostList from '../components/PostList/postList';
import RecentPosts from '../components/RecentPosts/recentPosts';

// Initial value
const posts = [
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
              <PostList />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: ['static', 'sticky'], top: '0', p: 3 }}>
              <RecentPosts posts={posts} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
