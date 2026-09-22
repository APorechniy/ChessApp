const { skillsInfo } = require("./content/skills");
const fs = require("node:fs");

// Renaming skill paths for Beget.com
skillsInfo.forEach((skill) => {
  fs.mkdirSync(`static_build/skills/${skill.skillId}`);
  fs.renameSync(
    `static_build/skills/${skill.skillId}.html`,
    `static_build/skills/${skill.skillId}/index.html`
  );
});
