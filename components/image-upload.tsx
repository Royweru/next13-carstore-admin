import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Trash, ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  value?: string[];
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className=" mb-4 flex items-center gap-4">
        {value?.map((url) => (
          <>
            <div
              key={url}
              className=" w-[200px] h-[200px] relative overflow-hidden rounded-md"
            >
              <div className=" z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image fill src={url} alt="image" className=" object-cover" />
            </div>
          </>
        ))}
      </div>
       
      <CldUploadWidget onUpload={onUpload} uploadPreset="n15ir1bc">
                {({ open }) => {
                  const onClick = () => {
                    open();
                  };
                  return (
                    <Button
                      type="button"
                      disabled={disabled}
                      variant="destructive"
                      onClick={onClick}
                    >
                      <ImagePlus className=" h-4 w-4 mr-2" />
                      upload an image
                    </Button>
                  );
                }}
              </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
