import Image from "next/image";

import styles from "@/style/components/ui/Header.module.scss";

import placeholderProfilePicture from "@/public/img/blank-profile-picture-973460_1280.webp";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <header className={styles.main}>
      <Link href="#" className={styles.profile_link}>
        <p>John Smith</p>
        <div className={styles.user}>
          <Image src={placeholderProfilePicture} alt="Your profile picture" className={styles.profile_picture} />
        </div>
      </Link>
    </header>
  );
}
