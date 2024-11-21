import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { auth } from '@/auth';
import * as actions from '@/actions';

export default async function Header() {
  const session = await auth();

  const getAuthContent = (): React.ReactNode => {
    if (session?.user) {
      return (
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.user.image ?? ''} />
          </PopoverTrigger>

          <PopoverContent>
            <div className="p-4">
              <form action={actions.signOut}>
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  };

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Smart Comment
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">{getAuthContent()}</NavbarContent>
    </Navbar>
  );
}
