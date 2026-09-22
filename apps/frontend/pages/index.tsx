import { useRouter } from 'next/navigation'

const Main = () => {
  const router = useRouter()

  router.push("/sign-in")
};

export default Main;
