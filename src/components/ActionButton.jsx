const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className=" cursor-pointer bg-[#3A424A] hover:bg-[#4A535C] text-[#B6C2CF] px-3 py-1.5 rounded-[3px] text-sm font-medium flex items-center gap-2 "
  >
    <span className="text-[#9FADBC]">{icon}</span>
    {label}
  </button>
);

export default ActionButton;