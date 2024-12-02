"use client";

import { useEffect, useState } from "react";
import { Settings, UserCog } from "lucide-react";

import styles from "@/style/components/sideNav/SideNavigation.module.scss";

import Logo from "../ui/Logo";
import SideNavigationButton from "./SideNavigationButton";
import SideNavigationLock, { SIDE_NAVIGATION_LOCK_STATE } from "./SideNavigationLock";

export default function SideNavigation(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [lockState, setLockState] = useState<SIDE_NAVIGATION_LOCK_STATE>(SIDE_NAVIGATION_LOCK_STATE.NO_LOCK);

  useEffect(() => {
    if (lockState === SIDE_NAVIGATION_LOCK_STATE.LOCK_OPEN) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [lockState]);

  function openHandler() {
    if (lockState === SIDE_NAVIGATION_LOCK_STATE.NO_LOCK) {
      setOpen(true);
    }
  }

  function closeHandler() {
    if (lockState === SIDE_NAVIGATION_LOCK_STATE.NO_LOCK) {
      setOpen(false);
    }
  }

  function lockHandler(newLockState: SIDE_NAVIGATION_LOCK_STATE) {
    setLockState(newLockState);
  }

  return (
    <nav className={`${styles.main} ${open ? styles.open : styles.close}`} onMouseLeave={closeHandler}>
      <Logo open={open} onHover={openHandler} />

      <ul onMouseEnter={openHandler}>
        <SideNavigationButton
          buttonIcon={<UserCog />}
          title="Administration"
          open={open}
          link="/admin"
        />
        <SideNavigationButton
          buttonIcon={<Settings />}
          title="Settings"
          open={open}
          link="/"
        />
      </ul>

      <SideNavigationLock
        state={lockState}
        onLock={lockHandler}
      />
    </nav>
  );
}
