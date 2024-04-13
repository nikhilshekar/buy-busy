import styles from "../styles/navbar.module.css";
import { NavLink, Outlet } from "react-router-dom/dist";
import { useAuthValue } from "../authContext";

function Navbar() {
  const { isLoggedIn, signOut } = useAuthValue();

  return (
    <div className="App">
      <div className={styles.topnav}>
        <div className={styles.logoSection}>
          <div className={styles.logo}></div>
          <span className={styles.buybusy}>
            <span style={{ color: "#ce9327" }}>B</span>uy
            <span style={{ color: "#0f0" }}>B</span>usy
          </span>
        </div>

        <div className={styles.navLinks}>
          <NavLink to={!isLoggedIn ? "/login" : "/"} >
            {!isLoggedIn ? (
              <>LogIn</>
            ) : (
              <>
                <span onClick={signOut}>LogOut</span>
              </>
            )}
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/cart"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "#0f0",
                      color: "black",
                    }
                  : null
              }
            >
              Cart
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to="/myOrder"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "#0f0",
                      color: "black",
                    }
                  : null
              }
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "#0f0",
                    color: "black",
                  }
                : null
            }
          >
            <span>Home</span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
