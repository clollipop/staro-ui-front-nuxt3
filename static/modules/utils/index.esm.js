/**
 * 获取指定名称的 cookie 值
 * @param {string} name - cookie 名称
 * @returns {string} - cookie 值
 */
function getCookie(name) {
  if (document.cookie.length > 0) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].trim().split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
  }
  return "";
}

/**
 * 格式化日期时间
 * @param {Date} date - 日期对象
 * @returns {string} - 格式化后的日期字符串
 */
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

/**
 * 生成目录
 * @param {string} selector - 选择器
 * @returns {Array} - 目录项数组
 */
function tocGenerate(selector) {
  const elements = document.querySelector(selector).children;
  const children = Array.from(elements);
  const tocItems = [];
  let headerIndex = 0;

  children.forEach((element) => {
    if (element && element.tagName) {
      const tagName = element.tagName.toLowerCase();
      if (tagName.startsWith("h") && !tagName.startsWith("hr")) {
        const name = element.textContent;
        const offsetTop = element.offsetTop;
        const item = {
          id: `header-${headerIndex}`,
          name,
          className: `toc-item-${tagName}`,
          offsetTop
        };
        headerIndex++;
        tocItems.push(item);
      }
    }
  });

  return tocItems;
}

/**
 * 根据滚动位置设置目录项
 * @param {number} scrollTop - 滚动位置
 * @param {Array} tocItems - 目录项数组
 * @param {number} currentIndex - 当前目录项索引
 * @returns {Object|undefined} - 最新的目录项信息
 */
function scrollSetToc(scrollTop, tocItems, currentIndex = 0) {
  const nextIndex = currentIndex + 1;
  const prevIndex = currentIndex - 1;

  if (tocItems[nextIndex] && scrollTop >= tocItems[currentIndex].offsetTop && scrollTop < tocItems[nextIndex].offsetTop) {
    return { latestIndex: currentIndex, id: tocItems[currentIndex].id };
  }

  if (tocItems[prevIndex] && scrollTop >= tocItems[prevIndex].offsetTop && scrollTop < tocItems[currentIndex].offsetTop) {
    return { latestIndex: prevIndex, id: tocItems[prevIndex].id };
  }
}

/**
 * 设置 body 元素的属性
 * @param {string} attribute - 属性名称
 * @param {string} value - 属性值
 */
function setAttribute(attribute, value) {
  if (document.body.getAttribute(attribute) !== value) {
    document.body.setAttribute(attribute, value);
  }
}

/**
 * 获取 body 元素的属性值
 * @param {string} attribute - 属性名称
 * @returns {string|null} - 属性值
 */
function getAttribute(attribute) {
  return document.body.getAttribute(attribute);
}

export {
  formatDateTime,
  getAttribute,
  getCookie,
  scrollSetToc,
  setAttribute,
  tocGenerate
};
