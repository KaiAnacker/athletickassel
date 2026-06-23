import Hero from "@/components/Hero";
import Hyrox from "@/components/Hyrox";
import Kurse from "@/components/Kurse";
import PersonalTraining from "@/components/PersonalTraining";
import RentABell from "@/components/RentABell";
import Erfolge from "@/components/Erfolge";
import Team from "@/components/Team";
import Kontakt from "@/components/Kontakt";

export default function Home() {
  return (
    <>
      <Hero />
      <Hyrox />
      <Kurse />
      <PersonalTraining />
      <RentABell />
      <Erfolge />
      <Team />
      <Kontakt />
    </>
  );
}
