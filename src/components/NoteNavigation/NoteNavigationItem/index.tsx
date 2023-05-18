import { FC, useEffect, useState } from "react";
import NoteNavigationItemProps from "./NoteNavigationItem.props";
import Container from "./NoteNavigationItem.style";
import { Image } from "@/components/common";
import { useRouter } from "next/router";

const NoteNavigationItem: FC<NoteNavigationItemProps> = ({ level, color }) => {
  const router = useRouter();

  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
    const currentLevel = Number(router.query.level) || 1
    setActive(currentLevel === level)
  }, [router.query])

  const renderStar = (level: number) =>
    Array.from({ length: 5 }).map((_, index) => {
      return (
        <Image
          key={`VocaStar_${level}_${index}`}
          src={index < level ? "/star_active.svg" : "star_outline.svg"}
          alt="star"
          width={9}
          height={9}
        />
      );
    });

  const handleRedirect = () => {
    const currentLevel = router.query.level as string

    if (`${level}` === currentLevel || (!currentLevel && level === 1)) {
      router.push(`/note?level=${level}&refresh`)
      return
    }

    router.push(`/note?level=${level}`)
  }

  return (
    <Container
      className="NoteNavigationItem"
      color={color}
      active={active}
      onClick={handleRedirect}
    >
      <div className="NoteNavigationItem__level-title">Level {level}</div>
      <div className="NoteNavigationItem__level-star">{renderStar(level)}</div>
    </Container>
  );
};
export default NoteNavigationItem;
