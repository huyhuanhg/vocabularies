import Container, * as Style from "./Navigation.style";
import { useRouter } from "next/router";
import { Image } from "@/components/common";
import { useMemo } from "react";

const Navigation = () => {
  const router = useRouter();

  const active = useMemo(() => router.pathname, [router.pathname])

  const onChange = (key: string) => {
    router.push(key);
  };

  return (
    <Container>
      <ul>
        <Style.Item
          isActive={active === "/"}
          onClick={() => onChange("/")}
        >
          <Image src="/review.png" alt="review" width={30} height={30} />
          <span className="label">Ôn tập</span>
        </Style.Item>
        <Style.Item
          isActive={active === "/note"}
          onClick={() => onChange("/note")}
        >
          <Image src="/note.png" alt="review" width={30} height={30} />
          <span className="label">Sổ tay</span>
        </Style.Item>
        <Style.Item
          isActive={active === "/search"}
          onClick={() => onChange("/search")}
        >
          <Image src="/search.png" alt="review" width={30} height={30} />
          <span className="label">Tra cứu</span>
        </Style.Item>
        <Style.Item
          isActive={active === "/other"}
          onClick={() => onChange("/other")}
        >
          <Image src="/learn.png" alt="review" width={30} height={30} />
          <span className="label">Khác</span>
        </Style.Item>
      </ul>
    </Container>
  );
};

export default Navigation;
