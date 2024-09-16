import type {AuthorInterface} from "@/types/authorInterface";

const copyrightWebsite = "";

export class AuthorImpl implements AuthorInterface {
  avatar: string = "https://q1.qlogo.cn/g?b=qq&nk=1792945133&s=640";
  description: string[] = ["欢迎来到我的博客☄️☄️", "分享技术与生活", "Stay curious, keep learning!!"];
  website: string = "https://ouo.pub";
  icp: string = "黔ICP备2022009237号-1";
  saying: string = "每天进步多一点👏";
  email: string = "staro.cc";
  github: string = "https://github.com/clollipop";
  name: string = "星Orange";
  enName: string = "Star";
  siteName: string = "☄️Star博客";
  copyright: string = "本文依据 <a class='highlight' href=" + copyrightWebsite + ">CC-BY-NC-SA 4.0 许可协议</a> 授权，请您在转载时注明文章来源为 <a class='highlight' href=" + this.website + ">" + this.name + "</a> ，若本文涉及转载第三方内容，请您一同注明。";
  footer: string = "©2024 ";
}
