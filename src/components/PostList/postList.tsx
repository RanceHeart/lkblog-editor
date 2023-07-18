import Post, { PostProps } from './Post';

interface PostListProps {
  posts: PostProps[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
      <div>
        {posts.map((post, index) => (
            <Post key={index} {...post} />
        ))}
      </div>
  );
};

export default PostList;
