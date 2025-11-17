function InputField({ label, type, ...props }) {
  return (
    <div>
      {/* user name */}
      <label>{label}</label>
      <input
        type={type}
        {...props}
        className="w-full h-[38px] border border-white p-10 "
      />
    </div>
  );
}

export default InputField;
