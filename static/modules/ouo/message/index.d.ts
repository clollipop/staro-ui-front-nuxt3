type Params = {
    type: "success" | "error" | "warning";
    text: string;
    duration?: number;
    icon?: boolean;
};
declare function OuOMessage({ type, text, duration, icon }: Params): void;
declare namespace OuOMessage {
    var success: (text: string, duration?: number | undefined, icon?: boolean | undefined) => void;
    var error: (text: string, duration?: number | undefined, icon?: boolean | undefined) => void;
    var warning: (text: string, duration?: number | undefined, icon?: boolean | undefined) => void;
}
export default OuOMessage;
