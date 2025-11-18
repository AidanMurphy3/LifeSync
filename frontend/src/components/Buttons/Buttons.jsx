import "./Button.css";
function Buttons({ text, onClick, type = "button", variant = "primary" }) {
  return (
    <button
      className={`ls-btn ls-btn-${variant}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Buttons;
