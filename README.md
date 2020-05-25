# Gulp 4 project template

### Very simple and basic ready-to-start project template. Based on Gulp v.4 task-runner with Webpack as a bundling tool. Can (and probably should) be upgraded with tools like ESLint and source-maps.

**Includes:**

- scss/sass -> css compilation
- styles minification
- renaming (adds .min suffix)
- autoprefixers
- scripts minification and bundling with Webpack (with [hash].js injecting to index.html)
- images minification (albeit using web tools like (tinypng.com) is highly recommended and works much better)
- local server and automated live-reload with browserSync

In `src/scss` you'll find \_reset.scss - it is .scss file created
by Eric A. Meyer (meyerweb.com) and resets all default browser problematic styles like padding, margin, box-sizing.

In `dist/images` you'll find .jpg file used during configuration to check if images minification works.
Source/author: Photo by Michael Dam on Unsplash

    To start project, node.js & npm are required. You can download these from node website. Follow instructions.

`npm init -y`
Initiates npm management over your project. Creates package.json. `-y` sets all properties to default values.

`npm install / npm i`
This commands (either) should install all required dependencies listed in package.json file. Therefore node_modules directory is created.

`gulp` is default CLI command which starts local server, opens your index.html and keeps looking for changes in project files. Enter command and work for hours :)

`./src`
Directory for all source subdirectories (scss and js)

`./src/scss`
Source style files

`./src/js`
Source script files

`./dist`
Steady production directory for styles, images, html and scripts

PS. be aware of package.json file and data (author, project name, etc). Feel free to change it and use in your projects.
