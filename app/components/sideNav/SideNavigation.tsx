"use client";

import { useState } from "react";

import styles from "@/style/components/sideNav/SideNavigation.module.scss";

import { Menu } from "lucide-react";

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
      <Menu color="#ffffff" size={50} />
    </nav>
  );
}
