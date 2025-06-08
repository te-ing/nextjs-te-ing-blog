import { PostContextProvider } from './postContext';

export default function PostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PostContextProvider>{children}</PostContextProvider>;
}
