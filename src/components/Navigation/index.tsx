import Container, * as Style from "./Navigation.style";
import { useRouter } from "next/router";
import { Image } from "@/components/common";
import { useMemo } from "react";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const Navigation = () => {
  const router = useRouter();

  const active = useMemo(() => router.pathname, [router.pathname]);

  const onChange = (key: string, canRemoveQueryString: boolean = false) => {
    if (router.pathname === key) {
      router.push(
        `${key}?${new URLSearchParams(
          canRemoveQueryString
            ? { refresh: "" }
            : { ...router.query, refresh: "" }
        )}`
      );
      return;
    }

    router.push(key);
  };

  return (
    <Container>
      <ul>
        <Style.Item
          isActive={active === "/"}
          onClick={() => onChange("/", true)}
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
          isActive={active === "/course"}
          onClick={() => onChange("/course")}
        >
          <Image src="/learn.png" alt="review" width={30} height={30} />
          <span className="label">Khóa học</span>
        </Style.Item>
        <Style.Item
          isActive={active === "/other"}
          onClick={() => onChange("/other")}
        >
          <Image src="/community.png" alt="review" width={30} height={30} />
          <span className="label">Khác</span>
        </Style.Item>
      </ul>
    </Container>
  );
};

export default Navigation;
