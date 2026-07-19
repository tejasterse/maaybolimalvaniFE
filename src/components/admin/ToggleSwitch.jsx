// Toggle switch used in article editor and settings
export default function ToggleSwitch({ on, onToggle }) {
  return (
    <div
      className={`switch ${on ? 'on' : ''}`}
      onClick={onToggle}
    />
  );
}
