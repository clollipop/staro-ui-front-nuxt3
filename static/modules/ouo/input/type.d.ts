export interface TypeInterface {
    type: "default" | "label" | "icon";
    id?: string;
    label?: string;
    location?: "left" | "right";
}
export interface PromptInterface {
    type: "primary" | "success" | "warning" | "error";
    msg?: string;
}
export interface LabelInterface {
    id: string;
    label?: string;
}
