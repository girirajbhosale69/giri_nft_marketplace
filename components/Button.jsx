const Button = ({ btnName, calssStyles, handleClick }) => (
  <button
    type="button"
    className={`nft-gradient tex-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${calssStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
