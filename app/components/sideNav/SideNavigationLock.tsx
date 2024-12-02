import { useEffect, useState } from "react";
import { ArrowLeftFromLine, ArrowRightFromLine, PinOff } from "lucide-react";

import styles from "@/style/components/sideNav/SideNavigationLock.module.scss";

export enum SIDE_NAVIGATION_LOCK_STATE {
  LOCK_OPEN = "lock_open",
  LOCK_CLOSED = "lock_closed",
  NO_LOCK = "no_lock"
}

interface ISideNavigationLockProps {
  state: SIDE_NAVIGATION_LOCK_STATE
  onLock: CallableFunction
}

export default function SideNavigationLock(props: ISideNavigationLockProps): JSX.Element {
  const {
    state,
    onLock,
  } = props;

  const [displayState, setDisplayState] = useState<SIDE_NAVIGATION_LOCK_STATE>(state);

  useEffect(() => {
    onLock(displayState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayState]);

  function clickHandler() {
    setDisplayState(latest => {
      if (latest === SIDE_NAVIGATION_LOCK_STATE.NO_LOCK) {
        return SIDE_NAVIGATION_LOCK_STATE.LOCK_CLOSED;
      }

      if (latest === SIDE_NAVIGATION_LOCK_STATE.LOCK_CLOSED) {
        return SIDE_NAVIGATION_LOCK_STATE.LOCK_OPEN;
      }

      return SIDE_NAVIGATION_LOCK_STATE.NO_LOCK;
    });
  }

  return (
    <button className={styles.main} onClick={clickHandler}>
      {displayState === SIDE_NAVIGATION_LOCK_STATE.NO_LOCK && <PinOff />}
      {displayState === SIDE_NAVIGATION_LOCK_STATE.LOCK_CLOSED && <ArrowLeftFromLine />}
      {displayState === SIDE_NAVIGATION_LOCK_STATE.LOCK_OPEN && <ArrowRightFromLine />}
    </button>
  );
}
