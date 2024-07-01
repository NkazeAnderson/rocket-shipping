import { IconType } from "react-icons";
type navLinkT = { text: string; icon: IconType; path: string };
type button = { text: string; icon?: IconType };
type subjectT = "shipment" | "notification" | "conversation" | "admin";
type sidePanelContentT = {
  subject: subjectT;
  id: string;
  maps?: boolean;
};
type dashBoardContextT = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setShowSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  sidePanelContent: null | sidePanelContentT;
  setSidePanelContent: React.Dispatch<
    React.SetStateAction<sidePanelContentT | null>
  >;
};
