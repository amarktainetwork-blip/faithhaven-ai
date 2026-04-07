import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(48,60%,98%)] p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-3">404</h1>
        <p className="text-slate-600 mb-6">Page not found.</p>
        <Link to="/" className="px-5 py-3 rounded-xl bg-[hsl(210,70%,60%)] text-white">Back Home</Link>
      </div>
    </div>
  );
}
