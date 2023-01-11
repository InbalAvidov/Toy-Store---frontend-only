import { NavLink } from "react-router-dom";

export function AppHeader(){
    return (
        <header className="full main-layout">
            <main className="main-header">
            <h1 className="logo">YomToy!</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">DashBoard</NavLink>

            </nav>
            </main>
        </header>
    )
}