import Container from "./WaitDevelop.style";
import { Button } from "../common";
import { useRouter } from "next/router";

const WaitDevelop = () => {
  const router = useRouter();
  return (
    <Container>
      <span>Chức năng chưa được phát triển!</span>
      <Button onClick={() => router.push("/")}>Trang chủ</Button>
    </Container>
  );
};

export default WaitDevelop;
