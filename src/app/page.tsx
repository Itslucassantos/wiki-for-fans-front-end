import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Library } from "@/components/library";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black">
      <Header />

      <Container>
        <h1 className="font-bold text-white text-lg sm:text-2xl">My Library</h1>
        <div>
          <Library />
        </div>
      </Container>
    </div>
  );
}
