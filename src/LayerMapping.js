import { InputNumber } from "antd";
import React, { useState } from "react";

const layerMappingColumns = [
    {
        title: "Name",
        key: "name",
    },
    {
        title: "Level",
        key: "level",
    },
];

const LayerMapping = ({ layers, onLayerMapChange }) => {
    const [layerMap, setLayerMap] = useState(layers)
    const onChange = (value, layerName) => {
        const updatedLayers = layerMap.map((layer) => {
            const level = layer.name === layerName ? value | 0 : layer.level;
            return { ...layer, level };
        });
        setLayerMap(updatedLayers);
        onLayerMapChange(updatedLayers);
    };
    return (
        <table>
            <thead>
                <tr>
                    {layerMappingColumns.map((col) => (
                        <th key={col.key}>{col.title}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {layerMap.map((layer) => (
                    <tr key={layer.key}>
                        <td>{layer.name}</td>
                        <td>
                            {" "}
                            <InputNumber
                                min={0}
                                defaultValue={layer.level}
                                onChange={(value) =>
                                    onChange(value, layer.name)
                                }
                                precision={0}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LayerMapping;
