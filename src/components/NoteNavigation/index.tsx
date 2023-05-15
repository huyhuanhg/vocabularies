import Container from "./NoteNavigation.style";
import NoteNavigationItem from "./NoteNavigationItem";

const NoteNavigation = () => {
  const colorData = ["#EB5757", "#FFCB08", "#56CCF2", "#2F80ED", "#213782"];

  return (
    <Container className="NoteNavigation">
      {colorData.map((color, index) => (
        <NoteNavigationItem
          key={`NavItem_${index}_${color}`}
          level={index + 1}
          color={color}
        />
      ))}
    </Container>
  );
};

export default NoteNavigation;
