import React from "react";
import { useTheme } from "../useTheme";
import { themeColors } from "../themes";
import { FaMoon, FaSun } from "react-icons/fa";

const Setting = () => {
  const { theme, toggleTheme } = useTheme();
  const colors = themeColors[theme];

  const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
      <div className="mt-3 d-flex align-items-center gap-3">
        <label className="form-label mb-3 fw-semibold">
          Theme:
        </label>
        <p
          className={` d-flex align-items-center gap-2 px-3 py-2 shadow-sm border-0 ${
            theme === "light"
              ? "bg-light text-dark"
              : "bg-dark text-light"
          }`}
          onClick={toggleTheme}
          style={{ borderRadius: "30px", transition: "1s ease", cursor: "pointer" }}
        >
          {theme === "light" ? (
            <>
              <FaSun /> Light
            </>
          ) : (
            <>
              <FaMoon /> Dark
            </>
          )}
        </p>
      </div>
    );
  };

  return (
    <div>

      <div className="p-3 pb-0">
        <h3>Settings</h3>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>


      <div className={`my-3 ${colors.settingDivider} border-4 border-top pt-3 mx-0 p-3`}>
        <h5>User Profile Settings</h5>
        <p>More user settings coming soon...</p>
      </div>
    </div>
  );
};

export default Setting;
