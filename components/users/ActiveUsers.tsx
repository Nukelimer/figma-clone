import { useOthers, useSelf } from "@/liveblocks.config";
import { Avatar } from "./Avatar";
import { generateRandomName } from "@/lib/utils";
import styles from "./index.module.css";
import { useMemo } from "react";

const ActiveUser = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
    const memoizedUsers = useMemo(() => {
      return <main className="flex items-center justify-center gap-2 ">
      <div className="flex py-2">
        {currentUser && (
          <Avatar name="Me" otherStyles="border-[3px] border-primary-green" />
        )}

        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar
              key={connectionId}
              name={generateRandomName()}
              otherStyles="ml-3"
            />
          );
        })}

        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}
      </div>
    </main>
  }, [users.length])

  return (
    memoizedUsers
  );
};

export default ActiveUser;
