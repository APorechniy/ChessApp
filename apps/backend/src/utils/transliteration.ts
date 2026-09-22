const letters = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ь: "",
  ы: "y",
  ъ: "y",
  э: "e",
  ю: "yu",
  я: "ya",
};

export const transliteration = (str: string) => {
  return str.split("").reduce((accum, current) => {
    const realLetter = current;
    const smallLetter = current.toLowerCase();

    if (smallLetter in letters) {
      if (realLetter === smallLetter) {
        return accum + letters[smallLetter as keyof typeof letters];
      } else {
        return (
          accum + letters[smallLetter as keyof typeof letters].toUpperCase()
        );
      }
    } else {
      return accum + current;
    }
  }, "");
};
