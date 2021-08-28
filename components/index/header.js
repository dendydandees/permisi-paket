export default function Header({ children, title, description }) {
  return (
    <header className="bg-white">
      <div className="container mx-auto py-8">
        <div className="p-4">
          <h1>{title}</h1>
          <p className="w-full md:w-8/12 lg:w-6/12">{description}</p>
        </div>

        {children}
      </div>
    </header>
  );
}
