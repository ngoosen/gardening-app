"use client";

import { useEffect, useState } from "react";
import { UserCog } from "lucide-react";

import styles from "@/style/components/sideNav/SideNavigation.module.scss";

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
    <nav className={`${styles.main} ${open ? styles.open : styles.close}`}>
      <ul onMouseEnter={openHandler} onMouseLeave={closeHandler}>
        <SideNavigationButton
          buttonIcon={<UserCog />}
          title="Administration"
          open={open}
        />
      </ul>

      <SideNavigationLock
        state={lockState}
        onLock={lockHandler}
      />
    </nav>
  );
}
