import { IconType } from "react-icons";
type navLinkT = { text: string; icon: IconType; path: string };
type button = { text: string; icon?: IconType };
type dashBoardContextT = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setShowSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
};
