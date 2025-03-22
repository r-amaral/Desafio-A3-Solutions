import React from "react";
import "./photo.css";

interface PhotoProps {
  onChange: (base64: string | null) => void;
  photo?: string;
  label: string;
}

const Photo = ({ onChange, photo, label }: PhotoProps) => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;

        onChange(base64);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="Photo__Container">
      <label htmlFor="photo-upload" className="Photo__Label">
        {photo ? (
          <img src={photo} alt="User Photo" className="Photo__Img" />
        ) : (
          <div className="Photo__Placeholder">+</div>
        )}
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="Photo__Input"
      />
      <span className="Photo__Text">{label}</span>
    </div>
  );
};

export default Photo;
