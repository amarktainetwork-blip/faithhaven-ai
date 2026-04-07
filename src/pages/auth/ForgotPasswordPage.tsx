import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('If this account exists, a reset link has been sent.');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(48,60%,98%)]">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl border w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Reset password</h1>
        <input className="w-full h-11 px-3 border rounded-lg mb-4" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
        <button className="w-full h-11 bg-[hsl(210,70%,60%)] text-white rounded-lg">Send reset link</button>
        <Link className="block mt-4 text-sm text-[hsl(210,70%,50%)]" to="/login">Back to login</Link>
      </form>
    </div>
  );
}
