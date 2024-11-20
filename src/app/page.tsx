import { Button, Image } from '@nextui-org/react';
import * as actions from '@/actions';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div
          className="flex items-center gap-2"
          title={JSON.stringify(session.user)}>
          <Image
            src={session.user.image as string}
            className="size-10 rounded-full"
          />
          Welcome {session.user.name}
        </div>
      ) : (
        <div>Signed Out</div>
      )}

      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
