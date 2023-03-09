import PropTypes from "prop-types";
import colors from "assets/theme/base/colors";

function UserIcon({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>user</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Rounded-Icons" transform="translate(-1869.000000, -293.000000)" fill={colors[color] ? colors[color].main : colors.dark.main} fillRule="nonzero">
          <g id="Icons-with-opacity" transform="translate(1869.000000, 293.000000)">
            <g id="user">
              <path d="M12,12 C14.209139,12 16,10.209139 16,8 C16,5.790861 14.209139,4 12,4 C9.790861,4 8,5.790861 8,8 C8,10.209139 9.790861,12 12,12 Z M12,14 C8.69144997,14 4,15.5596779 4,18 L4,20 L20,20 L20,18 C20,15.5596779 15.3085501,14 12,14 Z" id="Shape" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

UserIcon.defaultProps = {
  color: "dark",
  size: "16px",
};

UserIcon.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default UserIcon;