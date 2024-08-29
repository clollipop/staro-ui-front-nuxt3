import OuOButton from "./button/";
import OuOInput from "./input/index.vue";
import OuOTextarea from "./input/textarea.vue";
import OuOTag from "./tag/index.vue";
import OuOTagGroup from "./tag/tagGroup.vue";
import OuOMessage from "./message/index";
import OuOPagination from "./pagination/";
import OuOLoading from "./loading/";
import OuOLanding from "./landing/index.vue";
import OuOStar from "./landing/star.vue";
import "./styles.scss";
export { OuOButton, OuOInput, OuOTag, OuOMessage, OuOPagination, OuOLoading, OuOTextarea, OuOTagGroup, OuOLanding, OuOStar };
declare const OuOUI: {
    install(App: any): void;
};
export default OuOUI;
