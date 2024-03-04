import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";




const IMAGE_SIZE = 48;
//@ts-ignore
export function Avatar({ src, name, otherStyles }: { src: string; name: string }) {
  return (
    <div className={`${styles.avatar} ${otherStyles} h-9 w-9`} data-tooltip={name}>
      <Image
        
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
        fill
              className={styles.avatar_picture}
              alt="avatar"
      />
    </div>
  );
}