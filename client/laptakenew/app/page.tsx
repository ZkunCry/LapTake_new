import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      <header className="w-full border-b">
        <Container>
          <div className="flex row items-center justify-between py-3 ">
            <Link
              href={"/"}
              className="text-[1.3rem] tracking-[0.2rem] font-semibold uppercase"
            >
              Laptake
            </Link>
            <ul className="flex text-[1.2rem] items-center gap-x-4">
              <Link
                className="hover:border-accent border border-transparent  hover:rounded-lg py-1 px-2"
                href={"/"}
              >
                Каталог
              </Link>
              <Link
                className="hover:border-accent border border-transparent  hover:rounded-lg py-1 px-2"
                href={"/"}
              >
                Услуги
              </Link>
              <Link
                className="hover:border-accent border border-transparent  hover:rounded-lg py-1 px-2"
                href={"/"}
              >
                О нас
              </Link>
              <Link
                className="hover:border-accent border border-transparent  hover:rounded-lg py-1 px-2"
                href={"/"}
              >
                Контакты
              </Link>
              <Link
                className="border bg-accent rounded-lg py-1 px-2"
                href={"/"}
              >
                Вход в аккаунт
              </Link>
            </ul>
          </div>
        </Container>
      </header>
    </div>
  );
}
