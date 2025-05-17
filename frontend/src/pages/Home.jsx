import PublicPosts from '../components/publicPosts';
import DraftPosts from '../components/DraftPosts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to <span className="text-indigo-600">BlogCraft</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Write, edit, and share your thoughts with the world.
          </p>
          <button className="mt-8 px-6 py-3 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition cursor-pointer" onClick={() => navigate('/create-blog')}>
            + Create New Blog
          </button>
        </div>

        <section className="mb-14">
          <PublicPosts />
        </section>
        <section>
          <DraftPosts />
        </section>
      </div>

    </div>
  );
};

export default Home;
