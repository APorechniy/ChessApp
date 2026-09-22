import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { clearStore, useAppDispatch, useAppSelector } from '../store/store';
import { getUser } from '../store/users/thunk/get-user';
import { logout } from '../store/auth/thunk/logout';
import { useAuth } from '../hooks/use-auth';
import { getSettings } from '../store/system/thunk/get-settings';
import { Loader } from '../atoms/Loader';

interface WithAuthProps {
  children: React.ReactNode;
}

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: P & WithAuthProps) => {
    const redirectPath = '/sign-in'
    const router = useRouter();
    const { isAuth, isLoading } = useAuth();
    const { currentUser, isLoadingUser } = useAppSelector(({ users }) => users)
    const { settings, isLoadSettings } = useAppSelector(({ system }) => system)

    const dispatch = useAppDispatch()

    const isAuthenticated = useMemo(() =>
      isAuth && !isLoading
      , [isAuth, isLoading])

    const isLoadedUserData = useMemo(() => Boolean(
      currentUser &&
      currentUser.id &&
      isLoadingUser === "SUCCESS"
    ), [currentUser, isLoadingUser])

    const isLoadedSettings = useMemo(() => Boolean(
      settings &&
      settings.id &&
      isLoadSettings === "SUCCESS"
    ), [settings, isLoadSettings])

    useEffect(() => {
      if (!isLoadedUserData && isAuthenticated) {
        dispatch(getUser())
      }
    }, [isLoadedUserData, isAuthenticated])

    useEffect(() => {
      if (!isLoadedSettings && isAuthenticated) {
        dispatch(getSettings())
      }
    }, [isLoadedSettings, isAuthenticated])

    useEffect(() => {
      if (
        !isAuthenticated && isLoadingUser !== "PENDING" && !isLoading
      ) {
        dispatch(logout())
        dispatch(clearStore())
        router.push(redirectPath);
      }
    }, [isAuthenticated, isAuth, isLoading]);

    return (isAuthenticated && isLoadedUserData && isLoadSettings)
      ?
      <WrappedComponent {...props} />
      :
      <div style={{ width: "100vw", height: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </div>;
  };
};