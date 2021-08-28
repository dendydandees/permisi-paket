// components
import { title } from './layout';
import Link from './ui/link';

const fullYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full md:w-screen bg-white text-sm p-4 text-center">
      <div className="container mx-auto">
        <p className="inline-block m-0">
          &copy; {fullYear} {title} &bull; by
        </p>{' '}
        <Link
          href="https://dendydharmawan.thedev.id"
          target="_blank"
          className="font-bold text-purple-700"
          text="Dendy Dharmawan"
        />
      </div>
    </footer>
  );
}
