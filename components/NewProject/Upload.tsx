import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Spinner } from "components/elements";
import { useDropzone as useDropZone } from "react-dropzone";

import imageIcon from "assets/svg/icons/image.svg";
import { uploadFromBlobAsync } from "./lib/storage.js";

type Props = {
  address: string;
  onUpload: any;
  layerId: string;
  layerName: string;
  itemId?: string;
};

const Upload: React.FC<Props> = ({
  onUpload,
  layerId,
  layerName,
  itemId,
  address,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  const handleSelectImage = React.useCallback(
    async (acceptedFiles, fileRejections) => {
      if (fileRejections && fileRejections.length > 0) {
        setError(fileRejections[0].errors[0].message);
      }

      if (!acceptedFiles) {
        return;
      }

      setError(null);
      setIsLoading(true);
      setMessage(null);

      acceptedFiles.forEach((acceptedFile) => {
        // const uploadAndGetURL = await uploadFromBlobAsync({
        //   blobUrl: URL.createObjectURL(acceptedFile),
        //   name: acceptedFile.name,
        //   address: address,
        // });

        onUpload({
          blobURL: URL.createObjectURL(acceptedFile),
          // imageURL: uploadAndGetURL,
          name: acceptedFile.name,
          file: acceptedFile,
          layerId,
          layerName,
          itemId,
        });
      });

      setIsLoading(false);
      setMessage("File was uploaded 👍");
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropZone({
    accept: "image/jpeg, image/png",
    // maxFiles: 1,
    onDrop: handleSelectImage,
  });

  return (
    <>
      <Root>
        <Preview {...getRootProps()}>
          <input {...getInputProps()} />
          {isLoading ? (
            <Loading>
              <Spinner />
              Lorem dfasdf dfasdf fasdfwe drfwer dsfasdfwer
            </Loading>
          ) : isDragActive ? (
            <Text>Drop the files here...</Text>
          ) : (
            <>
              <PreviewIcon bg={imageIcon} />
              <Drag>Drag and Drop files or</Drag>
              <Button size="small">Browse</Button>
            </>
          )}
        </Preview>
        <Text>
          Upload multiple images for each layer. Each NFT will be made by
          combining a random image from every layer.
          <Help>
            <b>Need help?</b> Read{" "}
            <Link href="/guide">
              <a>the guide</a>
            </Link>
          </Help>
        </Text>
      </Root>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Upload;

const Root = styled.div`
  display: flex;
  align-items: center;
`;
const Drag = styled.div`
  color: #0e234b;
  font-size: 11px;
  padding: 4px 3px;
  text-align: center;
  font-weight: 600;
`;

const Preview = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 0 0 134px;
  width: 134px;
  height: 120px;
  margin-right: 22px;
  padding: 8px;
  border-radius: 6px;
  background: #eaecee;
  border: 1px dashed #cecaca;
  cursor: pointer;

  &:hover {
    border-color: #b6b3b3;
  }
`;

const PreviewIcon = styled.div<{ bg?: string }>`
  width: 34px;
  height: 34px;
  background: url(${({ bg }) => bg}) no-repeat 50%;
  background-size: 29px;
`;

const Text = styled.div`
  color: #6d6d72;
  font-size: 12px;
  line-height: 1.5;

  b {
    font-weight: 700;
    color: #0e234b;
  }

  a {
    color: #fd576c;
  }
`;

const Help = styled.div`
  padding-top: 12px;
`;

const Error = styled.div`
  padding-top: 20px;
  font-size: 12px;
  line-height: 1.5;
  color: #0e234b;
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
`;
