const Login = () => {
  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>Dont have an account? <a href="/signup" className="text-secondary">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
