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
