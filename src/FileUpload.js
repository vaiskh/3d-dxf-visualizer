import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

export const FileUpload = ({ onFileUpload }) => {
    // On file select (from the pop up)
    const onFileChange = (file) => {
        parseFile(file);
    };

    const parseFile = (file) => {
        file.text().then((fileText) => {
            onFileUpload(fileText);
        });
    };

    const props = {
        beforeUpload: (file) => {
            const isDxf = file.name.includes(".dxf");
            if (!isDxf) {
                message.error(`${file.name} is not a dxf file`);
            }

            onFileChange(file);
            return false;
        },
    };

    return (
        <div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload DXF file</Button>
            </Upload>
        </div>
    );
};
