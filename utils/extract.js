export const extractContents = (data) => {
  return data.match(/<li class="latest-stories__item">([\s\S]*?)<\/li>/g);
};

export const extractTitle = (snippet) => {
  const [heading] = snippet.match(/>(.*?)<\/h3>/g);

  let title = "";

  if (heading) {
    title = heading.replace(">", "").replace("</h3>", "").trim();
  }

  return title;
};

export const extractLink = (snippet) => {
  const [href] = snippet.match(/href="(.*?)"/g);
  const host = "https://time.com";
  let link = "";

  if (href) {
    [link] = href.match(/"(.*?)"/g);
    if (link) {
      link = `${host}${link.replaceAll('"', "")}`;
    }
  }

  return link;
};
