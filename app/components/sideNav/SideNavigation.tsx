"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import styles from "@/style/components/sideNav/SideNavigation.module.scss";

import SideNavigationButton from "./SideNavigationButton";

export default function SideNavigation(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  function openHandler() {
    setOpen(true);
  }

  function closeHandler() {
    setOpen(false);
  }

  return (
    <nav className={`${styles.main} ${open ? styles.open : styles.close}`} onMouseEnter={openHandler} onMouseLeave={closeHandler}>
      <ul>
        <SideNavigationButton
          buttonIcon={<Menu />}
          title="Administration"
          open={open}
        />
      </ul>
    </nav>
  );
}
