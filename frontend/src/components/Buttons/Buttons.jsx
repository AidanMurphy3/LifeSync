import "./Button.css";
function Buttons({ text, onClick, type = "button" }) {
  return (
    <button className="ls-btn ls-btn-primary" onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Buttons;
