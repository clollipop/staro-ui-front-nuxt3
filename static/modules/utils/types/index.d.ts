interface Toc {
    id: string;
    name: string;
    className: string;
    offsetTop: number;
}
export declare function getCookie(key: string): string;
export declare function formatDateTime(dateStr: string): string;
export declare function tocGenerate(contentId: string): Toc[];
export declare function scrollSetToc(latestScroll: number, latestIndex: number, tocList: Toc[]): {
    latestIndex: number;
    id: string;
} | undefined;
export declare function setAttribute(name: string, value: string): void;
export declare function getAttribute(name: string): string | null;
export {};
