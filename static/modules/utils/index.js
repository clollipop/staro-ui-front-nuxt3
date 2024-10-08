/**
 * 获取指定名称的 cookie 值
 * @param {string} name - cookie 名称
 * @returns {string} - cookie 值
 */
function getCookie(name) {
  if (typeof name !== "string") {
    throw new TypeError("Cookie name must be a string");
  }

  if (document.cookie.length > 0) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
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
 * @param type int - 0: 年/月/日, 1: 年-月-日 2: 年-月-日  时:分:秒
 * @returns {string} - 格式化后的日期字符串
 */
function formatDateTime(date,type=0) {
  let dateObj;

  // 如果是时间戳，则创建 Date 对象
  if (typeof date === "number") {
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    throw new TypeError("Invalid date or timestamp");
  }

  if (isNaN(dateObj.getTime())) {
    throw new TypeError("Invalid date object");
  }

  // 格式化日期时间
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  switch (type){
  case 0:
    return `${year}/${month}/${day}`;
  case 1:
    return `${year}-${month}-${day}`;
  case 2:
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
/**
 * 计算日期与当前日期的天数差，并返回年、月、日的差值
 * @param {Date | number} date - 日期对象或时间戳
 * @returns {{years: number, months: number, days: number}} - 年、月、日的差值
 */
function calculateDateDifference(date) {
  let dateObj;

  // 如果是时间戳，则创建 Date 对象
  if (typeof date === "number") {
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    throw new TypeError("无效的日期或时间戳");
  }

  if (isNaN(dateObj.getTime())) {
    throw new TypeError("无效日期对象");
  }

  const currentDate = new Date();
  const timeDifference = dateObj.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(Math.abs(timeDifference) / (1000 * 60 * 60 * 24));

  // 计算年、月、日的差值
  let years = 0;
  let months = 0;
  let days = daysDifference;

  if (days >= 365) {
    years = Math.floor(days / 365);
    days -= years * 365;
  }

  if (days >= 30) {
    months = Math.floor(days / 30);
    days -= months * 30;
  }

  return { years, months, days };
}

/**
 * 生成目录
 * @param {string} selector - 选择器
 * @returns {Array} - 目录项数组
 */
function tocGenerate(selector) {
  const elements = document.querySelector(selector).children;
  return Array.from(elements).reduce((tocItems, element) => {
    if (element && element.tagName) {
      const tagName = element.tagName.toLowerCase();
      if (tagName.startsWith("h") && !tagName.startsWith("hr")) {
        tocItems.push({
          id: element.textContent,
          name: element.textContent,
          className: `toc-item-${tagName}`,
          offsetTop: element.offsetTop
        });
      }
    }
    return tocItems;
  }, []);
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

  if (nextIndex < tocItems.length && scrollTop >= tocItems[currentIndex].offsetTop && scrollTop < tocItems[nextIndex].offsetTop) {
    return { latestIndex: currentIndex, id: tocItems[currentIndex].id };
  }

  if (prevIndex >= 0 && scrollTop >= tocItems[prevIndex].offsetTop && scrollTop < tocItems[currentIndex].offsetTop) {
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
  tocGenerate,
  calculateDateDifference
};
