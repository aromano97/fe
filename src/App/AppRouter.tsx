import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router"
import { useAppSelector } from "../store";

const Books = lazy(() => import('../Books'));
const Cart = lazy(() => import('../Cart'));
const Users = lazy(() => import('../Users'));
const HandleBooks = lazy(() => import('../HandleBooks'));
const Login = lazy(() => import('./AppLogin'));

export const AppRouter: React.FC = () => {
    const user = useAppSelector((state) => state.app.user);

    return <Routes>
        <Route path="/" element={[
            <Suspense fallback={<h1>loading..</h1>}>
                <Books />
            </Suspense>
        ]} />
        <Route path="/login" element={[
            <Suspense fallback={<h1>loading..</h1>}>
                <Login />
            </Suspense>
        ]} />
        {<Route path="cart" element={[
            <Suspense fallback={<h1>loading..</h1>}>
                <Cart />
            </Suspense>
        ]} />}
        {user?.isAdmin && <Route path="users" element={[
            <Suspense fallback={<h1>loading..</h1>}>
                <Users />
            </Suspense>
        ]} />}
        {user?.isAdmin && <Route path="handle-books" element={[
            <Suspense fallback={<h1>loading..</h1>}>
                <HandleBooks />
            </Suspense>
        ]} />}
    </Routes>
}
