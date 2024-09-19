export function goBack() {
  navigateTo("/");
}

/**
 * 切换主图
 */
export function switchTheme() {
  const theme = document.body.getAttribute("data-theme");
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
  }
}

/**
 * 生成随机数字UUID
 * @param length
 */
export function generateNumericUUID(length = 12) {
  let numericUUID = "";
  for (let i = 0; i < length; i++) {
    numericUUID += Math.floor(Math.random() * 10); // 生成0-9的随机数字
  }
  return numericUUID;
}