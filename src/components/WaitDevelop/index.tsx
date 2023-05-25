import Container from "./WaitDevelop.style";
import { Button } from "../common";
import { useRouter } from "next/router";

const WaitDevelop = () => {
  const router = useRouter();
  return (
    <Container>
      <span>Chức năng sắp ra mắt</span>
      <Button onClick={() => router.push("/")}>Ôn tập</Button>
    </Container>
  );
};

export default WaitDevelop;
