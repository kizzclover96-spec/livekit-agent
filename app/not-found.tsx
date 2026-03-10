export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h2 className="text-2xl font-bold">404 - Not Found</h2>
      <p>Malvin couldn't find this page.</p>
      <a href="/" className="mt-4 underline">Return Home</a>
    </div>
  );
}