import { AppSidebar } from "./components/app-sidebar";
import { Button } from "./components/ui/button";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Button>Hello</Button>
      </main>
    </SidebarProvider>
  );
}

export default App;
