import { Subtitle, Title } from "@tremor/react";
import { FC, ReactNode } from "react";
// @ts-ignore
import Logo from "../assets/logo.svg?react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Logo
                src="/logo.svg"
                alt="Plantix Coding Challenge"
                height={150}
                width={150}
              />
            </div>
          </div>
        </div>
      </div>
      {children}
    </main>
  );
};

export default Layout;
