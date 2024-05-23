'use client'
import { useRouter,useParams } from 'next/navigation';

const Post = () => {
  const router = useRouter();
  const { id } = useParams;

  return (
    <div>
      <h1>This is post {id}</h1>
    </div>
  );
};

export default Post;
