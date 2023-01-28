import "./App.css";

import { FileUpload } from "./FileUpload";
import CanvasContainer from "./CanvasContainer";
import { useState } from "react";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { createMeshFromVector, offsetZIndexBasedOnMeshLevel, parseDxfFile } from "./helpers";
import LayerMapping from "./LayerMapping";

function App() {
    const [meshObjects, setMeshObjects] = useState([]);
    const [entities, setEntities] = useState([]);
    const [layers, setLayers] = useState([]);

    const onLayerMapChange = (updatedLayerMap) => {
        console.log(updatedLayerMap);
        const updatedMeshObjs = meshObjects.map(mesh => 
            offsetZIndexBasedOnMeshLevel(mesh, updatedLayerMap)
        ) 
        setMeshObjects(updatedMeshObjs);
    }

    const getMeshObjects = (entities) => {
        const meshObjects = [];
        entities.forEach((entity) => {
            let mesh = createMeshFromVector(entity.vertices);
            // associate mesh object with the layerName so that we can use it later for layer mapping etc
            mesh.userData.layerName = entity.layer
            // mesh = offsetZIndexBasedOnMeshLevel(mesh, entity);
            meshObjects.push(mesh);
        });
        return meshObjects;
    }

    const handleFileUpload = (file) => {
        const dxfEntities = parseDxfFile(file);
        const meshObjects = getMeshObjects(dxfEntities);
        setMeshObjects(meshObjects);
        setEntities(dxfEntities);
        const dxfLayers = [
            ...new Set(dxfEntities.map((entity) => entity.layer)),
        ];
        console.log(dxfLayers);
        const layerMap = dxfLayers.map((layer, i) => {
            const obj = {
                key: i,
                name: layer,
                level: 0,
            };
            return obj;
        });
        setLayers(layerMap);
    };
    return (
        <div className="App">
            <Layout
                style={{
                    minHeight: "100vh",
                }}
            >
                <Layout>
                    <Sider
                        width={300}
                        style={{ padding: "8px 8px" }}
                        theme="light"
                    >
                        <FileUpload
                            onFileUpload={handleFileUpload}
                        ></FileUpload>
                        

                                
                                
      
      {layers.length > 0 && <LayerMapping layers={layers} onLayerMapChange={onLayerMapChange}></LayerMapping>}
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Content>
                            {meshObjects.length > 0 && (
                                <CanvasContainer
                                    meshObjects={meshObjects}
                                ></CanvasContainer>
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
