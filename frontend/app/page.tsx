export default function HomePage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Spring Boot OTP Auth</h1>
      <ul className="space-y-2">
        <li><a href="/register" className="text-blue-600">Register</a></li>
        <li><a href="/login" className="text-blue-600">Login</a></li>
      </ul>
    </div>
  );
}
