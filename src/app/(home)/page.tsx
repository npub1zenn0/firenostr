import HeaderSidebar from "@/components/molecules/HeaderSidebar";
import Posts from "@/components/molecules/Posts";
import Sidebar from "@/components/molecules/Sidebar";

export default function Home() {
  return (
    <HeaderSidebar
      appName="FireNostr"
      sidebarContent={<Sidebar className="p-1" />}
    >
      <div className="overflow-hidden h-full w-full bg-base-100">
        <Posts />
      </div>
    </HeaderSidebar>
  );
}
