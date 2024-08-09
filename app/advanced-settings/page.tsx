import Sidebar from '@/components/advanced-settings/Sidebar';
import TopBar from '@/components/advanced-settings/Topbar';
import AdvancedSettings from '@/components/advanced-settings/AdvancedSettings';
export default function Home() {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <AdvancedSettings />
        </div>
      </div>
    </div>
  );
}
