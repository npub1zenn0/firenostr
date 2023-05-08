import Link from "next/link";
import { FC, ReactNode } from "react";

export type NavbarProps = {
  appName: string;
  left?: ReactNode;
  right?: ReactNode;
};

const Navbar: FC<NavbarProps> = ({ appName, right, left }) => {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-none">{left}</div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          {appName}
        </Link>
      </div>
      <div className="flex-none">{right}</div>
    </nav>
  );
};

export default Navbar;
