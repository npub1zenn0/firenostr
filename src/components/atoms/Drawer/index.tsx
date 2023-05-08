import { FC, ReactNode } from "react";

export const DrawerOpener = ({
  id,
  className,
  children,
}: {
  id: string;
  className: string;
  children: ReactNode;
}) => (
  <label htmlFor={id} className={className}>
    {children}
  </label>
);

const Drawer: FC<{
  children?: ReactNode | null;
  sidebarChildren: ReactNode;
  id: string;
  className?: string;
}> = ({ children, className = "", sidebarChildren, id = "default-drawer" }) => {
  return (
    <div className={`drawer drawer-mobile ${className}`}>
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">{children}</div>
      <div className="drawer-side">
        <label htmlFor={id} className="drawer-overlay"></label>
        {/* TODO: dragging right on mobile should open sidebar. */}
        <div className="menu w-60 bg-base-200 text-base-content h-screen overflow-y-auto">
          {sidebarChildren}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
