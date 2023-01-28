
import { DxfParser } from "dxf-parser";
import {
    Shape,
    ExtrudeGeometry,
    WireframeGeometry,
    LineSegments,
    DepthFormat,
    MeshBasicMaterial,
    Mesh,
} from "three";


export const createMeshFromVector = (vectorArray) => {
    const shape = new Shape();
    const basePoint = vectorArray[0];
    const scale = 5;
    shape.moveTo(basePoint.x * scale, basePoint.y * scale);
    vectorArray.forEach((vector) => {
        shape.lineTo(vector.x * scale, vector.y * scale);
    });
    shape.lineTo(basePoint.x * scale, basePoint.y * scale);

    // const geometry = new ShapeGeometry( shape );
    const extrudeSettings = {
        steps: 2,
        depth: 10,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    const wireframe = new WireframeGeometry(geometry);

    const line = new LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.5;
    line.material.transparent = true;
    const mesh = line;
    const material = new MeshBasicMaterial( { color: 0x00ff00, wireframe : false, flatShading: true, } );
    // const mesh = new Mesh( geometry, material ) ;
    return mesh;
};

export const offsetZIndexBasedOnMeshLevel = (mesh, layerMap) => {
    const thisLayer = layerMap.find(layer => layer.name === mesh.userData.layerName);
    const depth = 10;
    mesh.position.setZ(thisLayer.level * depth)
    return mesh;
};

export const parseDxfFile = (fileText) => {
    const parser = new DxfParser();
        try {
            const dxf = parser.parseSync(fileText);
            return dxf.entities;
        } catch (err) {
            return console.error(err.stack);
        }
};