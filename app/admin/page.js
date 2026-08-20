
export const metadata = {
  title: "Admin | Ahmad ElectroGas",
  description: "Create, update and delete products, categories and orders",
};
export default function AdminPage() {
  return (
  <>
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <form>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2 mt-4">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </form>
      </section>
    </main>

  </>
  );
}