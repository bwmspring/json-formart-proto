"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJSONToProto = void 0;
function convertJSONToProto(source) {
    if (source === '') {
        return "";
    }
    try {
        const json = JSON.parse(source);
        const lines = [];
        let index = 1;
        lines.push("message Message {");
        for (const [key, value] of Object.entries(json)) {
            const typeName = getProtoType(value);
            lines.push(`  ${typeName} ${key} = ${index};`);
            index += 1;
        }
        lines.push("}");
        return lines.join("\n");
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.convertJSONToProto = convertJSONToProto;
const googleAny = "google.protobuf.Any";
const googleTimestamp = "google.protobuf.Timestamp";
function getProtoType(value) {
    switch (typeof value) {
        case "string":
            if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(\+\d\d:\d\d|Z)/.test(value)) {
                return googleTimestamp;
            }
            else {
                return "string";
            }
        case "number":
            return 'int32';
        case "boolean":
            return "bool";
        case "object":
            if (value === null) {
                return googleAny;
            }
            if (Array.isArray(value)) {
                let len = value.length;
                if (len === 0) {
                    return `repeated ${googleAny}`;
                }
                if (len > 0) {
                    console.log('typeof value[0]: ', typeof value[0]);
                    switch (typeof value[0]) {
                        case "string":
                            return `repeated string`;
                        case "number":
                            return `repeated int32`;
                    }
                }
            }
            return "object";
    }
    return googleAny;
}
