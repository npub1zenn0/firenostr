import Drawer, { DrawerOpener } from "@/components/atoms/Drawer";
import Navbar, { NavbarProps } from "@/components/atoms/Navbar";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { FC, ReactNode, useId } from "react";

const HeaderSidebar: FC<
  { children: ReactNode; sidebarContent: ReactNode } & Omit<NavbarProps, "id">
> = ({ children, sidebarContent, ...navbar }) => {
  // Can I use this in server components?
  const id = useId();
  return (
    <Drawer sidebarChildren={sidebarContent} id={id}>
      <header className="sticky top-0 z-30 h-16 lg:hidden">
        <Navbar
          {...navbar}
          left={
            <DrawerOpener className="btn btn-square btn-ghost" id={id}>
              <Bars3Icon className="inline-block w-5 h-5 stroke-current" />
            </DrawerOpener>
          }
        />
      </header>
      <div className="overflow-hidden w-full h-full">{children}</div>
    </Drawer>
  );
};

export default HeaderSidebar;
