import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark } from 'lucide-react';
import { useBlogStore } from '@/store';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const { posts } = useBlogStore();
  const post = posts.find(p => p.id === id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleBookmark = () => {
    toast.success('Article bookmarked!');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[hsl(48,60%,98%)]">
        <Navbar />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-[hsl(210,70%,50%)] hover:underline">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[hsl(210,70%,50%)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
            {post.title}
          </h1>

          <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] flex items-center justify-center mb-8">
            <span className="text-6xl font-bold text-white/30">{post.title.charAt(0)}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-[hsl(48,30%,88%)]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[hsl(48,60%,96%)] text-slate-600 text-sm">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-[hsl(48,60%,96%)] text-slate-500 hover:text-[hsl(210,70%,50%)] transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleBookmark}
                className="p-2 rounded-lg hover:bg-[hsl(48,60%,96%)] text-slate-500 hover:text-[hsl(210,70%,50%)] transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Author Box */}
          <div className="mt-12 p-8 bg-white rounded-2xl border border-[hsl(48,30%,88%)]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">{post.author.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{post.author}</h3>
                <p className="text-slate-600">
                  Writer and contributor at FaithHaven AI, passionate about helping others grow in their faith journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
